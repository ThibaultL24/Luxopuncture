// src/pages/partenariat-page.tsx
import { RevealOnScroll, SectionAtmosphere } from '../components/editorial'
import { PartnerRecommendationCard } from '../components/partner-recommendation-card'
import { SocialLinks } from '../components/social-links'
import { SectionHeading } from '../components/ui/section-heading'
import { useSiteData } from '../hooks/use-admin'
import { usePageTitle } from '../hooks/use-page-title'

export function PartenariatPage() {
  usePageTitle('Recommandations')
  const { partenariatPage: p } = useSiteData()

  return (
    <div className="bg-transparent">
      <SectionAtmosphere variant="soft" placement="both">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:py-20">
          <RevealOnScroll variant="fade-up">
            <SectionHeading title={p.pageTitle} subtitle={p.pageSubtitle} />
          </RevealOnScroll>

          <RevealOnScroll variant="fade-up">
            <div className="mt-12 space-y-4">
              <h2 className="font-display text-xl font-semibold text-[var(--color-ink)] sm:text-2xl">
                {p.productsTitle}
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-[var(--color-body)]/95">{p.productsBody}</p>
            </div>
          </RevealOnScroll>

          <div className="mt-12 space-y-12">
            {p.partners.map((partner, i) => (
              <RevealOnScroll key={partner.id} variant={i % 2 === 0 ? 'fade-up' : 'scale'}>
                <PartnerRecommendationCard partner={partner} />
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll variant="fade-up">
            <div className="mt-14 space-y-5 rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)]/90 p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">{p.networksTitle}</h2>
              <p className="text-sm leading-relaxed text-[var(--color-body)]/95">{p.networksBody}</p>
              <SocialLinks className="mt-1" />
            </div>
          </RevealOnScroll>
        </div>
      </SectionAtmosphere>
    </div>
  )
}
