import { useEffect, useRef } from 'react'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Shared 2D-canvas loop: handles device pixel ratio, resizing, pausing while
 * off-screen, and a single still frame for reduced-motion users.
 * `render(ctx, { w, h, t })` draws one frame in CSS pixels.
 */
export function useCanvas(render) {
  const ref = useRef(null)
  const renderRef = useRef(render)
  renderRef.current = render

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const start = performance.now()
    const still = prefersReducedMotion()
    let w = 0
    let h = 0
    let raf = 0
    let running = false

    const frame = (now) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      renderRef.current(ctx, { w, h, t: still ? 12 : (now - start) / 1000 })
      if (running) raf = requestAnimationFrame(frame)
    }

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = Math.max(1, Math.round(w * dpr))
      canvas.height = Math.max(1, Math.round(h * dpr))
      if (!running) frame(performance.now())
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    if (still) return () => ro.disconnect()

    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting
      cancelAnimationFrame(raf)
      if (running) raf = requestAnimationFrame(frame)
    })
    io.observe(canvas)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
    }
  }, [])

  return ref
}

// small deterministic PRNG for generative patterns
export function mulberry32(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const TAU = Math.PI * 2
