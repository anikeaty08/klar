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
