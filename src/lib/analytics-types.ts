// src/lib/analytics-types.ts — événements analytics côté navigateur
export type AnalyticsEventType = 'page_view' | 'click' | 'form_submit'

export interface AnalyticsEvent {
  id: string
  type: AnalyticsEventType
  path: string
  label: string | null
  referrer: string | null
  ts: string
  visitorId: string
}
