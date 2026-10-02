import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/motion'
import { prefersReducedMotion } from '../lib/useCanvas'

const SCRAMBLE_CHARS = 'KLARDATA01∙/+'

/** Returns [ref, run]: call run() (e.g. on a parent's mouseenter) to scramble the ref's text back into place. */
export function useScramble(text, { duration = 0.7 } = {}) {
  const ref = useRef(null)
  const run = useCallback(() => {
    if (!ref.current || prefersReducedMotion()) return
    gsap.to(ref.current, {
      duration,
      overwrite: true,
      scrambleText: { text, chars: SCRAMBLE_CHARS, speed: 0.7, revealDelay: 0.05 },
    })
  }, [text, duration])
  return [ref, run]
}

/** Inline text that scrambles when hovered or focused. */
export function Scramble({ text, className = '', as: Tag = 'span' }) {
  const [ref, run] = useScramble(text)
  return (
    <Tag ref={ref} onMouseEnter={run} onFocus={run} className={className}>
      {text}
    </Tag>
  )
}

/**
 * Letter roll: each character flips up and a copy rolls in from below, staggered.
 * Triggered by hovering the nearest `.group` ancestor.
 */
export function FlipText({ text, className = '', stagger = 16 }) {
  let n = 0
  const words = text.split(' ')
  return (
    <span className={`relative ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="select-none">
        {words.map((w, wi) => (
          <span key={wi}>
            <span className="inline-flex overflow-hidden align-bottom [perspective:400px]">
              {[...w].map((c) => {
                const style = { transitionDelay: `${n++ * stagger}ms` }
                return (
                  <span key={n} className="relative inline-block">
                    <span
                      className="inline-block origin-[50%_100%] transition-[translate,rotate] duration-[550ms] ease-snap group-hover:-translate-y-full group-hover:[rotate:x_70deg]"
                      style={style}
                    >
                      {c}
                    </span>
                    <span
                      className="absolute left-0 top-full inline-block origin-[50%_0%] [rotate:x_-70deg] transition-[translate,rotate] duration-[550ms] ease-snap group-hover:-translate-y-full group-hover:[rotate:x_0deg]"
                      style={style}
                    >
                      {c}
                    </span>
                  </span>
                )
              })}
            </span>
            {wi < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    </span>
  )
}

/**
 * Large letter-spaced title split into characters. Characters fall into place
 * on load (3D flip) and each one flips over again when the pointer touches it.
 * With `scrub`, characters also brighten as the title scrolls through view.
 */
export function FlipChars({ text, as: Tag = 'h1', className = '', delay = 0, scrub = false, onScroll = false }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    const chars = el.querySelectorAll('[data-char]')
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const intro = {
        yPercent: 90,
        rotateX: -95,
        opacity: 0,
        transformOrigin: '50% 100%',
        duration: 1.3,
        ease: 'expo.out',
        stagger: 0.028,
        delay,
      }
      if (onScroll) gsap.from(chars, { ...intro, scrollTrigger: { trigger: el, start: 'top bottom-=60' } })
      else gsap.from(chars, intro)

      if (scrub) {
        gsap.fromTo(
          chars,
          { color: 'rgba(6,20,27,0.14)' },
          { color: 'rgba(6,20,27,1)', stagger: 0.04, ease: 'none', scrollTrigger: { trigger: el, start: 'top 75%', end: 'bottom 40%', scrub: true } },
        )
      }
    }, el)

    const flip = (e) => {
      const c = e.target.closest('[data-char]')
      if (!c || gsap.isTweening(c)) return
      gsap.fromTo(c, { rotateX: 0 }, { rotateX: 360, duration: 0.9, ease: 'power3.inOut', transformOrigin: '50% 55%' })
    }
    el.addEventListener('mouseover', flip)
    return () => {
      el.removeEventListener('mouseover', flip)
      ctx.revert()
    }
  }, [delay, scrub, onScroll])

  const words = text.split(' ')
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} aria-hidden="true" className="inline-block whitespace-nowrap [perspective:900px]">
          {[...w].map((c, ci) => (
            <span key={ci} data-char className="inline-block will-change-transform">
              {c}
            </span>
          ))}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}

/** Section heading whose words rise out of a mask when scrolled into view. `\n` forces a line break. */
export function RevealTitle({ text, as: Tag = 'h2', className = '' }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('[data-word]'), {
        yPercent: 110,
        rotate: 4,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <Tag ref={ref} className={className} aria-label={text.replace(/\n/g, ' ')}>
      {text.split('\n').map((line, li) => (
        <span key={li} aria-hidden="true" className="block">
          {line.split(' ').map((w, wi) => (
            <span key={wi} className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]">
              <span data-word className="inline-block origin-bottom-left">
                {w}
                {' '}
              </span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  )
}

/** Fades/lifts children in when scrolled into view (GSAP + ScrollTrigger). */
export function Reveal({ as: Tag = 'div', delay = 0, y = 40, className = '', children, ...rest }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from(ref.current, { y, opacity: 0, duration: 1.1, ease: 'expo.out', delay: delay / 1000, scrollTrigger: { trigger: ref.current, start: 'top 90%' } })
    }, ref)
    return () => ctx.revert()
  }, [delay, y])
  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}

/** Paragraph whose words darken from stone to ink as it scrolls through view. */
export function ScrubWords({ text, as: Tag = 'p', className = '' }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current.querySelectorAll('[data-word]'),
        { color: 'rgba(6,20,27,0.16)' },
        { color: 'rgba(6,20,27,1)', stagger: 0.08, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top 78%', end: 'bottom 45%', scrub: true } },
      )
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <Tag ref={ref} className={className}>
      {text.split(' ').map((w, i) => (
        <span key={i} data-word>
          {w}{' '}
        </span>
      ))}
    </Tag>
  )
}

/**
 * Typewriter word: types each word, holds, deletes, and moves on to the next.
 * Starts after `delay` seconds; reduced-motion users just see the first word.
 */
export function TypedWord({ words, delay = 0, bus, className = '' }) {
  const [text, setText] = useState(words[0])
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) return
    let timer = 0
    let i = 0
    const type = (word, n) => {
      if (n === 1) bus?.dispatchEvent(new CustomEvent('word', { detail: word }))
      setText(word.slice(0, n))
      if (n < word.length) timer = setTimeout(() => type(word, n + 1), 65 + Math.random() * 70)
      else
        timer = setTimeout(() => {
          bus?.dispatchEvent(new Event('clear'))
          erase(word, word.length)
        }, 2600)
    }
    const erase = (word, n) => {
      setText(word.slice(0, n))
      if (n > 0) timer = setTimeout(() => erase(word, n - 1), 32)
      else {
        i = (i + 1) % words.length
        timer = setTimeout(() => type(words[i], 1), 280)
      }
    }
    setText('')
    setTyping(true)
    timer = setTimeout(() => type(words[0], 1), delay * 1000)
    return () => clearTimeout(timer)
  }, [words, delay, bus])

  return (
    <span className={className}>
      {text.endsWith('.') ? (
        <>
          {text.slice(0, -1)}
          <span className="text-klar">.</span>
        </>
      ) : (
        text || '\u200b'
      )}
      {typing && <span className="caret" aria-hidden="true" />}
    </span>
  )
}

export function refreshScroll() {
  ScrollTrigger.refresh()
}
