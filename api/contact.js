/*
 * Vercel serverless function: POST /api/contact
 * Validates the contact form and emails it to hello@klardatalabs.com through Resend
 * (https://resend.com), with Reply-To set to the sender so you can answer directly.
 *
 * Environment variables (Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY  required — Resend API key
 *   CONTACT_TO      optional — recipient, defaults to hello@klardatalabs.com
 *   CONTACT_FROM    optional — sender; must be on a domain verified in Resend,
 *                   e.g. "KlarDataLabs Website <website@klardatalabs.com>".
 *                   Until the domain is verified, Resend's test sender
 *                   onboarding@resend.dev only delivers to the Resend account's own email.
 *   IPINFO_TOKEN    optional — ipinfo.io token for the visitor-location lookup
 *   TURNSTILE_SECRET_KEY  Cloudflare Turnstile secret; every submission must carry a
 *                   token Cloudflare confirms. Pairs with VITE_TURNSTILE_SITE_KEY in the
 *                   frontend build. If unset, the bot check is skipped (local dev only).
 *   TURNSTILE_HOSTNAMES optional — comma-separated sites the widget may be solved on;
 *                   defaults to klardatalabs.com, www.klardatalabs.com and the Vercel test
 *                   site klar-livid-delta.vercel.app, plus localhost for development (localhost
 *                   is dropped whenever NODE_ENV is production, e.g. on Vercel).
 *   CONTACT_AUTOREPLY optional — "true" also sends the visitor a branded confirmation
 *                   (EN/DE/FR/IT). Only turn on once the domain is verified.
 */

import { confirmationEmail, notificationEmail } from './_emails.js'

const TO = process.env.CONTACT_TO || 'hello@klardatalabs.com'
const FROM = process.env.CONTACT_FROM || 'KlarDataLabs Website <onboarding@resend.dev>'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LIMITS = { name: 120, email: 200, company: 160, role: 120, website: 300, message: 5000, timeline: 80, source: 200 }

const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'method_not_allowed' })
  }

  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      body = {}
    }
  }
  body = body || {}

  // spam: the hidden field must stay empty, and real people take more than a few seconds
  const tooFast = Number(body.startedAt) && Date.now() - Number(body.startedAt) < 3000
  if (body.hp || tooFast) return res.status(200).json({ ok: true })

  const f = Object.fromEntries(Object.entries(LIMITS).map(([k, max]) => [k, clean(body[k], max)]))
  const needs = Array.isArray(body.needs) ? body.needs.filter((n) => typeof n === 'string').slice(0, 8).map((n) => n.slice(0, 60)) : []
  const lang = ['de', 'fr', 'it'].includes(body.lang) ? body.lang : 'en'

  const missing = []
  if (!f.name) missing.push('name')
  if (!EMAIL_RE.test(f.email)) missing.push('email')
  if (!f.company) missing.push('company')
  if (!f.message) missing.push('message')
  if (body.consent !== true) missing.push('consent')
  if (missing.length) return res.status(400).json({ ok: false, error: 'invalid', fields: missing })

  // bots: Cloudflare Turnstile must vouch for this submission
  if (!(await humanCheck(body.turnstileToken, clientIp(req)))) return res.status(403).json({ ok: false, error: 'captcha' })

  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.error('contact: RESEND_API_KEY is not set')
    return res.status(500).json({ ok: false, error: 'not_configured' })
  }

  const data = { ...f, needs, lang, geo: await geoFor(req) }
  const send = (payload) =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM, ...payload }),
    })

  try {
    const note = notificationEmail(data)
    const r = await send({ to: [TO], reply_to: f.email, subject: note.subject, html: note.html, text: note.text })
    if (!r.ok) {
      console.error('contact: Resend responded', r.status, await r.text())
      return res.status(502).json({ ok: false, error: 'send_failed' })
    }
    // the visitor's confirmation is a courtesy: if it fails, the enquiry still counts as sent
    if (process.env.CONTACT_AUTOREPLY === 'true') {
      const conf = confirmationEmail(data)
      const c = await send({ to: [f.email], reply_to: TO, subject: conf.subject, html: conf.html, text: conf.text })
      if (!c.ok) console.error('contact: confirmation failed', c.status, await c.text())
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('contact: request to Resend failed', err)
    return res.status(502).json({ ok: false, error: 'send_failed' })
  }
}

/* ------------------------------------------------------------ bot check
 * Ask Cloudflare whether the form's Turnstile token is genuine, unused and recent, and
 * that it was solved for this form ("contact") on one of our own sites.
 * Fails closed: if Cloudflare can't be reached, the submission is refused.
 */

const TURNSTILE_ACTION = 'contact'
const LOCAL_HOSTS = ['localhost', '127.0.0.1']

function allowedHosts() {
  const list = (process.env.TURNSTILE_HOSTNAMES || 'klardatalabs.com,www.klardatalabs.com,klar-livid-delta.vercel.app,localhost,127.0.0.1')
    .split(',')
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean)
  return new Set(process.env.NODE_ENV === 'production' ? list.filter((h) => !LOCAL_HOSTS.includes(h)) : list)
}

async function humanCheck(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.warn('contact: TURNSTILE_SECRET_KEY is not set, skipping the bot check')
    return true
  }
  if (typeof token !== 'string' || token.length < 1 || token.length > 2048) return false
  try {
    const form = new URLSearchParams({ secret, response: token })
    if (!isPrivate(ip)) form.set('remoteip', ip)
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form, signal: AbortSignal.timeout(10000) })
    const out = await r.json()
    if (out.success !== true) {
      console.warn('contact: Turnstile rejected the token', out['error-codes'])
      return false
    }
    // Cloudflare's test keys carry no action and report example.com; real keys must match exactly
    if (out.metadata?.result_with_testing_key) return true
    const hosts = allowedHosts()
    if (out.action !== TURNSTILE_ACTION || !hosts.has(String(out.hostname || '').toLowerCase())) {
      console.warn('contact: Turnstile token for the wrong form or site', { action: out.action, hostname: out.hostname })
      return false
    }
    return true
  } catch (err) {
    console.error('contact: Turnstile check failed', err?.message)
    return false
  }
}

/* ------------------------------------------------------------ visitor location
 * City-level location for the team email (never a street address), looked up from
 * the visitor's IP at ipinfo.io. Any failure just leaves the location out.
 *   IPINFO_TOKEN  optional — ipinfo.io token; works without one at a lower daily limit
 */

const EMPTY_GEO = { city: '', region: '', country: '', timezone: '', lat: null, lon: null }

const countryName = (code) => {
  try {
    return (code && new Intl.DisplayNames(['en'], { type: 'region' }).of(code.toUpperCase())) || code
  } catch {
    return code
  }
}

const num = (v) => (v === '' || v == null || !Number.isFinite(Number(v)) ? null : Number(v))

function clientIp(req) {
  const first = (v) => String(Array.isArray(v) ? v[0] : v || '').split(',')[0].trim()
  const ip = first(req.headers['x-forwarded-for']) || first(req.headers['x-real-ip']) || req.socket?.remoteAddress || ''
  return ip.replace(/^::ffff:/, '')
}

// loopback / private ranges can't be located (local dev)
const isPrivate = (ip) => !ip || /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|169\.254\.|::1$|fc|fd|fe80)/i.test(ip)

async function geoFor(req) {
  const ip = clientIp(req)
  if (isPrivate(ip)) return EMPTY_GEO
  try {
    const token = process.env.IPINFO_TOKEN ? `?token=${encodeURIComponent(process.env.IPINFO_TOKEN)}` : ''
    const r = await fetch(`https://ipinfo.io/${encodeURIComponent(ip)}/json${token}`, { signal: AbortSignal.timeout(2000) })
    if (!r.ok) return EMPTY_GEO
    const g = await r.json()
    if (g.bogon) return EMPTY_GEO
    const [lat, lon] = String(g.loc || '').split(',')
    return { city: g.city || '', region: g.region || '', country: countryName(g.country || ''), timezone: g.timezone || '', lat: num(lat), lon: num(lon) }
  } catch (err) {
    console.error('contact: location lookup failed', err?.message)
    return EMPTY_GEO
  }
}
