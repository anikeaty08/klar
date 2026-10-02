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
 *   CONTACT_AUTOREPLY optional — "true" also sends the visitor a branded confirmation
 *                   (EN/DE). Only turn on once the domain is verified.
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
  const lang = body.lang === 'de' ? 'de' : 'en'

  const missing = []
  if (!f.name) missing.push('name')
  if (!EMAIL_RE.test(f.email)) missing.push('email')
  if (!f.company) missing.push('company')
  if (!f.message) missing.push('message')
  if (body.consent !== true) missing.push('consent')
  if (missing.length) return res.status(400).json({ ok: false, error: 'invalid', fields: missing })

  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.error('contact: RESEND_API_KEY is not set')
    return res.status(500).json({ ok: false, error: 'not_configured' })
  }

  const data = { ...f, needs, lang }
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
