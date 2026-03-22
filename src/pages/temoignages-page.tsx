// src/pages/temoignages-page.tsx
import { Star } from 'lucide-react'
import { useSiteData } from '../contexts/admin-context'
import { testimonialVideoSrc } from '../data/media'
import { SectionHeading } from '../components/ui/section-heading'
import { usePageTitle } from '../hooks/use-page-title'

export function TemoignagesPage() {
  usePageTitle('Témoignages')
  const { testimonials, testimonialVideoFiles } = useSiteData()

  const reviewStrip = [...testimonials, ...testimonials]

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <SectionHeading
        title="Témoignages"
        subtitle="Retours de personnes accompagnées et extraits vidéo."
      />

      <section aria-labelledby="videos-heading" className="mt-4">
        <h2 id="videos-heading" className="font-display text-2xl font-semibold text-[var(--color-ink)]">
          Témoignages vidéo
        </h2>
        <p className="mt-2 text-sm text-[var(--color-body)]/90">
          Faites défiler pour voir les vidéos ; le son est disponible sur chaque extrait.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {testimonialVideoFiles.map((filename) => (
            <div
              key={filename}
              className="overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-black shadow-sm"
            >
              <video
                className="aspect-video w-full object-contain"
                controls
                playsInline
                preload="metadata"
                src={testimonialVideoSrc(filename)}
              />
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="avis-heading" className="mt-20">
        <h2 id="avis-heading" className="font-display text-2xl font-semibold text-[var(--color-ink)]">
          Avis écrits
        </h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-white py-6 shadow-sm">
          <div className="reviews-marquee-track flex gap-12 px-4">
            {reviewStrip.map((t, i) => (
              <figure
                key={`${t.name}-${i}`}
                className="flex w-[min(100%,18rem)] shrink-0 flex-col rounded-xl border border-[var(--color-brand)]/10 bg-[var(--color-page)] p-5"
              >
                <div className="flex gap-0.5 text-[var(--color-cta-hover)]" aria-hidden>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-body)]/95">
                  “{t.content}”
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-[var(--color-ink)]">{t.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
