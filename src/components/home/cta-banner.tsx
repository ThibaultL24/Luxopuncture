// src/components/home/cta-banner.tsx
import { Link } from 'react-router-dom'
import { bookingCta } from '../../data/site-content'

export function CtaBanner() {
  return (
    <section className="w-full bg-[var(--color-beige)] py-12 sm:py-14">
      <div className="mx-4 mb-20 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[var(--color-brand-mid)] via-[var(--color-brand)] to-[var(--color-brand-dark)] text-white sm:mx-6 lg:mx-auto lg:max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-8 px-8 py-12 sm:flex-row sm:items-center sm:px-12">
          <p className="max-w-xl font-display text-2xl font-medium leading-snug sm:text-3xl">{bookingCta.text}</p>
          <Link
            to="/contact"
            className="inline-flex shrink-0 rounded-full bg-[var(--color-cta)] px-8 py-3.5 text-sm font-bold text-[var(--color-on-cta)] shadow-[var(--shadow-soft)] transition hover:bg-[var(--color-cta-hover)] hover:text-white"
          >
            {bookingCta.button}
          </Link>
        </div>
      </div>
    </section>
  )
}
