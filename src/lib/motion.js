import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import Lenis from 'lenis'
import { prefersReducedMotion } from './useCanvas'

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin)

export { gsap, ScrollTrigger }

let lenis = null

/** Smooth scrolling driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return lenis
  lenis = new Lenis({ duration: 1.15, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export const getLenis = () => lenis

/** Seconds the intro loader covers the page; hero animations start after it. */
export const INTRO_DELAY = prefersReducedMotion() ? 0 : 1.6

// after the first visit's intro, remounts (e.g. a language switch) animate in right away
let introDone = prefersReducedMotion()
export const markIntroDone = () => {
  introDone = true
}
export const introDelay = () => (introDone ? 0.1 : INTRO_DELAY)
export const isIntroDone = () => introDone

export function lockScroll(locked) {
  if (lenis) locked ? lenis.stop() : lenis.start()
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

/**
 * Scroll to an in-page anchor, through Lenis when it's running.
 * Pinned sections are wrapped in a GSAP pin-spacer whose own top is the real
 * position to scroll to — scrolling to the pinned element itself would land
 * partway through its pin (that's what left the hero faded after "Back to top").
 */
export function goTo(hash, { immediate = false } = {}) {
  let top = 0
  if (hash && hash !== '#top') {
    const el = document.querySelector(hash)
    if (!el) return
    const target = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el
    top = target.getBoundingClientRect().top + window.scrollY
  }
  if (lenis) {
    lenis.start()
    lenis.resize() // the page may have just changed height (e.g. coming from /contact)
    lenis.scrollTo(top, { duration: immediate ? 0 : 1.4, immediate, force: true })
  } else {
    window.scrollTo({ top, behavior: immediate || prefersReducedMotion() ? 'auto' : 'smooth' })
  }
}
