// src/data/media.ts — chemins vers les médias dans `public/images/`
const T = 'témoignages'

export const media = {
  /** Hero page d’accueil */
  heroSession: '/images/camille1.jpeg',
  /** Page Cabinet — section hypnose (accompagnement tabac) */
  programmeLuxoHypnoHeader: '/images/camille_tabac.jpeg',
  /** Appareil de luxopuncture — section accueil « méthode en trois temps » */
  machineLuxo: '/images/machine_luxo.jpeg',
  /** Section accueil « ce que vous pouvez en attendre » */
  cookiesPub: '/images/Photo%20cookies%20pub.jpg',
  /** Page programme détox — en-tête (photo cookies / présentation) */
  detoxProgramHero: '/images/Photo%20cookies%20pub.jpg',
  /** Page programme À distance — bloc « Un accompagnement à distance… » (visio) */
  detoxVisio: '/images/camille7.jpeg',
  /** Page programme détox — section « Ce que ce programme peut vous apporter » */
  detoxWellbeing: '/images/sérénité.webp',
  /** Page programme détox — carnet / suivi */
  detoxNotebook: '/images/séance_découverte_offerte.jpeg',
  tarifs: '/images/séance_découverte_offerte.jpeg',
  agenda: '/images/agenda.jpeg',
  /** Section accueil témoignages — présentation luxopuncture */
  presentationLuxopuncture: '/images/présentation_luxopuncture.mp4',
} as const

/** Visuels tuiles « PROGRAMME … » — page Cabinet uniquement (`public/images/cabinet/`) */
export const cabinetProgramCardImages: Record<string, string> = {
  poids: '/images/cabinet/programme_perte_de_poid_accueil.png',
  stress: '/images/cabinet/programme_relaxation_accueil.png',
  menopause: '/images/cabinet/programme_menopause_accueil.png',
  tabac: '/images/cabinet/programme_tabac_accueil.png',
}

export function getCabinetProgramCardImage(slug: string, fallback: string): string {
  return cabinetProgramCardImages[slug] ?? fallback
}

/** Photos cabinet / séances — page Cabinet (section hypnose) */
export const cabinetAmbianceImages: readonly { src: string; alt: string }[] = [
  { src: '/images/cabinet1.jpeg', alt: 'Le cabinet — espace d’accueil' },
  { src: '/images/perte_poid.jpeg', alt: 'Accompagnement perte de poids au cabinet' },
  { src: '/images/camille4.jpeg', alt: 'Camille — séance au cabinet' },
]

/** Photos page Cabinet — section La luxopuncture */
export const luxopunctureCabinetPhotos: readonly { src: string; alt: string }[] = [
  { src: '/images/camille6.jpeg', alt: 'Camille — luxopuncture au cabinet' },
  { src: '/images/camille_séance.jpeg', alt: 'Séance de luxopuncture au cabinet' },
  { src: '/images/camille_séance2.jpeg', alt: 'Accompagnement luxopuncture — séance' },
]

/** Visuel à côté de « Pour quelles problématiques ? » — page Cabinet */
export const luxopunctureForWhatImage = {
  src: '/images/img1.jpeg',
  alt: 'Illustration — accompagnement luxopuncture au cabinet',
} as const

/** Illustrations explicatives — incluses dans le carrousel page Luxopuncture */
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
