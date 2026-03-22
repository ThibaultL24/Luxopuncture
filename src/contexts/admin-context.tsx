// src/contexts/admin-context.tsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getDefaultAdminState } from '../lib/admin-defaults'
import { ADMIN_SESSION_KEY, ADMIN_STORAGE_KEY, type AdminState } from '../lib/admin-types'

/** Valeurs par défaut (surchargeables via VITE_ADMIN_IDENTIFIER / VITE_ADMIN_PASSWORD) */
const DEFAULT_ADMIN_IDENTIFIER = 'camille123'
const DEFAULT_ADMIN_PASSWORD = 'camille123'

export interface AdminContextValue {
  state: AdminState
  setState: (next: AdminState | ((prev: AdminState) => AdminState)) => void
  isAuthenticated: boolean
  login: (identifier: string, password: string) => boolean
  logout: () => void
  resetToDefaults: () => void
  importState: (json: string) => { ok: boolean; error?: string }
  exportStateJson: () => string
}

const AdminContext = createContext<AdminContextValue | null>(null)

function mergeAdminState(defaults: AdminState, p: Partial<AdminState>): AdminState {
  return {
    publications: p.publications ?? defaults.publications,
    testimonials: p.testimonials ?? defaults.testimonials,
    services: p.services ?? defaults.services,
    pricingRows: p.pricingRows ?? defaults.pricingRows,
    heroCopy: { ...defaults.heroCopy, ...p.heroCopy },
    contactInfo: { ...defaults.contactInfo, ...p.contactInfo },
    site: { ...defaults.site, ...p.site },
    testimonialVideoFiles: p.testimonialVideoFiles ?? defaults.testimonialVideoFiles,
  }
}

function loadStoredState(): AdminState {
  const defaults = getDefaultAdminState()
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY)
    if (!raw) return defaults
    const parsed = JSON.parse(raw) as Partial<AdminState>
    return mergeAdminState(defaults, parsed)
  } catch {
    return defaults
  }
}

function readSession(): boolean {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === '1'
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, setStateInternal] = useState<AdminState>(loadStoredState)
  const [isAuthenticated, setIsAuthenticated] = useState(readSession)

  useEffect(() => {
    try {
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* quota */
    }
  }, [state])

  const setState = useCallback((next: AdminState | ((prev: AdminState) => AdminState)) => {
    setStateInternal(next)
  }, [])

  const login = useCallback((identifier: string, password: string) => {
    const expectedId = (import.meta.env.VITE_ADMIN_IDENTIFIER as string | undefined) ?? DEFAULT_ADMIN_IDENTIFIER
    const expectedPw = (import.meta.env.VITE_ADMIN_PASSWORD as string | undefined) ?? DEFAULT_ADMIN_PASSWORD
    if (identifier !== expectedId || password !== expectedPw) return false
    sessionStorage.setItem(ADMIN_SESSION_KEY, '1')
    setIsAuthenticated(true)
    return true
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY)
    setIsAuthenticated(false)
  }, [])

  const resetToDefaults = useCallback(() => {
    setStateInternal(getDefaultAdminState())
  }, [])

  const exportStateJson = useCallback(() => JSON.stringify(state, null, 2), [state])

  const importState = useCallback((json: string) => {
    try {
      const parsed = JSON.parse(json) as AdminState
      const defaults = getDefaultAdminState()
      const merged: AdminState = {
        ...defaults,
        ...parsed,
        publications: Array.isArray(parsed.publications) ? parsed.publications : defaults.publications,
        testimonials: Array.isArray(parsed.testimonials) ? parsed.testimonials : defaults.testimonials,
        services: Array.isArray(parsed.services) ? parsed.services : defaults.services,
        pricingRows: Array.isArray(parsed.pricingRows) ? parsed.pricingRows : defaults.pricingRows,
        heroCopy: { ...defaults.heroCopy, ...parsed.heroCopy },
        contactInfo: { ...defaults.contactInfo, ...parsed.contactInfo },
        site: { ...defaults.site, ...parsed.site },
        testimonialVideoFiles: Array.isArray(parsed.testimonialVideoFiles)
          ? parsed.testimonialVideoFiles
          : defaults.testimonialVideoFiles,
      }
      setStateInternal(merged)
      return { ok: true as const }
    } catch (e) {
      return { ok: false as const, error: e instanceof Error ? e.message : 'JSON invalide' }
    }
  }, [])

  const value = useMemo(
    () => ({
      state,
      setState,
      isAuthenticated,
      login,
      logout,
      resetToDefaults,
      importState,
      exportStateJson,
    }),
    [state, setState, isAuthenticated, login, logout, resetToDefaults, importState, exportStateJson],
  )

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('AdminProvider manquant')
  return ctx
}

/** Données site (public) — toujours via le provider */
export function useSiteData(): AdminState {
  return useAdmin().state
}
