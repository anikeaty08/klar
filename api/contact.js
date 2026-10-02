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
 */

const TO = process.env.CONTACT_TO || 'hello@klardatalabs.com'
const FROM = process.env.CONTACT_FROM || 'KlarDataLabs Website <onboarding@resend.dev>'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LIMITS = { name: 120, email: 200, company: 160, role: 120, website: 300, message: 5000, timeline: 80, source: 200 }

const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

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

  const rows = [
    ['Name', f.name],
    ['Email', f.email],
    ['Company', f.company],
    ['Role', f.role],
    ['Website', f.website],
    ['Interested in', needs.join(', ')],
    ['Timeline', f.timeline],
    ['Heard about us', f.source],
    ['Language', lang.toUpperCase()],
  ].filter(([, v]) => v)

  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nMessage:\n${f.message}\n`
  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;color:#06141b;line-height:1.5">
      <h2 style="font-weight:normal;margin:0 0 16px">New enquiry from the KlarDataLabs website</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows.map(([k, v]) => `<tr><td style="color:#8a8276;vertical-align:top">${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`).join('')}
      </table>
      <p style="color:#8a8276;margin:20px 0 6px">Message</p>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(f.message)}</p>
    </div>`

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: f.email,
        subject: `New enquiry — ${f.name}${f.company ? ` · ${f.company}` : ''}`,
        text,
        html,
      }),
    })
    if (!r.ok) {
      console.error('contact: Resend responded', r.status, await r.text())
      return res.status(502).json({ ok: false, error: 'send_failed' })
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('contact: request to Resend failed', err)
    return res.status(502).json({ ok: false, error: 'send_failed' })
  }
}
