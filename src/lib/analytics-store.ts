// src/lib/analytics-store.ts — persistance locale des événements (navigateur)
import type { AnalyticsEvent } from './analytics-types'

export const ANALYTICS_STORAGE_KEY = 'laplace-analytics-events-v1'
const MAX_EVENTS = 8000

export function readEvents(): AnalyticsEvent[] {
  try {
    const raw = localStorage.getItem(ANALYTICS_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed as AnalyticsEvent[]
  } catch {
    return []
  }
}

export function writeEvents(events: AnalyticsEvent[]): void {
  try {
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(events))
  } catch {
    /* quota */
  }
}

export function appendEvent(event: AnalyticsEvent): void {
  const all = readEvents()
  all.push(event)
  if (all.length > MAX_EVENTS) {
    all.splice(0, all.length - MAX_EVENTS)
  }
  writeEvents(all)
}

export function clearEvents(): void {
  try {
    localStorage.removeItem(ANALYTICS_STORAGE_KEY)
  } catch {
    /* */
  }
}

export function exportEventsJson(): string {
  return JSON.stringify(readEvents(), null, 2)
}

function inRange(ts: string, days: number): boolean {
  const t = new Date(ts).getTime()
  const threshold = Date.now() - days * 24 * 60 * 60 * 1000
  return t >= threshold && !Number.isNaN(t)
}

export function filterEventsByRange(events: AnalyticsEvent[], days: number): AnalyticsEvent[] {
  return events.filter((e) => inRange(e.ts, days))
}

export interface AnalyticsOverview {
  pageViews: number
  uniqueVisitors: number
  clicks: number
  formSubmits: number
}

export function aggregateOverview(events: AnalyticsEvent[]): AnalyticsOverview {
  const pageViews = events.filter((e) => e.type === 'page_view').length
  const clicks = events.filter((e) => e.type === 'click').length
  const formSubmits = events.filter((e) => e.type === 'form_submit').length
  const uniqueVisitors = new Set(events.map((e) => e.visitorId)).size
  return { pageViews, uniqueVisitors, clicks, formSubmits }
}

export function topPaths(events: AnalyticsEvent[], limit: number): { path: string; count: number }[] {
  const map = new Map<string, number>()
  for (const e of events) {
    if (e.type !== 'page_view') continue
    map.set(e.path, (map.get(e.path) ?? 0) + 1)
  }
  return [...map.entries()]
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

export function topLabels(events: AnalyticsEvent[], limit: number): { label: string; count: number }[] {
  const map = new Map<string, number>()
  for (const e of events) {
    if (e.type !== 'click' || !e.label) continue
    map.set(e.label, (map.get(e.label) ?? 0) + 1)
  }
  return [...map.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

function dayKeyLocal(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** Compte les page_view par jour (fuseau local) sur les derniers `days` jours calendaires. */
export function pageViewsSeries(events: AnalyticsEvent[], days: number): { day: string; count: number }[] {
  const pageViews = events.filter((e) => e.type === 'page_view')
  const byDay = new Map<string, number>()
  for (const e of pageViews) {
    const k = dayKeyLocal(e.ts)
    if (!k) continue
    byDay.set(k, (byDay.get(k) ?? 0) + 1)
  }
  const out: { day: string; count: number }[] = []
  const today = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i)
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const key = `${y}-${m}-${day}`
    out.push({ day: key, count: byDay.get(key) ?? 0 })
  }
  return out
}
