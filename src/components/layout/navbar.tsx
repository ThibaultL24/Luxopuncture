// src/components/layout/navbar.tsx
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSiteData } from '../../contexts/admin-context'

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/luxopuncture', label: 'Luxopuncture' },
  { to: '/programme', label: 'Programmes' },
  { to: '/publications', label: 'Publications' },
  { to: '/tarifs', label: 'Tarifs' },
  { to: '/temoignages', label: 'Témoignages' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
]

function linkClassName(isActive: boolean) {
  return [
    'rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors lg:px-3',
    isActive
      ? 'bg-[var(--color-cta)] text-[var(--color-on-cta)] shadow-sm'
      : 'text-white/90 hover:bg-white/10 hover:text-white',
  ].join(' ')
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { site } = useSiteData()

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[var(--color-brand)] shadow-[var(--shadow-soft)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          to="/"
          className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl"
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1" aria-label="Navigation principale">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => linkClassName(isActive)}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="inline-flex rounded-full bg-[var(--color-cta)] px-5 py-2.5 text-sm font-bold text-[var(--color-on-cta)] shadow-md transition hover:bg-[var(--color-cta-hover)] hover:text-white"
          >
            Réserver
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex rounded-full border border-white/25 p-2 text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-white/10 bg-[var(--color-brand-dark)] px-4 pb-6 lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 pt-4">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-3 text-base font-medium ${isActive ? 'bg-[var(--color-cta)] text-[var(--color-on-cta)]' : 'text-white/90 hover:bg-white/10'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-[var(--color-cta)] px-5 py-3 text-center text-sm font-bold text-[var(--color-on-cta)] hover:bg-[var(--color-cta-hover)] hover:text-white"
            >
              Réserver
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}
