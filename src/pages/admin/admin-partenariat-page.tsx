// src/pages/admin/admin-partenariat-page.tsx
import { AdminField } from '../../components/admin/admin-field'
import { AdminPageHeader } from '../../components/admin/admin-page-header'
import { AdminSection } from '../../components/admin/admin-section'
import { useAdmin } from '../../hooks/use-admin'

export function AdminPartenariatPage() {
  const { state, setState } = useAdmin()
  const p = state.partenariatPage

  return (
    <div className="space-y-8">
      <AdminPageHeader title="Partenariat" subtitle="Titres et textes affichés sur la page Partenariat." />

      <AdminSection variant="sand" title="En-tête de page">
        <div className="space-y-4">
          <AdminField
            label="Titre de la page"
            value={p.pageTitle}
            onChange={(v) => setState((s) => ({ ...s, partenariatPage: { ...s.partenariatPage, pageTitle: v } }))}
          />
          <AdminField
            label="Sous-titre (sous le titre)"
            value={p.pageSubtitle}
            onChange={(v) => setState((s) => ({ ...s, partenariatPage: { ...s.partenariatPage, pageSubtitle: v } }))}
            multiline
            rows={6}
          />
        </div>
      </AdminSection>

      <AdminSection variant="mint" title="Bloc produits partenaires">
        <div className="space-y-4">
          <AdminField
            label="Titre du bloc"
            value={p.productsTitle}
            onChange={(v) => setState((s) => ({ ...s, partenariatPage: { ...s.partenariatPage, productsTitle: v } }))}
          />
          <AdminField
            label="Texte"
            value={p.productsBody}
            onChange={(v) => setState((s) => ({ ...s, partenariatPage: { ...s.partenariatPage, productsBody: v } }))}
            multiline
            rows={6}
          />
        </div>
      </AdminSection>

      <AdminSection variant="rose" title="Bloc réseaux" subtitle="Les boutons de liens restent sous ce texte sur le site.">
        <div className="space-y-4">
          <AdminField
            label="Titre du bloc"
            value={p.networksTitle}
            onChange={(v) => setState((s) => ({ ...s, partenariatPage: { ...s.partenariatPage, networksTitle: v } }))}
          />
          <AdminField
            label="Texte"
            value={p.networksBody}
            onChange={(v) => setState((s) => ({ ...s, partenariatPage: { ...s.partenariatPage, networksBody: v } }))}
            multiline
            rows={6}
          />
        </div>
      </AdminSection>
    </div>
  )
}
