// src/components/admin/admin-color-legend.tsx — légende du code couleur (même largeur que l’en-tête « Édition du site »)
import type { AdminSectionVariant } from './admin-section'

const bar: Record<AdminSectionVariant, string> = {
  brand: 'bg-[var(--color-brand)]',
  mint: 'bg-[var(--color-cta)]',
  rose: 'bg-[var(--color-logo-feather)]',
  sand: 'bg-[var(--color-accent)]',
  slate: 'bg-[var(--color-body)]/45',
}

const rows: { variant: AdminSectionVariant; title: string; text: string }[] = [
  {
    variant: 'brand',
    title: 'Vert identité',
    text: 'Blocs principaux : accueil, cabinet, programmes, structure du site.',
  },
  {
    variant: 'mint',
    title: 'Vert action',
    text: 'Tarifs à distance, appels à l’action, blog, vidéos, zones interactives.',
  },
  {
    variant: 'rose',
    title: 'Rose',
    text: 'Témoignages, à propos, ton plus personnel ou relationnel.',
  },
  {
    variant: 'sand',
    title: 'Beige',
    text: 'Infos complémentaires, recommandations, encadrés « chaleur ».',
  },
  {
    variant: 'slate',
    title: 'Neutre',
    text: 'Coordonnées, textes génériques ou réglages « techniques ».',
  },
]

export function AdminColorLegend() {
  return (
    <aside
      className="relative w-full overflow-hidden rounded-2xl border border-[var(--color-brand)]/15 bg-gradient-to-br from-white via-[var(--color-muted-green)]/22 to-[var(--color-surface-rose)] px-5 py-6 text-left shadow-sm sm:px-7 sm:py-7"
      aria-label="Légende du code couleur"
    >
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[var(--color-cta)]/12 blur-2xl"
        aria-hidden
      />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-brand)]/80">Code couleur</p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--color-body)]/88">
          Chaque section d’édition a une barre en haut : elle indique le type de contenu, pas une obligation stricte.
        </p>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {rows.map((row) => (
            <li
              key={row.variant}
              className="flex gap-3 rounded-xl border border-[var(--color-brand)]/10 bg-white/70 p-3 shadow-[inset_0_1px_0_rgb(255_255_255_/0.9)]"
            >
              <span className={`mt-0.5 h-10 w-1 shrink-0 rounded-full ${bar[row.variant]}`} aria-hidden />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[var(--color-ink)]">{row.title}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-[var(--color-body)]/85">{row.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
