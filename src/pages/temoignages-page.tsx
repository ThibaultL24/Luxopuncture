// src/pages/temoignages-page.tsx
import { useSiteData } from '../contexts/admin-context'
import { WrittenReviewsMarquee } from '../components/written-reviews-marquee'
import { testimonialVideoSrc } from '../data/media'
import { RevealOnScroll, SectionAtmosphere, SectionDivider } from '../components/editorial'
import { SectionHeading } from '../components/ui/section-heading'
import { usePageTitle } from '../hooks/use-page-title'

function StarRow({ rating }: { rating: number }) {
  const n = Math.min(5, Math.max(1, Math.round(rating)))
  return (
    <p className="text-amber-600" aria-hidden>
      {'★'.repeat(n)}
      <span className="sr-only">{n} sur 5</span>
    </p>
  )
}

export function TemoignagesPage() {
  usePageTitle('Témoignages')
  const { testimonialVideoFiles, testimonials } = useSiteData()
  const written = testimonials.filter((t) => t.content.trim().length > 0)

  return (
    <div className="bg-transparent">
      <SectionAtmosphere variant="soft" placement="both">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <RevealOnScroll variant="fade-up">
            <SectionHeading title="Témoignages" subtitle="Retours de personnes accompagnées et extraits vidéo." />
          </RevealOnScroll>

          <section aria-labelledby="videos-heading" className="mt-4">
            <RevealOnScroll variant="slide-right">
              <h2 id="videos-heading" className="font-display text-2xl font-semibold text-[var(--color-ink)]">
                Témoignages vidéo
              </h2>
              <p className="mt-2 text-sm text-[var(--color-body)]/90">
                Faites défiler pour voir les vidéos ; le son est disponible sur chaque extrait.
              </p>
            </RevealOnScroll>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {testimonialVideoFiles.map((filename, i) => (
                <RevealOnScroll key={filename} variant={i % 2 === 0 ? 'fade-up' : 'scale'}>
                  <div className="overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-black shadow-sm">
                    <video
                      className="aspect-video w-full object-contain"
                      controls
                      playsInline
                      preload="metadata"
                      src={testimonialVideoSrc(filename)}
                    />
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>
        </div>
      </SectionAtmosphere>

      <SectionDivider />

      <SectionAtmosphere variant="medium" placement="diagonal">
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:pb-24">
          {written.length > 0 ? (
            <section aria-labelledby="avis-texte-heading" className="mb-16">
              <RevealOnScroll variant="slide-left">
                <h2 id="avis-texte-heading" className="font-display text-2xl font-semibold text-[var(--color-ink)]">
                  Avis en texte
                </h2>
                <p className="mt-2 text-sm text-[var(--color-body)]/90">
                  Retours rédigés par des personnes accompagnées.
                </p>
              </RevealOnScroll>
              <ul className="mt-8 grid gap-6 sm:grid-cols-2">
                {written.map((t, i) => (
                  <RevealOnScroll key={`${t.name}-${i}`} variant="fade-up">
                    <li className="rounded-2xl border border-[var(--color-brand)]/15 bg-[var(--color-surface)] p-6 shadow-sm">
                      <StarRow rating={t.rating} />
                      <blockquote className="mt-3 text-sm leading-relaxed text-[var(--color-body)]/95">
                        <p className="whitespace-pre-wrap">{t.content}</p>
                      </blockquote>
                      <footer className="mt-4 text-sm font-semibold text-[var(--color-ink)]">— {t.name || 'Anonyme'}</footer>
                    </li>
                  </RevealOnScroll>
                ))}
              </ul>
            </section>
          ) : null}

          <section aria-labelledby="avis-heading">
            <RevealOnScroll variant="slide-left">
              <h2 id="avis-heading" className="font-display text-2xl font-semibold text-[var(--color-ink)]">
                Avis écrits (captures)
              </h2>
              <p className="mt-2 text-sm text-[var(--color-body)]/90">
                Captures d’avis laissés par des personnes accompagnées.
              </p>
            </RevealOnScroll>
            <div className="mt-6">
              <WrittenReviewsMarquee />
            </div>
          </section>
        </div>
      </SectionAtmosphere>
    </div>
  )
}
