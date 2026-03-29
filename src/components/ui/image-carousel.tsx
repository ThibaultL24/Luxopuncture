// src/components/ui/image-carousel.tsx
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useId, useState } from 'react'

interface ImageCarouselSlide {
  src: string
  alt: string
}

interface ImageCarouselProps {
  images: readonly ImageCarouselSlide[]
  className?: string
}

export function ImageCarousel({ images, className = '' }: ImageCarouselProps) {
  const baseId = useId()
  const [index, setIndex] = useState(0)
  const count = images.length

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + count) % count)
    },
    [count],
  )

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [go])

  if (count === 0) return null

  const current = images[index]

  return (
    <div className={className}>
      <div
        className="relative overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)] shadow-sm"
        role="region"
        aria-roledescription="carrousel"
        aria-label="Galerie d’images"
      >
        <div className="aspect-[16/10] w-full sm:aspect-[16/9]">
          <img
            src={current.src}
            alt={current.alt}
            width={1600}
            height={900}
            className="h-full w-full object-contain object-center"
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
        {count > 1 ? (
          <>
            <button
              type="button"
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-[var(--color-brand)]/85 text-white shadow-md transition hover:bg-[var(--color-brand)]"
              onClick={() => go(-1)}
              aria-label="Image précédente"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden />
            </button>
            <button
              type="button"
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-[var(--color-brand)]/85 text-white shadow-md transition hover:bg-[var(--color-brand)]"
              onClick={() => go(1)}
              aria-label="Image suivante"
            >
              <ChevronRight className="h-6 w-6" aria-hidden />
            </button>
          </>
        ) : null}
      </div>
      {count > 1 ? (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2" aria-label="Choisir une image">
          {images.map((_, i) => (
            <button
              key={`${baseId}-dot-${i}`}
              type="button"
              aria-current={i === index ? 'true' : undefined}
              aria-label={`Image ${i + 1} sur ${count}`}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? 'w-8 bg-[var(--color-brand)]' : 'w-2.5 bg-[var(--color-brand)]/30 hover:bg-[var(--color-brand)]/50'
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
