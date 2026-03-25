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
      <h2 className="font-display text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-5 text-lg leading-relaxed text-[var(--color-body)]/90 sm:text-xl">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
