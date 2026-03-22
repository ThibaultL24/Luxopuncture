// src/components/home/method-steps.tsx
import { media } from '../../data/media'
import { methodSteps } from '../../data/site-content'
import { SectionHeading } from '../ui/section-heading'

export function MethodSteps() {
  return (
    <section className="border-y border-[var(--color-brand)]/10 bg-[var(--color-muted-green)]/50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Déroulé"
          title="Une méthode en trois temps"
          subtitle="Transparence sur le déroulé : vous savez à quoi vous attendre avant, pendant et après."
        />
        <figure className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-beige)] shadow-sm">
          <img
            src={media.machineLuxo}
            alt="Appareil de luxopuncture"
            width={1200}
            height={900}
            className="h-auto w-full object-contain object-center"
            loading="lazy"
            decoding="async"
          />
        </figure>
        <ol className="mt-12 grid gap-8 lg:grid-cols-3">
          {methodSteps.map((step, i) => (
            <li
              key={step.title}
              className="relative rounded-2xl border border-[var(--color-brand)]/10 bg-white p-8 shadow-sm"
            >
              <span className="font-display text-5xl font-semibold text-[var(--color-brand)]/30">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-[var(--color-ink)]">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-body)]/90">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
