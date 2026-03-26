// src/pages/admin/admin-accueil-page.tsx
import { AdminField } from '../../components/admin/admin-field'
import { StringListEditor } from '../../components/admin/string-list-editor'
import { AdminPageHeader } from '../../components/admin/admin-page-header'
import { AdminSection } from '../../components/admin/admin-section'
import { useAdmin } from '../../hooks/use-admin'

export function AdminAccueilPage() {
  const { state, setState } = useAdmin()
  const { heroCopy, homeCopy, bookingCta } = state

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Page d’accueil"
        subtitle="Modifiez les textes ci-dessous : ils s’affichent sur le site après enregistrement automatique dans ce navigateur."
      />

      <AdminSection variant="brand" title="Bandeau principal (photo + titre)" subtitle="En-tête hero en haut de la page.">
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField
            label="Petit texte au-dessus du titre"
            value={heroCopy.eyebrow}
            onChange={(v) => setState((s) => ({ ...s, heroCopy: { ...s.heroCopy, eyebrow: v } }))}
          />
          <AdminField
            label="Titre principal"
            value={heroCopy.title}
            onChange={(v) => setState((s) => ({ ...s, heroCopy: { ...s.heroCopy, title: v } }))}
          />
          <AdminField
            label="Sous-titre (plusieurs lignes possibles)"
            value={heroCopy.subtitle}
            onChange={(v) => setState((s) => ({ ...s, heroCopy: { ...s.heroCopy, subtitle: v } }))}
            multiline
          />
          <AdminField
            label="Texte du bouton vert (contact)"
            value={heroCopy.ctaPrimary}
            onChange={(v) => setState((s) => ({ ...s, heroCopy: { ...s.heroCopy, ctaPrimary: v } }))}
          />
          <AdminField
            label="Texte du bouton secondaire (programme)"
            value={heroCopy.ctaSecondary}
            onChange={(v) => setState((s) => ({ ...s, heroCopy: { ...s.heroCopy, ctaSecondary: v } }))}
          />
        </div>
      </AdminSection>

      <AdminSection variant="slate" title="Bloc « accroche »" subtitle="Juste sous le bandeau principal.">
        <div className="grid gap-4">
          <AdminField
            label="Phrase d’accroche"
            value={homeCopy.hook.lead}
            onChange={(v) =>
              setState((s) => ({ ...s, homeCopy: { ...s.homeCopy, hook: { ...s.homeCopy.hook, lead: v } } }))
            }
          />
          <AdminField
            label="Question mise en avant"
            value={homeCopy.hook.question}
            onChange={(v) =>
              setState((s) => ({ ...s, homeCopy: { ...s.homeCopy, hook: { ...s.homeCopy.hook, question: v } } }))
            }
          />
          <AdminField
            label="Symptômes / exemples"
            value={homeCopy.hook.symptoms}
            onChange={(v) =>
              setState((s) => ({ ...s, homeCopy: { ...s.homeCopy, hook: { ...s.homeCopy.hook, symptoms: v } } }))
            }
          />
          <AdminField
            label="Phrase de transition"
            value={homeCopy.hook.closing}
            onChange={(v) =>
              setState((s) => ({ ...s, homeCopy: { ...s.homeCopy, hook: { ...s.homeCopy.hook, closing: v } } }))
            }
            multiline
          />
        </div>
      </AdminSection>

      <AdminSection variant="mint" title="Bloc « détox »" subtitle="Solution détox / programme.">
        <div className="grid gap-4">
          <AdminField
            label="Phrase d’intro"
            value={homeCopy.detoxSolution.intro}
            onChange={(v) =>
              setState((s) => ({
                ...s,
                homeCopy: {
                  ...s.homeCopy,
                  detoxSolution: { ...s.homeCopy.detoxSolution, intro: v },
                },
              }))
            }
          />
          <AdminField
            label="Sous-titre (ex. « Un programme simple pour : »)"
            value={homeCopy.detoxSolution.subtitle}
            onChange={(v) =>
              setState((s) => ({
                ...s,
                homeCopy: {
                  ...s.homeCopy,
                  detoxSolution: { ...s.homeCopy.detoxSolution, subtitle: v },
                },
              }))
            }
          />
          <StringListEditor
            label="Liste à puces"
            items={homeCopy.detoxSolution.bullets}
            onChange={(items) =>
              setState((s) => ({
                ...s,
                homeCopy: {
                  ...s.homeCopy,
                  detoxSolution: { ...s.homeCopy.detoxSolution, bullets: items },
                },
              }))
            }
          />
        </div>
      </AdminSection>

      <AdminSection variant="sand" title="Bloc « à distance (21 jours) »" subtitle="Résumé du programme à distance.">
        <div className="grid gap-4">
          <AdminField
            label="Titre"
            value={homeCopy.remoteBrief.title}
            onChange={(v) =>
              setState((s) => ({
                ...s,
                homeCopy: {
                  ...s.homeCopy,
                  remoteBrief: { ...s.homeCopy.remoteBrief, title: v },
                },
              }))
            }
          />
          <AdminField
            label="Libellé au-dessus de la liste (ex. « Avec : »)"
            value={homeCopy.remoteBrief.withLabel}
            onChange={(v) =>
              setState((s) => ({
                ...s,
                homeCopy: {
                  ...s.homeCopy,
                  remoteBrief: { ...s.homeCopy.remoteBrief, withLabel: v },
                },
              }))
            }
          />
          <StringListEditor
            label="Liste"
            items={homeCopy.remoteBrief.bullets}
            onChange={(items) =>
              setState((s) => ({
                ...s,
                homeCopy: {
                  ...s.homeCopy,
                  remoteBrief: { ...s.homeCopy.remoteBrief, bullets: items },
                },
              }))
            }
          />
          <AdminField
            label="Note en bas"
            value={homeCopy.remoteBrief.footnote}
            onChange={(v) =>
              setState((s) => ({
                ...s,
                homeCopy: {
                  ...s.homeCopy,
                  remoteBrief: { ...s.homeCopy.remoteBrief, footnote: v },
                },
              }))
            }
            multiline
          />
        </div>
      </AdminSection>

      <AdminSection variant="brand" title="Bloc « cabinet » (aperçu)" subtitle="Teaser vers le cabinet.">
        <div className="grid gap-4">
          <AdminField
            label="Titre"
            value={homeCopy.cabinetTeaser.title}
            onChange={(v) =>
              setState((s) => ({
                ...s,
                homeCopy: {
                  ...s.homeCopy,
                  cabinetTeaser: { ...s.homeCopy.cabinetTeaser, title: v },
                },
              }))
            }
          />
          <StringListEditor
            label="Liste (une ligne = une puce)"
            items={homeCopy.cabinetTeaser.lines}
            onChange={(items) =>
              setState((s) => ({
                ...s,
                homeCopy: {
                  ...s.homeCopy,
                  cabinetTeaser: { ...s.homeCopy.cabinetTeaser, lines: items },
                },
              }))
            }
          />
          <AdminField
            label="Texte du bouton"
            value={homeCopy.cabinetTeaser.cta}
            onChange={(v) =>
              setState((s) => ({
                ...s,
                homeCopy: {
                  ...s.homeCopy,
                  cabinetTeaser: { ...s.homeCopy.cabinetTeaser, cta: v },
                },
              }))
            }
          />
        </div>
      </AdminSection>

      <AdminSection variant="rose" title="Bloc « témoignages » (accueil)" subtitle="Titres au-dessus du bandeau d’avis.">
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField
            label="Petit titre au-dessus"
            value={homeCopy.testimonials.eyebrow}
            onChange={(v) =>
              setState((s) => ({
                ...s,
                homeCopy: {
                  ...s.homeCopy,
                  testimonials: { ...s.homeCopy.testimonials, eyebrow: v },
                },
              }))
            }
          />
          <AdminField
            label="Titre"
            value={homeCopy.testimonials.title}
            onChange={(v) =>
              setState((s) => ({
                ...s,
                homeCopy: {
                  ...s.homeCopy,
                  testimonials: { ...s.homeCopy.testimonials, title: v },
                },
              }))
            }
          />
          <div className="sm:col-span-2">
            <AdminField
              label="Texte d’introduction"
              value={homeCopy.testimonials.intro}
              onChange={(v) =>
                setState((s) => ({
                  ...s,
                  homeCopy: {
                    ...s.homeCopy,
                    testimonials: { ...s.homeCopy.testimonials, intro: v },
                  },
                }))
              }
              multiline
            />
          </div>
        </div>
      </AdminSection>

      <AdminSection variant="mint" title="Bandeau vert en bas de page" subtitle="Call-to-action final avant le pied de page.">
        <div className="grid gap-4">
          <AdminField
            label="Texte"
            value={bookingCta.text}
            onChange={(v) => setState((s) => ({ ...s, bookingCta: { ...s.bookingCta, text: v } }))}
            multiline
          />
          <AdminField
            label="Texte du bouton"
            value={bookingCta.button}
            onChange={(v) => setState((s) => ({ ...s, bookingCta: { ...s.bookingCta, button: v } }))}
          />
        </div>
      </AdminSection>
    </div>
  )
}
