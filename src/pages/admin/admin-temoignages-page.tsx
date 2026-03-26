// src/pages/admin/admin-temoignages-page.tsx
import { useAdmin } from '../../hooks/use-admin'
import type { Testimonial } from '../../data/site-content'
import { StringListEditor } from '../../components/admin/string-list-editor'
import { ReviewCaptureSlidesEditor } from '../../components/admin/review-capture-slides-editor'
import { AdminPageHeader } from '../../components/admin/admin-page-header'
import { AdminSection } from '../../components/admin/admin-section'

function emptyTestimonial(): Testimonial {
  return { name: '', content: '', rating: 5 }
}

export function AdminTemoignagesPage() {
  const { state, setState } = useAdmin()
  const { testimonials, testimonialVideoFiles, reviewCaptureSlides } = state

  function updateAt(index: number, patch: Partial<Testimonial>) {
    setState((prev) => {
      const next = [...prev.testimonials]
      next[index] = { ...next[index], ...patch }
      return { ...prev, testimonials: next }
    })
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Témoignages"
        subtitle="Vidéos : noms de fichiers sur le serveur. Captures d’avis : images du bandeau (site ou import local). Avis texte : affichés sur la page dédiée."
      />

      <AdminSection
        variant="rose"
        title="Captures d’avis (bandeau défilant)"
        subtitle="Accueil et page Témoignages — sauvegarde JSON recommandée après gros imports."
      >
        <ReviewCaptureSlidesEditor
          slides={reviewCaptureSlides}
          onChange={(reviewCaptureSlides) => setState((s) => ({ ...s, reviewCaptureSlides }))}
        />
      </AdminSection>

      <AdminSection variant="mint" title="Vidéos témoignages" subtitle="Un nom de fichier par ligne (dossier témoignages).">
        <StringListEditor
          label="Fichiers"
          items={testimonialVideoFiles}
          onChange={(testimonialVideoFiles) => setState((s) => ({ ...s, testimonialVideoFiles }))}
          addLabel="Ajouter un fichier vidéo"
        />
      </AdminSection>

      <AdminSection
        variant="brand"
        title="Avis écrits (texte)"
        subtitle="Affichés sur la page Témoignages dès qu’au moins un avis a du texte."
        actions={
          <button
            type="button"
            className="rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:brightness-105"
            onClick={() => setState((s) => ({ ...s, testimonials: [...s.testimonials, emptyTestimonial()] }))}
          >
            Ajouter un avis
          </button>
        }
      >
        <ul className="space-y-6">
          {testimonials.map((t, i) => (
            <li
              key={i}
              className="rounded-xl border border-[var(--color-brand)]/12 bg-white/90 p-4 shadow-[inset_0_1px_0_rgb(255_255_255_/0.9)]"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-[var(--color-ink)]">
                  Prénom ou initiales
                  <input
                    value={t.name}
                    onChange={(e) => updateAt(i, { name: e.target.value })}
                    className="admin-input"
                  />
                </label>
                <label className="block text-sm font-medium text-[var(--color-ink)]">
                  Note (1 à 5)
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={t.rating}
                    onChange={(e) => updateAt(i, { rating: Math.min(5, Math.max(1, Number(e.target.value) || 1)) })}
                    className="admin-input"
                  />
                </label>
              </div>
              <label className="mt-4 block text-sm font-medium text-[var(--color-ink)]">
                Texte de l’avis
                <textarea
                  value={t.content}
                  onChange={(e) => updateAt(i, { content: e.target.value })}
                  rows={5}
                  className="admin-input"
                />
              </label>
              <button
                type="button"
                className="mt-3 text-sm font-medium text-rose-800 hover:underline"
                onClick={() => setState((s) => ({ ...s, testimonials: s.testimonials.filter((_, j) => j !== i) }))}
              >
                Supprimer cet avis
              </button>
            </li>
          ))}
        </ul>
      </AdminSection>
    </div>
  )
}
