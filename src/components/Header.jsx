import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { LangToggle, useLang } from '../i18n'
import { links } from '../i18n/links'
import { gsap, lockScroll } from '../lib/motion'
import { followLink, localHref, pathFor } from '../lib/router'
import { prefersReducedMotion } from '../lib/useCanvas'
import { FlipText } from './fx'
import { Wordmark } from './Logo'
import { Button } from './ui'

function MenuDots({ open }) {
  return (
    <span className="grid grid-cols-3 gap-[3px]" aria-hidden="true">
      {Array.from({ length: 6 }, (_, i) => (
        <span
          key={i}
          className={`h-[6px] w-[6px] rounded-full transition-[transform,background-color] duration-500 ease-snap ${open ? (i % 2 ? 'scale-0 bg-taupe' : 'scale-110 bg-ink') : 'bg-taupe group-hover:bg-ink'}`}
          style={{ transitionDelay: `${i * 30}ms` }}
        />
      ))}
    </span>
  )
}

export default function Header() {
  const { t, lang } = useLang()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const lastY = useRef(0)
  const panel = useRef(null)
  const tl = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > 200 && y > lastY.current)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // menu open/close timeline: panel wipes down, items rise with a 3D tip
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(panel.current, { clipPath: 'inset(0 0 100% 0)', visibility: 'hidden' })
      tl.current = gsap
        .timeline({ paused: true })
        .set(panel.current, { visibility: 'visible' })
        .to(panel.current, { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'expo.inOut' })
        .from('[data-menu-item]', { yPercent: 120, rotateX: -60, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.06, transformOrigin: '50% 100%' }, '-=0.35')
        .from('[data-menu-foot]', { opacity: 0, y: 20, duration: 0.6 }, '-=0.6')
    }, panel)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    lockScroll(open)
    if (open) tl.current?.timeScale(prefersReducedMotion() ? 10 : 1).play()
    else tl.current?.timeScale(prefersReducedMotion() ? 10 : 1.6).reverse()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // close the menu first, then scroll / change page once the panel has wiped away
  const fromMenu = (e, href) => {
    e.preventDefault()
    setOpen(false)
    setTimeout(() => followLink(href), 450)
  }

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[70] transition-transform duration-500 ease-snap ${hidden && !open ? '-translate-y-full' : ''}`}>
        <div aria-hidden="true" className={`absolute inset-0 bg-paper/85 backdrop-blur-md transition-opacity duration-500 ${scrolled && !open ? 'opacity-100' : 'opacity-0'}`} />
        <div className="container-x relative flex items-center justify-between py-5 lg:py-7">
          <a href={`${pathFor('home', lang)}#top`} aria-label={t.ui.home} onClick={() => setOpen(false)}>
            <Wordmark />
          </a>
          {/* menu button in the centre (beside the toggle on phones); language toggle last */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? t.ui.menuClose : t.ui.menuOpen}
              className="group flex h-11 w-11 items-center justify-center sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
            >
              <MenuDots open={open} />
            </button>
            <LangToggle />
          </div>
        </div>
      </header>

      <div ref={panel} id="site-menu" className="fixed inset-0 z-[60] flex flex-col bg-paper" aria-hidden={!open}>
        <nav aria-label="Main" className="container-x flex flex-1 flex-col justify-center pt-24">
          <ul className="[perspective:1000px]">
            {t.menu.map((m, i) => {
              const href = localHref(m.href, lang)
              return (
                <li key={m.href} data-menu-item className="border-b border-ink/10">
                  <a
                    href={href}
                    tabIndex={open ? 0 : -1}
                    onClick={(e) => fromMenu(e, href)}
                    className="group flex items-baseline justify-between py-5 font-serif text-[clamp(2rem,5.5vw,4.25rem)] leading-none text-ink"
                  >
                    <FlipText text={m.label} stagger={14} />
                    <span className="caption text-taupe transition-transform duration-500 ease-snap group-hover:-translate-x-3">0{i + 1}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
        <div data-menu-foot className="container-x flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-6">
            <LangToggle size="lg" />
            <a href={`mailto:${links.email}`} tabIndex={open ? 0 : -1} className="text-taupe hover:text-ink">
              {links.email}
            </a>
          </div>
          <Button href={pathFor('contact', lang)} tabIndex={open ? 0 : -1} onClick={(e) => fromMenu(e, pathFor('contact', lang))}>
            {t.ui.contactUs}
          </Button>
        </div>
      </div>
    </>
  )
}
