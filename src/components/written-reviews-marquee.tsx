// src/components/written-reviews-marquee.tsx
import { useState } from 'react'
import { useSiteData } from '../hooks/use-admin'
import { resolveReviewCaptureSlides } from '../lib/review-captures'
import { ReviewCaptureLightbox } from './review-capture-lightbox'

export function WrittenReviewsMarquee() {
  const state = useSiteData()
  const slides = resolveReviewCaptureSlides(state)
  const strip = [...slides, ...slides]
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-transparent py-6 shadow-sm">
      <div className="reviews-marquee-track flex gap-8 px-4 md:gap-12">
        {strip.map((slide, i) => (
          <figure
            key={`${slide.src}-${i}`}
            className="w-[min(100%,15rem)] shrink-0 overflow-hidden rounded-xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)] shadow-sm sm:w-[17rem]"
          >
            <button
              type="button"
              onClick={() => setLightbox({ src: slide.src, alt: slide.alt })}
              className="group block w-full cursor-zoom-in text-left transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
              aria-haspopup="dialog"
              title="Cliquer pour lire l’avis en grand"
            >
              <img
                src={slide.src}
                alt={slide.alt || `Avis client ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="h-auto w-full object-contain transition group-hover:brightness-[1.02]"
              />
            </button>
          </figure>
        ))}
      </div>

      <ReviewCaptureLightbox
        open={lightbox !== null}
        onClose={() => setLightbox(null)}
        src={lightbox?.src ?? ''}
        alt={lightbox?.alt ?? ''}
      />
    </div>
  )
}
