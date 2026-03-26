// src/components/layout/open-dyslexic-toggle.tsx
import { useId } from 'react'
import { useOpenDyslexicFont } from '../../hooks/use-open-dyslexic-font'

interface OpenDyslexicToggleProps {
  variant?: 'footer' | 'admin'
}

export function OpenDyslexicToggle({ variant = 'footer' }: OpenDyslexicToggleProps) {
  const { enabled, setEnabled } = useOpenDyslexicFont()
  const isFooter = variant === 'footer'
  const labelId = useId()
  const hintId = useId()

  return (
    <div
      className={
        isFooter
          ? 'flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-white/10 px-4 py-3 text-center'
          : 'flex flex-col gap-3 rounded-xl border border-[var(--color-brand)]/12 bg-white/90 px-3 py-2.5 shadow-sm sm:flex-row sm:flex-wrap sm:items-center'
      }
    >
      <p
        className={`text-xs leading-snug ${isFooter ? 'max-w-md text-white/75' : 'text-[var(--color-body)]/90'}`}
        id={labelId}
      >
        <span className="font-semibold text-inherit">Police OpenDyslexic</span>
        {isFooter ? ' — ' : ' '}
        <span className="font-normal">
          Facilite la lecture pour certaines personnes (dyslexie, fatigue visuelle).
        </span>
      </p>
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-labelledby={labelId}
          aria-describedby={hintId}
          onClick={() => setEnabled(!enabled)}
          className={
            isFooter
              ? `relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border px-1 transition-colors focus-visible:outline focus-visible:ring-2 focus-visible:ring-[var(--color-cta)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand)] ${
                  enabled ? 'border-white/40 bg-[var(--color-cta)]' : 'border-white/25 bg-white/15'
                }`
              : `relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border px-1 transition-colors focus-visible:outline focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] ${
                  enabled ? 'border-[var(--color-brand)]/35 bg-[var(--color-muted-green)]' : 'border-[var(--color-brand)]/20 bg-[var(--color-beige)]/50'
                }`
          }
        >
          <span
            className={`inline-block h-5 w-5 rounded-full bg-white shadow ${enabled ? 'ml-auto' : ''}`}
            aria-hidden
          />
        </button>
        <span className={`text-xs font-medium tabular-nums ${isFooter ? 'text-white/90' : 'text-[var(--color-ink)]'}`}>
          {enabled ? 'Activée' : 'Désactivée'}
        </span>
      </div>
      <p className="sr-only" id={hintId}>
        Police conçue pour améliorer la lisibilité des textes. Licence libre SIL OFL.
      </p>
    </div>
  )
}
