// src/hooks/use-reveal.ts
import { useEffect, useRef, useState } from 'react'

const defaultOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px 0px -48px 0px',
  threshold: 0.08,
}

export function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) setIsVisible(true)
    }, defaultOptions)

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return { ref, isVisible }
}
