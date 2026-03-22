// src/pages/a-propos-page.tsx
import { Link } from 'react-router-dom'
import { aboutPagePhoto } from '../data/media'
import { aboutPractitioner } from '../data/site-content'
import { SocialLinks } from '../components/social-links'
import { SectionHeading } from '../components/ui/section-heading'
import { usePageTitle } from '../hooks/use-page-title'

export function AProposPage() {
  usePageTitle('À propos')

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <SectionHeading title={aboutPractitioner.title} subtitle={aboutPractitioner.name} />

      <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
        <div className="mx-auto flex w-full max-w-lg shrink-0 flex-col gap-8 lg:mx-0 lg:max-w-[min(100%,36rem)]">
          <figure className="overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-beige)] shadow-sm">
            <img
              src={aboutPagePhoto.src}
              alt={aboutPagePhoto.alt}
              className="h-auto w-full max-w-full object-contain object-center"
              loading="eager"
              decoding="async"
              width={800}
              height={1000}
            />
          </figure>

          <div>
            <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">Réseaux</h2>
            <p className="mt-3 text-sm text-[var(--color-body)]/85">
              Témoignages vidéo et actualités sur Instagram, LinkedIn et Facebook.
            </p>
            <SocialLinks className="mt-4" />
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">Formations & diplômes</h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-[var(--color-body)]/95">
              {aboutPractitioner.credentials.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>

          <Link
            to="/contact"
            className="inline-flex w-full items-center justify-center rounded-full bg-[var(--color-cta)] px-6 py-3 text-sm font-bold text-[var(--color-on-cta)] shadow-sm transition hover:bg-[var(--color-cta-hover)] hover:text-white"
          >
            Prendre rendez-vous
          </Link>
        </div>

        <div className="min-w-0 flex-1 space-y-6 text-base leading-relaxed text-[var(--color-body)]/95">
          {aboutPractitioner.bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
