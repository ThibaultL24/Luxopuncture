// src/components/contact-form.tsx
import { trackFormSubmit } from '../lib/analytics'

interface ContactFormProps {
  /** Boîte de réception — même valeur que contactInfo.email (admin). */
  recipientEmail: string
}

/**
 * Envoi via POST natif vers FormSubmit (formsubmit.co) : l’URL contient l’email cible,
 * pas de variable d’environnement ni de compte côté code. Premier envoi : FormSubmit envoie
 * un mail d’activation à cette adresse (une fois).
 */
export function ContactForm({ recipientEmail }: ContactFormProps) {
  const email = recipientEmail.trim()
  const actionUrl =
    email.length > 0 ? `https://formsubmit.co/${encodeURIComponent(email)}` : ''

  const nextUrl =
    typeof window !== 'undefined' ? `${window.location.origin}/contact?envoye=1` : ''

  return (
    <div className="rounded-3xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)] p-8 shadow-sm lg:translate-y-1">
      <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">Formulaire</h2>
      <p className="mt-2 text-xs leading-relaxed text-[var(--color-body)]/80">
        Remplissez les champs puis « Envoyer » : le message part vers{' '}
        <strong className="text-[var(--color-ink)]">{email || 'l’email de contact'}</strong>. Aucune
        configuration technique sur le site : l’adresse utilisée est celle des coordonnées (modifiable
        dans l’admin).
      </p>

      {!actionUrl ? (
        <p className="mt-4 text-sm text-red-700 dark:text-red-300" role="alert">
          Email de contact manquant — renseignez-le dans l’admin (coordonnées).
        </p>
      ) : (
        <form
          className="mt-6 space-y-4"
          action={actionUrl}
          method="POST"
          onSubmit={() => trackFormSubmit('contact_form_formsubmit')}
        >
          <input type="hidden" name="_next" value={nextUrl} />
          <input type="hidden" name="_subject" value="Message depuis le site Laplace Luxopuncture" />
          <input type="hidden" name="_template" value="table" />

          <label className="block text-sm font-medium text-[var(--color-ink)]">
            Nom
            <input
              type="text"
              name="name"
              autoComplete="name"
              className="mt-1.5 w-full rounded-xl border border-[var(--color-brand)]/15 bg-white px-4 py-3 text-sm outline-none ring-[var(--color-brand)] focus:ring-2"
              placeholder="Votre nom"
              required
            />
          </label>
          <label className="block text-sm font-medium text-[var(--color-ink)]">
            Email
            <input
              type="email"
              name="email"
              autoComplete="email"
              className="mt-1.5 w-full rounded-xl border border-[var(--color-brand)]/15 bg-white px-4 py-3 text-sm outline-none ring-[var(--color-brand)] focus:ring-2"
              placeholder="vous@email.com"
              required
            />
          </label>
          <label className="block text-sm font-medium text-[var(--color-ink)]">
            Message
            <textarea
              name="message"
              rows={4}
              className="mt-1.5 w-full resize-y rounded-xl border border-[var(--color-brand)]/15 bg-white px-4 py-3 text-sm outline-none ring-[var(--color-brand)] focus:ring-2"
              placeholder="Votre demande et disponibilités"
              required
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-[var(--color-cta)] px-6 py-3 text-sm font-bold text-[var(--color-on-cta)] shadow-sm transition hover:bg-[var(--color-cta-hover)] hover:text-white"
          >
            Envoyer
          </button>
        </form>
      )}
    </div>
  )
}
