// src/pages/a-propos-page.tsx
import { MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { aboutPagePhoto } from '../data/media'
import { aboutPractitioner } from '../data/site-content'
import { SocialLinks } from '../components/social-links'
import { SectionHeading } from '../components/ui/section-heading'
import { usePageTitle } from '../hooks/use-page-title'

export function AProposPage() {
  usePageTitle('À propos')

  const bioMain = aboutPractitioner.bio.slice(0, -1)
  const bioCarouselIntro = aboutPractitioner.bio[aboutPractitioner.bio.length - 1]

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
              Actualités sur Instagram, LinkedIn et Facebook.
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

        <div className="min-w-0 flex-1 space-y-8 text-base leading-relaxed text-[var(--color-body)]/95">
          {bioMain.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <div className="rounded-2xl border border-dashed border-[var(--color-brand)]/25 bg-[var(--color-beige)]/35 p-6">
            <p className="font-medium text-[var(--color-ink)]">{bioCarouselIntro}</p>
            <p className="mt-4 text-sm italic text-[var(--color-body)]/85">
              Carrousel d’exemples et de résultats — à intégrer (visuels fournis ultérieurement).
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">Témoignages et avis</h2>
            <p className="mt-3 text-sm">
              <Link
                to="/temoignages"
                className="font-semibold text-[var(--color-cta-hover)] underline-offset-4 hover:underline"
              >
                Voir la page témoignages et vidéos
              </Link>
            </p>
            <p className="mt-4 flex items-start gap-2 text-sm text-[var(--color-body)]/90">
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand)]" aria-hidden />
              <span>D’autres témoignages sont disponibles sur mes réseaux.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
