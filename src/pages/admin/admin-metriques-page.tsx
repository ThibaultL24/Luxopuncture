// src/pages/admin/admin-metriques-page.tsx — métriques agrégées (données stockées dans ce navigateur)
import { useMemo, useState } from 'react'
import { AdminPageHeader } from '../../components/admin/admin-page-header'
import { AdminSection } from '../../components/admin/admin-section'
import {
  aggregateOverview,
  exportEventsJson,
  filterEventsByRange,
  pageViewsSeries,
  readEvents,
  topLabels,
  topPaths,
  clearEvents,
} from '../../lib/analytics-store'

const RANGES = [
  { days: 7, label: '7 jours' },
  { days: 30, label: '30 jours' },
  { days: 90, label: '90 jours' },
] as const

function KpiCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-[var(--color-brand)]/12 bg-white/90 px-4 py-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-body)]/75">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold tabular-nums text-[var(--color-ink)]">{value}</p>
    </div>
  )
}

function BarChart({ series }: { series: { day: string; count: number }[] }) {
  const max = Math.max(1, ...series.map((s) => s.count))
  return (
    <div className="flex min-h-[180px] items-end gap-1 sm:gap-1.5">
      {series.map((s) => (
        <div key={s.day} className="flex min-w-0 flex-1 flex-col items-center gap-1">
          <span className="text-[10px] font-semibold tabular-nums text-[var(--color-ink)]">{s.count}</span>
          <div
            className="w-full max-w-[2.5rem] rounded-t-sm bg-[var(--color-brand)]/85 transition-[height]"
            style={{ height: `${Math.max(8, (s.count / max) * 120)}px` }}
            title={`${s.day} : ${s.count}`}
          />
          <span className="hidden truncate text-[9px] text-[var(--color-body)]/70 sm:block" title={s.day}>
            {s.day.slice(5)}
          </span>
        </div>
      ))}
    </div>
  )
}

export function AdminMetriquesPage() {
  const [rangeDays, setRangeDays] = useState<number>(30)
  const [storeVersion, setStoreVersion] = useState(0)

  const events = useMemo(() => readEvents(), [storeVersion])
  const filtered = useMemo(() => filterEventsByRange(events, rangeDays), [events, rangeDays])
  const overview = useMemo(() => aggregateOverview(filtered), [filtered])
  const chartDays = Math.min(rangeDays, 31)
  const series = useMemo(() => pageViewsSeries(filtered, chartDays), [filtered, chartDays])
  const pages = useMemo(() => topPaths(filtered, 10), [filtered])
  const labels = useMemo(() => topLabels(filtered, 10), [filtered])

  function downloadExport() {
    const blob = new Blob([exportEventsJson()], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `laplace-analytics-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  function resetData() {
    if (!window.confirm('Effacer toutes les événements enregistrés dans ce navigateur ?')) return
    clearEvents()
    setStoreVersion((n) => n + 1)
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Métriques"
        subtitle="Indicateurs calculés à partir des événements enregistrés dans ce navigateur (localStorage). Pour un trafic réel multi-visiteurs, utilisez un outil (Plausible, Matomo…) ou un endpoint configuré via VITE_ANALYTICS_INGEST_URL."
      />

      <AdminSection variant="sand" title="Important — lecture des données">
        <ul className="list-inside list-disc space-y-1.5 text-sm leading-relaxed text-[var(--color-body)]/90">
          <li>
            Les chiffres reflètent ce qui a été collecté <strong>sur ce navigateur</strong> (souvent utile pour tester).
            Les visiteurs ne partagent pas le même stockage : en production, branchez un backend ou un service
            d’analytics.
          </li>
          <li>
            Variable optionnelle <code className="rounded bg-[var(--color-brand)]/10 px-1">VITE_ANALYTICS_INGEST_URL</code>{' '}
            : envoie une copie de chaque événement en POST (JSON) vers votre API.
          </li>
          <li>
            Pensez au consentement RGPD si vous collectez des données au-delà de mesures strictement nécessaires.
          </li>
        </ul>
      </AdminSection>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-[var(--color-ink)]">Période :</span>
        {RANGES.map((r) => (
          <button
            key={r.days}
            type="button"
            onClick={() => setRangeDays(r.days)}
            className={
              rangeDays === r.days
                ? 'rounded-full bg-[var(--color-brand)] px-4 py-1.5 text-sm font-semibold text-white'
                : 'rounded-full border border-[var(--color-brand)]/20 bg-white px-4 py-1.5 text-sm text-[var(--color-ink)] hover:bg-[var(--color-muted-green)]/40'
            }
          >
            {r.label}
          </button>
        ))}
        <span className="ml-auto text-xs text-[var(--color-body)]/80">
          {filtered.length} événement(s) sur la période
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Pages vues" value={overview.pageViews} />
        <KpiCard label="Visiteurs (IDs locaux)" value={overview.uniqueVisitors} />
        <KpiCard label="Clics suivis" value={overview.clicks} />
        <KpiCard label="Envois formulaire (suivi)" value={overview.formSubmits} />
      </div>

      <AdminSection variant="brand" title="Pages vues par jour" subtitle="Jusqu’à 31 jours affichés (lisibilité).">
        <BarChart series={series} />
      </AdminSection>

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminSection variant="slate" title="Pages les plus vues">
          {pages.length === 0 ? (
            <p className="text-sm text-[var(--color-body)]/80">Aucune donnée sur cette période.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-brand)]/15 text-xs uppercase text-[var(--color-body)]/75">
                  <th className="pb-2 font-medium">Chemin</th>
                  <th className="pb-2 text-right font-medium">Vues</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((row) => (
                  <tr key={row.path} className="border-b border-[var(--color-brand)]/08">
                    <td className="py-2 font-mono text-xs text-[var(--color-ink)]">{row.path}</td>
                    <td className="py-2 text-right tabular-nums">{row.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </AdminSection>

        <AdminSection variant="mint" title="Clics (labels)">
          {labels.length === 0 ? (
            <p className="text-sm text-[var(--color-body)]/80">Aucun clic suivis sur cette période.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-brand)]/15 text-xs uppercase text-[var(--color-body)]/75">
                  <th className="pb-2 font-medium">Label</th>
                  <th className="pb-2 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {labels.map((row) => (
                  <tr key={row.label} className="border-b border-[var(--color-brand)]/08">
                    <td className="py-2 text-[var(--color-ink)]">{row.label}</td>
                    <td className="py-2 text-right tabular-nums">{row.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </AdminSection>
      </div>

      <AdminSection variant="rose" title="Données brutes">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={downloadExport}
            className="rounded-full border border-[var(--color-brand)]/20 bg-white px-4 py-2 text-sm font-medium text-[var(--color-ink)] shadow-sm hover:bg-[var(--color-muted-green)]/50"
          >
            Télécharger JSON
          </button>
          <button
            type="button"
            onClick={resetData}
            className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-900 hover:bg-rose-100"
          >
            Effacer les événements
          </button>
        </div>
      </AdminSection>
    </div>
  )
}
