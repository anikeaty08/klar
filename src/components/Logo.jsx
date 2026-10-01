import { useEffect, useRef } from 'react'
import { gsap, INTRO_DELAY, ScrollTrigger } from '../lib/motion'
import { prefersReducedMotion } from '../lib/useCanvas'

/*
 * The KlarDataLabs identity is drawn in data points: every letter sits on a
 * 5-row dot grid, unused cells stay as faint "noise" dots, and the name ends
 * with the solid full stop from the original logo. Clarity out of noise.
 */

const STEP = 8
const R_LIT = 3.1
const R_NOISE = 1.3

// 5-row dot font (X = lit)
const FONT = {
  K: ['X..X', 'X.X.', 'XX..', 'X.X.', 'X..X'],
  L: ['X...', 'X...', 'X...', 'X...', 'XXXX'],
  A: ['.XX.', 'X..X', 'XXXX', 'X..X', 'X..X'],
  R: ['XXX.', 'X..X', 'XXX.', 'X.X.', 'X..X'],
  D: ['XXX.', 'X..X', 'X..X', 'X..X', 'XXX.'],
  T: ['XXXXX', '..X..', '..X..', '..X..', '..X..'],
  B: ['XXX.', 'X..X', 'XXX.', 'X..X', 'XXX.'],
  S: ['.XXX', 'X...', '.XX.', '...X', 'XXX.'],
}

function layout(text) {
  const letters = []
  let col = 0
  for (const ch of text) {
    const rows = FONT[ch]
    letters.push({ ch, rows, x0: col })
    col += rows[0].length + 1
  }
  return { letters, cols: col } // `col` already includes one trailing gap column for the full stop
}

/** Hook: dots pop in on mount (optional) and scatter/snap back on hover (optional). */
function useDotMotion(ref, { intro, interactive, delay = 0 }) {
  useEffect(() => {
    if (prefersReducedMotion()) return
    const svg = ref.current
    const lit = svg.querySelectorAll('[data-lit]')
    const noise = svg.querySelectorAll('[data-noise]')
    const stop = svg.querySelector('[data-stop]')
    const ctx = gsap.context(() => {
      gsap.set([lit, noise, stop], { transformOrigin: '50% 50%' })
      if (intro) {
        // intro === 'scroll' waits until the word scrolls into view
        const when = intro === 'scroll' ? { scrollTrigger: { trigger: svg, start: 'top bottom-=20' } } : {}
        gsap.from(lit, { scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(2.4)', stagger: { each: 0.008, from: 'random' }, delay: delay + 0.15, ...when })
        gsap.from(stop, { scale: 0, duration: 0.8, ease: 'elastic.out(1, 0.45)', delay: delay + 0.7, ...when })
      }
    }, svg)
    if (!interactive) return () => ctx.revert()

    const scatter = () => {
      gsap.killTweensOf([lit, noise, stop])
      gsap
        .timeline()
        .to(lit, { x: () => gsap.utils.random(-6, 6), y: () => gsap.utils.random(-6, 6), opacity: 0.35, duration: 0.16, ease: 'power2.out', stagger: { each: 0.002, from: 'start' } })
        .to(noise, { opacity: 0.8, scale: 1.6, duration: 0.16, stagger: { each: 0.002, from: 'random' } }, 0)
        .to(lit, { x: 0, y: 0, opacity: 1, duration: 0.9, ease: 'elastic.out(1, 0.5)', stagger: { each: 0.004, from: 'start' } })
        .to(noise, { opacity: 0.2, scale: 1, duration: 0.6, ease: 'power2.out' }, '<')
        .fromTo(stop, { scale: 0.3 }, { scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.4)' }, '<0.15')
    }
    svg.addEventListener('mouseenter', scatter)
    return () => {
      svg.removeEventListener('mouseenter', scatter)
      ctx.revert()
    }
  }, [ref, intro, interactive, delay])
}

/**
 * Dot-matrix word. Letters from index `muteFrom` onward use the muted colour.
 * Size it with a height class; width follows the viewBox.
 */
export function DotWord({ text = 'KLARDATALABS', muteFrom = 4, tone = 'dark', noise = true, intro = false, delay = 0, interactive = true, className = 'h-5' }) {
  const ref = useRef(null)
  useDotMotion(ref, { intro, interactive, delay })
  const { letters, cols } = layout(text)
  const width = (cols + 1) * STEP
  const main = tone === 'dark' ? 'text-ink' : 'text-paper'
  const muted = tone === 'dark' ? 'text-stone' : 'text-taupe'

  return (
    <svg ref={ref} viewBox={`0 0 ${width} ${5 * STEP}`} role="img" aria-label="KlarDataLabs" className={`w-auto overflow-visible ${className}`}>
      {letters.map(({ ch, rows, x0 }, li) => (
        <g key={li} className={li >= muteFrom ? muted : main}>
          {rows.flatMap((row, y) =>
            [...row].map((c, x) => {
              const cx = (x0 + x) * STEP + STEP / 2
              const cy = y * STEP + STEP / 2
              return c === 'X' ? (
                <circle key={`${x}${y}`} data-lit cx={cx} cy={cy} r={R_LIT} fill="currentColor" />
              ) : noise ? (
                <circle key={`${x}${y}`} data-noise cx={cx} cy={cy} r={R_NOISE} fill="currentColor" opacity="0.2" />
              ) : null
            }),
          )}
        </g>
      ))}
      <circle data-stop className="text-klar" cx={cols * STEP + STEP / 2} cy={4 * STEP + STEP / 2} r={R_LIT + 0.9} fill="currentColor" />
    </svg>
  )
}

/** The symbol: the dot-matrix K inside a 5×5 field, with the full stop in the corner. */
const K_CELLS = new Set(['0,0', '0,1', '0,2', '0,3', '0,4', '1,2', '2,1', '3,0', '2,3', '3,4'])
const CELLS = []
for (let y = 0; y < 5; y++) for (let x = 0; x < 5; x++) if (!(x === 4 && y === 4)) CELLS.push({ x, y, k: K_CELLS.has(`${x},${y}`) })

export function KlarMark({ className = 'h-10 w-10', interactive = true, intro = false, delay = 0 }) {
  const ref = useRef(null)
  useDotMotion(ref, { intro, interactive, delay })
  return (
    <svg ref={ref} viewBox="0 0 40 40" aria-hidden="true" className={`overflow-visible ${className}`}>
      {CELLS.map(({ x, y, k }) =>
        k ? (
          <circle key={`${x}${y}`} data-lit cx={4 + x * STEP} cy={4 + y * STEP} r={R_LIT} fill="currentColor" />
        ) : (
          <circle key={`${x}${y}`} data-noise cx={4 + x * STEP} cy={4 + y * STEP} r={R_NOISE} fill="currentColor" opacity="0.22" />
        ),
      )}
      <circle data-stop className="text-klar" cx={36.5} cy={36.5} r={R_LIT + 0.8} fill="currentColor" />
    </svg>
  )
}

/** Header wordmark. */
export function Wordmark({ tone = 'dark', className = '' }) {
  return <DotWord tone={tone} intro delay={INTRO_DELAY - 0.2} className={`h-[18px] lg:h-5 ${className}`} />
}

/**
 * Footer wordmark you can play with:
 *  - move over it and the dots part around the pointer, swelling as they go, then spring back
 *  - click / tap (or Enter) to "decode": each letter flickers through random data noise
 *    and resolves left to right — it also decodes itself the first time it scrolls into view
 */
export function DotWordPlay({ text = 'KLARDATALABS', muteFrom = 4, className = '' }) {
  const ref = useRef(null)
  const { letters, cols } = layout(text)
  const width = (cols + 1) * STEP

  useEffect(() => {
    const svg = ref.current.querySelector('svg')
    const stop = svg.querySelector('[data-stop]')
    const cells = [...svg.querySelectorAll('[data-cell]')].map((el) => ({
      el,
      x: +el.getAttribute('cx'),
      y: +el.getAttribute('cy'),
      on: el.dataset.on === '1',
      li: +el.dataset.li,
      dx: 0,
      dy: 0,
      s: 0,
    }))
    const reduced = prefersReducedMotion()

    // ---- decode
    let decoding = null
    const setCell = (c, on, duration) =>
      gsap.to(c.el, { attr: { r: on ? R_LIT : R_NOISE }, opacity: on ? 1 : 0.2, duration, ease: 'power2.out', overwrite: 'auto' })
    const decode = () => {
      if (decoding?.isActive()) return
      const tl = gsap.timeline()
      letters.forEach((_, li) => {
        const own = cells.filter((c) => c.li === li)
        const frames = reduced ? 0 : 5 + li
        const start = li * 0.05
        for (let f = 0; f < frames; f++) tl.call(() => own.forEach((c) => setCell(c, Math.random() < 0.45, 0.06)), null, start + f * 0.07)
        tl.call(() => own.forEach((c) => setCell(c, c.on, 0.3)), null, start + frames * 0.07)
      })
      tl.fromTo(stop, { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.9, ease: 'elastic.out(1, 0.4)' }, '>-0.05')
      decoding = tl
    }

    // ---- pointer field
    const RADIUS = 30
    const PUSH = 11
    let px = -1e4
    let py = -1e4
    let active = false
    let raf = 0
    const tick = () => {
      let moving = false
      for (const c of cells) {
        let tx = 0
        let ty = 0
        let ts = 0
        if (active) {
          const ddx = c.x - px
          const ddy = c.y - py
          const d = Math.hypot(ddx, ddy)
          if (d < RADIUS) {
            const k = 1 - d / RADIUS
            const inv = d > 0.001 ? 1 / d : 0
            tx = ddx * inv * PUSH * k * k
            ty = ddy * inv * PUSH * k * k
            ts = k
          }
        }
        c.dx += (tx - c.dx) * 0.18
        c.dy += (ty - c.dy) * 0.18
        c.s += (ts - c.s) * 0.18
        if (Math.abs(c.dx) + Math.abs(c.dy) + Math.abs(c.s) > 0.02) moving = true
        const sc = 1 + c.s * 0.9
        c.el.setAttribute('transform', `translate(${(c.x + c.dx).toFixed(2)} ${(c.y + c.dy).toFixed(2)}) scale(${sc.toFixed(3)}) translate(${-c.x} ${-c.y})`)
      }
      raf = moving || active ? requestAnimationFrame(tick) : 0
    }
    const toLocal = (e) => {
      const pt = svg.createSVGPoint()
      pt.x = e.clientX
      pt.y = e.clientY
      return pt.matrixTransform(svg.getScreenCTM().inverse())
    }
    const onMove = (e) => {
      const p = toLocal(e)
      px = p.x
      py = p.y
      active = true
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onLeave = () => {
      active = false
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const host = ref.current
    if (!reduced) {
      host.addEventListener('pointermove', onMove)
      host.addEventListener('pointerleave', onLeave)
    }
    host.addEventListener('click', decode)

    // first decode when it scrolls into view
    const st = reduced
      ? null
      : ScrollTrigger.create({
          trigger: host,
          start: 'top bottom-=40',
          once: true,
          onEnter: () => {
            cells.forEach((c) => gsap.set(c.el, { attr: { r: R_NOISE }, opacity: 0.2 }))
            gsap.set(stop, { scale: 0, transformOrigin: '50% 50%' })
            decode()
          },
        })

    return () => {
      cancelAnimationFrame(raf)
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
      host.removeEventListener('click', decode)
      st?.kill()
      decoding?.kill()
    }
  }, [text])

  return (
    <button
      ref={ref}
      type="button"
      aria-label="KlarDataLabs — click to decode the wordmark"
      className={`group block w-full cursor-pointer touch-pan-y text-left ${className}`}
    >
      <svg viewBox={`-4 -4 ${width + 8} ${5 * STEP + 8}`} aria-hidden="true" className="h-auto w-full overflow-visible">
        {letters.map(({ rows, x0 }, li) => (
          <g key={li} className={li >= muteFrom ? 'text-taupe' : 'text-paper'}>
            {rows.flatMap((row, y) =>
              [...row].map((c, x) => {
                const on = c === 'X'
                return (
                  <circle
                    key={`${x}${y}`}
                    data-cell
                    data-on={on ? '1' : '0'}
                    data-li={li}
                    cx={(x0 + x) * STEP + STEP / 2}
                    cy={y * STEP + STEP / 2}
                    r={on ? R_LIT : R_NOISE}
                    opacity={on ? 1 : 0.2}
                    fill="currentColor"
                  />
                )
              }),
            )}
          </g>
        ))}
        <circle data-stop className="text-klar" cx={cols * STEP + STEP / 2} cy={4 * STEP + STEP / 2} r={R_LIT + 0.9} fill="currentColor" />
      </svg>
    </button>
  )
}
