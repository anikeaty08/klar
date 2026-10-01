import { useLayoutEffect, useRef } from 'react'
import { approach, hero, insights, links, services, solutions, statement } from '../data/content'
import { gsap, INTRO_DELAY } from '../lib/motion'
import { prefersReducedMotion } from '../lib/useCanvas'
import { FlipChars, FlipText, Reveal, RevealTitle, Scramble, ScrubWords, TypedWord } from './fx'
import HeroLogo3D from './visuals/HeroLogo3D'
import { Constellation, DotGlyph } from './visuals/Visuals'
import { Button, Chevron, CircleArrow, TextLink } from './ui'

/* ------------------------------------------------------------------ Hero */

function HeroFoot({ stack }) {
  return (
    <div data-hero-in className="container-x pointer-events-auto relative flex items-center gap-6 pb-8">
      <p className="caption hidden shrink-0 text-[11px] text-taupe lg:block">{hero.offices.join(' · ')}</p>
      <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <ul className="flex w-max animate-marquee items-center gap-16 py-3 hover:[animation-play-state:paused]" aria-label="Technologies we work with">
          {stack.map((s, i) => (
            <li key={i} aria-hidden={i >= hero.stack.length} className="whitespace-nowrap text-[15px] font-semibold tracking-tight text-taupe transition-colors hover:text-ink">
              <Scramble text={s} />
            </li>
          ))}
        </ul>
      </div>
      <a
        href="#manifesto"
        aria-label="Scroll to next section"
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
  const stack = [...hero.stack, ...hero.stack]
  const root = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-in]', { y: 28, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: 0.1, delay: INTRO_DELAY + 0.55 })
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
            <Scramble text={hero.eyebrow} />
          </p>
          <h1 aria-label={hero.title} className="pointer-events-auto font-serif text-[clamp(2.5rem,5.2vw,5rem)] leading-[1.02] tracking-[-0.015em]">
            <FlipChars as="span" text={hero.lead} delay={INTRO_DELAY + 0.15} className="block" />
            <TypedWord words={hero.words} delay={INTRO_DELAY + 1.1} className="block whitespace-nowrap text-taupe" />
          </h1>
          <p data-hero-in className="mt-8 max-w-md text-[17px] leading-relaxed text-ink/75 lg:text-lg">
            {hero.body}
          </p>
          <div data-hero-in className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4">
            <Button href={links.booking} external>
              Book a free consultation
            </Button>
            <Button href="#services" variant="outline">
              Explore services
            </Button>
          </div>
        </div>
      </div>
      <div data-hero-copy className="relative">
        <HeroFoot stack={stack} />
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

export function Statement() {
  return (
    <section id="manifesto" className="relative overflow-hidden py-28 lg:py-44">
      <GridLines />
      <div className="container-x relative">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Reveal as="p" className="caption">
            {statement.caption}
          </Reveal>
          <Reveal>
            <Button href={links.booking} external>
              Start a conversation
            </Button>
          </Reveal>
        </div>

        <ScrubWords text={statement.text} className="mt-14 max-w-[28ch] font-serif text-[clamp(2.1rem,4.6vw,4.4rem)] leading-[1.08] tracking-[-0.015em]" />

        <ol className="mt-24 grid border-y border-ink/15 md:grid-cols-3 lg:mt-32">
          {statement.pillars.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              delay={i * 120}
              className="group border-ink/15 py-10 not-first:border-t md:px-8 md:not-first:border-l md:not-first:border-t-0 md:first:pl-0"
            >
              <span className="caption text-taupe">0{i + 1}</span>
              <h3 className="mt-12 font-serif text-[2.6rem] leading-none">
                <FlipText text={p.title} />
              </h3>
              <p className="mt-4 max-w-xs leading-relaxed text-ink/75">{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* -------------------------------------------- Services: pinned card swap */

function ServiceCard({ card, dark, label }) {
  return (
    <article
      data-scard
      className={`flex h-full flex-col justify-between rounded-2xl p-6 shadow-[0_40px_80px_-40px_rgba(6,20,27,0.45)] will-change-transform lg:p-9 ${dark ? 'bg-ink text-paper' : 'bg-card text-ink'}`}
    >
      <div className="flex items-start justify-between">
        <DotGlyph glyph={card.glyph} tone={dark ? 'light' : 'dark'} size={60} />
        <span className={`caption text-[11px] ${dark ? 'text-paper/50' : 'text-taupe'}`}>{label}</span>
      </div>
      <div>
        <h4 className="font-serif text-[1.55rem] leading-[1.1] sm:text-[1.8rem] lg:text-[2.1rem]">{card.title}</h4>
        <p className={`mt-3 text-[15px] leading-relaxed ${dark ? 'text-paper/65' : 'text-taupe'}`}>{card.body}</p>
      </div>
    </article>
  )
}

export function Services() {
  const root = useRef(null)
  const counter = useRef(null)
  const { stages } = services
  const still = prefersReducedMotion()

  useLayoutEffect(() => {
    if (still) return
    const mm = gsap.matchMedia(root)
    // desktop: pairs rise in and tip away upward; phones (cards stacked): pairs swap sideways
    mm.add({ wide: '(min-width: 640px)', narrow: '(max-width: 639px)' }, ({ conditions: { wide } }) => {
      const titles = gsap.utils.toArray('[data-stage]')
      const pairs = gsap.utils.toArray('[data-pair]')
      const cardsOf = (p) => p.querySelectorAll('[data-scard]')
      const enterFrom = wide ? { yPercent: 115, rotateX: -35, opacity: 0 } : { xPercent: 110, rotateY: -30, opacity: 0 }
      const exitTo = wide
        ? { yPercent: -45, rotateX: 28, scale: 0.88, opacity: 0, stagger: 0.08, duration: 0.9, ease: 'power2.in' }
        : { xPercent: -110, rotateY: 30, scale: 0.9, opacity: 0, stagger: 0.06, duration: 0.9, ease: 'power2.in' }
      const settle = { yPercent: 0, xPercent: 0, rotateX: 0, rotateY: 0, opacity: 1, stagger: 0.12, duration: 1.1, ease: 'power3.out' }

      gsap.set(titles.slice(1), { y: 40, opacity: 0, filter: 'blur(6px)' })
      pairs.slice(1).forEach((p) => gsap.set(cardsOf(p), enterFrom))

      // first pair rises in as the section arrives
      gsap.from(cardsOf(pairs[0]), {
        yPercent: 40,
        rotateX: -25,
        opacity: 0,
        duration: 1.3,
        ease: 'expo.out',
        stagger: 0.14,
        scrollTrigger: { trigger: root.current, start: 'top 60%' },
      })

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: root.current,
          pin: true,
          start: 'top top',
          end: () => `+=${window.innerHeight * stages.length * 1.1}`,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.min(stages.length - 1, Math.floor(self.progress * stages.length))
            if (counter.current) counter.current.textContent = `0${i + 1}`
          },
        },
      })

      tl.to({}, { duration: 0.8 })
      for (let i = 1; i < stages.length; i++) {
        tl.to(cardsOf(pairs[i - 1]), exitTo)
          .to(titles[i - 1], { y: -40, opacity: 0, filter: 'blur(6px)', duration: 0.6 }, '<')
          .to(titles[i], { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8 }, '<0.45')
          .to(cardsOf(pairs[i]), settle, wide ? '<0.05' : '<0.35')
          .to({}, { duration: 0.8 })
      }
      tl.fromTo('[data-progress]', { scaleX: 1 / stages.length }, { scaleX: 1, ease: 'none', duration: tl.duration() }, 0)
    })
    return () => mm.revert()
  }, [still, stages.length])

  if (still) {
    return (
      <section id="services" className="container-x py-24">
        <p className="caption">{services.caption}</p>
        {stages.map((s, i) => (
          <div key={s.name} className="mt-14 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h3 className="font-serif text-[2.6rem] leading-none">{s.name}</h3>
              <p className="mt-4 max-w-sm text-ink/75">{s.body}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {s.cards.map((c, ci) => (
                <div key={c.title} className="h-[320px]">
                  <ServiceCard card={c} dark={ci === 0} label={`0${i + 1}.${ci + 1}`} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    )
  }

  return (
    <section id="services" ref={root} className="relative overflow-hidden">
      <div className="container-x grid h-[100svh] grid-rows-[auto_minmax(0,1fr)] gap-6 pb-10 pt-24 lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:gap-10 lg:py-0">
        <div className="lg:col-span-5">
          <p className="caption">{services.caption}</p>
          <div className="relative mt-5 h-[64px] sm:h-[72px] lg:mt-8 lg:h-[280px]">
            {stages.map((s) => (
              <div key={s.name} data-stage className="absolute inset-0">
                <h3 className="font-serif text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[1.02] tracking-[-0.01em]">{s.name}</h3>
                <p className="mt-6 hidden max-w-sm leading-relaxed text-ink/75 lg:block">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4 lg:mt-8">
            <span className="caption tabular-nums text-ink">
              <span ref={counter}>01</span>
              <span className="text-taupe"> / 0{stages.length}</span>
            </span>
            <span className="relative h-px w-40 bg-ink/15">
              <span data-progress className="absolute inset-0 origin-left bg-ink" />
            </span>
            <span className="caption hidden text-[11px] text-taupe sm:inline">Scroll</span>
          </div>
        </div>

        <div className="relative h-full overflow-hidden [perspective:1400px] lg:col-span-7 lg:h-[min(560px,66vh)] lg:overflow-visible">
          {stages.map((s, i) => (
            <div key={s.name} data-pair className="absolute inset-0 grid grid-rows-2 gap-3 sm:grid-cols-2 sm:grid-rows-1 sm:gap-4">
              {s.cards.map((c, ci) => (
                <ServiceCard key={c.title} card={c} dark={ci === 0} label={`0${i + 1}.${ci + 1}`} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------- Approach: pinned horizontal track */

export function Approach() {
  const root = useRef(null)
  const track = useRef(null)
  const still = prefersReducedMotion()

  useLayoutEffect(() => {
    if (still) return
    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, track.current.scrollWidth - window.innerWidth)
      const tween = gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: { trigger: root.current, pin: true, scrub: 1, start: 'top top', end: () => `+=${distance()}`, invalidateOnRefresh: true },
      })
      gsap.utils.toArray('[data-step]').forEach((el) => {
        gsap.from(el, {
          rotateY: -32,
          scale: 0.9,
          opacity: 0.2,
          transformOrigin: '0% 50%',
          ease: 'none',
          scrollTrigger: { trigger: el, containerAnimation: tween, start: 'left right', end: 'left 50%', scrub: true },
        })
      })
      gsap.fromTo('[data-approach-progress]', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${distance()}`, scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [still])

  return (
    <section id="approach" ref={root} className="relative overflow-hidden bg-sand/70">
      <div className={`flex flex-col justify-center ${still ? 'py-24' : 'h-[100svh]'}`}>
        <div className={still ? 'overflow-x-auto' : ''}>
          <div ref={track} className="flex w-max items-stretch gap-4 pl-5 pr-[12vw] [perspective:1600px] md:pl-10 xl:pl-[max(120px,calc((100vw-1440px)/2+120px))]">
            <div className="flex w-[min(84vw,500px)] shrink-0 flex-col justify-center pr-6 lg:pr-16">
              <p className="caption">{approach.caption}</p>
              <RevealTitle text={approach.title} className="mt-6 font-serif text-[clamp(2.4rem,4vw,3.8rem)] font-normal leading-[1.05]" />
              <p className="mt-6 max-w-sm leading-relaxed text-ink/80">{approach.body}</p>
              <p className="caption mt-10 flex items-center gap-3 text-[11px] text-taupe">
                <span className="h-px w-10 bg-taupe" />
                Keep scrolling
              </p>
            </div>
            {approach.steps.map((s, i) => {
              const dark = i === approach.steps.length - 1
              return (
                <article
                  key={s.title}
                  data-step
                  className={`flex h-[min(62vh,540px)] w-[min(78vw,420px)] shrink-0 flex-col justify-between rounded-2xl p-8 shadow-[0_40px_80px_-50px_rgba(6,20,27,0.5)] lg:p-10 ${dark ? 'bg-ink text-paper' : 'bg-card text-ink'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`caption text-[11px] ${dark ? 'text-paper/50' : 'text-taupe'}`}>Step</span>
                    <span className={`caption text-[11px] ${dark ? 'text-paper/50' : 'text-taupe'}`}>
                      0{i + 1} / 0{approach.steps.length}
                    </span>
                  </div>
                  <span aria-hidden="true" className={`font-serif text-[clamp(6rem,11vw,9.5rem)] leading-none ${dark ? 'text-paper/15' : 'text-ink/10'}`}>
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-[2rem] leading-[1.1]">{s.title}</h3>
                    <p className={`mt-3 leading-relaxed ${dark ? 'text-paper/65' : 'text-taupe'}`}>{s.body}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
        {!still && (
          <div className="container-x mt-10">
            <div className="relative h-px bg-ink/10">
              <span data-approach-progress className="absolute inset-0 origin-left scale-x-0 bg-ink" />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

/* ------------------------------------------------------ Insights: list */

const THUMB_TONES = ['sand', 'ink', 'stone']

export function Insights() {
  return (
    <section id="insights" className="container-x py-28 lg:py-40">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Reveal as="p" className="caption">
            {insights.caption}
          </Reveal>
          <RevealTitle text={insights.title} className="mt-6 font-serif text-[clamp(2.4rem,4.4vw,4rem)] font-normal leading-[1.05]" />
        </div>
        <Reveal>
          <TextLink href={links.articles} external>
            View all insights
          </TextLink>
        </Reveal>
      </div>

      <ul className="mt-14 border-t border-ink/15">
        {insights.items.map((post, i) => (
          <Reveal as="li" key={post.title} delay={i * 90}>
            <a href={post.href} target="_blank" rel="noopener noreferrer" className="group relative grid grid-cols-12 items-center gap-x-6 gap-y-3 overflow-hidden border-b border-ink/15 py-8 lg:py-10">
              <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-[650ms] ease-snap group-hover:scale-y-100" />
              <span className="caption relative col-span-6 text-[11px] text-taupe transition-colors duration-500 group-hover:text-stone lg:col-span-2 lg:pl-5">{post.date}</span>
              <span className="caption relative col-span-6 justify-self-end text-[11px] text-ink transition-colors duration-500 group-hover:text-paper lg:col-span-1 lg:justify-self-start">
                {post.tag}
              </span>
              <div className="relative col-span-12 lg:col-span-6">
                <h3 className="font-serif text-[clamp(1.5rem,2.3vw,2.1rem)] leading-[1.15] transition-[color,translate] duration-500 ease-snap group-hover:translate-x-2 group-hover:text-paper">
                  {post.title}
                </h3>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-taupe transition-colors duration-500 group-hover:text-stone">{post.excerpt}</p>
              </div>
              <div className="relative hidden aspect-[3/2] overflow-hidden rounded-md lg:col-span-2 lg:block">
                <Constellation seed={post.seed} tone={THUMB_TONES[i % 3]} className="transition-transform duration-[1200ms] ease-out-soft group-hover:scale-110" />
              </div>
              <span className="relative hidden justify-end lg:col-span-1 lg:flex lg:pr-5">
                <CircleArrow invert />
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

/* ------------------------------------------------------------ Solutions */

export function Solutions() {
  return (
    <section id="solutions" className="container-x pb-32 lg:pb-44">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Reveal as="p" className="caption">
            {solutions.caption}
          </Reveal>
          <RevealTitle text={solutions.title} className="mt-6 max-w-[16ch] font-serif text-[clamp(2.4rem,4.4vw,4rem)] font-normal leading-[1.05]" />
        </div>
        <Reveal>
          <TextLink href={links.booking} external>
            Book a demo
          </TextLink>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {solutions.demos.map((d, i) => (
          <Reveal key={d.name} delay={i * 110}>
            <a href={d.href} target="_blank" rel="noopener noreferrer" className="group relative flex h-[420px] flex-col overflow-hidden rounded-2xl bg-card p-8 lg:h-[480px] lg:p-10">
              <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-700 ease-snap group-hover:scale-y-100" />
              <div className="caption relative flex justify-between text-[11px] text-taupe transition-colors duration-500 group-hover:text-stone">
                <span>{d.tag}</span>
                <span>0{i + 1}</span>
              </div>
              <span aria-hidden="true" className="relative mt-auto font-serif text-[6.5rem] leading-none text-ink/[0.07] transition-colors duration-500 group-hover:text-paper/10">
                0{i + 1}
              </span>
              <h3 className="relative mt-4 font-serif text-[2.1rem] leading-[1.05] transition-colors duration-500 group-hover:text-paper">
                <FlipText text={d.name} stagger={10} />
              </h3>
              <p className="relative mt-4 text-[15px] leading-relaxed text-taupe transition-colors duration-500 group-hover:text-stone">{d.body}</p>
              <span className="caption relative mt-8 inline-flex items-center gap-2 text-[11px] text-ink transition-colors duration-500 group-hover:text-paper">
                Open live demo
                <Chevron className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 flex flex-wrap items-center gap-3">
        <span className="caption mr-2 text-[11px] text-taupe">Also</span>
        {solutions.more.map((m) => (
          <a
            key={m.label}
            href={m.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-full border border-ink/20 px-5 py-2.5 text-[15px] transition-colors duration-500 hover:border-ink hover:text-paper"
          >
            <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-snap group-hover:scale-y-100" />
            <span className="relative">
              <FlipText text={m.label} stagger={12} />
            </span>
          </a>
        ))}
      </Reveal>
    </section>
  )
}
