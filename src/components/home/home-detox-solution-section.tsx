// src/components/home/home-detox-solution-section.tsx
import { ArrowRight, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { homeCopy } from '../../data/site-content'

export function HomeDetoxSolutionSection() {
  const { detoxSolution } = homeCopy
  return (
    <section className="w-full bg-[var(--color-page)] py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="text-center font-display text-xl font-medium text-[var(--color-ink)] sm:text-2xl">
          {detoxSolution.intro}
        </p>
        <p className="mt-6 text-center text-sm font-medium uppercase tracking-wide text-[var(--color-body)]/80">
          {detoxSolution.subtitle}
        </p>
        <ul className="mx-auto mt-8 max-w-md space-y-2.5 text-center text-[var(--color-body)]/95 sm:text-left">
          {detoxSolution.bullets.map((line) => (
            <li key={line} className="flex justify-center gap-2 sm:justify-start">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand)]" aria-hidden />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <Link
            to="/programme"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-cta)] px-8 py-3.5 text-sm font-bold text-[var(--color-on-cta)] shadow-[var(--shadow-soft)] transition hover:bg-[var(--color-cta-hover)] hover:text-white"
          >
            Découvrir le programme
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
