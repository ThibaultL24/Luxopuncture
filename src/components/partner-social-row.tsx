// src/components/partner-social-row.tsx
import type { ReactNode } from 'react'
import { Facebook, Globe, Instagram, Linkedin } from 'lucide-react'
import type { PartenariatPartnerSocials } from '../lib/admin-types'

const activeClass =
  'inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-brand)]/20 bg-white/90 text-[var(--color-brand)] shadow-sm transition hover:border-[var(--color-brand)]/35 hover:bg-white hover:text-[var(--color-cta-hover)]'

const pendingClass =
  'inline-flex h-11 w-11 cursor-default items-center justify-center rounded-full border border-dashed border-[var(--color-brand)]/20 bg-[var(--color-surface-rose)]/80 text-[var(--color-brand)]/30'

interface PartnerSocialRowProps {
  websiteUrl: string
  websiteLabel: string
  socials: PartenariatPartnerSocials
  nameForLabel: string
}

function SocialSlot({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: ReactNode
}) {
  if (!href.trim()) {
    return (
      <span className={pendingClass} title="Lien à venir" aria-label={`${label} — bientôt disponible`}>
        {children}
      </span>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={activeClass}
      aria-label={`${label} — nouvelle fenêtre`}
    >
      {children}
    </a>
  )
}

export function PartnerSocialRow({ websiteUrl, websiteLabel, socials, nameForLabel }: PartnerSocialRowProps) {
  const site = websiteUrl.trim()
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
      {site ? (
        <a
          href={site}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-cta-hover)] underline-offset-4 hover:underline"
        >
          <Globe className="h-4 w-4 shrink-0" aria-hidden />
          Site — {websiteLabel}
        </a>
      ) : (
        <span
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-body)]/55"
          title="Lien à venir"
        >
          <Globe className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
          Site — bientôt
        </span>
      )}
      <div className="flex flex-wrap items-center gap-3" role="list" aria-label={`Réseaux de ${nameForLabel}`}>
        <SocialSlot href={socials.instagram} label="Instagram">
          <Instagram className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </SocialSlot>
        <SocialSlot href={socials.facebook} label="Facebook">
          <Facebook className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </SocialSlot>
        <SocialSlot href={socials.linkedin} label="LinkedIn">
          <Linkedin className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </SocialSlot>
      </div>
    </div>
  )
}
