// src/components/seo/json-ld.tsx
interface JsonLdProps {
  data: Record<string, unknown>
}

/** Données structurées Schema.org (JSON-LD) pour Google / Bing. */
export function JsonLd({ data }: JsonLdProps) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
