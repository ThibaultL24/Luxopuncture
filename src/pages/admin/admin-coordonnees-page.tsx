// src/pages/admin/admin-coordonnees-page.tsx
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
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className={cls} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </label>
  )
}

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
          <Field
            label="Téléphone"
            value={contactInfo.phone}
            onChange={(v) => setState((s) => ({ ...s, contactInfo: { ...s.contactInfo, phone: v } }))}
          />
          <Field
            label="E-mail"
            value={contactInfo.email}
            onChange={(v) => setState((s) => ({ ...s, contactInfo: { ...s.contactInfo, email: v } }))}
          />
          <div className="sm:col-span-2">
            <Field
              label="Adresse (résumé affiché dans le footer)"
              value={contactInfo.address}
              onChange={(v) => setState((s) => ({ ...s, contactInfo: { ...s.contactInfo, address: v } }))}
              multiline
            />
          </div>
          <div className="sm:col-span-2">
            <Field
              label="Horaires / modalités de contact"
              value={contactInfo.hours}
              onChange={(v) => setState((s) => ({ ...s, contactInfo: { ...s.contactInfo, hours: v } }))}
              multiline
            />
          </div>
        </div>
      </AdminSection>

      <AdminSection variant="sand" title="Nom du site (footer)" subtitle="Identité affichée en bas de page.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Nom affiché"
            value={site.name}
            onChange={(v) => setState((s) => ({ ...s, site: { ...s.site, name: v } }))}
          />
          <Field
            label="Slogan (référence interne)"
            value={site.tagline}
            onChange={(v) => setState((s) => ({ ...s, site: { ...s.site, tagline: v } }))}
          />
          <div className="sm:col-span-2">
            <Field
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
