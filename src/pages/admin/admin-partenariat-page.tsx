// src/pages/admin/admin-partenariat-page.tsx
import { AdminField } from '../../components/admin/admin-field'
import { StringListEditor } from '../../components/admin/string-list-editor'
import { AdminPageHeader } from '../../components/admin/admin-page-header'
import { AdminSection } from '../../components/admin/admin-section'
import { useAdmin } from '../../hooks/use-admin'
import type { PartenariatPartnerCard } from '../../lib/admin-types'

function newPartner(): PartenariatPartnerCard {
  return {
    id: `partner-${Date.now()}`,
    name: 'Nouveau partenaire',
    role: '',
    paragraphs: [''],
    images: [{ src: '/images/camille1.jpeg', alt: '' }],
    websiteUrl: '',
    websiteLabel: '',
    socials: { instagram: '', facebook: '', linkedin: '' },
  }
}

function imagesToLines(images: { src: string; alt: string }[]): string[] {
  return images.map((im) => (im.alt ? `${im.src}|${im.alt}` : im.src))
}

function linesToImages(lines: string[]): { src: string; alt: string }[] {
  const parsed = lines
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const pipe = line.indexOf('|')
      if (pipe === -1) return { src: line, alt: '' }
      return { src: line.slice(0, pipe).trim(), alt: line.slice(pipe + 1).trim() }
    })
  return parsed.length > 0 ? parsed : [{ src: '/images/camille1.jpeg', alt: '' }]
}

export function AdminPartenariatPage() {
  const { state, setState } = useAdmin()
  const p = state.partenariatPage

  function setPartners(next: PartenariatPartnerCard[]) {
    setState((s) => ({ ...s, partenariatPage: { ...s.partenariatPage, partners: next } }))
  }

  function patchPartner(index: number, patch: Partial<PartenariatPartnerCard>) {
    setState((s) => {
      const partners = [...s.partenariatPage.partners]
      partners[index] = { ...partners[index], ...patch }
      return { ...s, partenariatPage: { ...s.partenariatPage, partners } }
    })
  }

  function patchPartnerSocials(index: number, socials: Partial<PartenariatPartnerCard['socials']>) {
    setState((s) => {
      const partners = [...s.partenariatPage.partners]
      const cur = partners[index]
      partners[index] = { ...cur, socials: { ...cur.socials, ...socials } }
      return { ...s, partenariatPage: { ...s.partenariatPage, partners } }
    })
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Recommandations"
        subtitle="Textes de page, fiches partenaires (ajout / suppression), bloc réseaux. Les changements s’affichent sur /recommandations."
      />

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

      <AdminSection variant="mint" title="Bloc « recommandations » (intro)" subtitle="S’affiche au-dessus des fiches partenaires.">
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

      <AdminSection
        variant="brand"
        title="Fiches partenaires"
        subtitle="Ordre = ordre sur le site. Vous pouvez retirer toutes les fiches ou en ajouter. **gras** possible dans les paragraphes."
      >
        <div className="space-y-8">
          <button
            type="button"
            onClick={() => setPartners([...p.partners, newPartner()])}
            className="rounded-full border border-[var(--color-brand)]/25 bg-[var(--color-muted-green)]/40 px-4 py-2 text-sm font-semibold text-[var(--color-ink)] hover:bg-[var(--color-muted-green)]/70"
          >
            + Ajouter une fiche
          </button>

          {p.partners.map((partner, i) => (
            <div
              key={partner.id}
              className="space-y-4 rounded-2xl border border-[var(--color-brand)]/12 bg-white/90 p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-display text-lg font-semibold text-[var(--color-ink)]">
                  Fiche {i + 1}
                  {partner.name ? ` — ${partner.name}` : ''}
                </p>
                <button
                  type="button"
                  onClick={() => setPartners(p.partners.filter((_, j) => j !== i))}
                  className="rounded-lg border border-rose-200/90 bg-rose-50/90 px-3 py-1.5 text-sm text-rose-900 hover:bg-rose-100"
                >
                  Supprimer cette fiche
                </button>
              </div>

              <AdminField label="Nom" value={partner.name} onChange={(v) => patchPartner(i, { name: v })} />
              <AdminField label="Rôle / accroche" value={partner.role} onChange={(v) => patchPartner(i, { role: v })} multiline rows={2} />

              <StringListEditor
                label="Paragraphes"
                items={partner.paragraphs}
                onChange={(paragraphs) => patchPartner(i, { paragraphs })}
                addLabel="Ajouter un paragraphe"
              />

              <StringListEditor
                label="Images (une ligne par fichier : chemin ou URL ; optionnel : « chemin | texte alternatif »)"
                items={imagesToLines(partner.images)}
                onChange={(lines) => patchPartner(i, { images: linesToImages(lines) })}
                addLabel="Ajouter une image"
                placeholder="/images/exemple.jpeg|description"
              />

              <div className="grid gap-3 sm:grid-cols-2">
                <AdminField
                  label="Lien site (URL)"
                  value={partner.websiteUrl}
                  onChange={(v) => patchPartner(i, { websiteUrl: v })}
                />
                <AdminField
                  label="Libellé du lien"
                  value={partner.websiteLabel}
                  onChange={(v) => patchPartner(i, { websiteLabel: v })}
                />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-body)]/75">Réseaux (optionnel)</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <AdminField
                  label="Instagram"
                  value={partner.socials.instagram}
                  onChange={(v) => patchPartnerSocials(i, { instagram: v })}
                />
                <AdminField
                  label="Facebook"
                  value={partner.socials.facebook}
                  onChange={(v) => patchPartnerSocials(i, { facebook: v })}
                />
                <AdminField
                  label="LinkedIn"
                  value={partner.socials.linkedin}
                  onChange={(v) => patchPartnerSocials(i, { linkedin: v })}
                />
                <AdminField
                  label="GitHub (optionnel)"
                  value={partner.socials.github ?? ''}
                  onChange={(v) => patchPartnerSocials(i, { github: v })}
                />
                <AdminField
                  label="X / Twitter (optionnel)"
                  value={partner.socials.x ?? ''}
                  onChange={(v) => patchPartnerSocials(i, { x: v })}
                />
              </div>
            </div>
          ))}

          {p.partners.length === 0 ? (
            <p className="text-sm text-[var(--color-body)]/85">Aucune fiche : la section reste vide sur le site (sauf textes d’intro).</p>
          ) : null}
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
