// src/contexts/admin-context-value.ts
import { createContext } from 'react'
import type { AdminState } from '../lib/admin-types'

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

export const AdminContext = createContext<AdminContextValue | null>(null)
