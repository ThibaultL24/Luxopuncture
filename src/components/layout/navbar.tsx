// src/components/layout/navbar.tsx
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSiteData } from '../../contexts/admin-context'

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/programme', label: 'À distance' },
  { to: '/cabinet', label: 'Cabinet' },
  { to: '/tarifs', label: 'Tarifs' },
  { to: '/temoignages', label: 'Témoignages' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/partenariat', label: 'Partenariat' },
  { to: '/contact', label: 'Contact' },
  { to: '/publications', label: 'Blog' },
]

function linkClassName(isActive: boolean) {
  return [
    'shrink-0 whitespace-nowrap rounded-full px-1.5 py-1 text-[0.7rem] font-medium transition-colors sm:px-2 sm:text-xs md:text-sm lg:px-2 xl:px-2.5',
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
      <div className="mx-auto flex w-full min-w-0 items-center gap-2 px-3 py-3 sm:px-4 sm:py-3.5 lg:gap-3 lg:px-4 lg:py-4">
        <Link
          to="/"
          className="flex min-w-0 shrink-0 items-center gap-2 text-left font-display text-base font-semibold tracking-tight text-white sm:gap-2.5 sm:text-lg lg:text-xl xl:text-2xl"
        >
          <span className="whitespace-nowrap">{site.name}</span>
          <img
            src="/images/plumes-navbar.png"
            alt=""
            width={200}
            height={56}
            className="h-9 w-auto max-w-[min(10.5rem,42vw)] shrink-0 object-contain object-right mix-blend-screen sm:h-10 sm:max-w-[12rem] lg:h-11 lg:max-w-[13.5rem]"
            decoding="async"
            fetchPriority="high"
          />
        </Link>

        <nav
          className="hidden min-w-0 flex-1 flex-wrap items-center justify-center gap-x-0.5 gap-y-1 px-1 lg:flex"
          aria-label="Navigation principale"
        >
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => linkClassName(isActive)}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Link
            to="/contact"
            className="hidden rounded-full bg-[var(--color-cta)] px-4 py-2 text-xs font-bold text-[var(--color-on-cta)] shadow-md transition hover:bg-[var(--color-cta-hover)] hover:text-white sm:px-5 sm:py-2.5 sm:text-sm lg:inline-flex"
          >
            Réserver
          </Link>
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
