// src/components/home/testimonials-section.tsx
import { Link } from 'react-router-dom'
import { useSiteData } from '../../contexts/admin-context'
import { media } from '../../data/media'
import { RevealOnScroll, SectionAtmosphere } from '../editorial'
import { WrittenReviewsMarquee } from '../written-reviews-marquee'
import { SectionHeading } from '../ui/section-heading'

export function TestimonialsSection() {
  const { homeCopy } = useSiteData()
  const { testimonials: t } = homeCopy
  return (
    <section className="w-full bg-transparent py-12 sm:py-16">
      <SectionAtmosphere variant="soft" placement="both">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <RevealOnScroll variant="fade-up">
            <SectionHeading eyebrow={t.eyebrow} title={t.title} />
            <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-[var(--color-body)]/90">
              {t.intro}
            </p>
          </RevealOnScroll>

          <RevealOnScroll variant="scale">
            <div className="mx-auto mb-10 max-w-3xl">
              <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                Vidéo de présentation
              </p>
              <figure className="overflow-hidden rounded-2xl border border-[var(--color-brand)]/15 bg-[var(--color-surface)] shadow-[var(--shadow-soft)]">
                <video
                  className="aspect-video w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  aria-label="Vidéo de présentation — luxopuncture"
                >
                  <source src={media.presentationLuxopuncture} type="video/mp4" />
                </video>
              </figure>
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant="fade-up">
            <p className="mb-6 text-center text-sm font-semibold text-[var(--color-ink)]">Avis écrits</p>
          </RevealOnScroll>

          <WrittenReviewsMarquee />

          <RevealOnScroll variant="fade">
            <p className="mt-8 text-center">
              <Link
                to="/temoignages"
                className="text-sm font-semibold text-[var(--color-cta-hover)] underline-offset-4 hover:underline"
              >
                Accéder à la page dédiée aux retours (avis + vidéos)
              </Link>
            </p>
          </RevealOnScroll>
        </div>
      </SectionAtmosphere>
    </section>
  )
}
