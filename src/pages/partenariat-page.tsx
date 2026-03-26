// src/pages/partenariat-page.tsx
import { RevealOnScroll, SectionAtmosphere } from '../components/editorial'
import { SocialLinks } from '../components/social-links'
import { SectionHeading } from '../components/ui/section-heading'
import { useSiteData } from '../hooks/use-admin'
import { usePageTitle } from '../hooks/use-page-title'

export function PartenariatPage() {
  usePageTitle('Partenariats')
  const { partenariatPage: p } = useSiteData()

  return (
    <div className="bg-transparent">
      <SectionAtmosphere variant="soft" placement="both">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
          <RevealOnScroll variant="fade-up">
            <SectionHeading title={p.pageTitle} subtitle={p.pageSubtitle} />
          </RevealOnScroll>
          <RevealOnScroll variant="scale">
            <div className="mt-10 space-y-8 rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)] p-8 text-[var(--color-body)]/95 shadow-sm">
              <section>
                <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">{p.productsTitle}</h2>
                <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap">{p.productsBody}</p>
              </section>
              <div className="border-t border-[var(--color-brand)]/10 pt-8" role="presentation" />
              <section>
                <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">{p.networksTitle}</h2>
                <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap">{p.networksBody}</p>
                <SocialLinks className="mt-4" />
              </section>
            </div>
          </RevealOnScroll>
        </div>
      </SectionAtmosphere>
    </div>
  )
}
