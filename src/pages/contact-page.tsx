// src/pages/contact-page.tsx
import { Link } from 'react-router-dom'
import { Calendar, FileText, Mail, Phone } from 'lucide-react'
import { media } from '../data/media'
import { socialLinks } from '../data/site-content'
import { useSiteData } from '../contexts/admin-context'
import { SectionHeading } from '../components/ui/section-heading'
import { usePageTitle } from '../hooks/use-page-title'

export function ContactPage() {
  usePageTitle('Contact')
  const { contactInfo, site } = useSiteData()
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <SectionHeading
        title="Contact & prise de rendez-vous"
        subtitle="Bilan offert (1h en visio) pour le programme détox — échangez avec moi par téléphone, WhatsApp, formulaire ou en réservant un créneau."
      />

      <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-[var(--color-brand)]/15 bg-[var(--color-beige)]/60 p-6 text-center shadow-sm sm:p-8">
        <p className="flex items-center justify-center gap-2 font-display text-lg text-[var(--color-ink)]">
          <Calendar className="h-5 w-5 shrink-0 text-[var(--color-brand)]" aria-hidden />
          Réserver votre bilan offert
        </p>
        <p className="mt-2 text-sm text-[var(--color-body)]/90">1h en visio — pour faire le point sur votre besoin et votre rythme.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-cta)] px-8 py-3 text-sm font-bold text-[var(--color-on-cta)] shadow-sm transition hover:bg-[var(--color-cta-hover)] hover:text-white"
          >
            <Phone className="h-4 w-4 shrink-0" aria-hidden />
            Appeler pour réserver
          </a>
          <Link
            to="#formulaire"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-brand)]/30 px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-brand)]/50"
          >
            <FileText className="h-4 w-4 shrink-0" aria-hidden />
            Formulaire
          </Link>
        </div>
      </div>

      <figure className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-page)] shadow-sm">
        <img
          src={media.agenda}
          alt="Agenda et disponibilités"
          className="aspect-[16/10] w-full object-cover object-top sm:aspect-[2/1] sm:max-h-[min(20rem,50vh)]"
          loading="eager"
        />
      </figure>

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-base leading-relaxed text-[var(--color-body)]/95">
            Écrivez-moi ou appelez-moi pour convenir d’un créneau ou demander votre{' '}
            <Link to="/programme" className="font-medium text-[var(--color-cta-hover)] underline-offset-2 hover:underline">
              bilan offert
            </Link>
            . Les demandes urgentes sont traitées dans la mesure des disponibilités.
          </p>
          <ul className="mt-10 space-y-6 text-sm">
            <li className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-brand)]/12 text-[var(--color-brand)]">
                <Phone className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-semibold text-[var(--color-ink)]">Téléphone</p>
                <a className="text-[var(--color-body)] hover:text-[var(--color-brand)]" href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}>
                  {contactInfo.phone}
                </a>
                <p className="mt-2 text-xs leading-relaxed text-[var(--color-body)]/75">{contactInfo.hours}</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-accent)]/20 text-[var(--color-brand)]">
                <span className="text-lg font-bold" aria-hidden>
                  W
                </span>
              </span>
              <div>
                <p className="font-semibold text-[var(--color-ink)]">WhatsApp</p>
                <a
                  className="text-[var(--color-body)] hover:text-[var(--color-brand)]"
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Écrire sur WhatsApp
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-accent)]/20 text-[var(--color-brand)]">
                <Mail className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-semibold text-[var(--color-ink)]">Email</p>
                <a className="text-[var(--color-body)] hover:text-[var(--color-brand)]" href={`mailto:${contactInfo.email}`}>
                  {contactInfo.email}
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div id="formulaire" className="rounded-3xl border border-[var(--color-brand)]/10 bg-[var(--color-beige)]/40 p-8 shadow-sm">
          <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">Formulaire</h2>
          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <label className="block text-sm font-medium text-[var(--color-ink)]">
              Nom
              <input
                type="text"
                name="name"
                className="mt-1.5 w-full rounded-xl border border-[var(--color-brand)]/15 bg-white px-4 py-3 text-sm outline-none ring-[var(--color-brand)] focus:ring-2"
                placeholder="Votre nom"
              />
            </label>
            <label className="block text-sm font-medium text-[var(--color-ink)]">
              Email
              <input
                type="email"
                name="email"
                className="mt-1.5 w-full rounded-xl border border-[var(--color-brand)]/15 bg-white px-4 py-3 text-sm outline-none ring-[var(--color-brand)] focus:ring-2"
                placeholder="vous@email.com"
              />
            </label>
            <label className="block text-sm font-medium text-[var(--color-ink)]">
              Message
              <textarea
                name="message"
                rows={4}
                className="mt-1.5 w-full resize-y rounded-xl border border-[var(--color-brand)]/15 bg-white px-4 py-3 text-sm outline-none ring-[var(--color-brand)] focus:ring-2"
                placeholder="Votre demande et disponibilités"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-[var(--color-cta)] px-6 py-3 text-sm font-bold text-[var(--color-on-cta)] shadow-sm transition hover:bg-[var(--color-cta-hover)] hover:text-white"
            >
              Envoyer
            </button>
          </form>
          <p className="mt-4 text-center text-xs text-[var(--color-body)]/70">
            {site.domain}
          </p>
        </div>
      </div>
    </div>
  )
}
