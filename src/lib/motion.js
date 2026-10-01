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
  lenis = new Lenis({ duration: 1.15, anchors: { offset: 0 }, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export const getLenis = () => lenis

/** Seconds the intro loader covers the page; hero animations start after it. */
export const INTRO_DELAY = prefersReducedMotion() ? 0 : 1.6

export function lockScroll(locked) {
  if (lenis) locked ? lenis.stop() : lenis.start()
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

/** Scroll to an in-page anchor, through Lenis when it's running. */
export function goTo(hash) {
  const el = document.querySelector(hash)
  if (!el) return
  if (lenis) {
    lenis.start()
    lenis.scrollTo(el, { duration: 1.4 })
  } else {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }
}
