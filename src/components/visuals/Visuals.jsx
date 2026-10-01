import { mulberry32, TAU, useCanvas } from '../../lib/useCanvas'

/* Monochrome Canvas 2D details in the site's ink/taupe/stone palette. */

const INK = '6,20,27'
const TAUPE = '138,130,118'
const PAPER = '250,250,248'
const rgba = (c, a) => `rgba(${c},${a})`

const GLYPHS = {
  grid: (x, y) => {
    const inA = (v) => v >= 1 && v <= 3
    const inB = (v) => v >= 6 && v <= 8
    const edge = (v) => v === 1 || v === 3 || v === 6 || v === 8
    if (inB(x) && inB(y)) return true
    if ((inA(x) || inB(x)) && (inA(y) || inB(y))) return edge(x) || edge(y)
    return false
  },
  link: (x, y) => {
    const boxA = x >= 0 && x <= 4 && y >= 2 && y <= 6 && (x === 0 || x === 4 || y === 2 || y === 6)
    const boxB = x >= 5 && x <= 9 && y >= 3 && y <= 7 && (x === 5 || x === 9 || y === 3 || y === 7)
    return boxA || boxB || (y === 4 && x >= 3 && x <= 6)
  },
  flow: (x, y) => (y === 1 && x <= 6) || (x === 6 && y >= 1 && y <= 8) || (y === 8 && x >= 3) || (x === 3 && y >= 4 && y <= 8) || (y === 4 && x <= 3),
  bars: (x, y) => {
    const h = [3, 6, 4, 8, 5]
    return x % 2 === 0 && y >= 9 - h[Math.floor(x / 2)]
  },
  peak: (x, y) => {
    const left = 4.5 - y * 0.5
    const right = 4.5 + y * 0.5
    return y === 9 || Math.abs(x - left) < 0.6 || Math.abs(x - right) < 0.6 || (y >= 5 && Math.abs(x - 4.5) < 0.6)
  },
  spark: (x, y) => x === 4 || y === 4 || x === y || x + y === 8,
}

/** Dot-matrix glyph used as card icons; dots gently shimmer. */
export function DotGlyph({ glyph, size = 80, tone = 'light', className = '' }) {
  const color = tone === 'light' ? PAPER : INK
  const ref = useCanvas((ctx, { t }) => {
    const n = 10
    const cell = size / n
    const test = GLYPHS[glyph]
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        const lit = test(x, y)
        const tw = 0.7 + 0.3 * Math.sin(t * 1.6 + x * 1.3 + y * 2.1)
        ctx.fillStyle = rgba(color, lit ? 0.95 * tw : 0.14)
        ctx.beginPath()
        ctx.arc(x * cell + cell / 2, y * cell + cell / 2, cell * 0.28, 0, TAU)
        ctx.fill()
      }
    }
  })
  return <canvas ref={ref} aria-hidden="true" className={className} style={{ width: size, height: size }} />
}

/** Generative constellation used instead of photos on the article rows. */
export function Constellation({ seed = 1, tone = 'sand', className = '' }) {
  const ref = useCanvas((ctx, { w, h, t }) => {
    const rand = mulberry32(seed)
    const dark = tone === 'ink'
    const bg = { sand: '#efebe5', stone: '#ddd5ca', ink: '#06141b' }[tone]
    const line = dark ? rgba(PAPER, 0.28) : rgba(TAUPE, 0.55)
    const dot = dark ? rgba(PAPER, 0.85) : rgba(INK, 0.8)
    const grid = dark ? rgba(PAPER, 0.08) : rgba(TAUPE, 0.18)

    ctx.fillStyle = bg
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = grid
    for (let y = 10; y < h; y += 14) for (let x = 10; x < w; x += 14) ctx.fillRect(x, y, 1.5, 1.5)

    const pts = Array.from({ length: 18 }, (_, i) => {
      const bx = 0.08 + rand() * 0.84
      const by = 0.1 + rand() * 0.8
      return [w * bx + 5 * Math.sin(t * 0.4 + i), h * by + 5 * Math.cos(t * 0.35 + i * 1.7)]
    })
    ctx.strokeStyle = line
    ctx.lineWidth = 1
    pts.forEach((p, i) => {
      let best = -1
      let bd = Infinity
      pts.forEach((q, j) => {
        if (j === i) return
        const d = (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2
        if (d < bd) {
          bd = d
          best = j
        }
      })
      ctx.beginPath()
      ctx.moveTo(p[0], p[1])
      ctx.lineTo(pts[best][0], pts[best][1])
      ctx.stroke()
    })
    pts.forEach(([x, y], i) => {
      ctx.fillStyle = dot
      ctx.beginPath()
      ctx.arc(x, y, i % 5 === 0 ? 3.5 : 2, 0, TAU)
      ctx.fill()
    })
  })
  return <canvas ref={ref} aria-hidden="true" className={`block h-full w-full ${className}`} />
}
