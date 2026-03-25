// src/components/admin/admin-section.tsx — blocs admin avec repères couleur pour la lisibilité
import type { ReactNode } from 'react'

export type AdminSectionVariant = 'brand' | 'mint' | 'rose' | 'sand' | 'slate'

const shell: Record<AdminSectionVariant, string> = {
  brand:
    'border-[var(--color-brand)]/18 bg-[var(--color-muted-green)]/35 shadow-[0_1px_0_rgb(35_65_59_/0.06)]',
  mint: 'border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 to-white shadow-[0_1px_0_rgb(16_185_129_/0.08)]',
  rose: 'border-[var(--color-logo-feather)]/25 bg-gradient-to-br from-rose-50/95 to-white shadow-[0_1px_0_rgb(232_104_136_/0.08)]',
  sand: 'border-[var(--color-accent)]/25 bg-gradient-to-br from-[#faf6f0] to-white shadow-[0_1px_0_rgb(166_139_106_/0.12)]',
  slate: 'border-[var(--color-body)]/12 bg-[var(--color-surface)] shadow-sm',
}

const bar: Record<AdminSectionVariant, string> = {
  brand: 'bg-[var(--color-brand)]',
  mint: 'bg-[var(--color-cta)]',
  rose: 'bg-[var(--color-logo-feather)]',
  sand: 'bg-[var(--color-accent)]',
  slate: 'bg-[var(--color-body)]/40',
}

interface AdminSectionProps {
  variant: AdminSectionVariant
  title: string
  subtitle?: string
  /** Bouton ou lien aligné à droite du titre (ex. Supprimer). */
  actions?: ReactNode
  children: ReactNode
  className?: string
}

export function AdminSection({ variant, title, subtitle, actions, children, className = '' }: AdminSectionProps) {
  return (
    <section
      className={[
        'overflow-hidden rounded-2xl border',
        shell[variant],
        className,
      ].join(' ')}
    >
      <div className={`h-1.5 w-full ${bar[variant]}`} aria-hidden />
      <div className="px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-lg font-semibold tracking-tight text-[var(--color-ink)]">{title}</h2>
            {subtitle ? (
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-body)]/80">{subtitle}</p>
            ) : null}
          </div>
          {actions ? <div className="shrink-0">{actions}</div> : null}
        </div>
        <div className={subtitle || actions ? 'mt-5' : 'mt-4'}>{children}</div>
      </div>
    </section>
  )
}
