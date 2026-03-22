// src/components/home/testimonials-section.tsx
import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSiteData } from '../../contexts/admin-context'
import { SectionHeading } from '../ui/section-heading'

export function TestimonialsSection() {
  const { testimonials } = useSiteData()
  const reviewStrip = [...testimonials, ...testimonials]

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading
        eyebrow="Témoignages"
        title="Ils ont avancé avec nous"
        subtitle="Extraits anonymisés — les parcours varient selon les personnes et l’engagement dans le temps."
      />
      <p className="mb-8 text-center">
        <Link
          to="/temoignages"
          className="text-sm font-semibold text-[var(--color-cta-hover)] underline-offset-4 hover:underline"
        >
          Voir tous les témoignages et vidéos
        </Link>
      </p>
      <div className="overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-white py-6 shadow-sm">
        <div className="reviews-marquee-track flex gap-12 px-4">
          {reviewStrip.map((t, i) => (
            <figure
              key={`${t.name}-${i}`}
              className="flex w-[min(100%,18rem)] shrink-0 flex-col rounded-xl border border-[var(--color-brand)]/10 bg-[var(--color-page)] p-5"
            >
              <div className="flex gap-0.5 text-[var(--color-cta-hover)]" aria-label={`Note ${t.rating} sur 5`}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" aria-hidden />
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
  )
}
