// src/lib/analytics.ts — collecte d’événements (local + envoi optionnel vers un endpoint)
import type { AnalyticsEvent, AnalyticsEventType } from './analytics-types'
import { appendEvent } from './analytics-store'

const VISITOR_KEY = 'laplace-visitor-id'

function getVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_KEY)
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem(VISITOR_KEY, id)
    }
    return id
  } catch {
    return 'anon'
  }
}

function newEvent(
  type: AnalyticsEventType,
  path: string,
  label: string | null,
): AnalyticsEvent {
  return {
    id: crypto.randomUUID(),
    type,
    path,
    label,
    referrer: typeof document !== 'undefined' ? document.referrer || null : null,
    ts: new Date().toISOString(),
    visitorId: getVisitorId(),
  }
}

function maybeIngest(event: AnalyticsEvent): void {
  const url = import.meta.env.VITE_ANALYTICS_INGEST_URL as string | undefined
  if (!url?.trim()) return
  try {
    fetch(url.trim(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
      keepalive: true,
    }).catch(() => {})
  } catch {
    /* */
  }
}

export function trackEvent(
  type: AnalyticsEventType,
  path: string,
  label: string | null = null,
): void {
  if (typeof window === 'undefined') return
  const ev = newEvent(type, path, label)
  appendEvent(ev)
  maybeIngest(ev)
}

export function trackPageView(path: string): void {
  trackEvent('page_view', path, null)
}

export function trackClick(label: string, pathOverride?: string): void {
  const path = pathOverride ?? (typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/')
  trackEvent('click', path, label)
}

export function trackFormSubmit(label: string, pathOverride?: string): void {
  const path = pathOverride ?? (typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/')
  trackEvent('form_submit', path, label)
}
