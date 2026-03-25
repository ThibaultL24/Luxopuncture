// src/components/editorial/editorial-quote.tsx

interface EditorialQuoteProps {
  quote: string
  className?: string
  /** default = carte discrète ; featured = hors flux, guillemet géant, plus d’impact */
  variant?: 'default' | 'featured'
}

export function EditorialQuote({ quote, className = '', variant = 'default' }: EditorialQuoteProps) {
  if (variant === 'featured') {
    return (
      <div className={['relative mx-auto max-w-4xl px-2 sm:px-0', className].filter(Boolean).join(' ')}>
        <span
          aria-hidden
          className="pointer-events-none absolute -left-1 top-[-0.15em] font-display text-[clamp(4rem,14vw,9rem)] leading-none text-[var(--color-brand)]/[0.12] sm:-left-4 md:-left-8"
        >
          “
        </span>
        <blockquote className="relative z-[1] max-w-3xl font-display text-xl italic leading-relaxed text-[var(--color-ink)] sm:text-2xl lg:-translate-x-6 lg:pl-4 xl:-translate-x-10 xl:text-[1.65rem]">
          {quote}
        </blockquote>
      </div>
    )
  }

  return (
    <blockquote
      className={[
        'mx-auto max-w-2xl border-l-[3px] border-[var(--color-brand)]/35 bg-[var(--color-surface)]/80 py-5 pl-6 pr-5 font-display text-lg italic leading-relaxed text-[var(--color-ink)] shadow-[var(--shadow-soft)] sm:pl-8 sm:text-xl',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {quote}
    </blockquote>
  )
}
