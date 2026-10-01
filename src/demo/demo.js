import '../index.css'

/*
 * Hero effect demos — each effect draws behind the real hero copy so they can be
 * compared in context. Switch with the tabs or keys 1–7.
 */

const INK = '6,20,27'
const TAUPE = '138,130,118'
const STONE = '199,189,178'
const rgba = (c, a) => `rgba(${c},${a})`
const TAU = Math.PI * 2
const clamp01 = (v) => Math.min(1, Math.max(0, v))
const ease = (v) => 1 - Math.pow(1 - clamp01(v), 3)
const rand = (a, b) => a + Math.random() * (b - a)

// 5-row dot font (same system as the KlarDataLabs wordmark)
const FONT = {
  A: ['.XX.', 'X..X', 'XXXX', 'X..X', 'X..X'],
  C: ['.XXX', 'X...', 'X...', 'X...', '.XXX'],
  D: ['XXX.', 'X..X', 'X..X', 'X..X', 'XXX.'],
  G: ['.XXX', 'X...', 'X.XX', 'X..X', '.XXX'],
  I: ['XXX', '.X.', '.X.', '.X.', 'XXX'],
  L: ['X...', 'X...', 'X...', 'X...', 'XXXX'],
  P: ['XXX.', 'X..X', 'XXX.', 'X...', 'X...'],
  R: ['XXX.', 'X..X', 'XXX.', 'X.X.', 'X..X'],
  S: ['.XXX', 'X...', '.XX.', '...X', 'XXX.'],
  T: ['XXXXX', '..X..', '..X..', '..X..', '..X..'],
  Y: ['X...X', '.X.X.', '..X..', '..X..', '..X..'],
}
const WORDS = ['SAP', 'DIGITAL', 'AI', 'CLARITY']
const GRID_COLS = 35 // wide enough for the longest word

/** Lit cells of a word, centred in a GRID_COLS × 5 grid. */
function wordCells(word) {
  const width = [...word].reduce((w, ch) => w + FONT[ch][0].length, 0) + word.length - 1
  let col = Math.floor((GRID_COLS - width) / 2)
  const cells = []
  for (const ch of word) {
    const rows = FONT[ch]
    rows.forEach((row, y) => [...row].forEach((c, x) => c === 'X' && cells.push({ col: col + x, row: y })))
    col += rows[0].length + 1
  }
  return cells
}

// ---------------------------------------------------------------- setup
const canvas = document.getElementById('fx')
const ctx = canvas.getContext('2d')
const glass = document.getElementById('glass')
let W = 0
let H = 0
const DPR = Math.min(window.devicePixelRatio || 1, 2)

function resize() {
  W = window.innerWidth
  H = window.innerHeight
  canvas.width = W * DPR
  canvas.height = H * DPR
  Object.values(effects).forEach((e) => e.resize?.())
}

// ------------------------------------------------------------ 1. data rain
function makeRain() {
  let ps = []
  return {
    label: 'Data rain → grid',
    desc: 'Faint dots fall like static, then gather into a precise grid behind the headline, hold, and release again. Noise becoming order.',
    resize() {
      const gap = 22
      const cols = Math.floor(W / gap)
      const rows = Math.floor(H / gap)
      const ox = (W - (cols - 1) * gap) / 2
      const oy = (H - (rows - 1) * gap) / 2
      ps = []
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) ps.push({ x: rand(0, W), y: rand(0, H), vy: rand(0.3, 1.4), s: rand(0, TAU), gx: ox + c * gap, gy: oy + r * gap })
    },
    draw(t) {
      const ph = t % 10
      const gather = ph > 3.5 && ph < 7.8
      for (const p of ps) {
        if (gather) {
          const k = 0.045 + 0.04 * ease((ph - 3.5) / 2)
          p.x += (p.gx - p.x) * k
          p.y += (p.gy - p.y) * k
        } else {
          p.y += p.vy
          p.x += Math.sin(t * 0.8 + p.s) * 0.25
          if (p.y > H + 4) {
            p.y = -4
            p.x = rand(0, W)
          }
        }
        const settled = gather ? ease((ph - 4) / 2.5) : 0
        ctx.fillStyle = rgba(INK, 0.16 + 0.3 * settled)
        ctx.fillRect(p.x - 1, p.y - 1, 2, 2)
      }
    },
  }
}

// ------------------------------------------------------- 2. dot-type words
function makeWords() {
  let cells = []
  let cell = 20
  let ox = 0
  let oy = 0
  return {
    label: 'Dot-type words',
    desc: 'Giant words in the same dot style as your logo — SAP, DIGITAL, AI, CLARITY. Each dissolves into random data noise, then resolves into the next word, left to right.',
    resize() {
      cell = Math.min((W * 0.92) / GRID_COLS, (H * 0.6) / 5)
      ox = (W - GRID_COLS * cell) / 2
      oy = (H - 5 * cell) / 2
      cells = []
      for (let r = 0; r < 5; r++) for (let c = 0; c < GRID_COLS; c++) cells.push({ c, r, v: 0, target: 0 })
    },
    draw(t) {
      const period = 3
      const wi = Math.floor(t / period) % WORDS.length
      const ph = t % period
      const lit = new Set(wordCells(WORDS[wi]).map((p) => `${p.col},${p.row}`))
      for (const k of cells) {
        const resolveAt = 0.55 + k.c * 0.018
        if (ph < resolveAt) {
          if (Math.random() < 0.12) k.target = Math.random() < 0.35 ? 1 : 0
        } else k.target = lit.has(`${k.c},${k.r}`) ? 1 : 0
        k.v += (k.target - k.v) * 0.25
        const x = ox + k.c * cell + cell / 2
        const y = oy + k.r * cell + cell / 2
        ctx.fillStyle = rgba(INK, 0.06 + 0.32 * k.v)
        ctx.beginPath()
        ctx.arc(x, y, cell * (0.1 + 0.24 * k.v), 0, TAU)
        ctx.fill()
      }
    },
  }
}

// -------------------------------------------------------- 3. glass sheets
function makeGlass() {
  const panels = []
  return {
    label: 'Glass sheets (3D)',
    desc: 'Frosted panels hang in 3D at slight angles and drift slowly, catching soft light. Calm and premium — closer to a consultancy than a tech demo.',
    start() {
      glass.classList.remove('hidden')
      if (!panels.length) {
        for (let i = 0; i < 6; i++) {
          const el = document.createElement('div')
          el.className = 'absolute left-1/2 top-1/2 h-[46vh] w-[22vw] min-w-[160px] rounded-2xl border border-white/70 bg-white/30 shadow-[0_40px_80px_-40px_rgba(6,20,27,0.35)] backdrop-blur-md'
          glass.appendChild(el)
          panels.push({ el, i })
        }
      }
    },
    stop() {
      glass.classList.add('hidden')
    },
    draw(t) {
      // something soft behind the glass so the frost reads
      for (let i = 0; i < 3; i++) {
        const x = W * (0.3 + 0.2 * i) + Math.sin(t * 0.3 + i * 2) * W * 0.08
        const y = H * 0.5 + Math.cos(t * 0.25 + i) * H * 0.12
        const g = ctx.createRadialGradient(x, y, 0, x, y, H * 0.35)
        g.addColorStop(0, rgba(i === 1 ? INK : TAUPE, 0.22))
        g.addColorStop(1, rgba(TAUPE, 0))
        ctx.fillStyle = g
        ctx.fillRect(0, 0, W, H)
      }
      ctx.fillStyle = rgba(TAUPE, 0.25)
      for (let y = 12; y < H; y += 24) for (let x = 12; x < W; x += 24) ctx.fillRect(x, y, 1.5, 1.5)
      panels.forEach(({ el, i }) => {
        const spread = (i - 2.5) * Math.min(W * 0.13, 190)
        const z = -i * 60 + Math.sin(t * 0.4 + i) * 30
        const ry = -28 + Math.sin(t * 0.25 + i * 0.6) * 6
        const rx = 8 + Math.cos(t * 0.3 + i) * 3
        el.style.transform = `translate(-50%,-50%) translate3d(${spread}px, ${Math.sin(t * 0.5 + i) * 12}px, ${z}px) rotateY(${ry}deg) rotateX(${rx}deg)`
      })
    },
  }
}

// -------------------------------------------------------- 4. ridgelines
function makeRidges() {
  return {
    label: 'Ridgelines',
    desc: 'Stacked lines rise into a slow, breathing landscape — like a data terrain seen from the side. Strongest in the middle, flat at the edges.',
    draw(t) {
      const lines = 42
      const top = H * 0.3
      const step = (H * 0.78) / lines
      for (let i = 0; i < lines; i++) {
        const base = top + i * step
        ctx.beginPath()
        for (let x = -10; x <= W + 10; x += 6) {
          const nx = (x - W / 2) / (W * 0.22)
          const env = Math.exp(-nx * nx)
          const n =
            Math.sin(x * 0.012 + i * 0.7 + t * 0.6) * 0.5 +
            Math.sin(x * 0.031 - i * 0.33 + t * 0.9) * 0.3 +
            Math.sin(x * 0.07 + i * 1.7 - t * 1.3) * 0.2
          const y = base - env * (18 + 40 * (0.5 + 0.5 * n))
          x === -10 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.lineTo(W + 10, H)
        ctx.lineTo(-10, H)
        ctx.closePath()
        ctx.fillStyle = '#fafaf8'
        ctx.fill()
        ctx.strokeStyle = rgba(INK, 0.12 + 0.3 * (i / lines))
        ctx.lineWidth = 1
        ctx.stroke()
      }
    },
  }
}

// -------------------------------------------------------- 5. data streams
function makeStreams() {
  const lines = Array.from({ length: 120 }, (_, i) => ({ i, speed: rand(0.6, 2.2), dash: rand(30, 160), gap: rand(20, 120), phase: rand(0, 1000) }))
  return {
    label: 'Data streams',
    desc: 'Hundreds of thin lines flow left to right like data through pipes. Around the headline they calm down and run perfectly straight.',
    draw(t) {
      lines.forEach((l) => {
        const yBase = (l.i / lines.length) * H
        const band = Math.abs(yBase - H / 2) / (H / 2)
        const amp = 26 * ease(band * 1.4)
        ctx.beginPath()
        for (let x = 0; x <= W; x += 12) {
          const y = yBase + Math.sin(x * 0.006 + t * 0.7 + l.i * 0.3) * amp
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.setLineDash([l.dash, l.gap])
        ctx.lineDashOffset = -(t * 60 * l.speed + l.phase)
        ctx.strokeStyle = rgba(TAUPE, 0.18 + 0.25 * (1 - band))
        ctx.lineWidth = 1
        ctx.stroke()
      })
      ctx.setLineDash([])
    },
  }
}

// -------------------------------------------------------------- 6. calm
function makeCalm() {
  return {
    label: 'Calm (no effect)',
    desc: 'Just typography on paper with faint column lines — the most editorial, fastest-loading option. Lets the words do the work.',
    draw() {
      const cols = 12
      const pad = Math.min(120, W * 0.06)
      const w = (W - pad * 2) / cols
      ctx.strokeStyle = rgba(INK, 0.05)
      for (let i = 0; i <= cols; i++) {
        ctx.beginPath()
        ctx.moveTo(pad + i * w, 0)
        ctx.lineTo(pad + i * w, H)
        ctx.stroke()
      }
    },
  }
}

// ----------------------------------------------- 7. combo: rain + words
function makeCombo() {
  let noise = []
  let flock = []
  let cell = 20
  let ox = 0
  let oy = 0
  let current = -1
  return {
    label: '★ Combo: rain + words',
    desc: 'The best of both: a quiet rain of data points, from which dots fly together to spell SAP → DIGITAL → AI → CLARITY in your logo’s dot style — then scatter back into the rain. Noise resolving into clarity.',
    resize() {
      cell = Math.min((W * 0.94) / GRID_COLS, (H * 0.62) / 5)
      ox = (W - GRID_COLS * cell) / 2
      oy = (H - 5 * cell) / 2
      const n = Math.min(1600, Math.floor((W * H) / 900))
      noise = Array.from({ length: n }, () => ({ x: rand(0, W), y: rand(0, H), vy: rand(0.25, 1.1), s: rand(0, TAU) }))
      const most = Math.max(...WORDS.map((w) => wordCells(w).length))
      flock = Array.from({ length: most }, () => ({ x: rand(0, W), y: rand(0, H), vx: 0, vy: 0, tx: null, ty: null, delay: 0 }))
      current = -1
    },
    draw(t) {
      const period = 3.6
      const wi = Math.floor(t / period) % WORDS.length
      const ph = t % period

      // new word: release every dot into the rain, then hand out the new targets
      if (wi !== current) {
        current = wi
        const targets = wordCells(WORDS[wi]).sort(() => Math.random() - 0.5)
        flock.forEach((p, i) => {
          p.vx = rand(-6, 6)
          p.vy = rand(-6, 2)
          const tg = targets[i]
          p.tx = tg ? ox + tg.col * cell + cell / 2 : null
          p.ty = tg ? oy + tg.row * cell + cell / 2 : null
          p.delay = tg ? 0.45 + (tg.col / GRID_COLS) * 0.6 : 0
        })
      }

      // faint grid of empty cells — the "noise" dots from the logo
      ctx.fillStyle = rgba(TAUPE, 0.14)
      for (let r = 0; r < 5; r++)
        for (let c = 0; c < GRID_COLS; c++) {
          ctx.beginPath()
          ctx.arc(ox + c * cell + cell / 2, oy + r * cell + cell / 2, Math.max(1.2, cell * 0.06), 0, TAU)
          ctx.fill()
        }

      // background rain
      ctx.fillStyle = rgba(INK, 0.14)
      for (const p of noise) {
        p.y += p.vy
        p.x += Math.sin(t * 0.7 + p.s) * 0.2
        if (p.y > H + 3) {
          p.y = -3
          p.x = rand(0, W)
        }
        ctx.fillRect(p.x - 1, p.y - 1, 2, 2)
      }

      // the flock: scattered drift, then a spring into the letter cells
      const leaving = ph > period - 0.35
      for (const p of flock) {
        const homing = p.tx !== null && ph > p.delay && !leaving
        if (homing) {
          p.vx += (p.tx - p.x) * 0.045
          p.vy += (p.ty - p.y) * 0.045
          p.vx *= 0.78
          p.vy *= 0.78
        } else {
          p.vx *= 0.94
          p.vy = p.vy * 0.94 + 0.08
        }
        p.x += p.vx
        p.y += p.vy
        if (!homing && p.y > H + 10) {
          p.y = -10
          p.x = rand(0, W)
        }
        const d = p.tx === null ? 1 : Math.min(1, Math.hypot(p.tx - p.x, p.ty - p.y) / (cell * 3))
        const arrived = homing ? 1 - d : 0
        ctx.fillStyle = rgba(INK, 0.22 + 0.3 * arrived)
        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(1.4, cell * (0.08 + 0.24 * arrived)), 0, TAU)
        ctx.fill()
      }
    },
  }
}

// ------------------------------------------------------------ switching
const effects = {
  combo: makeCombo(),
  words: makeWords(),
  rain: makeRain(),
  glass: makeGlass(),
  ridges: makeRidges(),
  streams: makeStreams(),
  calm: makeCalm(),
}
const keys = Object.keys(effects)
let active = null

const tabs = document.getElementById('tabs')
const desc = document.getElementById('desc')
keys.forEach((k, i) => {
  const b = document.createElement('button')
  b.type = 'button'
  b.dataset.key = k
  b.className = 'caption rounded-lg px-3 py-2 text-[11px] transition-colors'
  b.textContent = `${i + 1} · ${effects[k].label}`
  b.addEventListener('click', () => select(k))
  tabs.appendChild(b)
})

function select(k) {
  active?.stop?.()
  active = effects[k]
  active.start?.()
  desc.textContent = active.desc
  tabs.querySelectorAll('button').forEach((b) => {
    const on = b.dataset.key === k
    b.classList.toggle('bg-ink', on)
    b.classList.toggle('text-paper', on)
    b.classList.toggle('text-taupe', !on)
    b.setAttribute('aria-pressed', on)
  })
  history.replaceState(null, '', `#${k}`)
}

window.addEventListener('keydown', (e) => {
  const i = Number(e.key) - 1
  if (i >= 0 && i < keys.length) select(keys[i])
})

const copy = document.getElementById('copy')
document.getElementById('toggle-copy').addEventListener('click', (e) => {
  const hidden = copy.classList.toggle('opacity-0')
  e.currentTarget.textContent = hidden ? 'Show text' : 'Hide text'
})

window.addEventListener('resize', resize)
resize()
select(keys.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'combo')

const start = performance.now()
function frame(now) {
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
  ctx.clearRect(0, 0, W, H)
  active.draw?.((now - start) / 1000)
  requestAnimationFrame(frame)
}
requestAnimationFrame(frame)
