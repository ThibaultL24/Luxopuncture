// src/pages/programme-detail-page.tsx
import { Link, useParams } from 'react-router-dom'
import { useSiteData } from '../hooks/use-admin'
import { getServiceBySlug } from '../data/site-content'
import { RevealOnScroll, SectionAtmosphere, SectionDivider } from '../components/editorial'
import { usePageTitle } from '../hooks/use-page-title'

export function ProgrammeDetailPage() {
  const { slug } = useParams()
  const { services } = useSiteData()
  const service = slug ? getServiceBySlug(slug, services) : undefined

  usePageTitle(service?.title ?? 'Programme')

  if (!service) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Programme introuvable</h1>
        <Link to="/programme" className="mt-6 inline-block text-[var(--color-cta-hover)] hover:underline">
          Retour aux programmes
        </Link>
      </div>
    )
  }

  const detailImages =
    service.detailGallery && service.detailGallery.length > 0
      ? service.detailGallery
      : [{ src: service.coverImage, alt: service.title }]

  return (
    <article className="bg-transparent">
      <SectionAtmosphere variant="soft" placement="both">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-24">
          <RevealOnScroll variant="fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">Programme</p>
            <h1 className="mt-4 font-display text-4xl font-semibold text-[var(--color-ink)]">{service.title}</h1>
          </RevealOnScroll>

          <div className="mt-8 space-y-6">
            {detailImages.map((item, i) => (
              <RevealOnScroll key={`${item.src}-${i}`} variant={i === 0 ? 'scale' : i % 2 === 0 ? 'fade-up' : 'slide-left'}>
                <figure className="overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)] shadow-sm">
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={1600}
                    height={1200}
                    className="mx-auto h-auto w-full max-w-full object-contain object-center"
                    loading={i < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </figure>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll variant="fade-up">
            <p className="mt-10 text-lg leading-relaxed text-[var(--color-body)]/95">{service.intro}</p>
          </RevealOnScroll>
          <RevealOnScroll variant="slide-right">
            <p className="mt-6 text-base leading-relaxed text-[var(--color-body)]/95">{service.goal}</p>
          </RevealOnScroll>

          {service.duration ? (
            <RevealOnScroll variant="fade">
              <p className="mt-4 text-sm text-[var(--color-body)]/90">
                <span className="font-semibold text-[var(--color-ink)]">Durée :</span> {service.duration}
              </p>
            </RevealOnScroll>
          ) : null}

          <SectionDivider className="py-10 sm:py-12" />

          <RevealOnScroll variant="fade-up">
            <h2 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Bénéfices attendus</h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-[var(--color-body)]/95">
              {service.benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </RevealOnScroll>
        </div>
      </SectionAtmosphere>

      <SectionAtmosphere variant="medium" placement="diagonal">
        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:pb-24">
          <RevealOnScroll variant="fade-up">
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex rounded-full bg-[var(--color-cta)] px-6 py-3 text-sm font-bold text-[var(--color-on-cta)] shadow-sm transition hover:bg-[var(--color-cta-hover)] hover:text-white"
              >
                Réserver ce programme
              </Link>
              <Link
                to="/programme"
                className="inline-flex rounded-full border border-[var(--color-brand)]/30 px-6 py-3 text-sm font-semibold text-[var(--color-ink)]"
              >
                Autres programmes
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </SectionAtmosphere>
    </article>
  )
}
