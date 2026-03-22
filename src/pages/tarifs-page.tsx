// src/pages/tarifs-page.tsx
import { Link } from 'react-router-dom'
import { useSiteData } from '../contexts/admin-context'
import { pageIllustrations } from '../data/site-content'
import { PageIllustration } from '../components/ui/page-illustration'
import { SectionHeading } from '../components/ui/section-heading'
import { usePageTitle } from '../hooks/use-page-title'

export function TarifsPage() {
  usePageTitle('Tarifs')
  const { pricingRows } = useSiteData()
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
      <SectionHeading title="Tarifs" />
      <PageIllustration
        src={pageIllustrations.tarifs.src}
        alt={pageIllustrations.tarifs.alt}
        caption={pageIllustrations.tarifs.caption}
      />
      <div className="overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-[var(--color-beige)] text-[var(--color-ink)]">
            <tr>
              <th className="px-6 py-4 font-semibold">Prestation</th>
              <th className="px-6 py-4 font-semibold">Prix</th>
              <th className="hidden px-6 py-4 font-semibold sm:table-cell">Remarque</th>
            </tr>
          </thead>
          <tbody>
            {pricingRows.map((row) => (
                <tr key={row.label} className="border-t border-[var(--color-brand)]/10">
                <td className="px-6 py-4 font-medium text-[var(--color-ink)]">{row.label}</td>
                <td className="px-6 py-4 font-semibold text-[var(--color-cta-hover)]">{row.price}</td>
                <td className="hidden px-6 py-4 text-[var(--color-body)]/90 sm:table-cell">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link
        to="/contact"
        className="mt-10 inline-flex rounded-full bg-[var(--color-cta)] px-6 py-3 text-sm font-bold text-[var(--color-on-cta)] shadow-sm transition hover:bg-[var(--color-cta-hover)] hover:text-white"
      >
        Demander un rendez-vous
      </Link>
    </div>
  )
}
