// src/pages/admin/admin-index-page.tsx
import { Link } from 'react-router-dom'
import type { AdminSectionVariant } from '../../components/admin/admin-section'
import { AdminPageHeader } from '../../components/admin/admin-page-header'

const cards: { to: string; title: string; desc: string; variant: AdminSectionVariant }[] = [
  {
    to: '/admin/accueil',
    title: 'Page d’accueil',
    desc: 'Texte du bandeau principal, blocs « accroche », détox, à distance, témoignages, bandeau vert en bas.',
    variant: 'brand',
  },
  {
    to: '/admin/coordonnees',
    title: 'Coordonnées & nom du site',
    desc: 'Téléphone, e-mail, adresse, horaires, nom affiché sur le site et footer.',
    variant: 'slate',
  },
  { to: '/admin/a-propos', title: 'À propos', desc: 'Titre, présentation, paragraphes, diplômes.', variant: 'rose' },
  {
    to: '/admin/recommandations',
    title: 'Recommandations',
    desc: 'Titres et textes de la page Recommandations.',
    variant: 'sand',
  },
  { to: '/admin/tarifs', title: 'Tarifs', desc: 'Prix à distance, suivi, cabinet, informations complémentaires.', variant: 'mint' },
  {
    to: '/admin/programmes',
    title: 'À distance',
    desc: 'Fiches programmes (cabinet) : texte, prix affichés sur les pages détail.',
    variant: 'brand',
  },
  { to: '/admin/blog', title: 'Blog', desc: 'Articles : ajouter, modifier, supprimer.', variant: 'mint' },
  {
    to: '/admin/temoignages',
    title: 'Témoignages',
    desc: 'Avis écrits, vidéos ; images du bandeau défilant.',
    variant: 'rose',
  },
  {
    to: '/admin/metriques',
    title: 'Métriques',
    desc: 'Indicateurs (pages vues, clics suivis) — données locales ou export JSON.',
    variant: 'mint',
  },
]

const bar: Record<AdminSectionVariant, string> = {
  brand: 'bg-[var(--color-brand)]',
  mint: 'bg-[var(--color-cta)]',
  rose: 'bg-[var(--color-logo-feather)]',
  sand: 'bg-[var(--color-accent)]',
  slate: 'bg-[var(--color-body)]/45',
}

export function AdminIndexPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Vue d’ensemble"
        subtitle="Choisissez une rubrique. Les changements sont enregistrés automatiquement dans ce navigateur — pensez à télécharger une sauvegarde (JSON) après des modifications importantes. Les bandes colorées sur les cartes suivent la légende affichée au-dessus."
      />

      <ul className="grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <li key={c.to}>
            <Link
              to={c.to}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-brand)]/12 bg-white shadow-sm transition hover:border-[var(--color-brand)]/28 hover:shadow-md"
            >
              <div className={`h-1.5 w-full ${bar[c.variant]}`} aria-hidden />
              <div className="flex flex-1 flex-col p-5">
                <span className="font-display text-lg font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-brand)]">
                  {c.title}
                </span>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-body)]/85">{c.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-cta-hover)]">
                  Ouvrir
                  <span aria-hidden className="transition group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
