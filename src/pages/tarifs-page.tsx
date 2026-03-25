// src/pages/tarifs-page.tsx
import { CheckCircle, Euro, Leaf } from 'lucide-react'
import { Link } from 'react-router-dom'
import { pageIllustrations, tarifsPageSpec } from '../data/site-content'
import { PageIllustration } from '../components/ui/page-illustration'
import { SectionHeading } from '../components/ui/section-heading'
import { usePageTitle } from '../hooks/use-page-title'

export function TarifsPage() {
  usePageTitle('Tarifs')
  const s = tarifsPageSpec

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
      <SectionHeading
        title="Tarifs"
        subtitle="Programme à distance et séances au cabinet — accompagnements personnalisés selon votre objectif."
      />
      <PageIllustration src={pageIllustrations.tarifs.src} alt={pageIllustrations.tarifs.alt} />

      <section className="mt-12 space-y-6">
        <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-[var(--color-ink)] sm:text-2xl">
          <Leaf className="h-5 w-5 shrink-0 text-[var(--color-brand)]" aria-hidden />
          {s.distanceTitle}
        </h2>

        <div className="rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-page)] p-6 shadow-sm">
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

        <div className="rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-beige)]/50 p-6 shadow-sm">
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
      </section>

      <section className="mt-14 space-y-4">
        <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-[var(--color-ink)] sm:text-2xl">
          <Euro className="h-5 w-5 shrink-0 text-[var(--color-brand)]" aria-hidden />
          {s.cabinetTitle}
        </h2>
        <div className="space-y-4">
          {s.cabinetRows.map((row) => (
            <div
              key={row.label}
              className="rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-page)] p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-medium text-[var(--color-ink)]">{row.label}</p>
                <p className="font-semibold text-[var(--color-cta-hover)]">{row.price}</p>
              </div>
              {row.note ? <p className="mt-3 text-sm leading-relaxed text-[var(--color-body)]/90">{row.note}</p> : null}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-beige)]/40 p-6">
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
  )
}
