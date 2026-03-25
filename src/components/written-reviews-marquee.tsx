// src/components/written-reviews-marquee.tsx
import { avisSiteFilenames, avisSiteImageSrc } from '../data/avis-site'

interface WrittenReviewsMarqueeProps {
  /** Bandeau extérieur : page (blanc cassé) ou beige — choisir l’inverse du fond de section pour le contraste. */
  outerSurface?: 'page' | 'beige'
}

export function WrittenReviewsMarquee({ outerSurface = 'page' }: WrittenReviewsMarqueeProps) {
  const strip = [...avisSiteFilenames, ...avisSiteFilenames]
  const outerBg =
    outerSurface === 'beige' ? 'bg-[var(--color-beige)]' : 'bg-[var(--color-page)]'
  const innerBg =
    outerSurface === 'beige' ? 'bg-[var(--color-page)]' : 'bg-[var(--color-beige)]'

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 py-6 shadow-sm ${outerBg}`}
    >
      <div className="reviews-marquee-track flex gap-8 px-4 md:gap-12">
        {strip.map((filename, i) => (
          <figure
            key={`${filename}-${i}`}
            className={`w-[min(100%,15rem)] shrink-0 overflow-hidden rounded-xl border border-[var(--color-brand)]/10 shadow-sm sm:w-[17rem] ${innerBg}`}
          >
            <img
              src={avisSiteImageSrc(filename)}
              alt={`Avis client ${i + 1}`}
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
