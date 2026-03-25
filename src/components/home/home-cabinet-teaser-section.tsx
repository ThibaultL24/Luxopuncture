// src/components/home/home-cabinet-teaser-section.tsx
import { ArrowRight, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { homeCopy } from '../../data/site-content'
import { media } from '../../data/media'

export function HomeCabinetTeaserSection() {
  const { cabinetTeaser } = homeCopy
  const [videoLine, ...restLines] = cabinetTeaser.lines
  return (
    <section className="w-full bg-[var(--color-beige)] py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12">
        <figure className="overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-page)] shadow-sm">
          <img
            src={media.tarifs}
            alt="Cabinet — espace d’accueil"
            width={900}
            height={700}
            className="h-auto w-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div>
          <h2 className="font-display text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">
            {cabinetTeaser.title}
          </h2>
          <ul className="mt-6 space-y-3 text-[var(--color-body)]/95">
            <li className="flex gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand)]" aria-hidden />
              <span>
                <Link className="font-medium text-[var(--color-cta-hover)] underline-offset-2 hover:underline" to="/temoignages">
                  {videoLine}
                </Link>{' '}
                <span className="text-sm text-[var(--color-body)]/80">(sur la page témoignages)</span>
              </span>
            </li>
            {restLines.map((line) => (
              <li key={line} className="flex gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand)]" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <Link
            to="/cabinet"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-cta)] px-8 py-3.5 text-sm font-bold text-[var(--color-on-cta)] shadow-sm transition hover:bg-[var(--color-cta-hover)] hover:text-white"
          >
            {cabinetTeaser.cta}
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
