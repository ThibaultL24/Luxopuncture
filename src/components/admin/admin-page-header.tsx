// src/components/admin/admin-page-header.tsx — titre de page admin avec zone visuelle distincte
interface AdminPageHeaderProps {
  title: string
  subtitle?: string
}

export function AdminPageHeader({ title, subtitle }: AdminPageHeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-[var(--color-brand)]/15 bg-gradient-to-br from-white via-[var(--color-muted-green)]/25 to-[var(--color-surface-rose)] px-5 py-6 shadow-sm sm:px-7 sm:py-7">
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[var(--color-cta)]/15 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-[var(--color-logo-feather)]/10 blur-2xl"
        aria-hidden
      />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-brand)]/80">Édition du site</p>
        <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-[1.65rem]">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-body)]/88">{subtitle}</p>
        ) : null}
      </div>
    </header>
  )
}
