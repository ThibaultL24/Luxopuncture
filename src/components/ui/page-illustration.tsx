// src/components/ui/page-illustration.tsx
interface PageIllustrationProps {
  src: string
  alt: string
  /** Hauteur visuelle max du bandeau (ratio large) */
  priority?: boolean
}

export function PageIllustration({ src, alt, priority = false }: PageIllustrationProps) {
  return (
    <figure className="mb-10 overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)] shadow-sm">
      <div className="aspect-[2/1] max-h-56 w-full sm:aspect-[2.2/1] sm:max-h-72">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          width={1200}
          height={550}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          {...(priority ? { fetchPriority: 'high' as const } : {})}
        />
      </div>
    </figure>
  )
}
