// src/components/editorial/section-divider.tsx

interface SectionDividerProps {
  className?: string
}

/** Séparateur organique — ligne douce + motif léger. */
export function SectionDivider({ className = '' }: SectionDividerProps) {
  return (
    <div
      className={['mx-auto flex max-w-4xl flex-col items-center gap-3 px-4 py-10 sm:py-14', className].filter(Boolean).join(' ')}
      role="separator"
      aria-hidden
    >
      <svg viewBox="0 0 400 12" className="h-3 w-full max-w-md text-[var(--color-brand)]/25" fill="none" aria-hidden>
        <path
          d="M0 6 Q100 2 200 6 T400 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <div className="h-px w-24 bg-gradient-to-r from-transparent via-[var(--color-accent)]/35 to-transparent" />
    </div>
  )
}
