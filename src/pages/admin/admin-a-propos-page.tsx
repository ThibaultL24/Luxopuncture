// src/pages/admin/admin-a-propos-page.tsx
import { useAdmin } from '../../contexts/admin-context'
import { StringListEditor } from '../../components/admin/string-list-editor'
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
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={5} className={cls} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </label>
  )
}

export function AdminAProposPage() {
  const { state, setState } = useAdmin()
  const { aboutPage } = state

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="À propos"
        subtitle="Le dernier paragraphe de la liste « Texte principal » sert d’intro au bloc avec le carrousel d’avis."
      />

      <AdminSection variant="rose" title="Contenu de la page" subtitle="Présentation, paragraphes et formations.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Titre de la page"
            value={aboutPage.title}
            onChange={(v) => setState((s) => ({ ...s, aboutPage: { ...s.aboutPage, title: v } }))}
          />
          <Field
            label="Votre nom"
            value={aboutPage.name}
            onChange={(v) => setState((s) => ({ ...s, aboutPage: { ...s.aboutPage, name: v } }))}
          />
        </div>
        <div className="mt-6">
          <StringListEditor
            label="Texte principal (un bloc = un paragraphe, dans l’ordre)"
            items={aboutPage.bio}
            onChange={(bio) => setState((s) => ({ ...s, aboutPage: { ...s.aboutPage, bio } }))}
            addLabel="Ajouter un paragraphe"
          />
        </div>
        <div className="mt-8">
          <StringListEditor
            label="Formations & diplômes (une ligne = une puce)"
            items={aboutPage.credentials}
            onChange={(credentials) => setState((s) => ({ ...s, aboutPage: { ...s.aboutPage, credentials } }))}
          />
        </div>
      </AdminSection>
    </div>
  )
}
