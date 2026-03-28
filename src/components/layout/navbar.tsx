// src/components/layout/navbar.tsx
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { trackClick } from "../../lib/analytics";

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/programme", label: "À distance" },
  { to: "/cabinet", label: "Cabinet" },
  { to: "/tarifs", label: "Tarifs" },
  { to: "/temoignages", label: "Témoignages" },
  { to: "/a-propos", label: "À propos" },
  { to: "/partenariat", label: "Partenariat" },
  { to: "/contact", label: "Contact" },
  { to: "/publications", label: "Blog" },
];

function linkClassName(isActive: boolean) {
  return [
    "shrink-0 whitespace-nowrap rounded-full px-1.5 py-0.5 text-xs font-medium leading-tight transition-colors sm:px-1.5 sm:py-1 sm:text-sm xl:px-2.5 xl:text-base",
    isActive
      ? "bg-[var(--color-cta)] text-[var(--color-on-cta)] shadow-sm"
      : "text-white/90 hover:bg-white/10 hover:text-white",
  ].join(" ");
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 overflow-hidden border-b border-white/10 bg-[var(--color-brand)] shadow-[var(--shadow-soft)]">
      <div className="mx-auto grid w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 gap-y-1.5 px-3 py-2 sm:px-4 sm:py-2.5 xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] xl:gap-x-2.5 xl:px-4 xl:py-2.5">
        <div className="flex min-w-0 justify-self-start">
          <Link
            to="/"
            className="flex h-[3.25rem] max-h-[3.25rem] min-w-0 max-w-[min(15rem,90vw)] shrink-0 items-center overflow-hidden sm:h-[3.5rem] sm:max-h-[3.5rem] sm:max-w-[min(18rem,52vw)] lg:h-[4.25rem] lg:max-h-[4.25rem] lg:max-w-[min(20rem,38vw)] xl:h-[4.5rem] xl:max-h-[4.5rem] xl:max-w-[min(22rem,32vw)]"
          >
            <img
              src="/images/logo-laplace-luxopuncture.png"
              alt="Laplace Luxopuncture"
              width={1200}
              height={270}
              className="logo-laplace block h-full w-auto max-w-none origin-left object-contain object-left"
              decoding="async"
              fetchPriority="high"
            />
          </Link>
        </div>

        <nav
          className="hidden min-w-0 flex-wrap items-center justify-center justify-self-center gap-x-0.5 gap-y-1 self-center px-1 xl:flex"
          aria-label="Navigation principale"
        >
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => linkClassName(isActive)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center justify-self-end gap-2">
          <Link
            to="/contact"
            onClick={() => trackClick("cta_reserver_nav_desktop")}
            className="hidden rounded-full bg-[var(--color-cta)] px-3.5 py-1.5 text-sm font-bold leading-tight text-[var(--color-on-cta)] shadow-md transition hover:bg-[var(--color-cta-hover)] hover:text-white sm:px-4 sm:py-2 sm:text-base xl:inline-flex"
          >
            Réserver
          </Link>
          <button
            type="button"
            className="inline-flex rounded-full border border-white/25 p-1.5 text-white xl:hidden"
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
        <div
          id="mobile-nav"
          className="border-t border-white/10 bg-[var(--color-brand-dark)] px-4 pb-5 xl:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1.5 pt-3">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-3 text-base font-medium ${
                    isActive
                      ? "bg-[var(--color-cta)] text-[var(--color-on-cta)]"
                      : "text-white/90 hover:bg-white/10"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => {
                trackClick("cta_reserver_nav_mobile");
                setOpen(false);
              }}
              className="mt-2 rounded-full bg-[var(--color-cta)] px-5 py-3 text-center text-sm font-bold text-[var(--color-on-cta)] hover:bg-[var(--color-cta-hover)] hover:text-white"
            >
              Réserver
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
