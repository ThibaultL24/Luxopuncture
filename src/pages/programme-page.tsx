// src/pages/programme-page.tsx
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  ClipboardList,
  Heart,
  HelpCircle,
  Laptop,
  MessageSquare,
  Sparkles,
  UserRound,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  EditorialInsight,
  EditorialQuote,
  EditorialSectionImmersive,
  RevealOnScroll,
  SectionAtmosphere,
  SectionDivider,
  SectionGradientSpacer,
} from '../components/editorial'
import { detoxFaq, detoxProgramCopy } from '../data/site-content'
import { aboutPagePhoto, media } from '../data/media'
import { usePageTitle } from '../hooks/use-page-title'

function IconList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-6 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-[var(--color-body)]/95">
          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand)]" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function ProgrammePage() {
  usePageTitle('À distance')
  const c = detoxProgramCopy

  return (
    <div className="bg-transparent">
      <header className="border-b border-[var(--color-brand)]/10 bg-transparent">
        <div className="mx-auto max-w-4xl overflow-hidden px-4 pt-10 sm:px-6 sm:pt-14">
          <figure className="overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)] shadow-sm">
            <img
              src={media.detoxProgramHero}
              alt="Camille — présentation de l’accompagnement à distance"
              width={1200}
              height={800}
              className="h-auto w-full max-h-[min(22rem,55vh)] object-cover object-center sm:max-h-[min(28rem,60vh)]"
              loading="eager"
              decoding="async"
            />
          </figure>
          <div className="py-10 text-center sm:py-12">
            <h1 className="font-display text-3xl font-semibold leading-tight text-[var(--color-ink)] sm:text-4xl">
              {c.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-body)]/95">{c.subtitle}</p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-cta)] px-8 py-3.5 text-sm font-bold text-[var(--color-on-cta)] shadow-[var(--shadow-soft)] transition hover:bg-[var(--color-cta-hover)] hover:text-white"
            >
              <Calendar className="h-4 w-4 shrink-0" aria-hidden />
              Bilan offert (1h en visio)
            </Link>
          </div>
        </div>
      </header>

      {/* Dense — intro */}
      <SectionAtmosphere variant="soft" placement="both">
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-14">
          <RevealOnScroll variant="fade-up">
            <p className="flex items-start justify-center gap-2 text-center font-display text-xl text-[var(--color-ink)] sm:text-2xl">
              <MessageSquare className="mt-1 h-5 w-5 shrink-0 text-[var(--color-brand)]" aria-hidden />
              <span>{c.introLead}</span>
            </p>
            <p className="mt-4 text-center text-[var(--color-body)]/95">{c.introSymptoms}</p>
            <p className="mt-8 flex items-center justify-center gap-2 text-center font-medium text-[var(--color-brand)]">
              <HelpCircle className="h-4 w-4 shrink-0" aria-hidden />
              {c.introQuestion}
            </p>
          </RevealOnScroll>
        </section>
      </SectionAtmosphere>

      {/* Impact — citation hors flux */}
      <EditorialSectionImmersive atmosphereVariant="strong" atmospherePlacement="center">
        <RevealOnScroll variant="scale">
          <EditorialQuote quote={c.editorialQuote} variant="featured" />
        </RevealOnScroll>
      </EditorialSectionImmersive>

      <SectionDivider />

      {/* Dense — distance + visio (asymétrie : image à gauche desktop, texte d’abord sur mobile) */}
      <section className="w-full bg-transparent py-14 sm:py-16">
        <SectionAtmosphere variant="medium" placement="diagonal">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14">
            <RevealOnScroll variant="slide-left" className="order-2 lg:order-1 lg:-translate-x-2">
              <figure className="overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)] shadow-[var(--shadow-soft)] lg:translate-y-3">
                <img
                  src={media.detoxVisio}
                  alt="Camille — accompagnement à distance en visio"
                  width={800}
                  height={600}
                  className="h-auto w-full object-cover"
                  loading="lazy"
                />
              </figure>
            </RevealOnScroll>
            <RevealOnScroll variant="slide-right" className="order-1 lg:order-2 lg:translate-x-2 lg:pl-2">
              <div>
                <h2 className="flex items-start gap-2 font-display text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">
                  <Laptop className="mt-1 h-6 w-6 shrink-0 text-[var(--color-brand)]" aria-hidden />
                  <span>{c.distanceSection.title}</span>
                </h2>
                <p className="mt-6 leading-relaxed text-[var(--color-body)]/95">{c.distanceSection.p1}</p>
                <p className="mt-6 font-medium text-[var(--color-ink)]">{c.distanceSection.highlight}</p>
              </div>
            </RevealOnScroll>
          </div>
        </SectionAtmosphere>
      </section>

      {/* Dense — bénéfices */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <RevealOnScroll variant="slide-right">
            <div>
              <h2 className="flex items-start gap-2 font-display text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">
                <Sparkles className="mt-1 h-6 w-6 shrink-0 text-[var(--color-brand)]" aria-hidden />
                <span>{c.benefits.title}</span>
              </h2>
              <IconList items={c.benefits.items} />
              <p className="mt-6 font-medium text-[var(--color-ink)]">{c.benefits.closing}</p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll variant="slide-left">
            <figure className="overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)] lg:-translate-y-2">
              <img
                src={media.detoxWellbeing}
                alt="Sérénité — illustration bien-être"
                width={900}
                height={700}
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </figure>
          </RevealOnScroll>
        </div>
      </section>

      {/* Dense — déroulé */}
      <section className="w-full bg-transparent py-14 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-start lg:gap-14">
          <RevealOnScroll variant="slide-right">
            <figure className="order-2 overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)] shadow-sm lg:order-1 lg:-translate-x-3 lg:translate-y-6">
              <img
                src={media.detoxNotebook}
                alt="Bilan offert — premier rendez-vous"
                width={900}
                height={700}
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </figure>
          </RevealOnScroll>
          <RevealOnScroll variant="slide-left" className="order-1 lg:order-2">
            <div className="lg:pl-2">
              <h2 className="flex items-start gap-2 font-display text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">
                <ClipboardList className="mt-1 h-6 w-6 shrink-0 text-[var(--color-brand)]" aria-hidden />
                <span>{c.howItWorks.title}</span>
              </h2>
              <p className="mt-4 text-[var(--color-body)]/95">{c.howItWorks.intro}</p>
              <IconList items={c.howItWorks.bullets} />
              <p className="mt-6 font-medium text-[var(--color-ink)]">{c.howItWorks.highlight1}</p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-body)]/90">{c.howItWorks.highlight2}</p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <SectionGradientSpacer />

      {/* Approche + insight */}
      <section className="mx-auto max-w-3xl space-y-10 px-4 py-16 sm:px-6 sm:py-20">
        <RevealOnScroll variant="fade-up">
          <h2 className="flex items-start gap-2 font-display text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">
            <Heart className="mt-1 h-6 w-6 shrink-0 text-[var(--color-brand)]" aria-hidden />
            <span>{c.approach.title}</span>
          </h2>
          <p className="mt-4 text-[var(--color-body)]/95">{c.approach.intro}</p>
          <p className="mt-6 font-medium text-[var(--color-ink)]">{c.approach.goalsLabel}</p>
          <IconList items={c.approach.goals} />
        </RevealOnScroll>
        <RevealOnScroll variant="scale">
          <EditorialInsight title={c.editorialInsight.title}>{c.editorialInsight.body}</EditorialInsight>
        </RevealOnScroll>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <RevealOnScroll variant="fade">
          <h2 className="flex items-start gap-2 font-display text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">
            <UserRound className="mt-1 h-6 w-6 shrink-0 text-[var(--color-brand)]" aria-hidden />
            <span>{c.forWho.title}</span>
          </h2>
          <p className="mt-4 text-[var(--color-body)]/95">{c.forWho.intro}</p>
          <IconList items={c.forWho.items} />
        </RevealOnScroll>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <RevealOnScroll variant="slide-right">
          <h2 className="flex items-start gap-2 font-display text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">
            <Calendar className="mt-1 h-6 w-6 shrink-0 text-[var(--color-brand)]" aria-hidden />
            <span>{c.modalities.title}</span>
          </h2>
          <p className="mt-4 text-[var(--color-body)]/95">{c.modalities.intro}</p>
          <IconList items={c.modalities.items} />
          <p className="mt-6 text-sm text-[var(--color-body)]/85">{c.modalities.tarifsHint}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/tarifs"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-brand)]/30 px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-brand)]/50"
            >
              Voir les tarifs
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-cta)] px-6 py-3 text-sm font-bold text-[var(--color-on-cta)] shadow-sm transition hover:bg-[var(--color-cta-hover)] hover:text-white"
            >
              <Calendar className="h-4 w-4 shrink-0" aria-hidden />
              Réserver un bilan offert
            </Link>
          </div>
        </RevealOnScroll>
      </section>

      <section className="w-full border-t border-[var(--color-brand)]/10 bg-transparent py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <RevealOnScroll variant="fade-up">
            <h2 className="flex items-center justify-center gap-2 text-center font-display text-3xl font-semibold text-[var(--color-ink)] sm:text-4xl">
              <HelpCircle className="h-7 w-7 shrink-0 text-[var(--color-brand)]" aria-hidden />
              Questions fréquentes
            </h2>
          </RevealOnScroll>
          <div className="mt-12 space-y-6">
            {detoxFaq.map((item, i) => (
              <RevealOnScroll key={`faq-${i}`} variant={i % 2 === 0 ? 'slide-left' : 'slide-right'}>
                <div className="glass-soft rounded-2xl border border-[var(--color-brand)]/10 p-6 shadow-sm">
                  <h3 className="flex items-start gap-2 font-display text-lg font-semibold text-[var(--color-ink)]">
                    <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand)]" aria-hidden />
                    <span>{item.question}</span>
                  </h3>
                  <div className="mt-3 space-y-3 text-sm leading-relaxed text-[var(--color-body)]/95">
                    {item.answer.map((p, j) => (
                      <p
                        key={`faq-${i}-${j}`}
                        className={p === 'Non.' ? 'font-semibold text-[var(--color-ink)]' : undefined}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-transparent py-16 sm:py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 text-center sm:px-6 md:flex-row md:text-left">
          <RevealOnScroll variant="scale">
            <figure className="h-48 w-48 shrink-0 overflow-hidden rounded-full border border-[var(--color-brand)]/10 shadow-md md:translate-x-2">
              <img
                src={aboutPagePhoto.src}
                alt={aboutPagePhoto.alt}
                className="h-full w-full object-cover"
                width={400}
                height={400}
                loading="lazy"
              />
            </figure>
          </RevealOnScroll>
          <RevealOnScroll variant="fade-up">
            <div>
              <p className="font-display text-xl text-[var(--color-ink)]">Un bilan pour faire le point, sans engagement.</p>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-cta)] px-8 py-3.5 text-sm font-bold text-[var(--color-on-cta)] shadow-[var(--shadow-soft)] transition hover:bg-[var(--color-cta-hover)] hover:text-white"
              >
                <Calendar className="h-4 w-4 shrink-0" aria-hidden />
                Réserver un bilan offert
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  )
}
