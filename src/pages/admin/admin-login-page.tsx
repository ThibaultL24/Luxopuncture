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
    <div className="min-h-screen bg-[var(--color-page)]">
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-16">
      <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Administration</h1>
      <p className="mt-2 text-sm text-[var(--color-body)]/85">
        Accès réservé. Les modifications sont enregistrées dans ce navigateur (localStorage).
      </p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block text-sm font-medium text-[var(--color-ink)]">
          Identifiant
          <input
            type="text"
            autoComplete="username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-[var(--color-brand)]/20 bg-white px-4 py-3 text-sm outline-none ring-[var(--color-brand)] focus:ring-2"
          />
        </label>
        <label className="block text-sm font-medium text-[var(--color-ink)]">
          Mot de passe
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-[var(--color-brand)]/20 bg-white px-4 py-3 text-sm outline-none ring-[var(--color-brand)] focus:ring-2"
          />
        </label>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          className="w-full rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-brand-dark)]"
        >
          Connexion
        </button>
      </form>
    </div>
    </div>
  )
}
