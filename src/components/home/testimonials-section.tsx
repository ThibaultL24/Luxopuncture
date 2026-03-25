// src/components/home/testimonials-section.tsx
import { Link } from 'react-router-dom'
import { homeCopy } from '../../data/site-content'
import { media } from '../../data/media'
import { WrittenReviewsMarquee } from '../written-reviews-marquee'
import { SectionHeading } from '../ui/section-heading'

export function TestimonialsSection() {
  const { testimonials: t } = homeCopy
  return (
    <section className="w-full bg-[var(--color-page)] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />
        <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-[var(--color-body)]/90">
          {t.intro}
        </p>

        <div className="mx-auto mb-14 max-w-3xl">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Vidéo de présentation
          </p>
          <figure className="overflow-hidden rounded-2xl border border-[var(--color-brand)]/15 bg-[var(--color-beige)] shadow-[var(--shadow-soft)]">
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

        <p className="mb-6 text-center text-sm font-semibold text-[var(--color-ink)]">Avis écrits</p>

        <WrittenReviewsMarquee />

        <p className="mt-10 text-center">
          <Link
            to="/temoignages"
            className="text-sm font-semibold text-[var(--color-cta-hover)] underline-offset-4 hover:underline"
          >
            Accéder à la page dédiée aux retours (avis + vidéos)
          </Link>
        </p>
      </div>
    </section>
  )
}
