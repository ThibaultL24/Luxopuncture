// src/components/home/home-hook-section.tsx
import { Sparkles } from 'lucide-react'
import { homeCopy } from '../../data/site-content'

export function HomeHookSection() {
  const { hook } = homeCopy
  return (
    <section className="w-full bg-[var(--color-beige)] py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <div className="mb-8 flex justify-center" aria-hidden>
          <span className="inline-flex rounded-2xl bg-[var(--color-accent)]/20 p-3 text-[var(--color-brand)]">
            <Sparkles className="h-7 w-7" strokeWidth={1.75} />
          </span>
        </div>
        <p className="font-display text-2xl font-medium leading-snug text-[var(--color-ink)] sm:text-3xl">
          {hook.lead}
        </p>
        <p className="mt-4 font-display text-2xl font-semibold text-[var(--color-brand)] sm:text-3xl">{hook.question}</p>
        <p className="mt-6 text-lg text-[var(--color-body)]/95">{hook.symptoms}</p>
        <p className="mt-8 text-base leading-relaxed text-[var(--color-body)]/90">{hook.closing}</p>
      </div>
    </section>
  )
}
