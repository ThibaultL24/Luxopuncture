// src/components/analytics-route-tracker.tsx — enregistre une page_view à chaque navigation (hors /admin)
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from '../lib/analytics'

export function AnalyticsRouteTracker() {
  const location = useLocation()

  useEffect(() => {
    const path = `${location.pathname}${location.search}`
    if (location.pathname.startsWith('/admin')) return
    trackPageView(path)
  }, [location.pathname, location.search])

  return null
}
