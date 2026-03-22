// src/pages/programme-page.tsx
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useSiteData } from '../contexts/admin-context'
import { media } from '../data/media'
import { SectionHeading } from '../components/ui/section-heading'
import { usePageTitle } from '../hooks/use-page-title'

export function ProgrammePage() {
  usePageTitle('Programmes')
  const { services } = useSiteData()
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="mb-12 overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-beige)] shadow-[var(--shadow-soft)]">
        <img
          src={media.programmeLuxoHypnoHeader}
          alt="Luxothérapeute et hypnothérapeute"
          width={1600}
          height={640}
          className="h-auto w-full max-h-[min(28rem,70vh)] object-cover object-center"
          loading="eager"
          decoding="async"
        />
      </div>

      <SectionHeading
        title="Programmes"
        subtitle="Chaque objectif fait l’objet d’un protocole personnalisé après un bilan."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((s) => (
          <article
            key={s.slug}
            className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
          >
            <div className="aspect-[16/10] overflow-hidden bg-[var(--color-beige)]">
              <img
                src={s.coverImage}
                alt=""
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
            <div className="flex flex-1 flex-col p-8">
              <h2 className="font-display text-2xl font-semibold text-[var(--color-ink)]">{s.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-body)]/90">{s.goal}</p>
              <Link
                to={`/programme/${s.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-cta-hover)]"
              >
                En savoir plus
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
