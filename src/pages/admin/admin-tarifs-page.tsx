// src/pages/admin/admin-tarifs-page.tsx
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
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className={cls} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </label>
  )
}

export function AdminTarifsPage() {
  const { state, setState } = useAdmin()
  const t = state.tarifsPage

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Tarifs"
        subtitle="Titre de page, programme à distance, suivi, séances au cabinet et encadré d’informations."
      />

      <AdminSection variant="slate" title="En-tête de la page">
        <div className="space-y-4">
          <Field
            label="Titre (onglet + haut de page)"
            value={t.pageTitle}
            onChange={(v) => setState((s) => ({ ...s, tarifsPage: { ...s.tarifsPage, pageTitle: v } }))}
          />
          <Field
            label="Sous-titre"
            value={t.pageSubtitle}
            onChange={(v) => setState((s) => ({ ...s, tarifsPage: { ...s.tarifsPage, pageSubtitle: v } }))}
            multiline
          />
        </div>
      </AdminSection>

      <AdminSection variant="mint" title="Programme à distance" subtitle="Offre principale et suivi.">
        <div className="space-y-4">
          <Field
            label="Titre affiché pour cette section"
            value={t.distanceTitle}
            onChange={(v) => setState((s) => ({ ...s, tarifsPage: { ...s.tarifsPage, distanceTitle: v } }))}
          />
          <div className="grid gap-4 border-t border-emerald-200/60 pt-4 sm:grid-cols-2">
            <Field
              label="Bloc principal — libellé"
              value={t.detox.label}
              onChange={(v) =>
                setState((s) => ({
                  ...s,
                  tarifsPage: { ...s.tarifsPage, detox: { ...s.tarifsPage.detox, label: v } },
                }))
              }
            />
            <Field
              label="Bloc principal — prix"
              value={t.detox.price}
              onChange={(v) =>
                setState((s) => ({
                  ...s,
                  tarifsPage: { ...s.tarifsPage, detox: { ...s.tarifsPage.detox, price: v } },
                }))
              }
            />
          </div>
          <StringListEditor
            label="Ce qui est inclus (une ligne = une puce)"
            items={t.detox.includes}
            onChange={(includes) =>
              setState((s) => ({
                ...s,
                tarifsPage: { ...s.tarifsPage, detox: { ...s.tarifsPage.detox, includes } },
              }))
            }
          />
          <div className="space-y-4 border-t border-emerald-200/60 pt-4">
            <p className="text-sm font-semibold text-[var(--color-ink)]">Séance de suivi à distance</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Libellé"
                value={t.suivi.label}
                onChange={(v) =>
                  setState((s) => ({
                    ...s,
                    tarifsPage: { ...s.tarifsPage, suivi: { ...s.tarifsPage.suivi, label: v } },
                  }))
                }
              />
              <Field
                label="Prix"
                value={t.suivi.price}
                onChange={(v) =>
                  setState((s) => ({
                    ...s,
                    tarifsPage: { ...s.tarifsPage, suivi: { ...s.tarifsPage.suivi, price: v } },
                  }))
                }
              />
            </div>
            <StringListEditor
              label="Conditions (une ligne = une puce)"
              items={t.suivi.conditions}
              onChange={(conditions) =>
                setState((s) => ({
                  ...s,
                  tarifsPage: { ...s.tarifsPage, suivi: { ...s.tarifsPage.suivi, conditions } },
                }))
              }
            />
            <Field
              label="Phrase complémentaire sous le prix"
              value={t.suivi.note}
              onChange={(v) =>
                setState((s) => ({
                  ...s,
                  tarifsPage: { ...s.tarifsPage, suivi: { ...s.tarifsPage.suivi, note: v } },
                }))
              }
              multiline
            />
          </div>
        </div>
      </AdminSection>

      <AdminSection variant="brand" title="Séances au cabinet" subtitle="Tableau des prestations au cabinet.">
        <div className="space-y-4">
          <Field
            label="Titre de la section"
            value={t.cabinetTitle}
            onChange={(v) => setState((s) => ({ ...s, tarifsPage: { ...s.tarifsPage, cabinetTitle: v } }))}
          />
          <p className="text-sm text-[var(--color-body)]/85">
            Chaque ligne correspond à une prestation (libellé, prix, précision éventuelle).
          </p>
          <ul className="space-y-4">
            {t.cabinetRows.map((row, i) => (
              <li
                key={i}
                className="rounded-xl border border-[var(--color-brand)]/14 bg-white/90 p-4 shadow-[inset_0_1px_0_rgb(255_255_255_/0.9)]"
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="Prestation"
                    value={row.label}
                    onChange={(v) =>
                      setState((s) => {
                        const cabinetRows = [...s.tarifsPage.cabinetRows]
                        cabinetRows[i] = { ...cabinetRows[i], label: v }
                        return { ...s, tarifsPage: { ...s.tarifsPage, cabinetRows } }
                      })
                    }
                  />
                  <Field
                    label="Prix"
                    value={row.price}
                    onChange={(v) =>
                      setState((s) => {
                        const cabinetRows = [...s.tarifsPage.cabinetRows]
                        cabinetRows[i] = { ...cabinetRows[i], price: v }
                        return { ...s, tarifsPage: { ...s.tarifsPage, cabinetRows } }
                      })
                    }
                  />
                </div>
                <div className="mt-3">
                  <Field
                    label="Précision (facultatif)"
                    value={row.note}
                    onChange={(v) =>
                      setState((s) => {
                        const cabinetRows = [...s.tarifsPage.cabinetRows]
                        cabinetRows[i] = { ...cabinetRows[i], note: v }
                        return { ...s, tarifsPage: { ...s.tarifsPage, cabinetRows } }
                      })
                    }
                    multiline
                  />
                </div>
                <button
                  type="button"
                  className="mt-3 text-sm font-medium text-rose-800 hover:underline"
                  onClick={() =>
                    setState((s) => ({
                      ...s,
                      tarifsPage: {
                        ...s.tarifsPage,
                        cabinetRows: s.tarifsPage.cabinetRows.filter((_, j) => j !== i),
                      },
                    }))
                  }
                >
                  Supprimer cette ligne
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="rounded-full border border-[var(--color-brand)]/22 bg-[var(--color-muted-green)]/45 px-4 py-2 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-muted-green)]/70"
            onClick={() =>
              setState((s) => ({
                ...s,
                tarifsPage: {
                  ...s.tarifsPage,
                  cabinetRows: [...s.tarifsPage.cabinetRows, { label: '', price: '', note: '' }],
                },
              }))
            }
          >
            Ajouter une ligne au tableau cabinet
          </button>
        </div>
      </AdminSection>

      <AdminSection variant="sand" title="Informations complémentaires">
        <div className="space-y-4">
          <Field
            label="Titre de l’encadré"
            value={t.infosTitle}
            onChange={(v) => setState((s) => ({ ...s, tarifsPage: { ...s.tarifsPage, infosTitle: v } }))}
          />
          <StringListEditor
            label="Lignes (une ligne = une puce)"
            items={t.infosLines}
            onChange={(infosLines) => setState((s) => ({ ...s, tarifsPage: { ...s.tarifsPage, infosLines } }))}
          />
        </div>
      </AdminSection>
    </div>
  )
}
