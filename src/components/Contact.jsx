import { useRef, useState } from 'react'
import { useLang } from '../i18n'
import { address, links } from '../i18n/links'
import { FlipChars, FlipText, Reveal } from './fx'
import Turnstile, { TURNSTILE_SITE_KEY } from './Turnstile'
import { Chevron } from './ui'

const EMPTY = { name: '', email: '', company: '', role: '', website: '', needs: [], message: '', timeline: '', source: '', consent: false, hp: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(v, errors) {
  const e = {}
  if (!v.name.trim()) e.name = errors.required
  if (!v.email.trim()) e.email = errors.required
  else if (!EMAIL_RE.test(v.email.trim())) e.email = errors.email
  if (!v.company.trim()) e.company = errors.required
  if (!v.message.trim()) e.message = errors.required
  if (!v.consent) e.consent = errors.consent
  return e
}

const inputCls = (err) =>
  `w-full border-0 border-b bg-transparent px-0 pb-3 pt-2 text-[17px] text-ink outline-none transition-colors placeholder:text-stone focus:border-ink ${err ? 'border-klar' : 'border-ink/20'}`

function Field({ id, label, optional, error, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="caption block text-[11px] text-taupe">
        {label}
        {optional && <span className="ml-1.5 normal-case tracking-normal text-stone">({optional})</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-[13px] text-klar">
          {error}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  const { t, lang } = useLang()
  const c = t.contact
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | failed
  const startedAt = useRef(Date.now())
  const formRef = useRef(null)
  const captchaRef = useRef(null)
  const [captcha, setCaptcha] = useState('') // Turnstile token; '' until the check passes

  const set = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }
  const toggleNeed = (opt) => set('needs', values.needs.includes(opt) ? values.needs.filter((n) => n !== opt) : [...values.needs, opt])

  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(values, c.errors)
    if (TURNSTILE_SITE_KEY && !captcha) errs.captcha = c.errors.captcha
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) {
      if (first === 'captcha') formRef.current.querySelector('#contact-captcha')?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      else formRef.current.querySelector(`[name="${first}"]`)?.focus()
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, lang, startedAt: startedAt.current, turnstileToken: captcha }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) return setStatus('sent')
      // tokens are single-use: get a fresh one for the next try
      captchaRef.current?.reset()
      if (data.error === 'captcha') {
        setErrors((er) => ({ ...er, captcha: c.errors.captchaRetry }))
        setStatus('idle')
      } else setStatus('failed')
    } catch {
      captchaRef.current?.reset()
      setStatus('failed')
    }
  }

  const reset = () => {
    setValues(EMPTY)
    setErrors({})
    setStatus('idle')
    setCaptcha('')
    startedAt.current = Date.now()
  }

  const a11y = (name) => ({ 'aria-invalid': !!errors[name], 'aria-describedby': errors[name] ? `contact-${name}-error` : undefined })

  return (
    <section id="top" className="container-x pb-32 pt-36 lg:pb-44 lg:pt-44">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        {/* left: headline + direct details */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-36">
            <Reveal as="p" className="caption">
              {c.caption}
            </Reveal>
            <FlipChars as="h1" text={c.title} className="mt-6 font-serif text-[clamp(2.6rem,5vw,4.6rem)] leading-[1.02] tracking-[-0.015em]" />
            <Reveal as="p" delay={120} className="mt-8 max-w-md text-[17px] leading-relaxed text-ink/75">
              {c.body}
            </Reveal>

            <Reveal delay={200} className="mt-14 grid gap-8 border-t border-ink/10 pt-10 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <p className="caption text-[11px] text-taupe">{c.side.email}</p>
                <a href={`mailto:${links.email}`} className="group mt-3 inline-block font-serif text-2xl">
                  <FlipText text={links.email} stagger={8} />
                </a>
              </div>
              <div>
                <p className="caption text-[11px] text-taupe">{c.side.address}</p>
                <address className="mt-3 not-italic leading-relaxed text-ink/80">
                  {address[lang].map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
              <div>
                <p className="caption text-[11px] text-taupe">{c.side.offices}</p>
                <p className="mt-3 text-ink/80">{t.footer.offices.join(' · ')}</p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* right: the form */}
        <Reveal delay={150} className="lg:col-span-7">
          <div className="rounded-2xl bg-card p-7 shadow-[0_40px_80px_-50px_rgba(6,20,27,0.35)] sm:p-10 lg:p-12">
            {status === 'sent' ? (
              <div role="status" className="flex min-h-[520px] flex-col items-start justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper">
                  <svg viewBox="0 0 16 16" className="h-5 w-5" aria-hidden="true">
                    <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h2 className="mt-8 font-serif text-[2.4rem] leading-tight">{c.success.title}</h2>
                <p className="mt-4 max-w-md leading-relaxed text-ink/70">{c.success.body}</p>
                <button type="button" onClick={reset} className="caption group mt-10 inline-flex items-center gap-2 text-[12px] text-ink">
                  <FlipText text={c.success.again} stagger={10} />
                  <Chevron className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <form ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
                <Field id="contact-name" label={c.fields.name} error={errors.name}>
                  <input id="contact-name" name="name" autoComplete="name" value={values.name} onChange={(e) => set('name', e.target.value)} className={inputCls(errors.name)} {...a11y('name')} />
                </Field>
                <Field id="contact-email" label={c.fields.email} error={errors.email}>
                  <input id="contact-email" name="email" type="email" autoComplete="email" value={values.email} onChange={(e) => set('email', e.target.value)} className={inputCls(errors.email)} {...a11y('email')} />
                </Field>
                <Field id="contact-company" label={c.fields.company} error={errors.company}>
                  <input id="contact-company" name="company" autoComplete="organization" value={values.company} onChange={(e) => set('company', e.target.value)} className={inputCls(errors.company)} {...a11y('company')} />
                </Field>
                <Field id="contact-role" label={c.fields.role} optional={t.ui.optional}>
                  <input id="contact-role" name="role" autoComplete="organization-title" value={values.role} onChange={(e) => set('role', e.target.value)} className={inputCls()} />
                </Field>
                <Field id="contact-website" label={c.fields.website} optional={t.ui.optional} className="sm:col-span-2">
                  <input id="contact-website" name="website" type="url" inputMode="url" autoComplete="url" placeholder="https://" value={values.website} onChange={(e) => set('website', e.target.value)} className={inputCls()} />
                </Field>

                <fieldset className="sm:col-span-2">
                  <legend className="caption text-[11px] text-taupe">{c.fields.needs}</legend>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.fields.needsOptions.map((opt) => {
                      const on = values.needs.includes(opt)
                      return (
                        <button
                          key={opt}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggleNeed(opt)}
                          className={`rounded-full border px-4 py-2 text-[15px] transition-colors duration-300 ${on ? 'border-ink bg-ink text-paper' : 'border-ink/20 text-ink hover:border-ink'}`}
                        >
                          {opt}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>

                <Field id="contact-message" label={c.fields.message} error={errors.message} className="sm:col-span-2">
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder={c.fields.messagePlaceholder}
                    value={values.message}
                    onChange={(e) => set('message', e.target.value)}
                    className={`${inputCls(errors.message)} resize-y`}
                    {...a11y('message')}
                  />
                </Field>

                <Field id="contact-timeline" label={c.fields.timeline} optional={t.ui.optional}>
                  <select id="contact-timeline" name="timeline" value={values.timeline} onChange={(e) => set('timeline', e.target.value)} className={`${inputCls()} cursor-pointer appearance-none`}>
                    <option value="">{c.fields.timelinePlaceholder}</option>
                    {c.fields.timelineOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field id="contact-source" label={c.fields.source} optional={t.ui.optional}>
                  <input id="contact-source" name="source" value={values.source} onChange={(e) => set('source', e.target.value)} className={inputCls()} />
                </Field>

                {/* spam trap: hidden from people, tempting for bots */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="contact-hp">Leave this empty</label>
                  <input id="contact-hp" name="hp" tabIndex={-1} autoComplete="off" value={values.hp} onChange={(e) => set('hp', e.target.value)} />
                </div>

                <div className="sm:col-span-2">
                  <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-relaxed text-ink/80">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={values.consent}
                      onChange={(e) => set('consent', e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-ink"
                      {...a11y('consent')}
                    />
                    {c.fields.consent}
                  </label>
                  {errors.consent && (
                    <p id="contact-consent-error" className="mt-2 text-[13px] text-klar">
                      {errors.consent}
                    </p>
                  )}
                </div>

                {TURNSTILE_SITE_KEY && (
                  <div id="contact-captcha" className="sm:col-span-2">
                    <Turnstile
                      ref={captchaRef}
                      lang={lang}
                      onToken={(token) => {
                        setCaptcha(token)
                        // a fresh token answers "please complete the check"; the retry note stays until the next send
                        if (token) setErrors((er) => (er.captcha === c.errors.captcha ? { ...er, captcha: undefined } : er))
                      }}
                      className="max-w-[400px]"
                    />
                    {errors.captcha && (
                      <p role="alert" className="mt-2 text-[13px] text-klar">
                        {errors.captcha}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  {status === 'failed' ? (
                    <p role="alert" className="max-w-sm text-[14px] leading-relaxed text-klar">
                      {c.failure}{' '}
                      <a href={`mailto:${links.email}`} className="underline underline-offset-4">
                        {links.email}
                      </a>
                      .
                    </p>
                  ) : (
                    <span />
                  )}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group caption relative isolate inline-flex items-center justify-center gap-3 rounded-md px-7 py-3.5 text-[13px] text-paper transition-[padding] duration-[450ms] ease-snap before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-ink before:transition-[inset] before:duration-[450ms] before:ease-snap hover:before:-inset-1 disabled:opacity-60"
                  >
                    {status === 'sending' ? c.sending : <FlipText text={c.submit} />}
                    <Chevron className="h-3 w-3" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
