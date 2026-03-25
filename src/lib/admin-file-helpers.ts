// src/lib/admin-file-helpers.ts — import fichiers (images, textes) pour l’admin
export const MAX_IMAGE_BYTES = 1_500_000

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(String(r.result))
    r.onerror = () => reject(r.error)
    r.readAsDataURL(file)
  })
}

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(String(r.result))
    r.onerror = () => reject(r.error)
    r.readAsText(file, 'UTF-8')
  })
}

/** Découpe un texte rédigé à l’avance : paragraphes séparés par une ligne vide ; sinon une ligne = un paragraphe. */
export function parseArticleBodyFromText(raw: string): string[] {
  const normalized = raw.replace(/\r\n/g, '\n').trim()
  if (!normalized) return ['']
  const byBlank = normalized
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
  if (byBlank.length > 1) return byBlank
  const one = byBlank[0] ?? ''
  if (one.includes('\n')) {
    return one
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
  }
  return [one]
}

