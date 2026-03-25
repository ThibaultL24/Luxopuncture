// src/pages/admin/admin-login-page.tsx
import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAdmin } from '../../contexts/admin-context'

export function AdminLoginPage() {
  const { login, isAuthenticated } = useAdmin()
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (login(identifier, password)) {
      navigate('/admin', { replace: true })
    } else {
      setError('Identifiant ou mot de passe incorrect.')
    }
  }

  return (
    <div className="admin-shell">
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-16">
        <div className="overflow-hidden rounded-2xl border border-[var(--color-brand)]/15 bg-white shadow-lg">
          <div className="h-1.5 w-full bg-[var(--color-brand)]" aria-hidden />
          <div className="px-6 pb-8 pt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-brand)]/85">Espace réservé</p>
            <h1 className="mt-2 font-display text-2xl font-semibold text-[var(--color-ink)]">Administration</h1>
            <p className="mt-2 text-sm text-[var(--color-body)]/85">
              Les modifications sont enregistrées dans ce navigateur (localStorage).
            </p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <label className="block text-sm font-medium text-[var(--color-ink)]">
                Identifiant
                <input
                  type="text"
                  autoComplete="username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="admin-input mt-1.5 px-4 py-3"
                />
              </label>
              <label className="block text-sm font-medium text-[var(--color-ink)]">
                Mot de passe
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="admin-input mt-1.5 px-4 py-3"
                />
              </label>
              {error ? <p className="text-sm font-medium text-rose-700">{error}</p> : null}
              <button
                type="submit"
                className="w-full rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-brand-dark)]"
              >
                Connexion
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
