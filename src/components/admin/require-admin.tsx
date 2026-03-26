// src/components/admin/require-admin.tsx
import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAdmin } from '../../hooks/use-admin'

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAdmin()
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />
  return <>{children}</>
}
