// src/components/layout/footer.tsx
import { Link } from 'react-router-dom'
import { useSiteData } from '../../contexts/admin-context'

export function Footer() {
  const year = new Date().getFullYear()
  const { contactInfo, site } = useSiteData()
  return (
    <footer className="border-t border-white/10 bg-[var(--color-brand)] text-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-3 lg:gap-8">
        <div>
          <p className="font-display text-lg font-semibold text-white sm:text-xl">{site.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/80">
            Accompagnement en luxopuncture, personnalisé pour votre équilibre.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-beige)]">Liens</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li>
              <Link className="text-white/85 transition hover:text-[var(--color-cta)]" to="/programme">
                À distance
              </Link>
            </li>
            <li>
              <Link className="text-white/85 transition hover:text-[var(--color-cta)]" to="/cabinet">
                Cabinet & la luxopuncture
              </Link>
            </li>
            <li>
              <Link className="text-white/85 transition hover:text-[var(--color-cta)]" to="/publications">
                Blog
              </Link>
            </li>
            <li>
              <Link className="text-white/85 transition hover:text-[var(--color-cta)]" to="/tarifs">
                Tarifs
              </Link>
            </li>
            <li>
              <Link className="text-white/85 transition hover:text-[var(--color-cta)]" to="/temoignages">
                Témoignages
              </Link>
            </li>
            <li>
              <Link className="text-white/85 transition hover:text-[var(--color-cta)]" to="/a-propos">
                À propos
              </Link>
            </li>
            <li>
              <Link className="text-white/85 transition hover:text-[var(--color-cta)]" to="/partenariat">
                Partenariat
              </Link>
            </li>
            <li>
              <Link className="text-white/85 transition hover:text-[var(--color-cta)]" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-beige)]">Coordonnées</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li>
              <a
                className="text-white/85 transition hover:text-[var(--color-cta)]"
                href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
              >
                {contactInfo.phone}
              </a>
            </li>
            <li>
              <a
                className="text-white/85 transition hover:text-[var(--color-cta)]"
                href={`mailto:${contactInfo.email}`}
              >
                {contactInfo.email}
              </a>
            </li>
            <li>
              <span className="text-white/75">{contactInfo.address}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-3 text-center text-xs text-white/50">
        © {year} {site.name} · {site.domain}
      </div>
    </footer>
  )
}
