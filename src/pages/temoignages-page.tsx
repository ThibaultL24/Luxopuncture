// src/pages/temoignages-page.tsx
import { useSiteData } from '../contexts/admin-context'
import { WrittenReviewsMarquee } from '../components/written-reviews-marquee'
import { testimonialVideoSrc } from '../data/media'
import { SectionHeading } from '../components/ui/section-heading'
import { usePageTitle } from '../hooks/use-page-title'

export function TemoignagesPage() {
  usePageTitle('Témoignages')
  const { testimonialVideoFiles } = useSiteData()

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
        <p className="mt-2 text-sm text-[var(--color-body)]/90">
          Captures d’avis laissés par des personnes accompagnées.
        </p>
        <div className="mt-6">
          <WrittenReviewsMarquee outerSurface="beige" />
        </div>
      </section>
    </div>
  )
}
