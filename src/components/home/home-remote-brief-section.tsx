// src/components/home/home-remote-brief-section.tsx
import { ArrowRight, CheckCircle, Laptop } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSiteData } from '../../hooks/use-admin'
import { RevealOnScroll, SectionAtmosphere } from '../editorial'

export function HomeRemoteBriefSection() {
  const { homeCopy } = useSiteData()
  const { remoteBrief } = homeCopy
  return (
    <section className="w-full bg-transparent py-12 sm:py-16">
      <SectionAtmosphere variant="medium" placement="right">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <RevealOnScroll variant="slide-left">
            <h2 className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center font-display text-2xl font-semibold leading-snug text-[var(--color-ink)] sm:text-3xl">
              <Laptop className="h-6 w-6 shrink-0 text-[var(--color-brand)]" aria-hidden />
              <span>{remoteBrief.title}</span>
            </h2>
            <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-[var(--color-body)]/80">
              {remoteBrief.withLabel}
            </p>
            <ul className="mt-4 space-y-2 text-[var(--color-body)]/95">
              {remoteBrief.bullets.map((line) => (
                <li key={line} className="flex gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand)]" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm italic text-[var(--color-body)]/80">{remoteBrief.footnote}</p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/programme"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-cta)] px-8 py-3.5 text-sm font-bold text-[var(--color-on-cta)] shadow-[var(--shadow-soft)] transition hover:bg-[var(--color-cta-hover)] hover:text-white"
              >
                En savoir plus
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </SectionAtmosphere>
    </section>
  )
}
