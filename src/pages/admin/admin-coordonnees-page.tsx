// src/pages/admin/admin-coordonnees-page.tsx
import { AdminField } from '../../components/admin/admin-field'
import { AdminPageHeader } from '../../components/admin/admin-page-header'
import { AdminSection } from '../../components/admin/admin-section'
import { useAdmin } from '../../hooks/use-admin'

export function AdminCoordonneesPage() {
  const { state, setState } = useAdmin()
  const { contactInfo, site } = state

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Coordonnées & site"
        subtitle="Ces informations apparaissent sur la page Contact, le pied de page et ailleurs sur le site."
      />

      <AdminSection variant="slate" title="Contact" subtitle="Téléphone, e-mail, adresse et disponibilités.">
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField
            label="Téléphone"
            value={contactInfo.phone}
            onChange={(v) => setState((s) => ({ ...s, contactInfo: { ...s.contactInfo, phone: v } }))}
          />
          <AdminField
            label="E-mail"
            value={contactInfo.email}
            onChange={(v) => setState((s) => ({ ...s, contactInfo: { ...s.contactInfo, email: v } }))}
          />
          <div className="sm:col-span-2">
            <AdminField
              label="Adresse (résumé affiché dans le footer)"
              value={contactInfo.address}
              onChange={(v) => setState((s) => ({ ...s, contactInfo: { ...s.contactInfo, address: v } }))}
              multiline
              rows={3}
            />
          </div>
          <div className="sm:col-span-2">
            <AdminField
              label="Horaires / modalités de contact"
              value={contactInfo.hours}
              onChange={(v) => setState((s) => ({ ...s, contactInfo: { ...s.contactInfo, hours: v } }))}
              multiline
              rows={3}
            />
          </div>
        </div>
      </AdminSection>

      <AdminSection variant="sand" title="Nom du site (footer)" subtitle="Identité affichée en bas de page.">
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField
            label="Nom affiché"
            value={site.name}
            onChange={(v) => setState((s) => ({ ...s, site: { ...s.site, name: v } }))}
          />
          <AdminField
            label="Slogan (référence interne)"
            value={site.tagline}
            onChange={(v) => setState((s) => ({ ...s, site: { ...s.site, tagline: v } }))}
          />
          <div className="sm:col-span-2">
            <AdminField
              label="Domaine (ligne sous le copyright)"
              value={site.domain}
              onChange={(v) => setState((s) => ({ ...s, site: { ...s.site, domain: v } }))}
            />
          </div>
        </div>
      </AdminSection>
    </div>
  )
}
