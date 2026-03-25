// src/components/editorial/section-gradient-spacer.tsx

interface SectionGradientSpacerProps {
  className?: string
}

/** Transition douce entre blocs denses (ligne + léger dégradé). */
export function SectionGradientSpacer({ className = '' }: SectionGradientSpacerProps) {
  return (
    <div
      className={['mx-auto max-w-4xl px-6 py-10 sm:py-14', className].filter(Boolean).join(' ')}
      role="separator"
      aria-hidden
    >
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)]/35 to-transparent" />
    </div>
  )
}
