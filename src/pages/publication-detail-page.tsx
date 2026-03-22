// src/pages/publication-detail-page.tsx
import { Link, useParams } from 'react-router-dom'
import { useSiteData } from '../contexts/admin-context'
import { formatPublicationDate, getPublicationBySlug } from '../data/publications'
import { usePageTitle } from '../hooks/use-page-title'

export function PublicationDetailPage() {
  const { slug } = useParams()
  const { publications } = useSiteData()
  const pub = slug ? getPublicationBySlug(slug, publications) : undefined

  usePageTitle(pub?.title ?? 'Publication')

  if (!pub) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Article introuvable</h1>
        <Link to="/publications" className="mt-6 inline-block text-[var(--color-cta-hover)] hover:underline">
          Retour aux publications
        </Link>
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">Publication</p>
      <time
        dateTime={pub.date}
        className="mt-3 block text-sm font-medium text-[var(--color-body)]/80"
      >
        {formatPublicationDate(pub.date)}
      </time>
      <h1 className="mt-4 font-display text-3xl font-semibold text-[var(--color-ink)] sm:text-4xl">{pub.title}</h1>
      <p className="mt-6 text-lg leading-relaxed text-[var(--color-body)]/95">{pub.excerpt}</p>

      {pub.coverImage ? (
        <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-beige)] shadow-sm">
          <img
            src={pub.coverImage}
            alt=""
            className="h-auto w-full object-contain object-center"
            width={1200}
            height={800}
            loading="eager"
            decoding="async"
          />
        </div>
      ) : null}

      <div className="mt-10 space-y-6 text-base leading-relaxed text-[var(--color-body)]/95">
        {pub.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap gap-4">
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
          Autres publications
        </Link>
      </div>
    </article>
  )
}
