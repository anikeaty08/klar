import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLang } from '../i18n'
import { gsap } from '../lib/motion'
import { prefersReducedMotion } from '../lib/useCanvas'
import { FlipChars, FlipText, Reveal } from './fx'

const pad = (n) => String(n).padStart(2, '0')

function useItems() {
  const { t } = useLang()
  return t.projects.items.map((p, i) => ({ ...p, n: i + 1 }))
}

function Header({ count }) {
  const { t } = useLang()
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <Reveal as="p" className="caption">
          {t.projects.caption}
        </Reveal>
        <FlipChars as="h2" text={t.projects.title} onScroll className="mt-6 font-serif text-[clamp(2.6rem,5vw,4.6rem)] font-normal leading-[1.02] tracking-[-0.015em]" />
        <Reveal as="p" delay={100} className="mt-6 max-w-md leading-relaxed text-ink/75">
          {t.projects.body}
        </Reveal>
      </div>
      <p className="caption tabular-nums text-taupe">{pad(count)}</p>
    </div>
  )
}

/*
 * Projects: One project per card, all light; each sticks a little lower than the last and
 * the ones underneath ease back slightly — no dark dimming, just thin peeking edges. */

export default function Projects() {
  const items = useItems()
  const root = useRef(null)
  const [lg, setLg] = useState(() => window.matchMedia('(min-width: 1024px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const on = () => setLg(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  const top = (i) => window.innerHeight * 0.16 + i * (lg ? 10 : 6)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray('[data-sheet]')
      const last = els[els.length - 1]
      els.forEach((el, i) => {
        if (el === last) return
        gsap.to(el.firstElementChild, {
          scale: 0.94,
          transformOrigin: '50% 0%',
          ease: 'none',
          scrollTrigger: { trigger: els[i + 1], start: 'top bottom', end: () => `top top+=${top(i + 1)}`, scrub: true, invalidateOnRefresh: true },
        })
      })
    }, root)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lg])

  return (
    <section id="projects" ref={root} className="container-x py-28 lg:py-40">
      <Header count={items.length} />
      <ol className="mt-16 pb-[12vh]">
        {items.map((p, i) => (
          <li key={p.n} data-sheet className="sticky mb-8 last:mb-0" style={{ top: `calc(16vh + ${i * (lg ? 10 : 6)}px)` }}>
            <div className="group grid min-h-[min(44vh,380px)] gap-8 rounded-2xl border border-ink/10 bg-card p-8 shadow-[0_-24px_50px_-40px_rgba(6,20,27,0.35)] will-change-transform lg:grid-cols-12 lg:p-12">
              <div className="flex flex-col lg:col-span-5">
                <span className="caption text-[11px] text-taupe">{p.area}</span>
                <span aria-hidden="true" className="mt-auto font-serif text-[clamp(5rem,10vw,9rem)] leading-[0.8] text-ink/[0.08]">
                  {pad(p.n)}
                </span>
              </div>
              <div className="flex flex-col justify-end lg:col-span-6 lg:col-start-7">
                <h3 className="font-serif text-[clamp(2rem,3.4vw,3.2rem)] leading-[1.05]">
                  <FlipText text={p.title} stagger={14} />
                </h3>
                <p className="mt-4 max-w-md text-[16px] leading-relaxed text-taupe">{p.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
