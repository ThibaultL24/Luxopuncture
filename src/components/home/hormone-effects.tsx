// src/components/home/hormone-effects.tsx
import { hormoneEffects, physiologicalTitle } from '../../data/site-content'
import { SectionHeading } from '../ui/section-heading'

const labels: Record<(typeof hormoneEffects)[number]['name'], string> = {
  dopamine: 'Dopamine',
  serotonine: 'Sérotonine',
  endorphine: 'Endorphine',
  melatonine: 'Mélatonine',
}

export function HormoneEffects() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading
        eyebrow="Comprendre"
        title={physiologicalTitle}
        subtitle="Repères pédagogiques — chaque parcours reste personnel et évalué avec vous."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {hormoneEffects.map((h) => (
          <div
            key={h.name}
            className="rounded-2xl border border-[var(--color-brand)]/10 bg-white p-6 shadow-sm"
          >
            <p className="font-display text-lg font-semibold text-[var(--color-ink)]">{labels[h.name]}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-body)]/90">{h.role}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
