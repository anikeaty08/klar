import { useEffect, useImperativeHandle, useRef } from 'react'

/*
 * Cloudflare Turnstile — a privacy-friendly "are you human" check for the contact form.
 * The site key is public (VITE_TURNSTILE_SITE_KEY); the server re-checks every token
 * with the secret key before sending mail (see api/contact.js).
 */

// the site key is public (the widget allows localhost too); VITE_TURNSTILE_SITE_KEY overrides it
export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAAFOKiHsDzkkoylan'

let loading = null
function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile)
  loading ??= new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    s.async = true
    s.onload = () => resolve(window.turnstile)
    s.onerror = () => {
      loading = null // allow a retry on the next mount
      reject(new Error('turnstile failed to load'))
    }
    document.head.appendChild(s)
  })
  return loading
}

/** Renders the widget and reports its token (or '' once it expires / errors). `ref.reset()` asks for a fresh one. */
export default function Turnstile({ lang = 'en', onToken, ref, className = '' }) {
  const box = useRef(null)
  const widget = useRef(null)
  const report = useRef(onToken)
  report.current = onToken

  useImperativeHandle(ref, () => ({
    reset: () => {
      report.current?.('')
      if (widget.current != null) window.turnstile?.reset(widget.current)
    },
  }))

  useEffect(() => {
    let gone = false
    loadTurnstile()
      .then((ts) => {
        if (gone || !box.current) return
        widget.current = ts.render(box.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: 'light',
          size: 'flexible',
          language: lang,
          action: 'contact',
          callback: (token) => report.current?.(token),
          'expired-callback': () => report.current?.(''),
          'error-callback': () => {
            report.current?.('')
            return true // let Turnstile retry on its own
          },
        })
      })
      .catch(() => report.current?.(''))
    return () => {
      gone = true
      if (widget.current != null) window.turnstile?.remove(widget.current)
      widget.current = null
    }
  }, [lang])

  return <div ref={box} className={`min-h-[65px] ${className}`} />
}
