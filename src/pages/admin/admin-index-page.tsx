// src/pages/admin/admin-index-page.tsx
import { Link } from 'react-router-dom'
import type { AdminSectionVariant } from '../../components/admin/admin-section'
import { AdminPageHeader } from '../../components/admin/admin-page-header'

const cards: { to: string; title: string; desc: string; variant: AdminSectionVariant }[] = [
  {
    to: '/admin/coordonnees',
    title: 'Coordonnées & site',
    desc: 'Téléphone, e-mail, adresse, horaires, nom du site — appliqués partout (footer, contact, SEO).',
    variant: 'slate',
  },
  {
    to: '/admin/recommandations',
    title: 'Recommandations',
    desc: 'Page partenariat : textes et fiches (ajouter ou retirer des personnes mises en avant).',
    variant: 'sand',
  },
  {
    to: '/admin/tarifs',
    title: 'Tarifs',
    desc: 'Programme à distance, suivi, séances au cabinet, encadré d’informations.',
    variant: 'mint',
  },
  {
    to: '/admin/programmes',
    title: 'Programmes',
    desc: 'Fiches programmes (cabinet) : textes et visuels des pages détail.',
    variant: 'brand',
  },
  {
    to: '/admin/blog',
    title: 'Blog',
    desc: 'Articles : ajouter, modifier, supprimer.',
    variant: 'mint',
  },
  {
    to: '/admin/temoignages',
    title: 'Témoignages',
    desc: 'Avis écrits, vidéos, bandeau d’images.',
    variant: 'rose',
  },
  {
    to: '/admin/metriques',
    title: 'Métriques',
    desc: 'Indicateurs locaux et export des événements (pages vues, clics).',
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
        subtitle="Les changements sont enregistrés dans ce navigateur (localStorage). Exportez un JSON après des modifications importantes. L’accueil et la page À propos restent édités dans le code du dépôt."
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
