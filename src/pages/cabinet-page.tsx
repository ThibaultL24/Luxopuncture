// src/pages/cabinet-page.tsx
import {
  ArrowLeftRight,
  ArrowRight,
  Brain,
  CheckCircle,
  Heart,
  HelpCircle,
  Images,
  Lightbulb,
  ShieldAlert,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSiteData } from '../contexts/admin-context'
import { getCabinetProgramCardImage, luxopunctureExplanationImages, media } from '../data/media'
import { cabinetLuxoHypnoCopy, cabinetServiceTeasers, getServiceBySlug } from '../data/site-content'
import { ImageCarousel } from '../components/ui/image-carousel'
import { WrittenReviewsMarquee } from '../components/written-reviews-marquee'
import { SectionHeading } from '../components/ui/section-heading'
import { usePageTitle } from '../hooks/use-page-title'

function IconList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mx-auto max-w-xl space-y-2 text-[var(--color-body)]/95">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-left">
          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand)]" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function CabinetPage() {
  usePageTitle('Cabinet & accompagnements')
  const { services } = useSiteData()
  const x = cabinetLuxoHypnoCopy

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-20">
      <SectionHeading
        eyebrow="Cabinet"
        title="Accompagnements au cabinet"
        subtitle="Luxopuncture et hypnose — des protocoles adaptés à votre objectif."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {cabinetServiceTeasers.map(({ slug, title, description }) => {
          const service = getServiceBySlug(slug, services)
          if (!service) return null
          return (
            <Link
              key={slug}
              to={`/programme/${slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-page)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="flex aspect-square items-center justify-center overflow-hidden bg-[var(--color-beige)] p-2 sm:p-3">
                <img
                  src={getCabinetProgramCardImage(slug, service.coverImage)}
                  alt={title}
                  className="h-full w-full max-h-full max-w-full object-contain transition duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">{title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-body)]/90">{description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-cta-hover)]">
                  En savoir plus
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      <div id="luxopuncture" className="mx-auto mt-20 max-w-3xl scroll-mt-28 border-t border-[var(--color-brand)]/10 pt-16">
        <SectionHeading title={x.luxopunctureTitle} subtitle={x.luxopunctureIntro} />

        <div className="mx-auto mt-10 max-w-2xl space-y-5 text-[var(--color-body)]/95">
          {x.luxopuncturePoints.map((p) => (
            <p key={p} className="flex gap-2.5 leading-relaxed">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand)]" aria-hidden />
              <span className="text-left">{p}</span>
            </p>
          ))}
        </div>

        <figure className="mx-auto mt-10 max-w-xl overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-beige)]">
          <img
            src={media.machineLuxo}
            alt="Appareil de luxopuncture"
            width={1200}
            height={900}
            className="mx-auto h-auto w-full max-w-lg object-contain"
            loading="lazy"
          />
        </figure>

        <section className="mt-16 space-y-8">
          <h3 className="text-center font-display text-xl font-semibold text-[var(--color-ink)]">
            <span className="inline-flex items-start gap-2 text-left">
              <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-brand)]" aria-hidden />
              <span>{x.forWhatTitle}</span>
            </span>
          </h3>
          <p className="text-[var(--color-body)]/95">{x.forWhatIntro}</p>
          <IconList items={x.forWhatList} />

          <h3 className="pt-6 text-center font-display text-xl font-semibold text-[var(--color-ink)]">
            <span className="inline-flex items-start gap-2 text-left">
              <ArrowLeftRight className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-brand)]" aria-hidden />
              <span>{x.vsAcupunctureTitle}</span>
            </span>
          </h3>
          {x.vsAcupuncture.map((p) => (
            <p key={p} className="leading-relaxed text-[var(--color-body)]/95">
              {p}
            </p>
          ))}

          <h3 className="pt-6 text-center font-display text-xl font-semibold text-[var(--color-ink)]">
            <span className="inline-flex items-start gap-2 text-left">
              <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-brand)]" aria-hidden />
              <span>{x.contraTitle}</span>
            </span>
          </h3>
          <IconList items={x.contraList} />
          <p className="text-sm text-[var(--color-body)]/85">{x.contraFoot}</p>

          <h3 className="pt-6 text-center font-display text-xl font-semibold text-[var(--color-ink)]">
            <span className="inline-flex items-start gap-2 text-left">
              <Heart className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-brand)]" aria-hidden />
              <span>{x.painTitle}</span>
            </span>
          </h3>
          <p className="text-[var(--color-body)]/95">{x.painAnswer}</p>

          <h3 className="pt-6 text-center font-display text-xl font-semibold text-[var(--color-ink)]">
            <span className="inline-flex items-start gap-2 text-left">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-brand)]" aria-hidden />
              <span>{x.hypnoComplementTitle}</span>
            </span>
          </h3>
          {x.hypnoComplement.map((p) => (
            <p key={p} className="leading-relaxed text-[var(--color-body)]/95">
              {p}
            </p>
          ))}
        </section>

        <section className="mt-20 space-y-6 border-t border-[var(--color-brand)]/10 pt-16">
          <h2 className="text-center font-display text-2xl font-semibold text-[var(--color-ink)]">
            <span className="inline-flex items-start gap-2 text-left">
              <Brain className="mt-0.5 h-6 w-6 shrink-0 text-[var(--color-brand)]" aria-hidden />
              <span>{x.hypnoTitle}</span>
            </span>
          </h2>
          <p className="leading-relaxed text-[var(--color-body)]/95">{x.hypnoIntro}</p>
          <p className="flex items-start justify-center gap-2 text-center font-medium text-[var(--color-ink)]">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand)]" aria-hidden />
            <span>{x.hypnoHighlight}</span>
          </p>

          <h3 className="pt-4 text-center font-display text-xl font-semibold text-[var(--color-ink)]">
            <span className="inline-flex items-start gap-2 text-left">
              <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-brand)]" aria-hidden />
              <span>{x.hypnoCasesTitle}</span>
            </span>
          </h3>
          <IconList items={x.hypnoCases} />

          <h3 className="pt-4 text-center font-display text-xl font-semibold text-[var(--color-ink)]">
            <span className="inline-flex items-start gap-2 text-left">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-brand)]" aria-hidden />
              <span>{x.hypnoHowTitle}</span>
            </span>
          </h3>
          {x.hypnoHow.map((p) => (
            <p key={p} className="leading-relaxed text-[var(--color-body)]/95">
              {p}
            </p>
          ))}

          <figure className="overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-beige)]">
            <img
              src={media.programmeLuxoHypnoHeader}
              alt="Luxothérapeute et hypnothérapeute — accompagnement"
              width={1200}
              height={640}
              className="h-auto w-full object-cover"
              loading="lazy"
            />
          </figure>

          <h3 className="text-center font-display text-xl font-semibold text-[var(--color-ink)]">
            <span className="inline-flex items-start gap-2 text-left">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-brand)]" aria-hidden />
              <span>{x.hypnoComplement2Title}</span>
            </span>
          </h3>
          {x.hypnoComplement2.map((p) => (
            <p key={p} className="leading-relaxed text-[var(--color-body)]/95">
              {p}
            </p>
          ))}

          <h3 className="text-center font-display text-xl font-semibold text-[var(--color-ink)]">
            <span className="inline-flex items-start gap-2 text-left">
              <Heart className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-brand)]" aria-hidden />
              <span>{x.hypnoAdaptTitle}</span>
            </span>
          </h3>
          <p className="leading-relaxed text-[var(--color-body)]/95">{x.hypnoAdapt}</p>
        </section>

        <div className="mt-20 border-t border-[var(--color-brand)]/10 pt-16">
          <h2 className="text-center font-display text-xl font-semibold text-[var(--color-ink)]">
            <span className="inline-flex items-center gap-2">
              <Images className="h-6 w-6 shrink-0 text-[var(--color-brand)]" aria-hidden />
              Illustrations explicatives
            </span>
          </h2>
          <p className="mt-2 text-center text-sm text-[var(--color-body)]/85">Feuilleter les schémas pas à pas.</p>
          <ImageCarousel className="mt-8" images={luxopunctureExplanationImages} />
        </div>
      </div>

      <div className="mt-14 flex flex-wrap justify-center gap-4 border-t border-[var(--color-brand)]/10 pt-12">
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

      <section className="mt-20 border-t border-[var(--color-brand)]/10 pt-16">
        <h2 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Quelques avis</h2>
        <div className="mt-8">
          <WrittenReviewsMarquee outerSurface="beige" />
        </div>
        <Link
          to="/temoignages"
          className="mt-8 inline-flex text-sm font-semibold text-[var(--color-cta-hover)] underline-offset-4 hover:underline"
        >
          Voir tous les témoignages
        </Link>
      </section>
    </div>
  )
}
