// src/components/ui/section-heading.tsx
interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <div className={`mb-12 max-w-3xl ${alignClass}`}>
      {eyebrow ? (
        <p className="mb-3 inline-block border-b border-[var(--color-accent)]/45 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold text-[var(--color-ink)] sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-lg leading-relaxed text-[var(--color-body)]/90">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
