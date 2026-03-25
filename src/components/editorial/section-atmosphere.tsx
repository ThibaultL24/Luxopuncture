// src/components/editorial/section-atmosphere.tsx
import type { ReactNode } from 'react'

export type AtmosphereVariant = 'soft' | 'medium' | 'strong'
export type AtmospherePlacement = 'both' | 'left' | 'right' | 'center' | 'diagonal'

interface SectionAtmosphereProps {
  children: ReactNode
  className?: string
  variant?: AtmosphereVariant
  placement?: AtmospherePlacement
}

const green: Record<AtmosphereVariant, string> = {
  soft: 'rgb(35 65 59 / 0.07)',
  medium: 'rgb(35 65 59 / 0.12)',
  strong: 'rgb(35 65 59 / 0.2)',
}

const rose: Record<AtmosphereVariant, string> = {
  soft: 'rgb(196 168 152 / 0.12)',
  medium: 'rgb(196 168 152 / 0.2)',
  strong: 'rgb(196 168 152 / 0.28)',
}

const blur: Record<AtmosphereVariant, string> = {
  soft: 'blur-3xl',
  medium: 'blur-[80px]',
  strong: 'blur-[120px]',
}

/** Couches radiales : intensités + placements pour varier le relief. */
export function SectionAtmosphere({
  children,
  className = '',
  variant = 'soft',
  placement = 'both',
}: SectionAtmosphereProps) {
  const g = green[variant]
  const ro = rose[variant]
  const b = blur[variant]

  const blobGreen = (pos: string) => (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full ${b} ${pos}`}
      style={{
        background: `radial-gradient(circle at center, ${g} 0%, transparent 68%)`,
      }}
    />
  )

  const blobRose = (pos: string) => (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full ${b} ${pos}`}
      style={{
        background: `radial-gradient(circle at center, ${ro} 0%, transparent 70%)`,
      }}
    />
  )

  return (
    <div className={['relative isolate overflow-hidden', className].filter(Boolean).join(' ')}>
      {placement === 'both' && (
        <>
          {blobGreen('-left-1/4 top-0 h-[min(28rem,50vw)] w-[min(36rem,90vw)]')}
          {blobRose('-right-1/4 bottom-0 h-[min(24rem,45vw)] w-[min(32rem,85vw)]')}
        </>
      )}
      {placement === 'left' && blobGreen('-left-[20%] top-1/4 h-[min(32rem,55vw)] w-[min(40rem,95vw)]')}
      {placement === 'right' && blobRose('-right-[15%] top-0 h-[min(30rem,52vw)] w-[min(38rem,92vw)]')}
      {placement === 'center' && (
        <div
          aria-hidden
          className={`pointer-events-none absolute left-1/2 top-1/2 h-[min(36rem,80vw)] w-[min(44rem,95vw)] -translate-x-1/2 -translate-y-1/2 rounded-full ${b}`}
          style={{
            background: `radial-gradient(circle at center, ${g} 0%, transparent 65%)`,
          }}
        />
      )}
      {placement === 'diagonal' && (
        <>
          {blobGreen('-left-[10%] -top-[10%] h-[min(26rem,48vw)] w-[min(34rem,88vw)]')}
          {blobRose('right-0 bottom-0 h-[min(28rem,50vw)] w-[min(36rem,90vw)]')}
        </>
      )}
      <div className="relative z-[1]">{children}</div>
    </div>
  )
}
