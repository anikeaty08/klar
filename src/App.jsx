import { useEffect, useRef } from 'react'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Header from './components/Header'
import Projects from './components/Projects'
import { Approach, Hero, Statement } from './components/Sections'
import Services, { ServicesScrollDeck } from './components/Services'
import { ScrollProgress } from './components/ui'
import { useLang } from './i18n'
import { getLenis, goTo, initSmoothScroll, INTRO_DELAY, ScrollTrigger } from './lib/motion'
import { followLink, usePage } from './lib/router'

// compare Services treatments: /?services=deck shows the scroll deck instead of the curtain
const ServicesSection = new URLSearchParams(window.location.search).get('services') === 'deck' ? ServicesScrollDeck : Services

export default function App() {
  const page = usePage()
  const { t, lang } = useLang()
  const prev = useRef(null)

  useEffect(() => {
    initSmoothScroll()
    // fonts change line lengths; re-measure scroll triggers once they're in
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  // one handler for every internal link: smooth in-page scrolling, page changes without reloads
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target.closest('a[href]')
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return
      const url = new URL(a.href, window.location.href)
      if (url.origin !== window.location.origin || url.pathname.startsWith('/api/')) return
      e.preventDefault()
      followLink(url.pathname + url.hash)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  // title + description per page and language
  useEffect(() => {
    document.title = page === 'contact' ? t.meta.contactTitle : t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [page, t])

  // after a page or language change: re-measure, then land in the right place
  useEffect(() => {
    const was = prev.current
    prev.current = { page, lang }
    const y = window.scrollY
    if (!was) {
      // first load: honour a #hash once the intro has finished
      if (window.location.hash) setTimeout(() => goTo(window.location.hash), INTRO_DELAY * 1000 + 200)
      return
    }
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      if (was.page === page) {
        // language switch: stay where you were
        getLenis() ? getLenis().scrollTo(y, { immediate: true }) : window.scrollTo(0, y)
      } else {
        goTo(window.location.hash || '#top', { immediate: !window.location.hash })
      }
    })
  }, [page, lang])

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[400] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
        Skip to content
      </a>
      {/* keys remount the tree on page/language change so every animation re-measures its new text */}
      <Header key={`header-${lang}`} />
      <main key={`${page}-${lang}`} id="main" className="relative z-10 rounded-b-[28px] bg-paper shadow-[0_40px_80px_-40px_rgba(6,20,27,0.35)]">
        {page === 'contact' ? (
          <Contact />
        ) : (
          <>
            <Hero />
            <Statement />
            <ServicesSection />
            <Approach />
            <Projects />
          </>
        )}
      </main>
      <Footer key={`footer-${page}-${lang}`} compact={page === 'contact'} />
      <ScrollProgress />
    </>
  )
}
