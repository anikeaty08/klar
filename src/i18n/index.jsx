import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Chevron } from '../components/ui'
import { langFromPath, navigate, pageFromPath, pathFor } from '../lib/router'
import en from './en'

/*
 * EN is the default and ships in the main bundle; DE, FR and IT are separate chunks,
 * each downloaded only when someone picks that language (or opens a /de, /fr, /it link).
 */

const LangContext = createContext(null)
const STORE_KEY = 'kdl-lang'
export const LANGS = ['en', 'de', 'fr', 'it']
const NAMES = { en: 'English', de: 'Deutsch', fr: 'Français', it: 'Italiano' }
const BUNDLES = { de: () => import('./de.js'), fr: () => import('./fr.js'), it: () => import('./it.js') }
const known = (l) => (LANGS.includes(l) ? l : 'en')

function initialLang() {
  const fromPath = langFromPath()
  if (fromPath) return fromPath
  try {
    return known(localStorage.getItem(STORE_KEY))
  } catch {
    return 'en'
  }
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(initialLang)
  const [content, setContent] = useState(() => (initialLang() === 'en' ? en : null))

  useEffect(() => {
    let alive = true
    if (lang === 'en') setContent(en)
    else BUNDLES[lang]().then((m) => alive && setContent(m.default))
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORE_KEY, lang)
    } catch {
      // storage can be unavailable (private mode); the URL still carries the language
    }
    // keep the URL's language prefix in step with the chosen language
    const want = pathFor(pageFromPath(), lang) + window.location.hash
    if (window.location.pathname + window.location.hash !== want) navigate(want, { replace: true })
    return () => {
      alive = false
    }
  }, [lang])

  const setLang = useCallback((next) => setLangState(known(next)), [])

  return content && <LangContext.Provider value={{ lang: content.lang, t: content, setLang }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)

/** Close a popover on outside press, Escape or scroll. */
function useDismiss(open, setOpen, root, trigger) {
  useEffect(() => {
    if (!open) return
    const onDown = (e) => !root.current?.contains(e.target) && setOpen(false)
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      trigger.current?.focus()
    }
    const onScroll = () => setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
    }
  }, [open, setOpen, root, trigger])
}

/**
 * Header language menu: a compact "EN" pill that opens the four languages, each in
 * its own name; the current one carries the red full stop.
 */
export function LangMenu({ className = '' }) {
  const { lang, setLang, t } = useLang()
  const [open, setOpen] = useState(false)
  const root = useRef(null)
  const trigger = useRef(null)
  const list = useRef(null)
  useDismiss(open, setOpen, root, trigger)

  // move into the list when it opens, starting on the current language
  useEffect(() => {
    if (open) list.current?.querySelector('[aria-current="true"]')?.focus()
  }, [open])

  const onListKey = (e) => {
    const keys = { ArrowDown: 1, ArrowUp: -1 }
    if (!(e.key in keys)) return
    e.preventDefault()
    const items = [...list.current.querySelectorAll('button')]
    const i = items.indexOf(document.activeElement)
    items[(i + keys[e.key] + items.length) % items.length].focus()
  }

  const pick = (l) => {
    setOpen(false)
    setLang(l)
  }

  return (
    <div ref={root} className={`relative ${className}`}>
      <button
        ref={trigger}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="lang-menu"
        aria-label={`${t.ui.language}: ${NAMES[lang]}`}
        onClick={() => setOpen((v) => !v)}
        className="caption flex h-9 items-center gap-2 rounded-full border border-ink/15 bg-paper/70 pl-3.5 pr-3 text-[11px] text-ink backdrop-blur transition-colors duration-300 hover:border-ink/40"
      >
        {lang.toUpperCase()}
        <Chevron className={`h-2.5 w-2.5 transition-transform duration-300 ease-snap ${open ? '-rotate-90' : 'rotate-90'}`} />
      </button>
      <ul
        ref={list}
        id="lang-menu"
        aria-label={t.ui.language}
        onKeyDown={onListKey}
        className={`absolute right-0 top-full mt-2 w-48 origin-top-right rounded-2xl border border-ink/10 bg-paper p-1.5 shadow-[0_24px_60px_-24px_rgba(6,20,27,0.4)] duration-300 ease-snap ${
          // visibility flips at once on open (so the items can take focus) and only after the fade on close
          open ? 'visible translate-y-0 scale-100 opacity-100 transition-[opacity,transform]' : 'invisible -translate-y-1 scale-95 opacity-0 transition-[opacity,transform,visibility]'
        }`}
      >
        {LANGS.map((l) => (
          <li key={l}>
            <button
              type="button"
              lang={l}
              aria-current={lang === l}
              tabIndex={open ? 0 : -1}
              onClick={() => pick(l)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors duration-200 hover:bg-sand focus-visible:bg-sand ${lang === l ? 'bg-sand/60' : ''}`}
            >
              <span className="font-serif text-[17px] leading-none text-ink">
                {NAMES[l]}
                {lang === l && <span className="text-klar">.</span>}
              </span>
              <span className="caption text-[10px] text-taupe">{l.toUpperCase()}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const SHIFT = ['translate-x-0', 'translate-x-full', 'translate-x-[200%]', 'translate-x-[300%]']

/**
 * EN · DE · FR · IT pill for the roomier spots (the menu, the footer): an indicator
 * slides under the active language. tone "dark" sits on paper, "light" on the ink
 * footer; size "lg" for the menu.
 */
export function LangToggle({ tone = 'dark', size = 'sm', className = '' }) {
  const { lang, setLang, t } = useLang()
  const dark = tone === 'dark'
  const w = size === 'lg' ? 'w-14' : 'w-11'
  return (
    <div
      role="group"
      aria-label={t.ui.language}
      className={`relative inline-flex items-center rounded-full border p-1 ${dark ? 'border-ink/15 bg-paper/70 backdrop-blur' : 'border-paper/20'} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`absolute bottom-1 left-1 top-1 rounded-full transition-transform duration-500 ease-snap ${w} ${dark ? 'bg-ink' : 'bg-paper'} ${SHIFT[LANGS.indexOf(lang)]}`}
      />
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-pressed={lang === l}
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
