// src/pages/luxopuncture-page.tsx
import { Link } from 'react-router-dom'
import {
  hormoneEffects,
  luxopunctureDefinition,
  mechanismCopy,
  methodSteps,
  physiologicalTitle,
} from '../data/site-content'
import { luxopunctureExplanationImages } from '../data/media'
import { SectionHeading } from '../components/ui/section-heading'
import { usePageTitle } from '../hooks/use-page-title'

const labels: Record<(typeof hormoneEffects)[number]['name'], string> = {
  dopamine: 'Dopamine',
  serotonine: 'Sérotonine',
  endorphine: 'Endorphine',
  melatonine: 'Mélatonine',
}

interface LuxopunctureExplanationTextProps {
  index: number
}

function LuxopunctureExplanationText({ index }: LuxopunctureExplanationTextProps) {
  if (index === 0) {
    return <p>{luxopunctureDefinition.paragraphs[0]}</p>
  }
  if (index === 1) {
    return <p>{luxopunctureDefinition.paragraphs[1]}</p>
  }
  if (index === 2) {
    return (
      <p className="rounded-2xl border border-[var(--color-brand)]/20 bg-[var(--color-muted-green)]/55 p-4 leading-relaxed">
        {luxopunctureDefinition.paragraphs[2]}
      </p>
    )
  }
  if (index === 3) {
    return (
      <div className="space-y-2">
        <h3 className="font-display text-lg font-semibold text-[var(--color-ink)]">{mechanismCopy.title}</h3>
        <p>{mechanismCopy.text}</p>
      </div>
    )
  }
  if (index === 4) {
    return (
      <div className="space-y-4">
        {methodSteps.map((step) => (
          <div key={step.title} className="space-y-1">
            <h3 className="font-display text-base font-semibold text-[var(--color-ink)]">{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export function LuxopuncturePage() {
  usePageTitle('La luxopuncture')
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-24">
      <SectionHeading align="left" title={luxopunctureDefinition.title} />

      <ul className="mt-10 list-none space-y-10 lg:space-y-12">
        {luxopunctureExplanationImages.map((img, i) => (
          <li key={img.src}>
            <div
              className={`flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8 xl:gap-10 ${
                i % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="mx-auto w-full max-w-[240px] shrink-0 sm:max-w-[260px] lg:mx-0">
                <img
                  src={img.src}
                  alt={img.alt}
                  width={520}
                  height={400}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-auto w-full rounded-2xl border border-[var(--color-brand)]/15 bg-white object-contain shadow-[0_6px_24px_-10px_rgba(22,60,50,0.22)]"
                />
              </div>
              <div className="min-w-0 flex-1 space-y-2 text-sm leading-relaxed text-[var(--color-body)]/95 lg:pt-1 lg:text-base">
                <LuxopunctureExplanationText index={i} />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-[var(--color-ink)]">{physiologicalTitle}</h2>
        <ul className="mt-6 space-y-4">
          {hormoneEffects.map((h) => (
            <li key={h.name} className="rounded-2xl border border-[var(--color-brand)]/10 bg-white p-5">
              <span className="font-semibold text-[var(--color-ink)]">{labels[h.name]}</span>
              <span className="mt-1 block text-sm text-[var(--color-body)]/90">{h.role}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-14 flex flex-wrap gap-4">
        <Link
          to="/programme"
          className="inline-flex rounded-full bg-[var(--color-cta)] px-5 py-2.5 text-sm font-bold text-[var(--color-on-cta)] shadow-sm transition hover:bg-[var(--color-cta-hover)] hover:text-white"
        >
          Voir les programmes
        </Link>
        <Link
          to="/contact"
          className="inline-flex rounded-full border border-[var(--color-brand)]/30 px-5 py-2.5 text-sm font-semibold text-[var(--color-ink)]"
        >
          Prendre rendez-vous
        </Link>
      </div>
    </div>
  )
}
