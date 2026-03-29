// src/components/feather-cursor.tsx
import { useEffect, useRef, useState } from 'react'
import plumeSrc from '../assets/plume_curseur.png'

const FEATHER_ATTR = 'data-feather-cursor'
const DISPLAY_WIDTH_PX = 72
const DISPLAY_HEIGHT_PX = 56
/**
 * PNG source carré 720×720 ; la tige (calame) utile au pointeur est en bas à droite.
 * Coordonnées source du calame → espace d’affichage width×height.
 */
const SOURCE_PX = 720
const STEM_SOURCE_X = 495
const STEM_SOURCE_Y = 555
const STEM_X = (STEM_SOURCE_X * DISPLAY_WIDTH_PX) / SOURCE_PX
const STEM_Y = (STEM_SOURCE_Y * DISPLAY_HEIGHT_PX) / SOURCE_PX
const STEM_ORIGIN_CSS = `${STEM_X}px ${STEM_Y}px`
/** Décalage Y léger de la traînée (ajuster si besoin après changement de tige) */
const TRAIL_Y_OFFSET_PX = 0
/** Rapproche les premiers segments de la position actuelle de la plume (0 = désactivé) */
const TRAIL_HEAD_GLUE = 0.38
const TRAIL_HEAD_GLUE_FALLOFF = 7
/** Plus élevé = la plume colle davantage au pointeur (moins de retard visuel). */
const LERP_SMOOTH = 0.26
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
      const bob = reducedMotion ? 0 : Math.sin(now / 500) * 0.45
      const angle = tilt + sway + LEAN_RIGHT_DEG

      const px = posRef.current.x + bob
      const py = posRef.current.y

      const mainEl = mainRef.current
      if (mainEl) {
        mainEl.style.transform = `translate3d(${px - STEM_X}px, ${py - STEM_Y}px, 0) rotate(${angle}deg)`
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
        const head = samplesRef.current[0]
        const glue = Math.max(0, 1 - i / TRAIL_HEAD_GLUE_FALLOFF) * TRAIL_HEAD_GLUE
        const x = s.x + (head.x - s.x) * glue
        const y = s.y + (head.y - s.y) * glue
        const t = i / (TRAIL_SLOTS - 1 || 1)
        const fade = 1 - t
        const opacity = (0.035 + fade * 0.3) * v
        const scale = 0.16 + fade * 0.4
        const driftAmp = i < 4 ? 0.22 : 1
        const drift =
          reducedMotion ? 0 : Math.sin(now / 380 + i * 0.7) * (0.6 + t) * driftAmp
        const angleBase = s.angle + (head.angle - s.angle) * glue * 0.5
        const angleTrail = angleBase * (0.88 - t * 0.12) + drift * 0.3 + LEAN_RIGHT_DEG
        el.style.opacity = String(opacity)
        el.style.transform = `translate3d(${x}px, ${y + TRAIL_Y_OFFSET_PX}px, 0) translate(${-STEM_X}px, ${-STEM_Y}px) rotate(${angleTrail}deg) scale(${scale})`
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
          width={DISPLAY_WIDTH_PX}
          height={DISPLAY_HEIGHT_PX}
          className="pointer-events-none fixed left-0 top-0 z-[10070] h-[56px] w-auto select-none will-change-transform [backface-visibility:hidden]"
          style={{
            opacity: 0,
            transformOrigin: STEM_ORIGIN_CSS,
          }}
        />
      ))}
      <img
        ref={mainRef}
        src={plumeSrc}
        alt=""
        aria-hidden
        draggable={false}
        width={DISPLAY_WIDTH_PX}
        height={DISPLAY_HEIGHT_PX}
        className="pointer-events-none fixed left-0 top-0 z-[10071] h-[56px] w-auto select-none will-change-transform [backface-visibility:hidden]"
        style={{
          opacity: 0,
          transformOrigin: STEM_ORIGIN_CSS,
          filter: MAIN_FILTER,
        }}
      />
    </>
  )
}
