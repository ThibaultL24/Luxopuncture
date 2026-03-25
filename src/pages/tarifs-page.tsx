// src/pages/tarifs-page.tsx
import { CheckCircle, Euro, Leaf } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSiteData } from '../contexts/admin-context'
import { pageIllustrations } from '../data/site-content'
import {
  RevealOnScroll,
  SectionAtmosphere,
  SectionDivider,
  SectionGradientSpacer,
} from '../components/editorial'
import { PageIllustration } from '../components/ui/page-illustration'
import { SectionHeading } from '../components/ui/section-heading'
import { usePageTitle } from '../hooks/use-page-title'

export function TarifsPage() {
  usePageTitle('Tarifs')
  const { tarifsPage: s } = useSiteData()

  return (
    <div className="bg-transparent">
      <SectionAtmosphere variant="soft" placement="both">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
          <RevealOnScroll variant="fade-up">
            <SectionHeading title={s.pageTitle} subtitle={s.pageSubtitle} />
          </RevealOnScroll>
          <RevealOnScroll variant="scale">
            <PageIllustration src={pageIllustrations.tarifs.src} alt={pageIllustrations.tarifs.alt} />
          </RevealOnScroll>

          <section className="mt-12 space-y-6">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-[var(--color-ink)] sm:text-2xl">
              <Leaf className="h-5 w-5 shrink-0 text-[var(--color-brand)]" aria-hidden />
              {s.distanceTitle}
            </h2>

            <RevealOnScroll variant="slide-right">
              <div className="rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)] p-6 shadow-sm">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium text-[var(--color-ink)]">{s.detox.label}</p>
                  <p className="font-display text-xl font-semibold text-[var(--color-cta-hover)]">{s.detox.price}</p>
                </div>
                <p className="mt-4 text-sm font-medium text-[var(--color-body)]/90">Comprend :</p>
                <ul className="mt-2 space-y-1.5 text-sm text-[var(--color-body)]/95">
                  {s.detox.includes.map((line) => (
                    <li key={line} className="flex gap-2">
                      <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-brand)]" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>

            <RevealOnScroll variant="slide-left">
              <div className="rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)]/95 p-6 shadow-sm backdrop-blur-sm">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium text-[var(--color-ink)]">{s.suivi.label}</p>
                  <p className="font-display text-xl font-semibold text-[var(--color-cta-hover)]">{s.suivi.price}</p>
                </div>
                <p className="mt-4 text-sm font-medium text-[var(--color-body)]/90">Conditions :</p>
                <ul className="mt-2 space-y-1.5 text-sm text-[var(--color-body)]/95">
                  {s.suivi.conditions.map((line) => (
                    <li key={line} className="flex gap-2">
                      <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-brand)]" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-[var(--color-body)]/90">{s.suivi.note}</p>
              </div>
            </RevealOnScroll>
          </section>
        </div>
      </SectionAtmosphere>

      <SectionDivider />

      <SectionAtmosphere variant="medium" placement="diagonal">
        <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:pb-24">
          <section className="space-y-4">
            <RevealOnScroll variant="fade-up">
              <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-[var(--color-ink)] sm:text-2xl">
                <Euro className="h-5 w-5 shrink-0 text-[var(--color-brand)]" aria-hidden />
                {s.cabinetTitle}
              </h2>
            </RevealOnScroll>
            <div className="space-y-4">
              {s.cabinetRows.map((row, i) => (
                <RevealOnScroll key={row.label} variant={i % 2 === 0 ? 'fade-up' : 'scale'}>
                  <div className="rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)] p-6 shadow-sm">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-medium text-[var(--color-ink)]">{row.label}</p>
                      <p className="font-semibold text-[var(--color-cta-hover)]">{row.price}</p>
                    </div>
                    {row.note ? <p className="mt-3 text-sm leading-relaxed text-[var(--color-body)]/90">{row.note}</p> : null}
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>

          <SectionGradientSpacer />

          <RevealOnScroll variant="fade-up">
            <section className="rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)]/95 p-6 shadow-sm backdrop-blur-sm">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-[var(--color-ink)]">
                <Leaf className="h-4 w-4 shrink-0 text-[var(--color-brand)]" aria-hidden />
                {s.infosTitle}
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-[var(--color-body)]/95">
                {s.infosLines.map((line) => (
                  <li key={line} className="flex gap-2">
                    <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-brand)]" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </section>
          </RevealOnScroll>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex rounded-full bg-[var(--color-cta)] px-6 py-3 text-sm font-bold text-[var(--color-on-cta)] shadow-sm transition hover:bg-[var(--color-cta-hover)] hover:text-white"
            >
              Réserver une séance
            </Link>
            <Link
              to="/contact"
              className="inline-flex rounded-full border border-[var(--color-brand)]/30 px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-brand)]/50"
            >
              Prendre contact pour échanger
            </Link>
          </div>
        </div>
      </SectionAtmosphere>
    </div>
  )
}
