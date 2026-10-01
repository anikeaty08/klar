import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, INTRO_DELAY, lockScroll } from '../lib/motion'
import { prefersReducedMotion } from '../lib/useCanvas'
import { DotWord, KlarMark } from './Logo'

/** Intro: the K assembles from its dots while a counter runs, then the curtain lifts. */
export default function Loader() {
  const root = useRef(null)
  const count = useRef(null)
  const [done, setDone] = useState(() => prefersReducedMotion())

  useLayoutEffect(() => {
    if (done) return
    lockScroll(true)
    const counter = { v: 0 }
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          onComplete: () => {
            lockScroll(false)
            setDone(true)
          },
        })
        .to(counter, {
          v: 100,
          duration: INTRO_DELAY - 0.5,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
          },
        })
        .to('[data-loader-inner]', { y: -30, opacity: 0, duration: 0.4, ease: 'power2.in' })
        .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' }, '-=0.15')
    }, root)
    return () => ctx.revert()
  }, [done])

  if (done) return null
  return (
    <div ref={root} className="fixed inset-0 z-[300] flex items-center justify-center bg-paper [clip-path:inset(0_0_0%_0)]" aria-hidden="true">
      <div data-loader-inner className="flex flex-col items-center gap-6 text-ink">
        <KlarMark className="h-20 w-20" intro interactive={false} />
        <DotWord className="h-4" intro interactive={false} />
        <span className="caption tabular-nums text-taupe">
          <span ref={count}>000</span>
        </span>
      </div>
    </div>
  )
}
