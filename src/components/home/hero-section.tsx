// src/components/home/hero-section.tsx
import { Link } from 'react-router-dom'
import { useSiteData } from '../../contexts/admin-context'
import { media } from '../../data/media'
import { SocialLinks } from '../social-links'

export function HeroSection() {
  const { heroCopy } = useSiteData()
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-brand)]/10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-muted-green)_0%,_transparent_52%),radial-gradient(ellipse_at_70%_0%,_var(--color-beige)_0%,_transparent_46%),radial-gradient(circle_at_85%_25%,_rgba(15,61,58,0.14)_0%,_transparent_42%)]"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-20 sm:px-6 lg:flex-row lg:items-center lg:py-28">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)]">
            Luxopuncture
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl lg:text-[3.25rem]">
            {heroCopy.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-body)]/95">
            {heroCopy.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex rounded-full bg-[var(--color-cta)] px-8 py-3.5 text-sm font-bold text-[var(--color-on-cta)] shadow-[var(--shadow-soft)] transition hover:bg-[var(--color-cta-hover)] hover:text-white"
            >
              {heroCopy.ctaPrimary}
            </Link>
            <Link
              to="/luxopuncture"
              className="inline-flex rounded-full border border-[var(--color-brand)]/25 bg-white/90 px-8 py-3.5 text-sm font-semibold text-[var(--color-ink)] backdrop-blur hover:border-[var(--color-brand)]/40 hover:bg-white"
            >
              {heroCopy.ctaSecondary}
            </Link>
          </div>
          <div className="mt-8">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-[var(--color-body)]/75">Suivez-nous</p>
            <SocialLinks />
          </div>
        </div>
        <div className="flex flex-1 justify-center lg:justify-end">
          <figure className="relative h-80 w-full max-w-xl overflow-hidden rounded-[2rem] border border-[var(--color-brand)]/10 bg-[var(--color-beige)] shadow-[var(--shadow-soft)] sm:h-96 lg:h-[28rem] lg:max-w-2xl">
            <img
              src={media.heroSession}
              alt="Camille, luxothérapeute"
              className="h-full w-full object-cover"
              width={800}
              height={600}
              loading="eager"
              fetchPriority="high"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-5 pb-4 pt-12 text-left">
              <p className="font-display text-lg text-white">Une séance sur mesure</p>
              <p className="mt-1 text-xs text-white/90">
                Sans aiguille — protocole adapté à votre objectif.
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
