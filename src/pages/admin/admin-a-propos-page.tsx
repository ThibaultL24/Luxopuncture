// src/pages/admin/admin-a-propos-page.tsx
import { AdminField } from '../../components/admin/admin-field'
import { StringListEditor } from '../../components/admin/string-list-editor'
import { AdminPageHeader } from '../../components/admin/admin-page-header'
import { AdminSection } from '../../components/admin/admin-section'
import { useAdmin } from '../../hooks/use-admin'

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
          <AdminField
            label="Titre de la page"
            value={aboutPage.title}
            onChange={(v) => setState((s) => ({ ...s, aboutPage: { ...s.aboutPage, title: v } }))}
          />
          <AdminField
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
