// src/hooks/use-reveal.ts
import { useEffect, useRef, useState } from 'react'

const defaultOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px 0px -48px 0px',
  threshold: 0.08,
}

export interface UseRevealOptions {
  /**
   * Si true : une fois visible, ne repasse pas en état « caché » quand le bloc sort du viewport
   * (évite que le hero redevienne invisible au scroll). Par défaut false : l’animation peut se rejouer.
   */
  keepVisible?: boolean
}

export function useReveal(options: UseRevealOptions = {}) {
  const { keepVisible = false } = options
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const pendingRaf = useRef<{ r1: number; r2: number }>({ r1: 0, r2: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function cancelRevealRaf() {
      cancelAnimationFrame(pendingRaf.current.r1)
      cancelAnimationFrame(pendingRaf.current.r2)
      pendingRaf.current.r1 = 0
      pendingRaf.current.r2 = 0
    }

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry) return
      if (entry.isIntersecting) {
        cancelRevealRaf()
        pendingRaf.current.r1 = requestAnimationFrame(() => {
          pendingRaf.current.r2 = requestAnimationFrame(() => {
            setIsVisible(true)
          })
        })
        return
      }
      cancelRevealRaf()
      if (!keepVisible) setIsVisible(false)
    }, defaultOptions)

    obs.observe(el)
    return () => {
      cancelRevealRaf()
      obs.disconnect()
    }
  }, [keepVisible])

  return { ref, isVisible }
}
