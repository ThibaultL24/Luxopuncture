// src/contexts/admin-context.tsx
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { AdminContext } from './admin-context-value'
import { getDefaultAdminState } from '../lib/admin-defaults'
import { mergeAdminState, mergeImportedAdminState } from '../lib/admin-merge'
import { ADMIN_SESSION_KEY, ADMIN_STORAGE_KEY, type AdminState } from '../lib/admin-types'

/** Valeurs par défaut (surchargeables via VITE_ADMIN_IDENTIFIER / VITE_ADMIN_PASSWORD) */
const DEFAULT_ADMIN_IDENTIFIER = 'camille123'
const DEFAULT_ADMIN_PASSWORD = 'camille123'

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
      const parsed = JSON.parse(json) as Partial<AdminState>
      setStateInternal(mergeImportedAdminState(parsed))
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
