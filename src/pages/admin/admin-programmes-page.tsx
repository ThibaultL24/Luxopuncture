// src/pages/admin/admin-programmes-page.tsx
import { useMemo } from 'react'
import { useAdmin } from '../../contexts/admin-context'
import type { Service } from '../../data/site-content'
import { StringListEditor } from '../../components/admin/string-list-editor'
import { AdminPageHeader } from '../../components/admin/admin-page-header'
import { AdminSection, type AdminSectionVariant } from '../../components/admin/admin-section'

const VARIANT_ROTATION: AdminSectionVariant[] = ['brand', 'mint', 'rose', 'sand', 'slate']

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
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} className={cls} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </label>
  )
}

function defaultService(): Service {
  return {
    slug: `programme-${Date.now()}`,
    title: 'Nouveau programme',
    goal: '',
    intro: '',
    benefits: [''],
    duration: 'Environ 45 min',
    coverImage: '/images/camille1.jpeg',
    detailGallery: [{ src: '/images/camille1.jpeg', alt: '' }],
  }
}

export function AdminProgrammesPage() {
  const { state, setState } = useAdmin()
  const { services } = state

  const slugDupes = useMemo(() => {
    const counts = new Map<string, number>()
    for (const s of services) {
      const k = s.slug.trim().toLowerCase()
      counts.set(k, (counts.get(k) ?? 0) + 1)
    }
    return counts
  }, [services])

  function updateAt(index: number, patch: Partial<Service>) {
    setState((prev) => {
      const next = [...prev.services]
      next[index] = { ...next[index], ...patch }
      return { ...prev, services: next }
    })
  }

  function updateGallery(index: number, gallery: NonNullable<Service['detailGallery']>) {
    setState((prev) => {
      const next = [...prev.services]
      next[index] = { ...next[index], detailGallery: [...gallery] }
      return { ...prev, services: next }
    })
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Programmes"
        subtitle="Chaque fiche correspond à une page /programme/… — le « slug » (lettres et tirets) doit être unique."
      />
      <div className="flex justify-end">
        <button
          type="button"
          className="rounded-full bg-[var(--color-brand)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:brightness-105"
          onClick={() => setState((s) => ({ ...s, services: [...s.services, defaultService()] }))}
        >
          Ajouter un programme
        </button>
      </div>

      <ul className="space-y-8">
        {services.map((svc, i) => {
          const dupe = (slugDupes.get(svc.slug.trim().toLowerCase()) ?? 0) > 1
          const gallery = svc.detailGallery ?? [{ src: svc.coverImage, alt: '' }]
          const variant = VARIANT_ROTATION[i % VARIANT_ROTATION.length]

          return (
            <li key={`${svc.slug}-${i}`}>
              <AdminSection
                variant={variant}
                title={svc.title || 'Programme sans titre'}
                subtitle={undefined}
                actions={
                  <button
                    type="button"
                    className="text-sm font-medium text-rose-800 hover:underline"
                    onClick={() => {
                      if (!window.confirm('Supprimer ce programme ?')) return
                      setState((s) => ({ ...s, services: s.services.filter((_, j) => j !== i) }))
                    }}
                  >
                    Supprimer
                  </button>
                }
              >
                {dupe ? (
                  <p className="mb-4 rounded-lg border border-amber-200/80 bg-amber-50 px-3 py-2 text-sm text-amber-950">
                    Ce slug est utilisé plusieurs fois — les liens peuvent être imprévisibles.
                  </p>
                ) : null}
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Slug (URL, sans espaces)"
                    value={svc.slug}
                    onChange={(v) => updateAt(i, { slug: v })}
                  />
                  <Field label="Titre affiché" value={svc.title} onChange={(v) => updateAt(i, { title: v })} />
                </div>
                <div className="mt-4">
                  <Field
                    label="Objectif (court)"
                    value={svc.goal}
                    onChange={(v) => updateAt(i, { goal: v })}
                    multiline
                  />
                </div>
                <div className="mt-4">
                  <Field
                    label="Texte d’introduction"
                    value={svc.intro}
                    onChange={(v) => updateAt(i, { intro: v })}
                    multiline
                  />
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Durée (ex. Environ 45 min)"
                    value={svc.duration ?? ''}
                    onChange={(v) => updateAt(i, { duration: v })}
                  />
                  <Field
                    label="Image de couverture (chemin, ex. /images/…)"
                    value={svc.coverImage}
                    onChange={(v) => updateAt(i, { coverImage: v })}
                  />
                </div>
                <div className="mt-6">
                  <StringListEditor
                    label="Bénéfices (puces)"
                    items={svc.benefits}
                    onChange={(benefits) => updateAt(i, { benefits })}
                  />
                </div>
                <div className="mt-8 border-t border-[var(--color-brand)]/12 pt-6">
                  <p className="text-sm font-medium text-[var(--color-ink)]">Galerie page détail</p>
                  <p className="mt-1 text-xs text-[var(--color-body)]/80">
                    Chemins vers des fichiers dans le dossier{' '}
                    <code className="rounded bg-[var(--color-brand)]/10 px-1">public</code>.
                  </p>
                  <ul className="mt-3 space-y-3">
                    {gallery.map((img, gi) => (
                      <li
                        key={gi}
                        className="flex flex-col gap-2 rounded-xl border border-[var(--color-brand)]/12 bg-white/85 p-3 sm:flex-row sm:items-end"
                      >
                        <label className="min-w-0 flex-1 text-xs font-medium text-[var(--color-ink)]">
                          Image (URL)
                          <input
                            value={img.src}
                            onChange={(e) => {
                              const next = [...gallery]
                              next[gi] = { ...next[gi], src: e.target.value }
                              updateGallery(i, next)
                            }}
                            className="admin-input mt-1 !mt-1 text-sm"
                          />
                        </label>
                        <label className="min-w-0 flex-1 text-xs font-medium text-[var(--color-ink)]">
                          Texte alternatif (accessibilité)
                          <input
                            value={img.alt}
                            onChange={(e) => {
                              const next = [...gallery]
                              next[gi] = { ...next[gi], alt: e.target.value }
                              updateGallery(i, next)
                            }}
                            className="admin-input mt-1 !mt-1 text-sm"
                          />
                        </label>
                        <button
                          type="button"
                          className="shrink-0 rounded-lg border border-rose-200/90 bg-rose-50/90 px-3 py-2 text-sm text-rose-800 sm:mb-0.5"
                          onClick={() => updateGallery(i, gallery.filter((_, j) => j !== gi))}
                        >
                          Retirer
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="mt-3 rounded-full border border-[var(--color-brand)]/22 bg-[var(--color-muted-green)]/40 px-4 py-2 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-muted-green)]/65"
                    onClick={() => updateGallery(i, [...gallery, { src: '/images/camille1.jpeg', alt: '' }])}
                  >
                    Ajouter une image
                  </button>
                </div>
              </AdminSection>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
