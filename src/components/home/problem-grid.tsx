// src/components/home/problem-grid.tsx
import { Link } from 'react-router-dom'
import { problems } from '../../data/site-content'
import { SectionHeading } from '../ui/section-heading'

export function ProblemGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading
        eyebrow="Pour qui"
        title="Des réponses ciblées à vos objectifs"
        subtitle="La luxopuncture peut s’inscrire dans un parcours global — voici les motifs les plus fréquents."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {problems.map((p) => {
          const Icon = p.icon
          return (
            <article
              key={p.title}
              className="flex flex-col rounded-2xl border border-[var(--color-brand)]/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-accent)]/25 text-[var(--color-brand)]">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </div>
              <h3 className="font-display text-xl font-semibold text-[var(--color-ink)]">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-body)]/90">{p.description}</p>
            </article>
          )
        })}
      </div>
      <div className="mt-12 flex justify-center">
        <Link
          to="/programme"
          className="inline-flex rounded-full bg-[var(--color-cta)] px-8 py-3.5 text-sm font-bold text-[var(--color-on-cta)] shadow-[var(--shadow-soft)] transition hover:bg-[var(--color-cta-hover)] hover:text-white"
        >
          Voir les programmes
        </Link>
      </div>
    </section>
  )
}
