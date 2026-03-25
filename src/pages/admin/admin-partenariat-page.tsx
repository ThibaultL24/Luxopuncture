// src/pages/admin/admin-partenariat-page.tsx
import { useAdmin } from '../../contexts/admin-context'
import { AdminPageHeader } from '../../components/admin/admin-page-header'
import { AdminSection } from '../../components/admin/admin-section'

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
}) {
  const cls = 'admin-input'
  return (
    <label className="block text-sm font-medium text-[var(--color-ink)]">
      {label}
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={6} className={cls} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </label>
  )
}

export function AdminPartenariatPage() {
  const { state, setState } = useAdmin()
  const p = state.partenariatPage

  return (
    <div className="space-y-8">
      <AdminPageHeader title="Partenariat" subtitle="Titres et textes affichés sur la page Partenariat." />

      <AdminSection variant="sand" title="En-tête de page">
        <div className="space-y-4">
          <Field
            label="Titre de la page"
            value={p.pageTitle}
            onChange={(v) => setState((s) => ({ ...s, partenariatPage: { ...s.partenariatPage, pageTitle: v } }))}
          />
          <Field
            label="Sous-titre (sous le titre)"
            value={p.pageSubtitle}
            onChange={(v) => setState((s) => ({ ...s, partenariatPage: { ...s.partenariatPage, pageSubtitle: v } }))}
            multiline
          />
        </div>
      </AdminSection>

      <AdminSection variant="mint" title="Bloc produits partenaires">
        <div className="space-y-4">
          <Field
            label="Titre du bloc"
            value={p.productsTitle}
            onChange={(v) => setState((s) => ({ ...s, partenariatPage: { ...s.partenariatPage, productsTitle: v } }))}
          />
          <Field
            label="Texte"
            value={p.productsBody}
            onChange={(v) => setState((s) => ({ ...s, partenariatPage: { ...s.partenariatPage, productsBody: v } }))}
            multiline
          />
        </div>
      </AdminSection>

      <AdminSection variant="rose" title="Bloc réseaux" subtitle="Les boutons de liens restent sous ce texte sur le site.">
        <div className="space-y-4">
          <Field
            label="Titre du bloc"
            value={p.networksTitle}
            onChange={(v) => setState((s) => ({ ...s, partenariatPage: { ...s.partenariatPage, networksTitle: v } }))}
          />
          <Field
            label="Texte"
            value={p.networksBody}
            onChange={(v) => setState((s) => ({ ...s, partenariatPage: { ...s.partenariatPage, networksBody: v } }))}
            multiline
          />
        </div>
      </AdminSection>
    </div>
  )
}
