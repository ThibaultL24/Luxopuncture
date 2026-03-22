// src/data/media.ts — chemins vers les médias dans `public/images/`
const T = 'témoignages'

export const media = {
  /** Hero page d’accueil */
  heroSession: '/images/camille1.jpeg',
  /** Bandeau page liste Programmes — luxothérapeute & hypnothérapeute */
  programmeLuxoHypnoHeader: '/images/luxotherapeute-hypnotherapeute.png',
  /** Appareil de luxopuncture — section accueil « méthode en trois temps » */
  machineLuxo: '/images/machine_luxo.jpeg',
  /** Section accueil « ce que vous pouvez en attendre » */
  cookiesPub: '/images/Photo%20cookies%20pub.jpg',
  tarifs: '/images/séance_découverte_offerte.jpeg',
  agenda: '/images/agenda.jpeg',
  camilleContact: '/images/camille2.jpeg',
} as const

/** Page Luxopuncture — série « explication » (alternance gauche / droite) */
export const luxopunctureExplanationImages: readonly { src: string; alt: string }[] = [
  { src: '/images/luxopuncture-explication.jpeg', alt: 'Illustration explicative — la luxopuncture (1/5)' },
  { src: '/images/luxopuncture-explication2.jpeg', alt: 'Illustration explicative — la luxopuncture (2/5)' },
  { src: '/images/luxopuncture-explication3.jpeg', alt: 'Illustration explicative — la luxopuncture (3/5)' },
  { src: '/images/luxopuncture-explication4.jpeg', alt: 'Illustration explicative — la luxopuncture (4/5)' },
  { src: '/images/luxopuncture-explication5.jpeg', alt: 'Illustration explicative — la luxopuncture (5/5)' },
]

/** Photo page À propos */
export const aboutPagePhoto = {
  src: '/images/camille3.jpeg',
  alt: 'Camille, luxothérapeute',
} as const

/** Vidéos témoignages (dossier `public/images/témoignages/`) */
export const testimonialVideoFiles: readonly string[] = [
  'WhatsApp Video 2026-03-22 at 21.24.50.mp4',
  'WhatsApp Video 2026-03-22 at 21.24.50 (1).mp4',
  'WhatsApp Video 2026-03-22 at 21.24.50 (2).mp4',
  'WhatsApp Video 2026-03-22 at 21.24.50 (3).mp4',
  'WhatsApp Video 2026-03-22 at 21.24.50 (4).mp4',
  'WhatsApp Video 2026-03-22 at 21.24.50 (5).mp4',
  'WhatsApp Video 2026-03-22 at 21.24.50 (6).mp4',
  'WhatsApp Video 2026-03-22 at 21.24.51.mp4',
  'WhatsApp Video 2026-03-22 at 21.24.51 (1).mp4',
  'WhatsApp Video 2026-03-22 at 21.24.51 (2).mp4',
  'WhatsApp Video 2026-03-22 at 21.24.51 (3).mp4',
  'WhatsApp Video 2026-03-22 at 21.24.51 (4).mp4',
  'WhatsApp Video 2026-03-22 at 21.24.51 (5).mp4',
  'WhatsApp Video 2026-03-22 at 21.24.51 (6).mp4',
]

export function testimonialVideoSrc(filename: string): string {
  return `/images/${encodeURIComponent(T)}/${encodeURIComponent(filename)}`
}
