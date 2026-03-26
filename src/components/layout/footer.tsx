// src/components/layout/footer.tsx
import { Link } from 'react-router-dom'
import { useSiteData } from '../../hooks/use-admin'
import { trackClick } from '../../lib/analytics'
import { OpenDyslexicToggle } from './open-dyslexic-toggle'

const footerLinks: readonly { to: string; label: string }[] = [
  { to: '/', label: 'Accueil' },
  { to: '/programme', label: 'À distance' },
  { to: '/cabinet', label: 'Cabinet & la luxopuncture' },
  { to: '/tarifs', label: 'Tarifs' },
  { to: '/temoignages', label: 'Témoignages' },
  { to: '/publications', label: 'Blog' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/partenariat', label: 'Partenariat' },
  { to: '/contact', label: 'Contact' },
] as const

export function Footer() {
  const year = new Date().getFullYear()
  const { contactInfo, site } = useSiteData()
  return (
    <footer className="border-t border-white/10 bg-[var(--color-brand)] text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-5 sm:py-8 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start lg:gap-10">
          {/* Gauche — logo + texte */}
          <div className="flex max-w-md flex-col">
            <Link to="/" className="inline-block w-fit shrink-0">
              <img
                src="/images/logo-laplace-luxopuncture.png"
                alt="Laplace Luxopuncture"
                width={1200}
                height={270}
                className="logo-laplace block h-auto max-h-[3.75rem] w-auto max-w-[min(18rem,100%)] object-contain object-left sm:max-h-[4rem] lg:max-h-[4.25rem] lg:max-w-[20rem]"
                decoding="async"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80">
              Accompagnement en luxopuncture, personnalisé pour votre équilibre.
            </p>
          </div>

          {/* Centre — liens sur deux colonnes */}
          <div className="min-w-0 lg:justify-self-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-beige)]">Liens</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:gap-x-8">
              {footerLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link className="text-white/85 transition hover:text-[var(--color-cta)]" to={to}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Droite — coordonnées */}
          <div className="min-w-0 lg:justify-self-end lg:text-right">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-beige)]">Coordonnées</p>
            <ul className="mt-3 space-y-2 text-sm lg:ml-auto lg:max-w-xs">
              <li>
                <a
                  className="text-white/85 transition hover:text-[var(--color-cta)]"
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  onClick={() => trackClick('phone_click_footer')}
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li>
                <a
                  className="text-white/85 transition hover:text-[var(--color-cta)]"
                  href={`mailto:${contactInfo.email}`}
                  onClick={() => trackClick('email_click_footer')}
                >
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <span className="text-balance text-white/75">{contactInfo.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <OpenDyslexicToggle variant="footer" />
      <div className="border-t border-white/10 py-2.5 text-center text-xs text-white/50">
        © {year} {site.name} · {site.domain}
      </div>
    </footer>
  )
}
