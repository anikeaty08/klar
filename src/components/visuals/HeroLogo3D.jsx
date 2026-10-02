import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap, introDelay, isIntroDone, ScrollTrigger } from '../../lib/motion'
import { prefersReducedMotion } from '../../lib/useCanvas'

/*
 * Full-screen hero 3D (three.js). One pool of glossy particles forms the original
 * brand marks — the "KDL." icon and the "KlarDataLabs." logo — sampled straight
 * from the artwork.
 *   open        → particles fly in from all over the screen and assemble into KDL.
 *   every ~7 s  → the mark breaks apart across the whole screen, fades, and
 *                 rebuilds as the other mark
 *   click / tap → switch marks now
 *   drag        → spin it in 3D (it settles back to face you)
 *   hover       → particles near the pointer swell and lean out
 *   scroll      → while the hero is pinned, the mark breaks apart full screen and fades
 *
 * `scrollEnd` must match the pinned length the Hero uses.
 */

const ARTWORK = [
  { src: '/brand/kdl-icon.png', crop: { y0: 168, y1: 326 }, width: 3.9, step: 6, ink: 0.05, red: 0.06 },
  { src: '/brand/klar-logo.png', crop: { y0: 28, y1: 134 }, width: 5.4, step: 5, ink: 0.034, red: 0.05 },
]
const INK = new THREE.Color(0x06141b)
const RED = new THREE.Color(0xe8322b)
const CAMERA_Z = 11

function sampleShape(img, art, step) {
  const c = document.createElement('canvas')
  c.width = img.naturalWidth
  c.height = img.naturalHeight
  const g = c.getContext('2d', { willReadFrequently: true })
  g.drawImage(img, 0, 0)
  const { data } = g.getImageData(0, 0, c.width, c.height)
  const pts = { ink: [], red: [] }
  let minX = Infinity
  let maxX = -Infinity
  for (let y = art.crop.y0; y < art.crop.y1; y += step) {
    for (let x = 0; x < c.width; x += step) {
      const i = (y * c.width + x) * 4
      const [r, gr, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]]
      if (a < 128) continue
      const kind = r > 170 && gr < 100 && b < 100 ? 'red' : r < 110 && gr < 110 && b < 110 ? 'ink' : null
      if (!kind) continue
      pts[kind].push([x, y])
      minX = Math.min(minX, x)
      maxX = Math.max(maxX, x)
    }
  }
  const scale = art.width / (maxX - minX)
  const cx = (minX + maxX) / 2
  const cy = (art.crop.y0 + art.crop.y1) / 2
  const toV = ([x, y]) => new THREE.Vector3((x - cx) * scale, (cy - y) * scale, (Math.random() - 0.5) * 0.22)
  return { ink: pts.ink.map(toV), red: pts.red.map(toV), inkScale: art.ink, redScale: art.red, width: art.width }
}

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })

export default function HeroLogo3D({ scrollEnd = '+=90%' }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const section = mount.closest('section')
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)
    const el = renderer.domElement
    el.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;touch-action:pan-y;cursor:grab'

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
    camera.position.set(0, 0, CAMERA_Z)
    scene.add(new THREE.HemisphereLight(0xffffff, 0xc7bdb2, 1.6))
    const key = new THREE.DirectionalLight(0xffffff, 2.6)
    key.position.set(4, 5, 6)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0xffffff, 1.1)
    rim.position.set(-5, -2, -4)
    scene.add(rim)

    const still = prefersReducedMotion()
    // from/to: shape indices; t: progress of the current change; burst: opening scatter; scroll: pinned break-apart
    // first visit: the mark bursts in from across the screen; later remounts (language switch) start assembled
    const replay = isIntroDone()
    const state = { from: 0, to: 0, t: 1, burst: still || replay ? 0 : 1, scroll: 0 }
    const pointer = { x: 9, y: 9, inside: false }
    const drag = { on: false, lastX: 0, vel: 0, moved: 0, downAt: 0 }
    const place = { x: 0, y: 0, scale: 1, visW: 10, visH: 6 } // where the mark sits on screen
    let angle = 0
    let shapes = []
    let dots = []
    let mesh = null
    let geo = null
    let mat = null
    let cycleTimer = 0
    let disposed = false

    const setScatter = (d) => {
      d.scatter.set((Math.random() - 0.5) * place.visW * 1.15, (Math.random() - 0.5) * place.visH * 1.15, -4 + Math.random() * 7)
    }
    // full-screen canvas; the mark sits on the right on desktop, at the top on phones
    const layout = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      place.visH = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * CAMERA_Z
      place.visW = place.visH * camera.aspect
      const wide = w >= 1024
      place.scale = wide ? Math.min(1.15, (place.visW * 0.4) / 5.4) : Math.min(1, (place.visW * 0.86) / 5.4)
      place.x = wide ? place.visW * 0.22 : 0
      place.y = wide ? 0 : place.visH * 0.23
      dots.forEach(setScatter) // fresh full-screen scatter targets for the new size
    }

    // ---- mark changes
    const goTo = (next) => {
      if (!mesh) return
      gsap.killTweensOf(state, 't')
      state.from = state.t > 0.5 ? state.to : state.from
      state.to = next
      state.t = 0
      dots.forEach(setScatter)
      gsap.to(state, { t: 1, duration: 3, ease: 'none' })
    }
    const scheduleCycle = (wait) => {
      clearTimeout(cycleTimer)
      cycleTimer = setTimeout(() => {
        goTo((state.to + 1) % shapes.length)
        scheduleCycle(7000)
      }, wait)
    }

    // ---- build once the artwork has loaded
    const mobile = window.innerWidth < 768
    Promise.all(ARTWORK.map((a) => loadImage(a.src)))
      .then((imgs) => {
        if (disposed) return
        shapes = imgs.map((img, i) => sampleShape(img, ARTWORK[i], ARTWORK[i].step + (mobile ? 1 : 0)))
        const poolInk = Math.max(...shapes.map((s) => s.ink.length))
        const poolRed = Math.max(...shapes.map((s) => s.red.length))
        const make = (kind, i) => ({
          kind,
          targets: shapes.map((s) => {
            const list = s[kind]
            const base = kind === 'red' ? s.redScale : s.inkScale
            // the first particle on a point is drawn full size; extras hide inside it
            return { pos: list[i % list.length], scale: i < list.length ? base : base * 0.55 }
          }),
          scatter: new THREE.Vector3(),
          delay: Math.random() * 0.35,
          pos: new THREE.Vector3(),
          vel: new THREE.Vector3(),
          swell: 0,
        })
        dots = [...Array.from({ length: poolInk }, (_, i) => make('ink', i)), ...Array.from({ length: poolRed }, (_, i) => make('red', i))]

        geo = new THREE.IcosahedronGeometry(1, 2)
        mat = new THREE.MeshStandardMaterial({ roughness: 0.28, metalness: 0.15, transparent: true })
        mesh = new THREE.InstancedMesh(geo, mat, dots.length)
        layout()
        dots.forEach((d, i) => {
          mesh.setColorAt(i, d.kind === 'red' ? RED : INK)
          if (replay) d.pos.set(place.x, place.y, 0)
          else d.pos.copy(d.scatter) // start spread over the whole screen
        })
        mesh.instanceColor.needsUpdate = true
        scene.add(mesh)

        if (still) return render(0)
        gsap.to(state, { burst: 0, duration: 2.6, ease: 'expo.out', delay: Math.max(0, introDelay() - 0.3) })
        scheduleCycle((introDelay() + 5) * 1000)
      })
      .catch(() => {})
    layout()
    const ro = new ResizeObserver(layout)
    ro.observe(mount)

    // ---- interaction (anywhere on the hero that isn't text or a button)
    const ndc = (e) => {
      const r = el.getBoundingClientRect()
      return [((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1)]
    }
    const onMove = (e) => {
      ;[pointer.x, pointer.y] = ndc(e)
      pointer.inside = true
      if (drag.on) {
        const dx = e.clientX - drag.lastX
        drag.vel = dx * 0.009
        angle += drag.vel
        drag.moved += Math.abs(dx)
        drag.lastX = e.clientX
      }
    }
    const onDown = (e) => {
      drag.on = true
      drag.lastX = e.clientX
      drag.moved = 0
      drag.downAt = performance.now()
      el.style.cursor = 'grabbing'
    }
    const onUp = () => {
      if (!drag.on) return
      drag.on = false
      el.style.cursor = 'grab'
      if (drag.moved < 6 && performance.now() - drag.downAt < 300 && mesh) {
        goTo((state.to + 1) % shapes.length)
        scheduleCycle(9000)
      }
    }
    const onLeave = () => (pointer.inside = false)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    el.addEventListener('pointerleave', onLeave)

    // the Hero pins itself for `scrollEnd`; over that distance the mark breaks apart and fades
    const st = ScrollTrigger.create({ trigger: section, start: 'top top', end: scrollEnd, onUpdate: (s) => (state.scroll = s.progress) })

    // ---- frame
    const m4 = new THREE.Matrix4()
    const q = new THREE.Quaternion()
    const sc = new THREE.Vector3()
    const target = new THREE.Vector3()
    const tmp = new THREE.Vector3()
    const proj = new THREE.Vector3()
    const rot = new THREE.Euler()
    const ease = (v) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2)
    const clamp01 = (v) => Math.min(1, Math.max(0, v))

    function render(t) {
      if (mesh) {
        const sway = Math.sin(t * 0.35) * (state.to === shapes.length - 1 ? 0.18 : 0.4)
        rot.set(0.08 + Math.sin(t * 0.4) * 0.05, angle + sway, 0)
        dots.forEach((d, i) => {
          const a = d.targets[state.from]
          const b = d.targets[state.to]
          const mm = ease(clamp01((state.t - d.delay) / 0.65))
          // the mark, rotated, scaled and placed on screen
          target.lerpVectors(a.pos, b.pos, mm).applyEuler(rot).multiplyScalar(place.scale)
          target.x += place.x
          target.y += place.y + Math.sin(t * 1.1 + i * 0.13) * 0.015

          // break apart across the full screen: mid-change, the opening, and the pinned scroll
          const apart = Math.max(Math.sin(Math.PI * mm), state.burst, ease(clamp01(state.scroll * 1.3)))
          target.lerp(d.scatter, apart)

          proj.copy(d.pos).project(camera)
          const near = pointer.inside ? Math.max(0, 1 - Math.hypot((proj.x - pointer.x) * camera.aspect, proj.y - pointer.y) / 0.22) : 0
          d.swell += (near - d.swell) * 0.15
          target.z += d.swell * 0.5

          d.vel.addScaledVector(tmp.subVectors(target, d.pos), 0.07)
          d.vel.multiplyScalar(0.8)
          d.pos.add(d.vel)
          // particles shrink as they scatter, so the mark seems to dissolve and fade
          const size = THREE.MathUtils.lerp(a.scale, b.scale, mm) * place.scale * (1 - apart * 0.55) * (1 + d.swell * 0.9)
          sc.setScalar(size)
          m4.compose(d.pos, q, sc)
          mesh.setMatrixAt(i, m4)
        })
        mesh.instanceMatrix.needsUpdate = true
        mat.opacity = 1 - clamp01((state.scroll - 0.45) / 0.55)
      }
      renderer.render(scene, camera)
    }

    const timer = new THREE.Timer()
    let raf = 0
    let running = false
    const frame = (now) => {
      timer.update(now)
      if (!drag.on) {
        drag.vel *= 0.93
        angle += drag.vel
        if (Math.abs(drag.vel) < 0.008) {
          const front = Math.round(angle / (Math.PI * 2)) * Math.PI * 2
          angle += (front - angle) * 0.04
        }
      }
      render(timer.getElapsed())
      if (running) raf = requestAnimationFrame(frame)
    }

    let io
    if (!still) {
      io = new IntersectionObserver(([e]) => {
        running = e.isIntersecting
        cancelAnimationFrame(raf)
        if (running) raf = requestAnimationFrame(frame)
      })
      io.observe(mount)
    }

    return () => {
      disposed = true
      running = false
      cancelAnimationFrame(raf)
      clearTimeout(cycleTimer)
      io?.disconnect()
      ro.disconnect()
      st.kill()
      gsap.killTweensOf(state)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointerleave', onLeave)
      geo?.dispose()
      mat?.dispose()
      mesh?.dispose()
      renderer.dispose()
      el.remove()
    }
  }, [scrollEnd])

  return <div ref={mountRef} aria-hidden="true" className="absolute inset-0" />
}
