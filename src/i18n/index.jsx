import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/motion'
import { langFromPath, navigate, pageFromPath, pathFor } from '../lib/router'
import { prefersReducedMotion } from '../lib/useCanvas'
import en from './en'

/*
 * EN is the default and ships in the main bundle; DE is a separate chunk that is
 * only downloaded when someone picks German (or opens a /de link).
 * Switching language runs a short curtain over the page so the swap never jumps.
 */

const LangContext = createContext(null)
const STORE_KEY = 'kdl-lang'
const NAMES = { en: 'English', de: 'Deutsch' }
const loadGerman = () => import('./de.js').then((m) => m.default)

function initialLang() {
  const fromPath = langFromPath()
  if (fromPath) return fromPath
  try {
    return localStorage.getItem(STORE_KEY) === 'de' ? 'de' : 'en'
  } catch {
    return 'en'
  }
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(initialLang)
  const [content, setContent] = useState(() => (initialLang() === 'en' ? en : null))
  // two-step switch: a dark curtain rises from the bottom, then a sand panel sweeps in from the right
  const curtainV = useRef(null)
  const curtainH = useRef(null)
  const label = useRef(null)
  const reveal = useRef(false)
  const HIDDEN_V = 'inset(100% 0% 0% 0%)'
  const HIDDEN_H = 'inset(0% 0% 0% 100%)'

  useEffect(() => {
    let alive = true
    if (lang === 'de') loadGerman().then((de) => alive && setContent(de))
    else setContent(en)
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORE_KEY, lang)
    } catch {
      // storage can be unavailable (private mode); the URL still carries the language
    }
    // keep the URL's /de prefix in step with the chosen language
    const want = pathFor(pageFromPath(), lang) + window.location.hash
    if (window.location.pathname + window.location.hash !== want) navigate(want, { replace: true })
    return () => {
      alive = false
    }
  }, [lang])

  // once the new language has rendered: the sand panel leaves to the left, then the dark curtain lifts off the top
  useEffect(() => {
    if (!reveal.current || content?.lang !== lang) return
    reveal.current = false
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        gsap
          .timeline({
            delay: 0.1,
            onComplete: () => gsap.set([curtainV.current, curtainH.current], { visibility: 'hidden', clipPath: (i) => (i ? HIDDEN_H : HIDDEN_V) }),
          })
          .to(curtainH.current, { clipPath: 'inset(0% 100% 0% 0%)', duration: 0.6, ease: 'expo.inOut' })
          .to(curtainV.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.65, ease: 'expo.inOut' }, '-=0.3'),
      ),
    )
  }, [content, lang])

  const setLang = useCallback(
    (next) => {
      next = next === 'de' ? 'de' : 'en'
      if (next === lang) return
      if (prefersReducedMotion() || !curtainV.current) return setLangState(next)
      label.current.textContent = NAMES[next]
      gsap.set(curtainV.current, { visibility: 'visible', clipPath: HIDDEN_V })
      gsap.set(curtainH.current, { visibility: 'visible', clipPath: HIDDEN_H })
      gsap
        .timeline({
          onComplete: () => {
            reveal.current = true
            setLangState(next)
          },
        })
        .to(curtainV.current, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5, ease: 'expo.inOut' })
        .to(curtainH.current, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'expo.inOut' }, '+=0.05')
        .fromTo(label.current, { xPercent: 30, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.6, ease: 'expo.out' }, '-=0.3')
    },
    [lang],
  )

  return (
    <>
      {content && <LangContext.Provider value={{ lang: content.lang, t: content, setLang }}>{children}</LangContext.Provider>}
      <div ref={curtainV} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[500] bg-ink" style={{ clipPath: HIDDEN_V, visibility: 'hidden' }} />
      <div
        ref={curtainH}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[501] flex items-center justify-center bg-sand"
        style={{ clipPath: HIDDEN_H, visibility: 'hidden' }}
      >
        <span className="flex items-baseline overflow-hidden font-serif text-[clamp(3rem,8vw,7rem)] leading-none text-ink">
          <span ref={label} className="inline-block" />
          <span className="ml-1 inline-block h-[0.14em] w-[0.14em] rounded-full bg-klar" />
        </span>
      </div>
    </>
  )
}

export const useLang = () => useContext(LangContext)

/**
 * EN / DE pill: a dark indicator slides under the active language.
 * tone "dark" sits on paper, "light" on the ink footer; size "lg" for the menu.
 */
export function LangToggle({ tone = 'dark', size = 'sm', className = '' }) {
  const { lang, setLang, t } = useLang()
  const dark = tone === 'dark'
  const w = size === 'lg' ? 'w-14' : 'w-10'
  return (
    <div
      role="radiogroup"
      aria-label={t.ui.language}
      className={`relative inline-flex items-center rounded-full border p-1 ${dark ? 'border-ink/15 bg-paper/70 backdrop-blur' : 'border-paper/20'} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`absolute bottom-1 left-1 top-1 rounded-full transition-transform duration-500 ease-snap ${w} ${dark ? 'bg-ink' : 'bg-paper'} ${lang === 'de' ? 'translate-x-full' : ''}`}
      />
      {['en', 'de'].map((l) => (
        <button
          key={l}
          type="button"
          role="radio"
          aria-checked={lang === l}
          aria-label={NAMES[l]}
          title={NAMES[l]}
          onClick={() => setLang(l)}
          className={`caption relative z-10 rounded-full text-center transition-colors duration-500 ${w} ${size === 'lg' ? 'py-2 text-[13px]' : 'py-1.5 text-[11px]'} ${
            lang === l ? (dark ? 'text-paper' : 'text-ink') : dark ? 'text-taupe hover:text-ink' : 'text-stone hover:text-paper'
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
