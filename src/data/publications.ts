// src/data/publications.ts — articles & billets (Camille)
export interface Publication {
  slug: string
  title: string
  /** ISO YYYY-MM-DD (tri et affichage) */
  date: string
  excerpt: string
  body: string[]
  /** Optionnel — carte liste et bandeau article */
  coverImage?: string
}

const MONTHS_FR = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
] as const

export function formatPublicationDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number)
  if (!y || !m || !d) return isoDate
  return `${d} ${MONTHS_FR[m - 1]} ${y}`
}

export const defaultPublications: Publication[] = [
  {
    slug: 'luxopuncture-rythme-quotidien',
    date: '2025-03-10',
    title: 'La luxopuncture au service du rythme quotidien',
    excerpt:
      'Comment une approche douce peut accompagner stress, sommeil et habitudes sans contrainte extrême.',
    body: [
      'La luxopuncture s’inscrit souvent dans un parcours où le corps retrouve progressivement de la régulation. Sans aiguille, la stimulation par lumière permet de travailler des points réflexes dans un cadre posé.',
      'Ce qui compte, ce n’est pas la promesse d’un miracle en une séance, mais la cohérence avec votre quotidien : sommeil, mouvement, alimentation et gestion du stress se répondent.',
      'Chaque protocole est ajusté après échange : objectifs réalistes, séances espacées selon votre ressenti, et petits repères entre les rendez-vous pour ancrer les changements.',
    ],
    coverImage: '/images/camille1.jpeg',
  },
  {
    slug: 'accompagnement-perte-de-poids',
    date: '2025-02-18',
    title: 'Perte de poids : l’accompagnement avant la technique',
    excerpt:
      'Pourquoi le bilan et la régularité comptent autant que le protocole lui-même.',
    body: [
      'La perte de poids durable repose rarement sur une seule méthode isolée. L’accompagnement commence par un bilan : historique, contraintes de vie, rythme souhaité.',
      'La luxopuncture peut soutenir la régulation et la gestion des envies, en complément d’habitudes alimentaires et de mouvement adaptées à votre réalité.',
      'L’important est de éviter le tout ou rien : des ajustements progressifs, un suivi dans le temps, et la bienveillance envers les phases de plateau.',
    ],
  },
]

export function getPublicationBySlug(slug: string, items: Publication[]): Publication | undefined {
  return items.find((p) => p.slug === slug)
}

export function listPublicationsNewestFirst(items: Publication[]): Publication[] {
  return [...items].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}
