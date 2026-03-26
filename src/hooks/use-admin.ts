// src/hooks/use-admin.ts
import { useContext } from 'react'
import { AdminContext, type AdminContextValue } from '../contexts/admin-context-value'
import type { AdminState } from '../lib/admin-types'

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('AdminProvider manquant')
  return ctx
}

/** Données site (public) — toujours via le provider */
export function useSiteData(): AdminState {
  return useAdmin().state
}
