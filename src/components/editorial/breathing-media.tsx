// src/components/editorial/breathing-media.tsx

interface BreathingMediaProps {
  src: string
  alt: string
  className?: string
}

/** Image « ambiance » entre sections — respiration visuelle sans charge informative. */
export function BreathingMedia({ src, alt, className = '' }: BreathingMediaProps) {
  return (
    <figure
      className={['mx-auto my-16 max-w-5xl overflow-hidden rounded-2xl px-4 opacity-[0.92] sm:my-20 sm:px-6', className].filter(Boolean).join(' ')}
    >
      <img
        src={src}
        alt={alt}
        width={1200}
        height={640}
        className="h-auto w-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </figure>
  )
}
