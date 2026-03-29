// src/pages/publication-detail-page.tsx
import { useMemo } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useSiteData } from '../hooks/use-admin'
import { formatPublicationDate, getPublicationBySlug } from '../data/publications'
import { RevealOnScroll, SectionAtmosphere, SectionDivider } from '../components/editorial'
import { JsonLd } from '../components/seo/json-ld'
import { usePageTitle } from '../hooks/use-page-title'
import { buildBlogPostingJsonLd, buildBreadcrumbJsonLd, siteOrigin } from '../lib/schema-org'

export function PublicationDetailPage() {
  const { slug } = useParams()
  const location = useLocation()
  const { publications, site, aboutPage } = useSiteData()
  const pub = slug ? getPublicationBySlug(slug, publications) : undefined

  usePageTitle(pub?.title ?? 'Blog')

  const articleLd = useMemo(() => {
    if (!pub) return null
    const origin = siteOrigin(site)
    const pageUrl = `${origin}${location.pathname}`
    return buildBlogPostingJsonLd({
      origin,
      siteName: site.name,
      practitionerName: aboutPage.name,
      pub,
      pageUrl,
    })
  }, [pub, site, aboutPage.name, location.pathname])

  const breadcrumbLd = useMemo(() => {
    if (!pub) return null
    const origin = siteOrigin(site)
    return buildBreadcrumbJsonLd(origin, [
      { name: 'Accueil', path: '/' },
      { name: 'Blog', path: '/publications' },
      { name: pub.title, path: location.pathname },
    ])
  }, [pub, site, location.pathname])

  if (!pub) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Article introuvable</h1>
        <Link to="/publications" className="mt-6 inline-block text-[var(--color-cta-hover)] hover:underline">
          Retour au blog
        </Link>
      </div>
    )
  }

  return (
    <article className="bg-transparent">
      {articleLd ? <JsonLd data={articleLd} /> : null}
      {breadcrumbLd ? <JsonLd data={breadcrumbLd} /> : null}
      <SectionAtmosphere variant="soft" placement="both">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
          <RevealOnScroll variant="fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">Blog</p>
            <time
              dateTime={pub.date}
              className="mt-3 block text-sm font-medium text-[var(--color-body)]/80"
            >
              {formatPublicationDate(pub.date)}
            </time>
            <h1 className="mt-4 font-display text-3xl font-semibold text-[var(--color-ink)] sm:text-4xl">{pub.title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-body)]/95">{pub.excerpt}</p>
          </RevealOnScroll>

          {pub.coverImage ? (
            <RevealOnScroll variant="scale">
              <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)] shadow-sm">
                <img
                  src={pub.coverImage}
                  alt={pub.title}
                  className="h-auto w-full object-contain object-center"
                  width={1200}
                  height={800}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </RevealOnScroll>
          ) : null}

          <div className="mt-10 space-y-6 text-base leading-relaxed text-[var(--color-body)]/95">
            {pub.body.map((para, i) => (
              <RevealOnScroll key={i} variant={i % 2 === 0 ? 'fade-up' : 'fade'}>
                <p>{para}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </SectionAtmosphere>

      <SectionDivider />

      <SectionAtmosphere variant="medium" placement="diagonal">
        <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:pb-24">
          <RevealOnScroll variant="fade-up">
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex rounded-full bg-[var(--color-cta)] px-6 py-3 text-sm font-bold text-[var(--color-on-cta)] shadow-sm transition hover:bg-[var(--color-cta-hover)] hover:text-white"
              >
                Prendre rendez-vous
              </Link>
              <Link
                to="/publications"
                className="inline-flex rounded-full border border-[var(--color-brand)]/30 px-6 py-3 text-sm font-semibold text-[var(--color-ink)]"
              >
                Autres articles
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </SectionAtmosphere>
    </article>
  )
}
