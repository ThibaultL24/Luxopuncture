// src/components/feather-cursor.tsx
import { useEffect, useRef, useState } from 'react'
import plumeSrc from '../assets/plume_curseur.png'

const FEATHER_ATTR = 'data-feather-cursor'
const DISPLAY_HEIGHT_PX = 56
/** Pointe de la plume ≈ hotspot (ajusté si DISPLAY_HEIGHT_PX change) */
const HOTSPOT_X = -16
const HOTSPOT_Y = -56
const LERP_SMOOTH = 0.14
const LERP_SNAP = 1
/** Inclinaison de base vers la droite (positif = sens horaire) */
const LEAN_RIGHT_DEG = 78
/** Nombre de « petites plumes » dans la traînée */
const TRAIL_SLOTS = 20
const SAMPLE_CAP = 36

/**
 * Peu d’éclat (traits lisibles) ; rouge-rose renforcé via hue + saturation ciblée.
 */
const FEATHER_TINT =
  'sepia(0.35) saturate(1.48) hue-rotate(314deg) brightness(0.88) contrast(1.16)'

const MAIN_FILTER = `${FEATHER_TINT} drop-shadow(0 0 0.5px rgb(48 12 32 / 0.75)) drop-shadow(0 0 1px rgb(95 42 68 / 0.42))`

function trailFilter(strength: number) {
  const a = 0.35 * strength
  return `${FEATHER_TINT} drop-shadow(0 0 0.5px rgb(58 20 42 / ${0.32 + a * 0.3}))`
}

export function FeatherCursor() {
  const mainRef = useRef<HTMLImageElement>(null)
  const trailRefs = useRef<(HTMLImageElement | null)[]>([])
  const targetRef = useRef({ x: -100, y: -100 })
  const posRef = useRef({ x: -100, y: -100 })
  const velRef = useRef({ x: 0, y: 0 })
  const samplesRef = useRef<{ x: number; y: number; angle: number }[]>([])
  const rafRef = useRef(0)
  const visibleRef = useRef(false)
  const [finePointer, setFinePointer] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    function sync() {
      setFinePointer(mq.matches)
    }
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!finePointer) return

    const root = document.documentElement
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lerp = reducedMotion ? LERP_SNAP : LERP_SMOOTH
    const trailCount = reducedMotion ? 0 : TRAIL_SLOTS

    root.setAttribute(FEATHER_ATTR, 'true')

    function onMove(e: MouseEvent) {
      const prevX = targetRef.current.x
      const prevY = targetRef.current.y
      targetRef.current = { x: e.clientX, y: e.clientY }
      velRef.current.x += e.clientX - prevX
      velRef.current.y += e.clientY - prevY
      visibleRef.current = true
    }

    function onLeave() {
      visibleRef.current = false
      samplesRef.current = []
    }

    function onEnter() {
      visibleRef.current = true
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    root.addEventListener('mouseleave', onLeave)
    root.addEventListener('mouseenter', onEnter)

    function tick(now: number) {
      velRef.current.x *= 0.88
      velRef.current.y *= 0.88

      const tx = targetRef.current.x
      const ty = targetRef.current.y
      posRef.current.x += (tx - posRef.current.x) * lerp
      posRef.current.y += (ty - posRef.current.y) * lerp

      const vx = velRef.current.x
      const vy = velRef.current.y
      const tilt = Math.max(-22, Math.min(22, vx * 0.35 + vy * 0.06))
      const sway = reducedMotion ? 0 : Math.sin(now / 720) * 5
      const bob = reducedMotion ? 0 : Math.sin(now / 500) * 1.2
      const angle = tilt + sway + LEAN_RIGHT_DEG

      const px = posRef.current.x + bob
      const py = posRef.current.y

      const mainEl = mainRef.current
      if (mainEl) {
        mainEl.style.transform = `translate3d(${px}px, ${py}px, 0) translate(${HOTSPOT_X}px, ${HOTSPOT_Y}px) rotate(${angle}deg)`
        mainEl.style.opacity = visibleRef.current ? '1' : '0'
      }

      samplesRef.current.unshift({ x: px, y: py, angle: tilt + sway })
      if (samplesRef.current.length > SAMPLE_CAP) {
        samplesRef.current.length = SAMPLE_CAP
      }

      const v = visibleRef.current ? 1 : 0
      for (let i = 0; i < TRAIL_SLOTS; i++) {
        const el = trailRefs.current[i]
        if (!el) continue
        if (!trailCount || !v) {
          el.style.opacity = '0'
          continue
        }
        const s = samplesRef.current[i + 1]
        if (!s) {
          el.style.opacity = '0'
          continue
        }
        const t = i / (TRAIL_SLOTS - 1 || 1)
        const fade = 1 - t
        const opacity = (0.035 + fade * 0.3) * v
        const scale = 0.16 + fade * 0.4
        const drift = reducedMotion ? 0 : Math.sin(now / 380 + i * 0.7) * (0.6 + t)
        const angleTrail = s.angle * (0.88 - t * 0.12) + drift * 0.4 + LEAN_RIGHT_DEG
        el.style.opacity = String(opacity)
        el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) translate(${HOTSPOT_X * scale}px, ${HOTSPOT_Y * scale}px) rotate(${angleTrail}deg) scale(${scale})`
        el.style.filter = trailFilter(fade)
      }

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      root.removeEventListener('mouseleave', onLeave)
      root.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(rafRef.current)
      root.removeAttribute(FEATHER_ATTR)
      samplesRef.current = []
    }
  }, [finePointer])

  if (!finePointer) return null

  return (
    <>
      {Array.from({ length: TRAIL_SLOTS }, (_, i) => (
        <img
          key={`trail-${i}`}
          ref={(el) => {
            trailRefs.current[i] = el
          }}
          src={plumeSrc}
          alt=""
          aria-hidden
          draggable={false}
          width={52}
          height={DISPLAY_HEIGHT_PX}
          className="pointer-events-none fixed left-0 top-0 z-[10049] h-[42px] w-auto select-none will-change-transform [backface-visibility:hidden]"
          style={{
            opacity: 0,
            transformOrigin: '50% 100%',
          }}
        />
      ))}
      <img
        ref={mainRef}
        src={plumeSrc}
        alt=""
        aria-hidden
        draggable={false}
        width={72}
        height={DISPLAY_HEIGHT_PX}
        className="pointer-events-none fixed left-0 top-0 z-[10050] h-[56px] w-auto select-none will-change-transform [backface-visibility:hidden]"
        style={{
          opacity: 0,
          transformOrigin: '50% 100%',
          filter: MAIN_FILTER,
        }}
      />
    </>
  )
}
