// src/components/written-reviews-marquee.tsx
import { useSiteData } from '../contexts/admin-context'
import { resolveReviewCaptureSlides } from '../lib/review-captures'

export function WrittenReviewsMarquee() {
  const state = useSiteData()
  const slides = resolveReviewCaptureSlides(state)
  const strip = [...slides, ...slides]

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-transparent py-6 shadow-sm">
      <div className="reviews-marquee-track flex gap-8 px-4 md:gap-12">
        {strip.map((slide, i) => (
          <figure
            key={`${slide.src}-${i}`}
            className="w-[min(100%,15rem)] shrink-0 overflow-hidden rounded-xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)] shadow-sm sm:w-[17rem]"
          >
            <img
              src={slide.src}
              alt={slide.alt || `Avis client ${i + 1}`}
              loading="lazy"
              decoding="async"
              className="h-auto w-full object-contain"
            />
          </figure>
        ))}
      </div>
    </div>
  )
}
