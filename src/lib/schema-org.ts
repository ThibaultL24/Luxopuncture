// src/lib/schema-org.ts — JSON-LD Schema.org (SEO)
import type { Publication } from '../data/publications'
import type { AboutPageState, ContactInfoState, SiteBrandingState } from './admin-types'

const CTX = 'https://schema.org' as const

/** Visuel principal du cabinet / praticienne (URL relative `public/`) — LocalBusiness.image */
export const SCHEMA_PRIMARY_IMAGE = '/images/camille1.jpeg'
export const SCHEMA_SECONDARY_IMAGE = '/images/cabinet1.jpeg'

/** Titre « humain » de la page pour WebPage.name (navigation publique). */
export function pageTitleForPath(pathname: string): string {
  const path = pathname.replace(/\/$/, '') || '/'
  const exact: Record<string, string> = {
    '/': 'Accueil',
    '/cabinet': 'Cabinet & luxopuncture',
    '/programme': 'Programmes',
    '/tarifs': 'Tarifs',
    '/temoignages': 'Témoignages',
    '/publications': 'Blog',
    '/recommandations': 'Recommandations',
    '/a-propos': 'À propos',
    '/contact': 'Contact',
  }
  if (exact[path]) return exact[path]
  if (/^\/programme\/[^/]+$/.test(path)) return 'Programme'
  if (/^\/publications\/[^/]+$/.test(path)) return 'Article'
  return 'Laplace Luxopuncture'
}

/** Article blog : WebPage géré par BlogPosting (éviter doublon dans le graphe global). */
export function includeGlobalWebPageForPath(pathname: string): boolean {
  const path = pathname.replace(/\/$/, '') || '/'
  return !/^\/publications\/[^/]+$/.test(path)
}

export function siteOrigin(branding: SiteBrandingState): string {
  const envUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim()
  if (envUrl) return envUrl.replace(/\/$/, '')
  const d = branding.domain.trim()
  if (!d) {
    if (typeof window !== 'undefined') return window.location.origin
    return 'https://laplaceluxopuncture.fr'
  }
  return d.startsWith('http') ? d.replace(/\/$/, '') : `https://${d.replace(/\/$/, '')}`
}

export function absoluteUrl(origin: string, path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${origin.replace(/\/$/, '')}${p}`
}

interface GlobalSchemaInput {
  origin: string
  site: SiteBrandingState
  contact: ContactInfoState
  about: Pick<AboutPageState, 'name'>
  /** Facebook, Instagram, LinkedIn, etc. */
  sameAs: string[]
  /** Chemin courant (ex. /tarifs) pour WebPage dans @graph */
  currentPath?: string
}

/** LocalBusiness + WebSite + Organization (+ WebPage courante si pertinent). */
export function buildGlobalJsonLd(input: GlobalSchemaInput): Record<string, unknown> {
  const { origin, site, contact, about, sameAs, currentPath } = input
  const businessId = `${origin}/#localbusiness`
  const websiteId = `${origin}/#website`
  const orgId = `${origin}/#organization`

  const imgPrimary = absoluteUrl(origin, SCHEMA_PRIMARY_IMAGE)
  const imgSecondary = absoluteUrl(origin, SCHEMA_SECONDARY_IMAGE)

  const business: Record<string, unknown> = {
    '@type': ['LocalBusiness', 'HealthAndBeautyBusiness'],
    '@id': businessId,
    name: site.name,
    description: site.tagline,
    url: origin,
    image: [imgPrimary, imgSecondary],
    telephone: contact.phone,
    email: contact.email,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Avignon',
      addressRegion: 'Provence-Alpes-Côte d\'Azur',
      addressCountry: 'FR',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: sameAs.filter((u) => u.trim().length > 0),
    founder: {
      '@type': 'Person',
      name: about.name,
      jobTitle: 'Luxothérapeute, hypnothérapeute',
    },
    parentOrganization: { '@id': orgId },
  }

  const organization: Record<string, unknown> = {
    '@type': 'Organization',
    '@id': orgId,
    name: site.name,
    url: origin,
    logo: `${origin}/favicon.svg`,
    image: imgPrimary,
  }

  const website: Record<string, unknown> = {
    '@type': 'WebSite',
    '@id': websiteId,
    name: site.name,
    url: origin,
    description: site.tagline,
    inLanguage: 'fr-FR',
    publisher: { '@id': orgId },
    about: { '@id': businessId },
  }

  const graph: Record<string, unknown>[] = [organization, business, website]

  const path = currentPath?.replace(/\/$/, '') || '/'
  if (currentPath && includeGlobalWebPageForPath(path)) {
    const pageUrl = absoluteUrl(origin, path === '/' ? '' : path)
    graph.push({
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: pageTitleForPath(path),
      isPartOf: { '@id': websiteId },
      about: { '@id': businessId },
      publisher: { '@id': orgId },
      inLanguage: 'fr-FR',
    })
  }

  return {
    '@context': CTX,
    '@graph': graph,
  }
}

interface BlogPostingInput {
  origin: string
  siteName: string
  practitionerName: string
  pub: Publication
  pageUrl: string
}

export function buildBlogPostingJsonLd(input: BlogPostingInput): Record<string, unknown> {
  const { origin, siteName, practitionerName, pub, pageUrl } = input
  const image = pub.coverImage ? absoluteUrl(origin, pub.coverImage) : undefined
  const datePublished = `${pub.date}T12:00:00+01:00`
  const websiteId = `${origin}/#website`
  const webpageId = `${pageUrl}#webpage`
  const articleId = `${pageUrl}#article`

  const webPage: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': webpageId,
    url: pageUrl,
    name: pub.title,
    description: pub.excerpt,
    isPartOf: { '@id': websiteId },
    mainEntity: { '@id': articleId },
    inLanguage: 'fr-FR',
  }

  const article: Record<string, unknown> = {
    '@type': 'BlogPosting',
    '@id': articleId,
    headline: pub.title,
    description: pub.excerpt,
    datePublished,
    dateModified: datePublished,
    inLanguage: 'fr-FR',
    mainEntityOfPage: { '@id': webpageId },
    author: {
      '@type': 'Person',
      name: practitionerName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: origin,
    },
    isPartOf: {
      '@type': 'Blog',
      name: `Blog — ${siteName}`,
      url: `${origin}/publications`,
    },
  }
  if (image) {
    article.image = [image]
  }

  return {
    '@context': CTX,
    '@graph': [webPage, article],
  }
}

export function buildBreadcrumbJsonLd(
  origin: string,
  items: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    '@context': CTX,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(origin, it.path),
    })),
  }
}
