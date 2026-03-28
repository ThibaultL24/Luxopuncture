// src/pages/cabinet-page.tsx
import {
  ArrowLeftRight,
  ArrowRight,
  Brain,
  CheckCircle,
  Heart,
  HelpCircle,
  Images,
  ShieldAlert,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSiteData } from '../hooks/use-admin'
import {
  cabinetAmbianceImages,
  getCabinetProgramCardImage,
  luxopunctureCabinetPhotos,
  luxopunctureForWhatImage,
  luxopunctureExplanationImages,
  media,
} from '../data/media'
import { cabinetLuxoHypnoCopy, cabinetServiceTeasers, getServiceBySlug } from '../data/site-content'
import {
  EditorialQuote,
  EditorialSectionImmersive,
  RevealOnScroll,
  SectionAtmosphere,
  SectionDivider,
  SectionGradientSpacer,
} from '../components/editorial'
import { ImageCarousel } from '../components/ui/image-carousel'
import { WrittenReviewsMarquee } from '../components/written-reviews-marquee'
import { SectionHeading } from '../components/ui/section-heading'
import { usePageTitle } from '../hooks/use-page-title'

function IconList({ items, className = '' }: { items: readonly string[]; className?: string }) {
  return (
    <ul
      className={`space-y-2 text-[var(--color-body)]/95 ${className || 'mx-auto max-w-xl'}`}
    >
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-left">
          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand)]" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

const [cabinetRoomPhoto, seancePhoto, seance2Photo] = cabinetAmbianceImages
const [camille6LuxoPhoto, luxoSeancePhoto, luxoSeance2Photo] = luxopunctureCabinetPhotos

export function CabinetPage() {
  usePageTitle('Cabinet & accompagnements')
  const { services } = useSiteData()
  const x = cabinetLuxoHypnoCopy

  return (
    <div className="bg-transparent">
      <SectionAtmosphere variant="soft" placement="both">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="pt-12 pb-12 sm:pt-16 lg:pb-16 lg:pt-20">
            <RevealOnScroll variant="fade-up">
              <SectionHeading
                eyebrow="Cabinet"
                title="Accompagnements au cabinet"
                subtitle="Luxopuncture et hypnose — des protocoles adaptés à votre objectif."
              />
            </RevealOnScroll>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {cabinetServiceTeasers.map(({ slug, title, description }, i) => {
                const service = getServiceBySlug(slug, services)
                if (!service) return null
                return (
                  <RevealOnScroll key={slug} variant={i % 2 === 0 ? 'fade-up' : 'scale'}>
                    <Link
                      to={`/programme/${slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
                    >
                      <div className="flex aspect-square items-center justify-center overflow-hidden bg-[var(--color-surface-rose)] p-2 sm:p-3">
                        <img
                          src={getCabinetProgramCardImage(slug, service.coverImage)}
                          alt={title}
                          className="h-full w-full max-h-full max-w-full object-contain transition duration-300 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <h2 className="font-display text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">{title}</h2>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-body)]/90">{description}</p>
                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-cta-hover)]">
                          En savoir plus
                          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                        </span>
                      </div>
                    </Link>
                  </RevealOnScroll>
                )
              })}
            </div>
          </div>
        </div>
      </SectionAtmosphere>

      <SectionDivider />

      <SectionAtmosphere variant="medium" placement="diagonal">
        <div id="luxopuncture" className="scroll-mt-28">
          <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6 sm:pt-12">
            <div className="mx-auto max-w-3xl">
              <RevealOnScroll variant="fade-up">
                <SectionHeading title={x.luxopunctureTitle} subtitle={x.luxopunctureIntro} />
              </RevealOnScroll>
            </div>
          </div>

        <section className="mt-10 w-full space-y-14 sm:mt-12 sm:space-y-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
              <RevealOnScroll variant="slide-left" className="order-2 lg:order-1 lg:-translate-x-2">
                <figure className="flex overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)] p-4 shadow-[var(--shadow-soft)] lg:translate-y-3 sm:p-6">
                  <img
                    src={media.machineLuxo}
                    alt="Appareil de luxopuncture"
                    width={1200}
                    height={900}
                    className="mx-auto h-auto w-full max-h-[min(20rem,52vh)] object-contain sm:max-h-[min(24rem,55vh)]"
                    loading="lazy"
                  />
                </figure>
              </RevealOnScroll>
              <RevealOnScroll variant="slide-right" className="order-1 lg:order-2 lg:translate-x-2 lg:pl-2">
                <div className="mx-auto max-w-2xl space-y-5 text-[var(--color-body)]/95 lg:mx-0">
                  {x.luxopuncturePoints.map((p) => (
                    <p key={p} className="flex gap-2.5 leading-relaxed">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand)]" aria-hidden />
                      <span className="text-left">{p}</span>
                    </p>
                  ))}
                </div>
              </RevealOnScroll>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
              <RevealOnScroll variant="slide-right">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">
                    <span className="inline-flex items-start gap-2 text-left">
                      <HelpCircle className="mt-1 h-6 w-6 shrink-0 text-[var(--color-brand)]" aria-hidden />
                      <span>{x.forWhatTitle}</span>
                    </span>
                  </h3>
                  <p className="mt-4 text-[var(--color-body)]/95">{x.forWhatIntro}</p>
                  <IconList items={x.forWhatList} className="mt-6 max-w-none" />
                </div>
              </RevealOnScroll>
              <RevealOnScroll variant="slide-left">
                <figure className="overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)] lg:-translate-y-2">
                  <img
                    src={luxopunctureForWhatImage.src}
                    alt={luxopunctureForWhatImage.alt}
                    width={900}
                    height={700}
                    className="h-auto w-full object-cover"
                    loading="lazy"
                  />
                </figure>
              </RevealOnScroll>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
              <RevealOnScroll variant="slide-right" className="order-2 lg:order-1">
                <figure className="overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)] shadow-sm lg:-translate-x-3 lg:translate-y-6">
                  <img
                    src={luxoSeance2Photo.src}
                    alt={luxoSeance2Photo.alt}
                    width={900}
                    height={700}
                    className="h-auto w-full object-cover"
                    loading="lazy"
                  />
                </figure>
              </RevealOnScroll>
              <RevealOnScroll variant="slide-left" className="order-1 lg:order-2">
                <div className="lg:pl-2">
                  <h3 className="font-display text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">
                    <span className="inline-flex items-start gap-2 text-left">
                      <ArrowLeftRight className="mt-1 h-6 w-6 shrink-0 text-[var(--color-brand)]" aria-hidden />
                      <span>{x.vsAcupunctureTitle}</span>
                    </span>
                  </h3>
                  {x.vsAcupuncture.map((para) => (
                    <p key={para} className="mt-4 leading-relaxed text-[var(--color-body)]/95 first:mt-6">
                      {para}
                    </p>
                  ))}
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        <div className="mx-auto mt-16 max-w-6xl space-y-14 px-4 sm:space-y-16 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
            <RevealOnScroll variant="slide-right">
              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">
                    <span className="inline-flex items-start gap-2 text-left">
                      <ShieldAlert className="mt-1 h-6 w-6 shrink-0 text-[var(--color-brand)]" aria-hidden />
                      <span>{x.contraTitle}</span>
                    </span>
                  </h3>
                  <IconList items={x.contraList} className="mt-4 max-w-none" />
                  <p className="mt-3 text-sm text-[var(--color-body)]/85">{x.contraFoot}</p>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">
                    <span className="inline-flex items-start gap-2 text-left">
                      <Heart className="mt-1 h-6 w-6 shrink-0 text-[var(--color-brand)]" aria-hidden />
                      <span>{x.painTitle}</span>
                    </span>
                  </h3>
                  <p className="mt-4 text-[var(--color-body)]/95">{x.painAnswer}</p>
                </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll variant="slide-left">
              <figure className="mx-auto w-full max-w-[min(100%,20.5rem)] overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)] sm:max-w-[min(100%,22.25rem)] lg:max-w-[min(100%,24rem)] lg:-translate-y-2">
                <img
                  src={luxoSeancePhoto.src}
                  alt={luxoSeancePhoto.alt}
                  width={900}
                  height={700}
                  className="h-auto w-full object-cover"
                  loading="lazy"
                />
              </figure>
            </RevealOnScroll>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
            <RevealOnScroll variant="slide-right" className="order-2 lg:order-1">
              <figure className="mx-auto w-full max-w-[min(100%,20.5rem)] overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)] shadow-sm sm:max-w-[min(100%,22.25rem)] lg:max-w-[min(100%,24rem)] lg:-translate-x-3 lg:translate-y-4">
                <img
                  src={camille6LuxoPhoto.src}
                  alt={camille6LuxoPhoto.alt}
                  width={900}
                  height={700}
                  className="h-auto w-full object-cover"
                  loading="lazy"
                />
              </figure>
            </RevealOnScroll>
            <RevealOnScroll variant="slide-left" className="order-1 lg:order-2">
              <div className="lg:pl-2">
                <h3 className="font-display text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">
                  <span className="inline-flex items-start gap-2 text-left">
                    <Sparkles className="mt-1 h-6 w-6 shrink-0 text-[var(--color-brand)]" aria-hidden />
                    <span>{x.hypnoComplementTitle}</span>
                  </span>
                </h3>
                {x.hypnoComplement.map((p) => (
                  <p key={p} className="mt-4 leading-relaxed text-[var(--color-body)]/95 first:mt-6">
                    {p}
                  </p>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionDivider />

        <section className="mt-12 space-y-6 sm:mt-16">
          <RevealOnScroll variant="fade-up">
            <h2 className="text-center font-display text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              <span className="inline-flex items-start gap-3 text-left">
                <Brain className="mt-1 h-8 w-8 shrink-0 text-[var(--color-brand)] sm:h-9 sm:w-9" aria-hidden />
                <span>{x.hypnoTitle}</span>
              </span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll variant="fade-up">
            <p className="leading-relaxed text-[var(--color-body)]/95">{x.hypnoIntro}</p>
          </RevealOnScroll>
        </section>

        <EditorialSectionImmersive atmosphereVariant="strong" atmospherePlacement="center">
          <RevealOnScroll variant="scale">
            <EditorialQuote quote={`« ${x.hypnoHighlight} »`} variant="featured" />
          </RevealOnScroll>
        </EditorialSectionImmersive>
        </div>
        </div>

        {/* Même rythme que page À distance : image / texte en alternance, pleine largeur max-w-6xl */}
        <section className="mt-12 w-full space-y-14 sm:mt-16 sm:space-y-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            {/* Image gauche, texte droite — comme « accompagnement en visio » */}
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
              <RevealOnScroll variant="slide-left" className="order-2 lg:order-1 lg:-translate-x-2">
                <figure className="mx-auto w-full max-w-[min(100%,20.5rem)] overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)] shadow-[var(--shadow-soft)] sm:max-w-[min(100%,22.25rem)] lg:max-w-[min(100%,24rem)] lg:translate-y-3">
                  <img
                    src={media.programmeLuxoHypnoHeader}
                    alt="Camille — accompagnement arrêt du tabac"
                    width={1200}
                    height={800}
                    className="h-auto w-full object-cover"
                    loading="lazy"
                  />
                </figure>
              </RevealOnScroll>
              <RevealOnScroll variant="slide-right" className="order-1 lg:order-2 lg:translate-x-2 lg:pl-2">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">
                    <span className="inline-flex items-start gap-2 text-left">
                      <HelpCircle className="mt-1 h-6 w-6 shrink-0 text-[var(--color-brand)]" aria-hidden />
                      <span>{x.hypnoCasesTitle}</span>
                    </span>
                  </h3>
                  <IconList items={x.hypnoCases} className="mt-6 max-w-none" />
                </div>
              </RevealOnScroll>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            {/* Texte gauche, image droite — comme « ce que ce programme peut vous apporter » */}
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
              <RevealOnScroll variant="slide-right">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">
                    <span className="inline-flex items-start gap-2 text-left">
                      <Sparkles className="mt-1 h-6 w-6 shrink-0 text-[var(--color-brand)]" aria-hidden />
                      <span>{x.hypnoHowTitle}</span>
                    </span>
                  </h3>
                  {x.hypnoHow.map((p) => (
                    <p key={p} className="mt-4 leading-relaxed text-[var(--color-body)]/95 first:mt-6">
                      {p}
                    </p>
                  ))}
                </div>
              </RevealOnScroll>
              <RevealOnScroll variant="slide-left">
                <figure className="mx-auto w-full max-w-[min(100%,20.5rem)] overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)] sm:max-w-[min(100%,22.25rem)] lg:max-w-[min(100%,24rem)] lg:-translate-y-2">
                  <img
                    src={cabinetRoomPhoto.src}
                    alt={cabinetRoomPhoto.alt}
                    width={900}
                    height={700}
                    className="h-auto w-full object-cover"
                    loading="lazy"
                  />
                </figure>
              </RevealOnScroll>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            {/* Image gauche, texte droite — comme « déroulé / carnet » */}
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
              <RevealOnScroll variant="slide-right" className="order-2 lg:order-1">
                <figure className="mx-auto w-full max-w-[min(100%,20.5rem)] overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)] shadow-sm sm:max-w-[min(100%,22.25rem)] lg:max-w-[min(100%,24rem)] lg:-translate-x-3 lg:translate-y-6">
                  <img
                    src={seancePhoto.src}
                    alt={seancePhoto.alt}
                    width={900}
                    height={700}
                    className="h-auto w-full object-cover"
                    loading="lazy"
                  />
                </figure>
              </RevealOnScroll>
              <RevealOnScroll variant="slide-left" className="order-1 lg:order-2">
                <div className="lg:pl-2">
                  <h3 className="font-display text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">
                    <span className="inline-flex items-start gap-2 text-left">
                      <Sparkles className="mt-1 h-6 w-6 shrink-0 text-[var(--color-brand)]" aria-hidden />
                      <span>{x.hypnoComplement2Title}</span>
                    </span>
                  </h3>
                  {x.hypnoComplement2.map((p) => (
                    <p key={p} className="mt-4 leading-relaxed text-[var(--color-body)]/95 first:mt-6">
                      {p}
                    </p>
                  ))}
                </div>
              </RevealOnScroll>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            {/* Texte gauche, image droite */}
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
              <RevealOnScroll variant="slide-right">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">
                    <span className="inline-flex items-start gap-2 text-left">
                      <Heart className="mt-1 h-6 w-6 shrink-0 text-[var(--color-brand)]" aria-hidden />
                      <span>{x.hypnoAdaptTitle}</span>
                    </span>
                  </h3>
                  <p className="mt-6 leading-relaxed text-[var(--color-body)]/95">{x.hypnoAdapt}</p>
                </div>
              </RevealOnScroll>
              <RevealOnScroll variant="slide-left">
                <figure className="mx-auto w-full max-w-[min(100%,20.5rem)] overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)] sm:max-w-[min(100%,22.25rem)] lg:max-w-[min(100%,24rem)] lg:-translate-y-2">
                  <img
                    src={seance2Photo.src}
                    alt={seance2Photo.alt}
                    width={900}
                    height={700}
                    className="h-auto w-full object-cover"
                    loading="lazy"
                  />
                </figure>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
        <SectionDivider />

        <div className="mt-8 sm:mt-12">
          <RevealOnScroll variant="fade-up">
            <h2 className="text-center font-display text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              <span className="inline-flex items-center gap-3">
                <Images className="h-8 w-8 shrink-0 text-[var(--color-brand)] sm:h-9 sm:w-9" aria-hidden />
                Illustrations explicatives
              </span>
            </h2>
            <p className="mt-2 text-center text-sm text-[var(--color-body)]/85">Feuilleter les schémas pas à pas.</p>
          </RevealOnScroll>
          <ImageCarousel className="mt-8" images={luxopunctureExplanationImages} />
        </div>
        </div>
        </div>
      </SectionAtmosphere>

      <SectionGradientSpacer />

      <SectionAtmosphere variant="soft" placement="both">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-4 py-12 sm:py-16">
            <Link
              to="/programme"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-cta)] px-6 py-3 text-sm font-bold text-[var(--color-on-cta)] shadow-sm transition hover:bg-[var(--color-cta-hover)] hover:text-white"
            >
              À distance
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
            <Link
              to="/contact"
              className="inline-flex rounded-full bg-[var(--color-cta)] px-8 py-3.5 text-sm font-bold text-[var(--color-on-cta)] shadow-sm transition hover:bg-[var(--color-cta-hover)] hover:text-white"
            >
              Me contacter / prendre rendez-vous
            </Link>
          </div>

          <RevealOnScroll variant="fade-up">
            <section className="pb-16 sm:pb-20">
              <h2 className="font-display text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
                Quelques avis
              </h2>
              <div className="mt-8">
                <WrittenReviewsMarquee />
              </div>
              <Link
                to="/temoignages"
                className="mt-8 inline-flex text-sm font-semibold text-[var(--color-cta-hover)] underline-offset-4 hover:underline"
              >
                Voir tous les témoignages
              </Link>
            </section>
          </RevealOnScroll>
        </div>
      </SectionAtmosphere>
    </div>
  )
}
