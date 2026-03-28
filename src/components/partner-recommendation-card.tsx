// src/components/partner-recommendation-card.tsx
import type { PartenariatPartnerCard } from '../lib/admin-types'
import { PartnerSocialRow } from './partner-social-row'

function RichParagraph({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <p className="text-sm leading-relaxed text-[var(--color-body)]/95">
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-semibold text-[var(--color-ink)]">
              {part.slice(2, -2)}
            </strong>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </p>
  )
}

interface PartnerRecommendationCardProps {
  partner: PartenariatPartnerCard
}

export function PartnerRecommendationCard({ partner }: PartnerRecommendationCardProps) {
  const { name, role, paragraphs, images, websiteUrl, websiteLabel, socials } = partner

  return (
    <article className="overflow-hidden rounded-2xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)] shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-stretch">
        <div className="bg-[var(--color-surface-rose)]/50 p-4 sm:p-6 lg:min-h-[16rem]">
          {images.length === 1 ? (
            <figure className="h-full overflow-hidden rounded-xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)]">
              <img
                src={images[0].src}
                alt={images[0].alt}
                width={800}
                height={1000}
                className="h-full max-h-[min(28rem,70vh)] w-full object-cover object-center lg:max-h-none lg:min-h-[18rem]"
                loading="lazy"
              />
            </figure>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {images.map((im) => (
                <figure
                  key={im.src}
                  className="overflow-hidden rounded-xl border border-[var(--color-brand)]/10 bg-[var(--color-surface)]"
                >
                  <img
                    src={im.src}
                    alt={im.alt}
                    width={600}
                    height={750}
                    className="aspect-[4/5] h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center gap-5 p-6 sm:p-8">
          <header>
            <h2 className="font-display text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">{name}</h2>
            <p className="mt-2 text-sm font-medium text-[var(--color-brand)]">{role}</p>
          </header>
          <div className="space-y-4">
            {paragraphs.map((para, idx) => (
              <RichParagraph key={`${partner.id}-p-${idx}`} text={para} />
            ))}
          </div>
          <PartnerSocialRow
            websiteUrl={websiteUrl}
            websiteLabel={websiteLabel}
            socials={socials}
            nameForLabel={name}
          />
        </div>
      </div>
    </article>
  )
}
