// src/pages/admin/admin-dashboard-page.tsx
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Publication } from '../../data/publications'
import type { Service, Testimonial } from '../../data/site-content'
import { useAdmin } from '../../contexts/admin-context'
import type { PricingRow } from '../../lib/admin-types'

type TabId = 'publications' | 'temoignages' | 'videos' | 'programmes' | 'tarifs' | 'textes'

const tabs: { id: TabId; label: string }[] = [
  { id: 'publications', label: 'Publications' },
  { id: 'temoignages', label: 'Témoignages écrits' },
  { id: 'videos', label: 'Vidéos témoignages' },
  { id: 'programmes', label: 'Programmes' },
  { id: 'tarifs', label: 'Tarifs' },
  { id: 'textes', label: 'Textes & infos' },
]

export function AdminDashboardPage() {
  const { state, setState, logout, resetToDefaults, exportStateJson, importState } = useAdmin()
  const [tab, setTab] = useState<TabId>('publications')
  const [msg, setMsg] = useState('')
  const importRef = useRef<HTMLInputElement>(null)

  const [pubJson, setPubJson] = useState('')
  const [testJson, setTestJson] = useState('')
  const [vidText, setVidText] = useState('')
  const [progJson, setProgJson] = useState('')
  const [priceJson, setPriceJson] = useState('')

  useEffect(() => {
    setPubJson(JSON.stringify(state.publications, null, 2))
    setTestJson(JSON.stringify(state.testimonials, null, 2))
    setVidText(state.testimonialVideoFiles.join('\n'))
    setProgJson(JSON.stringify(state.services, null, 2))
    setPriceJson(JSON.stringify(state.pricingRows, null, 2))
  }, [state, tab])

  function applyPublications() {
    try {
      const parsed = JSON.parse(pubJson) as Publication[]
      if (!Array.isArray(parsed)) throw new Error('Tableau attendu')
      setState((s) => ({ ...s, publications: parsed }))
      setMsg('Publications enregistrées.')
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'JSON invalide')
    }
  }

  function applyTestimonials() {
    try {
      const parsed = JSON.parse(testJson) as Testimonial[]
      if (!Array.isArray(parsed)) throw new Error('Tableau attendu')
      setState((s) => ({ ...s, testimonials: parsed }))
      setMsg('Témoignages enregistrés.')
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'JSON invalide')
    }
  }

  function applyVideos() {
    const lines = vidText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
    setState((s) => ({ ...s, testimonialVideoFiles: lines }))
    setMsg('Liste vidéos enregistrée.')
  }

  function applyProgrammes() {
    try {
      const parsed = JSON.parse(progJson) as Service[]
      if (!Array.isArray(parsed)) throw new Error('Tableau attendu')
      setState((s) => ({ ...s, services: parsed }))
      setMsg('Programmes enregistrés.')
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'JSON invalide')
    }
  }

  function applyTarifs() {
    try {
      const parsed = JSON.parse(priceJson) as PricingRow[]
      if (!Array.isArray(parsed)) throw new Error('Tableau attendu')
      setState((s) => ({ ...s, pricingRows: parsed }))
      setMsg('Tarifs enregistrés.')
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'JSON invalide')
    }
  }

  function downloadExport() {
    const blob = new Blob([exportStateJson()], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `laplace-admin-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  function onImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const text = String(reader.result)
      const r = importState(text)
      setMsg(r.ok ? 'Import réussi.' : r.error ?? 'Erreur')
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="min-h-screen bg-[var(--color-page)]">
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Tableau de bord</h1>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={downloadExport}
            className="rounded-full border border-[var(--color-brand)]/25 px-4 py-2 text-xs font-medium text-[var(--color-ink)]"
          >
            Exporter JSON
          </button>
          <button
            type="button"
            onClick={() => importRef.current?.click()}
            className="rounded-full border border-[var(--color-brand)]/25 px-4 py-2 text-xs font-medium text-[var(--color-ink)]"
          >
            Importer JSON
          </button>
          <input ref={importRef} type="file" accept="application/json" className="hidden" onChange={onImportFile} />
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Réinitialiser toutes les données aux valeurs par défaut du site ?')) {
                resetToDefaults()
                setMsg('Réinitialisé.')
              }
            }}
            className="rounded-full border border-red-200 px-4 py-2 text-xs font-medium text-red-700"
          >
            Réinit.
          </button>
          <button
            type="button"
            onClick={logout}
            className="rounded-full bg-[var(--color-brand)]/15 px-4 py-2 text-xs font-semibold text-[var(--color-ink)]"
          >
            Déconnexion
          </button>
          <Link to="/" className="rounded-full bg-[var(--color-cta)] px-4 py-2 text-xs font-bold text-[var(--color-on-cta)]">
            Voir le site
          </Link>
        </div>
      </div>
      <p className="mt-2 text-sm text-[var(--color-body)]/80">
        Stockage local au navigateur (localStorage). Exportez un fichier JSON après des changements importants.
      </p>
      {msg ? (
        <p className="mt-4 rounded-xl border border-[var(--color-brand)]/20 bg-[var(--color-muted-green)]/40 px-4 py-2 text-sm text-[var(--color-ink)]">
          {msg}
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-2 border-b border-[var(--color-brand)]/15 pb-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              setTab(t.id)
              setMsg('')
            }}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              tab === t.id
                ? 'bg-[var(--color-brand)] text-white'
                : 'bg-[var(--color-beige)] text-[var(--color-ink)] hover:bg-[var(--color-brand)]/10'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-6">
        {tab === 'publications' ? (
          <JsonBlock
            title="Tableau de publications (JSON)"
            hint="slug, date (YYYY-MM-DD), title, excerpt, body (tableau), coverImage (optionnel)."
            value={pubJson}
            onChange={setPubJson}
            onApply={applyPublications}
          />
        ) : null}
        {tab === 'temoignages' ? (
          <JsonBlock
            title="Témoignages écrits (JSON)"
            hint="Tableau : name, rating, content."
            value={testJson}
            onChange={setTestJson}
            onApply={applyTestimonials}
          />
        ) : null}
        {tab === 'videos' ? (
          <div>
            <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">Fichiers vidéo</h2>
            <p className="mt-1 text-sm text-[var(--color-body)]/85">Un nom de fichier par ligne (`public/images/témoignages/`).</p>
            <textarea
              value={vidText}
              onChange={(e) => setVidText(e.target.value)}
              rows={12}
              className="mt-3 w-full rounded-xl border border-[var(--color-brand)]/20 bg-white p-4 font-mono text-xs"
            />
            <button
              type="button"
              onClick={applyVideos}
              className="mt-3 rounded-full bg-[var(--color-cta)] px-6 py-2.5 text-sm font-bold text-[var(--color-on-cta)]"
            >
              Enregistrer les vidéos
            </button>
          </div>
        ) : null}
        {tab === 'programmes' ? (
          <JsonBlock
            title="Programmes (JSON)"
            hint="Tableau des services : slug, title, goal, intro, benefits, duration, coverImage, detailGallery…"
            value={progJson}
            onChange={setProgJson}
            onApply={applyProgrammes}
          />
        ) : null}
        {tab === 'tarifs' ? (
          <JsonBlock
            title="Tarifs (JSON)"
            hint='[ { "label", "price", "note" }, ... ]'
            value={priceJson}
            onChange={setPriceJson}
            onApply={applyTarifs}
          />
        ) : null}
        {tab === 'textes' ? <TextesForm setMsg={setMsg} /> : null}
      </div>
    </div>
    </div>
  )
}

function JsonBlock({
  title,
  hint,
  value,
  onChange,
  onApply,
}: {
  title: string
  hint: string
  value: string
  onChange: (v: string) => void
  onApply: () => void
}) {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">{title}</h2>
      <p className="mt-1 text-sm text-[var(--color-body)]/85">{hint}</p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={18}
        spellCheck={false}
        className="mt-3 w-full rounded-xl border border-[var(--color-brand)]/20 bg-white p-4 font-mono text-xs leading-relaxed"
      />
      <button
        type="button"
        onClick={onApply}
        className="mt-3 rounded-full bg-[var(--color-cta)] px-6 py-2.5 text-sm font-bold text-[var(--color-on-cta)]"
      >
        Enregistrer
      </button>
    </div>
  )
}

function TextesForm({ setMsg }: { setMsg: (s: string) => void }) {
  const { state, setState } = useAdmin()
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">En-tête (hero)</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Field label="Titre" value={state.heroCopy.title} onChange={(v) => setState((s) => ({ ...s, heroCopy: { ...s.heroCopy, title: v } }))} />
          <Field label="Sous-titre" value={state.heroCopy.subtitle} onChange={(v) => setState((s) => ({ ...s, heroCopy: { ...s.heroCopy, subtitle: v } }))} />
          <Field label="Bouton principal" value={state.heroCopy.ctaPrimary} onChange={(v) => setState((s) => ({ ...s, heroCopy: { ...s.heroCopy, ctaPrimary: v } }))} />
          <Field label="Bouton secondaire" value={state.heroCopy.ctaSecondary} onChange={(v) => setState((s) => ({ ...s, heroCopy: { ...s.heroCopy, ctaSecondary: v } }))} />
        </div>
      </div>
      <div>
        <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">Contact</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Field label="Téléphone" value={state.contactInfo.phone} onChange={(v) => setState((s) => ({ ...s, contactInfo: { ...s.contactInfo, phone: v } }))} />
          <Field label="Email" value={state.contactInfo.email} onChange={(v) => setState((s) => ({ ...s, contactInfo: { ...s.contactInfo, email: v } }))} />
          <Field label="Adresse (footer)" value={state.contactInfo.address} onChange={(v) => setState((s) => ({ ...s, contactInfo: { ...s.contactInfo, address: v } }))} />
          <Field label="Horaires" value={state.contactInfo.hours} onChange={(v) => setState((s) => ({ ...s, contactInfo: { ...s.contactInfo, hours: v } }))} />
        </div>
      </div>
      <div>
        <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">Marque</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Field label="Nom du site" value={state.site.name} onChange={(v) => setState((s) => ({ ...s, site: { ...s.site, name: v } }))} />
          <Field label="Slogan" value={state.site.tagline} onChange={(v) => setState((s) => ({ ...s, site: { ...s.site, tagline: v } }))} />
          <Field label="Domaine (footer)" value={state.site.domain} onChange={(v) => setState((s) => ({ ...s, site: { ...s.site, domain: v } }))} />
        </div>
      </div>
      <button
        type="button"
        onClick={() => setMsg('Modifications enregistrées (sauvegarde automatique).')}
        className="rounded-full bg-[var(--color-cta)] px-6 py-2.5 text-sm font-bold text-[var(--color-on-cta)]"
      >
        Confirmer
      </button>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <label className="block text-sm font-medium text-[var(--color-ink)]">
      {label}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-[var(--color-brand)]/20 bg-white px-3 py-2 text-sm"
      />
    </label>
  )
}
