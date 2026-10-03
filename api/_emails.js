/*
 * Email templates for the contact form. Vercel doesn't expose files that start
 * with "_" in /api as endpoints, so this is a plain shared module.
 *
 * Email-client-safe: table layout, inline styles, system fonts, no images, and a
 * hidden preheader line for the inbox preview.
 */

const C = { ink: '#06141b', paper: '#fafaf8', card: '#ffffff', sand: '#efebe5', stone: '#c7bdb2', taupe: '#8a8276', red: '#e8322b' }
const SERIF = "Georgia, 'Times New Roman', serif"
const SANS = "-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
const SITE = 'https://klardatalabs.com'
const ADDRESS = 'KlarDataLabs GmbH · CHE-285.980.722 · Giesserei · 8427 Freienstein-Teufen · Zürich, Switzerland'
const LANGUAGE = { en: 'English', de: 'German', fr: 'French', it: 'Italian' }

export const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
const nl2br = (s) => esc(s).replace(/\r?\n/g, '<br>')
const firstName = (name) => String(name).trim().split(/\s+/)[0] || name

function zurichTime(date = new Date()) {
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Zurich' }).format(date) + ' (Zürich)'
}

/** "Bengaluru, KA, India" from the request's IP geolocation; '' when unknown. */
function placeName(geo) {
  if (!geo) return ''
  return [geo.city, geo.region && geo.region !== geo.city ? geo.region : '', geo.country].filter(Boolean).join(', ')
}

/** The visitor's own clock at the time they wrote, e.g. "3 Oct 2026, 01:48 (Asia/Kolkata)". */
function localTime(geo, date = new Date()) {
  if (!geo?.timezone) return ''
  try {
    return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: geo.timezone }).format(date) + ` (${geo.timezone})`
  } catch {
    return ''
  }
}

/** Outer frame shared by both emails. */
function frame({ preheader, body, footer }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<title>KlarDataLabs</title>
</head>
<body style="margin:0;padding:0;background:${C.sand};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(preheader)}&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.sand};">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">
      <tr><td style="padding:0 4px 18px 4px;font-family:${SANS};font-size:15px;font-weight:700;letter-spacing:1px;color:${C.ink};">
        KLAR<span style="color:${C.taupe};">DATALABS</span><span style="color:${C.red};">.</span>
      </td></tr>
      <tr><td style="background:${C.card};border-radius:16px;padding:40px 36px;">
        ${body}
      </td></tr>
      <tr><td style="padding:22px 4px 0 4px;font-family:${SANS};font-size:12px;line-height:18px;color:${C.taupe};">
        ${footer}
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`
}

const caption = (text, color = C.taupe) =>
  `<div style="font-family:${SANS};font-size:11px;font-weight:600;letter-spacing:1.4px;text-transform:uppercase;color:${color};">${esc(text)}</div>`

const pill = (text) =>
  `<span style="display:inline-block;margin:0 6px 6px 0;padding:6px 12px;border:1px solid ${C.stone};border-radius:999px;font-family:${SANS};font-size:13px;color:${C.ink};">${esc(text)}</span>`

const button = (href, label) => `
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
  <td style="border-radius:8px;background:${C.ink};">
    <a href="${esc(href)}" style="display:inline-block;padding:14px 26px;font-family:${SANS};font-size:13px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;color:${C.paper};text-decoration:none;border-radius:8px;">${esc(label)} &rarr;</a>
  </td>
</tr></table>`

/* ---------------------------------------------------------- team notification */

export function notificationEmail(f) {
  const who = f.company ? `${f.name} from ${f.company}` : f.name
  const replyHref = `mailto:${f.email}?subject=${encodeURIComponent('Re: your enquiry to KlarDataLabs')}`
  const now = new Date()
  const place = placeName(f.geo)
  const mapHref = f.geo?.lat != null && f.geo?.lon != null ? `https://www.google.com/maps?q=${f.geo.lat},${f.geo.lon}` : ''
  const theirTime = localTime(f.geo, now)
  // [label, html, plain text]
  const rows = [
    ['Email', `<a href="mailto:${esc(f.email)}" style="color:${C.ink};">${esc(f.email)}</a>`, f.email],
    ['Company', esc(f.company), f.company],
    ['Role', esc(f.role), f.role],
    ['Website', f.website ? `<a href="${esc(/^https?:\/\//.test(f.website) ? f.website : `https://${f.website}`)}" style="color:${C.ink};">${esc(f.website)}</a>` : '', f.website],
    ['Timeline', esc(f.timeline), f.timeline],
    ['Heard about us', esc(f.source), f.source],
    ['Language', LANGUAGE[f.lang] || 'English', LANGUAGE[f.lang] || 'English'],
    [
      'Location',
      place && `${esc(place)}${mapHref ? ` &nbsp;<a href="${mapHref}" style="color:${C.taupe};font-size:13px;">View map</a>` : ''}<br><span style="font-size:12px;color:${C.taupe};">Approximate, based on IP address</span>`,
      place && `${place} (approx., from IP)${mapHref ? ` ${mapHref}` : ''}`,
    ],
    ['Their local time', esc(theirTime), theirTime],
    ['Received', zurichTime(now), zurichTime(now)],
  ].filter(([, v]) => v)

  const body = `
    ${caption('New website enquiry')}
    <h1 style="margin:14px 0 0 0;font-family:${SERIF};font-size:30px;line-height:36px;font-weight:normal;color:${C.ink};">${esc(who)} wants to talk<span style="color:${C.red};">.</span></h1>
    ${f.needs?.length ? `<div style="margin-top:22px;">${caption('Interested in')}<div style="margin-top:10px;">${f.needs.map(pill).join('')}</div></div>` : ''}
    <div style="margin-top:26px;">${caption('Message')}</div>
    <div style="margin-top:10px;padding:4px 0 4px 18px;border-left:3px solid ${C.red};font-family:${SERIF};font-size:18px;line-height:28px;color:${C.ink};">${nl2br(f.message)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:30px;border-top:1px solid ${C.sand};">
      ${rows
        .map(
          ([k, v]) => `<tr>
        <td style="padding:12px 12px 12px 0;border-bottom:1px solid ${C.sand};font-family:${SANS};font-size:12px;letter-spacing:0.6px;text-transform:uppercase;color:${C.taupe};white-space:nowrap;vertical-align:top;width:130px;">${esc(k)}</td>
        <td style="padding:12px 0;border-bottom:1px solid ${C.sand};font-family:${SANS};font-size:15px;line-height:22px;color:${C.ink};">${v}</td>
      </tr>`,
        )
        .join('')}
    </table>
    <div style="margin-top:32px;">${button(replyHref, `Reply to ${firstName(f.name)}`)}</div>`

  const text = [
    `New website enquiry — ${who}`,
    '',
    f.needs?.length ? `Interested in: ${f.needs.join(', ')}` : null,
    '',
    'Message:',
    f.message,
    '',
    ...rows.map(([k, , raw]) => `${k}: ${raw}`),
  ]
    .filter((l) => l !== null)
    .join('\n')

  return {
    subject: `New enquiry — ${who}`,
    html: frame({
      preheader: `${who}: ${f.message.slice(0, 120)}`,
      body,
      footer: `Sent from the contact form on <a href="${SITE}" style="color:${C.taupe};">klardatalabs.com</a>. Reply to this email to answer ${esc(firstName(f.name))} directly.<br>${esc(ADDRESS)}`,
    }),
    text,
  }
}

/* ------------------------------------------------------ visitor confirmation */

const COPY = {
  en: {
    subject: 'Thanks for reaching out to KlarDataLabs',
    caption: 'Message received',
    title: (n) => `Thank you, ${n}`,
    lead: 'Your message is with our team. We’ll read it properly and get back to you to find the right place to start.',
    yours: 'What you sent us',
    next: 'Explore our work',
    sign: 'The KlarDataLabs team',
    footer: 'You’re receiving this because you used the contact form on klardatalabs.com.',
  },
  de: {
    subject: 'Danke für Ihre Nachricht an KlarDataLabs',
    caption: 'Nachricht erhalten',
    title: (n) => `Vielen Dank, ${n}`,
    lead: 'Ihre Nachricht ist bei unserem Team angekommen. Wir lesen sie in Ruhe und melden uns, um gemeinsam den richtigen Einstieg zu finden.',
    yours: 'Ihre Nachricht',
    next: 'Unsere Arbeit ansehen',
    sign: 'Ihr KlarDataLabs-Team',
    footer: 'Sie erhalten diese E-Mail, weil Sie das Kontaktformular auf klardatalabs.com verwendet haben.',
  },
  fr: {
    subject: 'Merci d’avoir contacté KlarDataLabs',
    caption: 'Message reçu',
    title: (n) => `Merci, ${n}`,
    lead: 'Votre message est bien arrivé auprès de notre équipe. Nous allons le lire attentivement et revenir vers vous pour trouver le bon point de départ.',
    yours: 'Votre message',
    next: 'Découvrir nos réalisations',
    sign: 'L’équipe KlarDataLabs',
    footer: 'Vous recevez cet e-mail parce que vous avez utilisé le formulaire de contact sur klardatalabs.com.',
  },
  it: {
    subject: 'Grazie per aver contattato KlarDataLabs',
    caption: 'Messaggio ricevuto',
    title: (n) => `Grazie, ${n}`,
    lead: 'Il vostro messaggio è arrivato al nostro team. Lo leggeremo con attenzione e vi ricontatteremo per individuare insieme il punto di partenza giusto.',
    yours: 'Il vostro messaggio',
    next: 'Scoprite il nostro lavoro',
    sign: 'Il team di KlarDataLabs',
    footer: 'Ricevete questa e-mail perché avete utilizzato il modulo di contatto su klardatalabs.com.',
  },
}

export function confirmationEmail(f) {
  const c = COPY[f.lang] || COPY.en
  const n = firstName(f.name)
  const body = `
    ${caption(c.caption)}
    <h1 style="margin:14px 0 0 0;font-family:${SERIF};font-size:32px;line-height:38px;font-weight:normal;color:${C.ink};">${esc(c.title(n))}<span style="color:${C.red};">.</span></h1>
    <p style="margin:16px 0 0 0;font-family:${SANS};font-size:16px;line-height:26px;color:#3a4549;">${esc(c.lead)}</p>
    <div style="margin-top:28px;">${caption(c.yours)}</div>
    <div style="margin-top:10px;padding:16px 18px;background:${C.paper};border-radius:10px;font-family:${SANS};font-size:15px;line-height:24px;color:${C.ink};">${nl2br(f.message)}</div>
    <div style="margin-top:32px;">${button(COPY[f.lang] && f.lang !== 'en' ? `${SITE}/${f.lang}#projects` : `${SITE}/#projects`, c.next)}</div>
    <p style="margin:32px 0 0 0;font-family:${SERIF};font-size:18px;line-height:26px;color:${C.ink};">— ${esc(c.sign)}</p>`

  return {
    subject: c.subject,
    html: frame({
      preheader: c.lead,
      body,
      footer: `${esc(c.footer)}<br><a href="mailto:hello@klardatalabs.com" style="color:${C.taupe};">hello@klardatalabs.com</a> · ${esc(ADDRESS)}`,
    }),
    text: `${c.title(n)}.\n\n${c.lead}\n\n${c.yours}:\n${f.message}\n\n— ${c.sign}\nhello@klardatalabs.com · ${ADDRESS}`,
  }
}
