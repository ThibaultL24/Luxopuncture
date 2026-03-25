// src/pages/publications-page.tsx
import { ArrowRight, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSiteData } from '../contexts/admin-context'
import { formatPublicationDate, listPublicationsNewestFirst } from '../data/publications'
import { SectionHeading } from '../components/ui/section-heading'
import { usePageTitle } from '../hooks/use-page-title'

export function PublicationsPage() {
  usePageTitle('Publications')
  const { publications } = useSiteData()
  const items = listPublicationsNewestFirst(publications)

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <SectionHeading
        title="Publications"
        subtitle="Articles et notes — actualités et éclairages sur la luxopuncture et le bien-être."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {items.map((p) => (
          <article
            key={p.slug}
            className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
          >
            {p.coverImage ? (
              <div className="aspect-[16/10] overflow-hidden bg-[var(--color-beige)]">
                <img
                  src={p.coverImage}
                  alt=""
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="flex aspect-[16/10] flex-col items-center justify-center gap-2 border-b border-[var(--color-brand)]/10 bg-[var(--color-beige)] text-[var(--color-body)]/50">
                <BookOpen className="h-10 w-10 shrink-0" aria-hidden />
                <span className="text-xs font-medium uppercase tracking-wide">Image à venir</span>
              </div>
            )}
            <div className="flex flex-1 flex-col p-8">
              <time
                dateTime={p.date}
                className="text-xs font-medium uppercase tracking-wide text-[var(--color-body)]/70"
              >
                {formatPublicationDate(p.date)}
              </time>
              <h2 className="mt-2 font-display text-xl font-semibold text-[var(--color-ink)] sm:text-2xl">{p.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-body)]/90">{p.excerpt}</p>
              <Link
                to={`/publications/${p.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-cta-hover)] underline-offset-4 hover:underline"
              >
                Lire l’article
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
