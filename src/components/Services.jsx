import { useLayoutEffect, useRef } from 'react'
import { useLang } from '../i18n'
import { gsap } from '../lib/motion'
import { prefersReducedMotion } from '../lib/useCanvas'
import { FlipChars, FlipText } from './fx'

function SubList({ stage, index, dark = false, compact = false }) {
  return (
    <ul className={`border-t ${dark ? 'border-paper/15' : 'border-ink/15'}`}>
      {stage.cards.map((c, ci) => (
        <li key={c.title} className={`group grid grid-cols-[3.2rem_1fr] gap-x-3 border-b ${compact ? 'py-3' : 'py-5'} ${dark ? 'border-paper/10' : 'border-ink/15'}`}>
          <span className={`caption pt-1.5 text-[11px] ${dark ? 'text-paper/50' : 'text-taupe'}`}>
            0{index + 1}.{ci + 1}
          </span>
          <div>
            <h4 className={`font-serif leading-tight ${compact ? 'text-[1.1rem]' : 'text-[1.35rem] lg:text-[1.55rem]'}`}>
              <FlipText text={c.title} stagger={10} />
            </h4>
            <p className={`mt-1 max-w-lg leading-relaxed ${compact ? 'line-clamp-2 text-[12.5px]' : 'text-[14.5px]'} ${dark ? 'text-paper/65' : 'text-taupe'}`}>{c.body}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

/*
 * Services: Full-bleed panels, one per practice, wipe up over each other; the panel
 * underneath eases back as the next one arrives. */

const CURTAIN_TONES = [
  { box: 'bg-ink text-paper', dark: true },
  { box: 'bg-sand text-ink', dark: false },
  { box: 'bg-umber text-paper', dark: true },
  { box: 'bg-card text-ink', dark: false },
]

export default function Services() {
  const { t } = useLang()
  const { stages } = t.services
  const root = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('[data-curtain]')
      gsap.set(panels.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' })
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root.current, pin: true, start: 'top top', end: () => `+=${window.innerHeight * (stages.length - 1)}`, scrub: 0.8 },
      })
      panels.slice(1).forEach((p, i) => {
        tl.to(p, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 }, i)
          .from(p.querySelector('[data-curtain-inner]'), { yPercent: 18, duration: 1 }, i)
          .to(panels[i].querySelector('[data-curtain-inner]'), { scale: 0.92, opacity: 0.35, duration: 1 }, i)
      })
    }, root)
    return () => ctx.revert()
  }, [stages.length])

  return (
    <section id="services" ref={root} className="relative h-[100svh] overflow-hidden">
      {stages.map((s, i) => {
        const tone = CURTAIN_TONES[i % 4]
        return (
          <div key={s.name} data-curtain className={`absolute inset-0 ${tone.box}`}>
            <div data-curtain-inner className="container-x grid h-full content-center gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-6">
                <p className={`caption ${tone.dark ? 'text-paper/55' : 'text-taupe'}`}>
                  {t.services.caption} · 0{i + 1}/0{stages.length}
                </p>
                <FlipChars as="h3" text={s.name} onScroll className="mt-6 font-serif text-[clamp(3rem,7vw,7rem)] leading-[0.95] tracking-[-0.02em]" />
                <p className={`mt-6 max-w-md text-[16px] leading-relaxed ${tone.dark ? 'text-paper/70' : 'text-ink/70'}`}>{s.body}</p>
              </div>
              <div className="lg:col-span-5 lg:col-start-8">
                <SubList stage={s} index={i} dark={tone.dark} compact />
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}

/*
 * Services, scroll deck: pinned; the practices are a stack of cards and each
 * stretch of scrolling flings the top card off (alternating sides) while the
 * next one comes forward. No clicking needed.
 */

const depthStyle = (d) => ({ y: d * 16, scale: 1 - d * 0.05, rotate: d === 0 ? 0 : (d % 2 ? 2.5 : -2.5) * d, opacity: d > 2 ? 0 : 1 })

export function ServicesScrollDeck() {
  const { t } = useLang()
  const { stages } = t.services
  const n = stages.length
  const root = useRef(null)
  const deck = useRef(null)
  const name = useRef(null)
  const count = useRef(null)

  useLayoutEffect(() => {
    const cards = gsap.utils.toArray(deck.current.children)
    cards.forEach((c, d) => gsap.set(c, { zIndex: n - d, ...depthStyle(d) }))
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: root.current,
          pin: true,
          start: 'top top',
          end: () => `+=${window.innerHeight * 0.9 * (n - 1)}`,
          scrub: 0.8,
          snap: { snapTo: 1 / (n - 1), duration: 0.5, ease: 'power2.inOut' },
          onUpdate: (self) => {
            const i = Math.min(n - 1, Math.round(self.progress * (n - 1)))
            if (name.current && name.current.dataset.i !== String(i)) {
              name.current.dataset.i = i
              name.current.textContent = stages[i].name
              gsap.fromTo(name.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'expo.out' })
            }
            if (count.current) count.current.textContent = `0${i + 1}`
          },
        },
      })
      for (let i = 0; i < n - 1; i++) {
        const dir = i % 2 ? -1 : 1
        tl.to(cards[i], { x: () => dir * window.innerWidth * 0.75, y: -60, rotate: dir * 22, opacity: 0, duration: 1 }, i)
        cards.slice(i + 1).forEach((c, k) => tl.to(c, { ...depthStyle(k), duration: 1 }, i))
      }
    }, root)
    return () => ctx.revert()
  }, [n, stages])

  return (
    <section id="services" ref={root} className="overflow-hidden">
      <div className="container-x grid h-[100svh] content-center gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-4">
          <p className="caption">{t.services.caption}</p>
          <p ref={name} data-i="0" className="mt-4 font-serif text-[clamp(1.9rem,3.4vw,3rem)] leading-tight lg:mt-6">
            {stages[0].name}
          </p>
          <p className="caption mt-3 tabular-nums text-taupe lg:mt-4">
            <span ref={count}>01</span> / 0{n}
          </p>
          <p className="caption mt-6 hidden text-[11px] text-taupe lg:block">Scroll to deal the next card ↓</p>
        </div>
        <div ref={deck} className="relative mx-auto h-[min(62svh,560px)] w-full max-w-[560px] lg:col-span-7 lg:col-start-6">
          {stages.map((s, i) => {
            const dark = i % 2 === 0
            return (
              <article
                key={s.name}
                className={`absolute inset-0 flex flex-col overflow-hidden rounded-2xl p-6 shadow-[0_40px_80px_-40px_rgba(6,20,27,0.5)] will-change-transform lg:p-9 ${dark ? 'bg-ink text-paper' : 'bg-card text-ink'}`}
              >
                <span className={`caption text-[11px] ${dark ? 'text-paper/50' : 'text-taupe'}`}>0{i + 1}</span>
                <FlipChars as="h3" text={s.name} onScroll className="mt-3 font-serif text-[clamp(1.7rem,3vw,2.6rem)] leading-tight" />
                <p className={`mt-3 line-clamp-3 text-[14px] leading-relaxed ${dark ? 'text-paper/70' : 'text-ink/70'}`}>{s.body}</p>
                <div className="mt-auto pt-4">
                  <SubList stage={s} index={i} dark={dark} compact />
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
