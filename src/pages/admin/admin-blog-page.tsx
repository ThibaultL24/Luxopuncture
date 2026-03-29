// src/pages/admin/admin-blog-page.tsx
import { useMemo } from 'react'
import { AdminField } from '../../components/admin/admin-field'
import type { Publication } from '../../data/publications'
import { StringListEditor } from '../../components/admin/string-list-editor'
import { DropZone } from '../../components/admin/drop-zone'
import { AdminPageHeader } from '../../components/admin/admin-page-header'
import { AdminSection, type AdminSectionVariant } from '../../components/admin/admin-section'
import { useAdmin } from '../../hooks/use-admin'
import { MAX_IMAGE_BYTES, parseArticleBodyFromText, readFileAsDataUrl, readFileAsText } from '../../lib/admin-file-helpers'

const VARIANT_ROTATION: AdminSectionVariant[] = ['mint', 'brand', 'rose', 'sand', 'slate']

function emptyArticle(): Publication {
  const d = new Date().toISOString().slice(0, 10)
  return {
    slug: `article-${Date.now()}`,
    date: d,
    title: 'Nouvel article',
    excerpt: '',
    body: [''],
    coverImage: '/images/camille1.jpeg',
  }
}

export function AdminBlogPage() {
  const { state, setState } = useAdmin()
  const { publications } = state

  const slugDupes = useMemo(() => {
    const counts = new Map<string, number>()
    for (const p of publications) {
      const k = p.slug.trim().toLowerCase()
      counts.set(k, (counts.get(k) ?? 0) + 1)
    }
    return counts
  }, [publications])

  function updateAt(index: number, patch: Partial<Publication>) {
    setState((prev) => {
      const next = [...prev.publications]
      next[index] = { ...next[index], ...patch }
      return { ...prev, publications: next }
    })
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Blog"
        subtitle="Articles sur /publications (blog) — date au format AAAA-MM-JJ. Glisser-déposer une image de couverture ou un fichier .txt / .md pour le corps."
      />
      <div className="flex justify-end">
        <button
          type="button"
          className="rounded-full bg-[var(--color-brand)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:brightness-105"
          onClick={() => setState((s) => ({ ...s, publications: [...s.publications, emptyArticle()] }))}
        >
          Ajouter un article
        </button>
      </div>

      <ul className="space-y-8">
        {publications.map((pub, i) => {
          const dupe = (slugDupes.get(pub.slug.trim().toLowerCase()) ?? 0) > 1
          const variant = VARIANT_ROTATION[i % VARIANT_ROTATION.length]

          return (
            <li key={`${pub.slug}-${i}`}>
              <AdminSection
                variant={variant}
                title={pub.title || 'Sans titre'}
                subtitle={
                  dupe
                    ? 'Slug en double — corrigez pour qu’il soit unique.'
                    : 'Métadonnées, couverture, glisser-déposer et paragraphes.'
                }
                actions={
                  <button
                    type="button"
                    className="text-sm font-medium text-rose-800 hover:underline"
                    onClick={() => {
                      if (!window.confirm('Supprimer cet article ?')) return
                      setState((s) => ({ ...s, publications: s.publications.filter((_, j) => j !== i) }))
                    }}
                  >
                    Supprimer
                  </button>
                }
              >
                {dupe ? (
                  <p className="mb-4 rounded-lg border border-amber-200/80 bg-amber-50 px-3 py-2 text-sm text-amber-950">
                    Deux articles ne peuvent pas partager le même slug.
                  </p>
                ) : null}
                <div className="grid gap-4 sm:grid-cols-2">
                  <AdminField label="Slug (URL)" value={pub.slug} onChange={(v) => updateAt(i, { slug: v })} />
                  <AdminField label="Date (AAAA-MM-JJ)" value={pub.date} onChange={(v) => updateAt(i, { date: v })} />
                </div>
                <div className="mt-4">
                  <AdminField label="Titre" value={pub.title} onChange={(v) => updateAt(i, { title: v })} />
                </div>
                <div className="mt-4">
                  <AdminField
                    label="Chapô / extrait (liste des articles)"
                    value={pub.excerpt}
                    onChange={(v) => updateAt(i, { excerpt: v })}
                    multiline
                  />
                </div>
                <div className="mt-4 space-y-3">
                  <DropZone
                    mode="image"
                    label="Couverture — glisser-déposer une image"
                    hint="Stocké localement dans ce navigateur, ou saisissez un chemin ci-dessous."
                    onDropFiles={async (files) => {
                      const file = files[0]
                      if (!file) return
                      if (file.size > MAX_IMAGE_BYTES) {
                        window.alert(
                          `Image trop lourde (max. environ ${Math.round(MAX_IMAGE_BYTES / 1024)} Ko).`,
                        )
                        return
                      }
                      try {
                        const src = await readFileAsDataUrl(file)
                        updateAt(i, { coverImage: src })
                      } catch {
                        window.alert('Impossible de lire l’image.')
                      }
                    }}
                  />
                  <AdminField
                    label="Image de couverture (chemin ou collage après import)"
                    value={pub.coverImage ?? ''}
                    onChange={(v) => updateAt(i, { coverImage: v || undefined })}
                  />
                </div>
                <div className="mt-6 space-y-3">
                  <DropZone
                    mode="text"
                    label="Corps — glisser-déposer un fichier .txt ou .md"
                    hint="Remplace les paragraphes. Ligne vide = nouveau paragraphe ; sinon une ligne = un paragraphe."
                    onDropFiles={async (files) => {
                      const file = files[0]
                      if (!file) return
                      const hasContent = pub.body.some((p) => p.trim().length > 0)
                      try {
                        const raw = await readFileAsText(file)
                        const body = parseArticleBodyFromText(raw)
                        if (hasContent) {
                          const ok = window.confirm(
                            'Remplacer tout le corps de l’article par le contenu du fichier ?',
                          )
                          if (!ok) return
                        }
                        updateAt(i, { body })
                      } catch {
                        window.alert('Impossible de lire le fichier texte.')
                      }
                    }}
                  />
                  <StringListEditor
                    label="Corps (un bloc = un paragraphe)"
                    items={pub.body}
                    onChange={(body) => updateAt(i, { body })}
                    addLabel="Ajouter un paragraphe"
                  />
                </div>
              </AdminSection>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
