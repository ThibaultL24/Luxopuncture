// src/components/editorial/reveal-on-scroll.tsx
import type { ReactNode } from 'react'
import { useReveal } from '../../hooks/use-reveal'

type RevealVariant = 'fade-up' | 'fade' | 'slide-left' | 'slide-right' | 'scale'

interface RevealOnScrollProps {
  children: ReactNode
  className?: string
  variant?: RevealVariant
  /** Empêche de repasser en état caché au scroll (ex. hero en haut de page). */
  keepVisible?: boolean
}

const variantClass: Record<RevealVariant, string> = {
  'fade-up': 'reveal reveal--fade-up',
  fade: 'reveal reveal--fade',
  'slide-left': 'reveal reveal--slide-left',
  'slide-right': 'reveal reveal--slide-right',
  scale: 'reveal reveal--scale',
}

export function RevealOnScroll({
  children,
  className = '',
  variant = 'fade-up',
  keepVisible = false,
}: RevealOnScrollProps) {
  const { ref, isVisible } = useReveal({ keepVisible })

  return (
    <div
      ref={ref}
      className={[
        variantClass[variant],
        isVisible ? 'reveal--visible' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}
