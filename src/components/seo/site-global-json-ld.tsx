// src/components/seo/site-global-json-ld.tsx
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { socialLinks } from '../../data/site-content'
import { buildGlobalJsonLd, siteOrigin } from '../../lib/schema-org'
import { useSiteData } from '../../hooks/use-admin'
import { JsonLd } from './json-ld'

export function SiteGlobalJsonLd() {
  const { pathname } = useLocation()
  const { site, contactInfo, aboutPage } = useSiteData()

  const data = useMemo(
    () =>
      buildGlobalJsonLd({
        origin: siteOrigin(site),
        site,
        contact: contactInfo,
        about: { name: aboutPage.name },
        sameAs: [socialLinks.facebook, socialLinks.instagram, socialLinks.linkedin].filter(Boolean),
        currentPath: pathname,
      }),
    [site, contactInfo, aboutPage.name, pathname],
  )

  return <JsonLd data={data} />
}
