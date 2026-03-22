// src/components/home/benefits-strip.tsx
import { media } from '../../data/media'
import { benefitsSection } from '../../data/site-content'
import { SectionHeading } from '../ui/section-heading'

export function BenefitsStrip() {
  return (
    <section className="border-y border-[var(--color-brand)]/10 bg-[var(--color-beige)]/90 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Pourquoi nous" title={benefitsSection.title} />
        <figure className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-white shadow-sm">
          <img
            src={media.cookiesPub}
            alt="Laplace Luxopuncture — visuel"
            width={900}
            height={700}
            className="h-auto w-full object-contain object-center"
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {benefitsSection.items.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-[var(--color-brand)]/10 bg-white p-8 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-brand)]/12 text-[var(--color-brand)]">
                  <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
                </div>
                <h3 className="font-display text-xl font-semibold text-[var(--color-ink)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-body)]/90">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
