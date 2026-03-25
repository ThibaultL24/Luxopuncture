// src/pages/admin/admin-layout.tsx
import { useRef } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAdmin } from '../../contexts/admin-context'
import { AdminColorLegend } from '../../components/admin/admin-color-legend'

const navItems: { to: string; label: string; end?: boolean }[] = [
  { to: '/admin', label: 'Vue d’ensemble', end: true },
  { to: '/admin/accueil', label: 'Page d’accueil' },
  { to: '/admin/coordonnees', label: 'Coordonnées & site' },
  { to: '/admin/a-propos', label: 'À propos' },
  { to: '/admin/partenariat', label: 'Partenariat' },
  { to: '/admin/tarifs', label: 'Tarifs' },
  { to: '/admin/programmes', label: 'Programmes' },
  { to: '/admin/blog', label: 'Blog' },
  { to: '/admin/temoignages', label: 'Témoignages' },
  { to: '/admin/metriques', label: 'Métriques' },
]

function navClass(active: boolean) {
  return [
    'block rounded-xl px-3 py-2.5 text-sm font-medium transition',
    active ? 'bg-[var(--color-brand)] text-white' : 'text-[var(--color-ink)] hover:bg-[var(--color-brand)]/10',
  ].join(' ')
}

export function AdminLayout() {
  const { logout, exportStateJson, importState } = useAdmin()
  const importRef = useRef<HTMLInputElement>(null)

  function downloadExport() {
    const blob = new Blob([exportStateJson()], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `laplace-site-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  function onImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      importState(String(reader.result))
      window.alert('Import terminé. Vérifiez les pages du site.')
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="admin-shell">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 lg:flex-row lg:gap-10 lg:px-6 lg:py-10">
        <aside className="w-full shrink-0 lg:w-56">
          <div className="overflow-hidden rounded-2xl border border-[var(--color-brand)]/15 bg-white shadow-md">
            <div className="bg-[var(--color-brand)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/90">Administration</p>
              <p className="mt-0.5 text-[11px] text-white/75">Menu</p>
            </div>
            <nav className="flex flex-col gap-0.5 p-2" aria-label="Sections">
              {navItems.map((item) => (
                <NavLink
                  key={item.to + (item.end ? '-end' : '')}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => navClass(isActive)}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="space-y-2 border-t border-[var(--color-brand)]/10 bg-[var(--color-beige)]/35 p-3">
              <p className="px-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-body)]/70">
                Sauvegarde
              </p>
              <button
                type="button"
                onClick={downloadExport}
                className="w-full rounded-xl border border-[var(--color-brand)]/20 bg-white px-3 py-2 text-left text-sm text-[var(--color-ink)] shadow-sm hover:bg-[var(--color-muted-green)]/50"
              >
                Télécharger (JSON)
              </button>
              <button
                type="button"
                onClick={() => importRef.current?.click()}
                className="w-full rounded-xl border border-[var(--color-brand)]/20 bg-white px-3 py-2 text-left text-sm text-[var(--color-ink)] shadow-sm hover:bg-[var(--color-muted-green)]/50"
              >
                Importer un fichier
              </button>
              <input ref={importRef} type="file" accept="application/json" className="hidden" onChange={onImportFile} />
              <Link
                to="/"
                className="block w-full rounded-xl bg-[var(--color-cta)] px-3 py-2.5 text-center text-sm font-bold text-[var(--color-on-cta)] shadow-sm hover:brightness-105"
              >
                Voir le site
              </Link>
              <button
                type="button"
                onClick={logout}
                className="w-full rounded-xl px-3 py-2 text-left text-sm text-[var(--color-body)] hover:bg-white/80"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </aside>
        <main className="min-w-0 flex-1 space-y-6">
          <AdminColorLegend />
          <Outlet />
        </main>
      </div>
    </div>
  )
}
