// src/pages/a-propos-page.tsx
import { Link } from 'react-router-dom'
import { aboutPagePhoto } from '../data/media'
import { useSiteData } from '../hooks/use-admin'
import { RevealOnScroll, SectionAtmosphere } from '../components/editorial'
import { SocialLinks } from '../components/social-links'
import { WrittenReviewsMarquee } from '../components/written-reviews-marquee'
import { SectionHeading } from '../components/ui/section-heading'
import { usePageTitle } from '../hooks/use-page-title'

export function AProposPage() {
  usePageTitle('À propos')
  const { aboutPage } = useSiteData()

  const bioMain = aboutPage.bio.length > 1 ? aboutPage.bio.slice(0, -1) : aboutPage.bio
  const bioCarouselIntro = aboutPage.bio.length > 0 ? aboutPage.bio[aboutPage.bio.length - 1] : ''

  return (
    <div className="bg-transparent">
      <SectionAtmosphere variant="soft" placement="both">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <RevealOnScroll variant="fade-up">
            <SectionHeading title={aboutPage.title} subtitle={aboutPage.name} />
          </RevealOnScroll>

          <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
            <RevealOnScroll variant="slide-right" className="order-2 mx-auto flex w-full max-w-lg shrink-0 flex-col gap-8 lg:order-1 lg:mx-0 lg:max-w-[min(100%,36rem)]">
              <figure className="overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)] shadow-sm lg:-translate-x-2 lg:translate-y-2">
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
                  {aboutPage.credentials.map((c) => (
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
            </RevealOnScroll>

            <RevealOnScroll variant="slide-left" className="order-1 min-w-0 flex-1 space-y-8 text-base leading-relaxed text-[var(--color-body)]/95 lg:order-2 lg:translate-y-4">
              {bioMain.map((p, i) => (
                <p key={i}>{p}</p>
              ))}

              <div className="rounded-2xl border border-dashed border-[var(--color-brand)]/25 bg-[var(--color-surface-rose)] p-6">
                <p className="font-medium text-[var(--color-ink)]">{bioCarouselIntro}</p>
              </div>

              <RevealOnScroll variant="fade-up">
                <WrittenReviewsMarquee />
              </RevealOnScroll>
            </RevealOnScroll>
          </div>
        </div>
      </SectionAtmosphere>
    </div>
  )
}
