// src/pages/partenariat-page.tsx
import { SectionHeading } from '../components/ui/section-heading'
import { SocialLinks } from '../components/social-links'
import { usePageTitle } from '../hooks/use-page-title'

export function PartenariatPage() {
  usePageTitle('Partenariats')

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
      <SectionHeading
        title="Partenariats"
        subtitle="Recommandations et collaborations — contenu en cours de rédaction."
      />
      <div className="mt-10 space-y-8 rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-beige)]/40 p-8 text-[var(--color-body)]/95">
        <section>
          <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">Produits partenaires</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Une présentation des produits de Caroline (lien vers sa page et son site) et un texte de recommandation seront
            ajoutés ici.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">Réseaux</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Retrouvez-moi aussi sur les réseaux — textes de recommandation à compléter.
          </p>
          <SocialLinks className="mt-4" />
        </section>
      </div>
    </div>
  )
}
