import { useLayoutEffect, useRef, useState } from 'react'
import { useLang } from '../i18n'
import { gsap, introDelay } from '../lib/motion'
import { pathFor } from '../lib/router'
import { prefersReducedMotion } from '../lib/useCanvas'
import { FlipChars, FlipText, Reveal, RevealTitle, Scramble, ScrubWords, TypedWord } from './fx'
import HeroLogo3D from './visuals/HeroLogo3D'
import { Button, Chevron } from './ui'

/* ------------------------------------------------------------------ Hero */

function HeroFoot({ t }) {
  const stack = [...t.hero.stack, ...t.hero.stack]
  return (
    <div data-hero-in className="container-x pointer-events-auto relative flex items-center gap-6 pb-8">
      <p className="caption hidden shrink-0 text-[11px] text-taupe lg:block">{t.hero.offices.join(' · ')}</p>
      <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <ul className="flex w-max animate-marquee items-center gap-16 py-3 hover:[animation-play-state:paused]" aria-label={t.ui.tech}>
          {stack.map((s, i) => (
            <li key={i} aria-hidden={i >= t.hero.stack.length} className="whitespace-nowrap text-[15px] font-semibold tracking-tight text-taupe transition-colors hover:text-ink">
              <Scramble text={s} />
            </li>
          ))}
        </ul>
      </div>
      <a
        href="#manifesto"
        aria-label={t.ui.scrollNext}
        className="group relative hidden h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-stone text-taupe transition-colors hover:border-ink hover:bg-ink hover:text-paper sm:flex"
      >
        <Chevron className="h-3 w-3 rotate-90 transition-transform duration-500 ease-snap group-hover:translate-y-8" />
        <Chevron className="absolute h-3 w-3 -translate-y-8 rotate-90 transition-transform duration-500 ease-snap group-hover:translate-y-0" />
      </a>
    </div>
  )
}

const HERO_PIN = '+=90%' // how long the hero holds while the logo breaks apart

export function Hero() {
  const { t, lang } = useLang()
  const root = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-in]', { y: 28, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: 0.1, delay: introDelay() + 0.55 })
      // hold the hero full screen while the logo breaks apart; the copy drifts up and fades with it
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: HERO_PIN, pin: true, scrub: true, anticipatePin: 1 } })
        .to('[data-hero-copy]', { y: -80, opacity: 0, ease: 'none' }, 0.25)
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="top" ref={root} className="relative flex h-[100svh] min-h-[620px] flex-col overflow-hidden bg-paper">
      {/* full-screen particle logo: KDL. ⇄ KlarDataLabs. */}
      <HeroLogo3D scrollEnd={HERO_PIN} />

      <div data-hero-copy className="container-x pointer-events-none relative grid flex-1 items-end pb-10 pt-[42vh] lg:grid-cols-12 lg:items-center lg:pt-28">
        <div className="lg:col-span-6">
          <p data-hero-in className="caption mb-8 flex items-center gap-3 text-taupe">
            <span className="h-px w-8 bg-stone" />
            <Scramble text={t.hero.eyebrow} />
          </p>
          <h1 aria-label={t.hero.title} className="pointer-events-auto font-serif text-[clamp(2.5rem,5.2vw,5rem)] leading-[1.02] tracking-[-0.015em]">
            <FlipChars as="span" text={t.hero.lead} delay={introDelay() + 0.15} className="block" />
            <TypedWord words={t.hero.words} delay={introDelay() + 1.1} className="block whitespace-nowrap text-taupe" />
          </h1>
          <p data-hero-in className="mt-8 max-w-md text-[17px] leading-relaxed text-ink/75 lg:text-lg">
            {t.hero.body}
          </p>
          <div data-hero-in className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4">
            <Button href={pathFor('contact', lang)}>{t.ui.letsTalk}</Button>
            <Button href="#services" variant="outline">
              {t.ui.explore}
            </Button>
          </div>
        </div>
      </div>
      <div data-hero-copy className="relative">
        <HeroFoot t={t} />
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- Statement */

function GridLines() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="container-x grid h-full grid-cols-4 lg:grid-cols-12">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className={`border-l border-ink/[0.05] ${i === 11 ? 'border-r' : ''} ${i >= 4 ? 'hidden lg:block' : ''} ${i === 3 ? 'border-r lg:border-r-0' : ''}`} />
        ))}
      </div>
    </div>
  )
}

const PILLAR_TONES = ['bg-card text-ink', 'bg-ink text-paper', 'bg-sand text-ink']

export function Statement() {
  const { t, lang } = useLang()
  const list = useRef(null)

  // animated stacked cards: the pillars start piled on top of each other and fan out, scaling up, as you scroll in
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const mm = gsap.matchMedia(list)
    mm.add('(min-width: 768px)', () => {
      const cards = gsap.utils.toArray(list.current.children)
      gsap.fromTo(
        cards,
        {
          x: (i, el) => (1 - i) * (el.offsetWidth + 16),
          y: (i) => (i - 1) * 22,
          rotate: (i) => (i - 1) * -5,
          scale: 0.84,
        },
        {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: list.current, start: 'top 88%', end: 'top 32%', scrub: 1, invalidateOnRefresh: true },
        },
      )
    })
    mm.add('(max-width: 767px)', () => {
      gsap.utils.toArray(list.current.children).forEach((card) =>
        gsap.from(card, { y: 80, scale: 0.9, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: card, start: 'top 90%' } }),
      )
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="manifesto" className="relative overflow-hidden py-28 lg:py-44">
      <GridLines />
      <div className="container-x relative">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Reveal as="p" className="caption">
            {t.statement.caption}
          </Reveal>
          <Reveal>
            <Button href={pathFor('contact', lang)}>{t.ui.startConversation}</Button>
          </Reveal>
        </div>

        <ScrubWords text={t.statement.text} className="mt-14 max-w-[36ch] font-serif text-[clamp(1.8rem,3.3vw,3.2rem)] leading-[1.14] tracking-[-0.012em]" />

        <ol ref={list} className="mt-24 grid gap-4 md:grid-cols-3 lg:mt-32">
          {t.statement.pillars.map((p, i) => (
            <li
              key={p.title}
              style={{ zIndex: 3 - i }}
              className={`group relative flex min-h-[300px] flex-col rounded-2xl p-8 shadow-[0_40px_80px_-50px_rgba(6,20,27,0.5)] will-change-transform lg:min-h-[360px] lg:p-10 ${PILLAR_TONES[i % 3]}`}
            >
              <span className={`caption ${i === 1 ? 'text-paper/50' : 'text-taupe'}`}>0{i + 1}</span>
              <h3 className="mt-auto font-serif text-[2.6rem] leading-none lg:text-[3rem]">
                <FlipText text={p.title} />
              </h3>
              <p className={`mt-4 max-w-xs leading-relaxed ${i === 1 ? 'text-paper/70' : 'text-ink/75'}`}>{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* -------------------------------------------- Approach: expandable cards */

export function Approach() {
  const { t } = useLang()
  const [active, setActive] = useState(0)
  const list = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from(list.current.children, { y: 60, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: list.current, start: 'top 82%' } })
    }, list)
    return () => ctx.revert()
  }, [])

  return (
    <section id="approach" className="relative bg-sand/60 py-28 lg:py-40">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal as="p" className="caption">
              {t.approach.caption}
            </Reveal>
            <RevealTitle text={t.approach.title} className="mt-6 font-serif text-[clamp(2.4rem,4vw,3.8rem)] font-normal leading-[1.05]" />
            <Reveal as="p" delay={100} className="mt-6 max-w-sm leading-relaxed text-ink/80">
              {t.approach.body}
            </Reveal>
          </div>
        </div>

        {/* vertically stacked cards — the one you hover (or tap) grows and opens */}
        <ol ref={list} className="flex flex-col gap-3 lg:col-span-7">
          {t.approach.steps.map((s, i) => {
            const on = active === i
            return (
              <li key={s.title}>
                <button
                  type="button"
                  aria-expanded={on}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`w-full rounded-2xl px-6 text-left transition-[background-color,color,padding,box-shadow,transform] duration-700 ease-snap lg:px-9 ${
                    on ? 'scale-[1.015] bg-ink py-9 text-paper shadow-[0_40px_80px_-40px_rgba(6,20,27,0.55)] lg:py-11' : 'bg-card py-6 text-ink hover:bg-paper'
                  }`}
                >
                  <span className="flex items-center justify-between gap-6">
                    <span className="flex items-baseline gap-5">
                      <span className={`caption transition-colors duration-700 ${on ? 'text-paper/50' : 'text-taupe'}`}>
                        {t.ui.step} 0{i + 1}
                      </span>
                      <span className="font-serif text-[clamp(1.5rem,2.4vw,2.2rem)] leading-tight">{s.title}</span>
                    </span>
                    <span aria-hidden="true" className={`relative h-4 w-4 shrink-0 transition-transform duration-700 ease-snap ${on ? 'rotate-45' : ''}`}>
                      <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
                      <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current" />
                    </span>
                  </span>
                  <span className={`grid transition-[grid-template-rows,opacity] duration-700 ease-snap ${on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <span className="block overflow-hidden">
                      <span className="flex items-end justify-between gap-8 pt-8">
                        <span className="block max-w-md leading-relaxed text-paper/70">{s.body}</span>
                        <span aria-hidden="true" className="font-serif text-[clamp(4.5rem,8vw,7.5rem)] leading-[0.8] text-paper/10">
                          0{i + 1}
                        </span>
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
