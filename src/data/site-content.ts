// src/data/site-content.ts
import { media } from './media'
import type { LucideIcon } from 'lucide-react'
import {
  CigaretteOff,
  Heart,
  Moon,
  Scale,
  Sparkles,
  Waves,
} from 'lucide-react'

export interface Service {
  slug: string
  title: string
  goal: string
  benefits: string[]
  duration?: string
  intro: string
  /** Visuel carte liste (aperçu) — en général identique au 1ᵉʳ visuel de detailGallery */
  coverImage: string
  /** Tous les visuels page détail (ordre), affichés en entier */
  detailGallery?: readonly { src: string; alt: string }[]
}

export interface ProblemItem {
  title: string
  description: string
  icon: LucideIcon
}

export interface MethodStep {
  title: string
  description: string
}

export interface HormoneEffect {
  name: 'dopamine' | 'serotonine' | 'endorphine' | 'melatonine'
  role: string
}

export interface Testimonial {
  name: string
  content: string
  rating: number
}

export const site = {
  name: 'Laplace Luxopuncture',
  tagline: 'Retrouvez votre équilibre naturellement',
  domain: 'laplaceluxopuncture.fr',
} as const

/** Bandeaux photo par page (fichiers dans `public/images/`). */
export const pageIllustrations = {
  tarifs: {
    src: media.tarifs,
    alt: 'Séance découverte et accompagnement',
    caption: 'Des formules claires pour avancer sereinement.',
  },
} as const

export const heroCopy = {
  title: 'Retrouvez votre équilibre naturellement',
  subtitle:
    'Une méthode douce, sans aiguilles, pour réguler votre corps et retrouver un bien-être durable.',
  ctaPrimary: 'Prendre rendez-vous',
  ctaSecondary: 'Découvrir la luxopuncture',
} as const

export const luxopunctureDefinition = {
  title: 'La luxopuncture, c’est quoi ?',
  paragraphs: [
    'La luxopuncture est une technique de stimulation des points réflexes à l’aide de lumière infrarouge. Elle s’appuie sur les principes de l’acupuncture, mais sans recours aux aiguilles, ce qui la rend accessible à ceux qui souhaitent éviter toute pénétration de la peau. Contrairement à l’acupuncture classique, la luxopuncture utilise un faisceau lumineux pour agir sur les points énergétiques identifiés par la médecine traditionnelle chinoise.',
    'La définition de la luxopuncture repose sur cette approche douce : encourager le bien-être général en favorisant la gestion des émotions et l’équilibre énergétique. Chaque point est choisi en fonction des besoins spécifiques de la personne, dans un cadre non invasif et sans dangers liés aux aiguilles.',
    'Cette pratique attire particulièrement les personnes sensibles aux méthodes plus classiques ou recherchant une alternative confortable pour explorer leur mieux-être.',
  ],
} as const

export const problems: ProblemItem[] = [
  {
    title: 'Perte de poids',
    description:
      'Accompagnement pour retrouver un métabolisme plus équilibré et des habitudes durables.',
    icon: Scale,
  },
  {
    title: 'Tabac',
    description:
      'Soutien à l’arrêt du tabac en agissant sur les mécanismes de récompense et le stress.',
    icon: CigaretteOff,
  },
  {
    title: 'Stress & anxiété',
    description:
      'Aide à apaiser le système nerveux et à retrouver de la disponibilité mentale.',
    icon: Waves,
  },
  {
    title: 'Sommeil',
    description:
      'Objectif : cycles plus réguliers et récupération de meilleure qualité.',
    icon: Moon,
  },
]

export const methodSteps: MethodStep[] = [
  {
    title: 'Bilan',
    description:
      'Échange sur votre histoire, vos objectifs et votre mode de vie pour personnaliser la séance.',
  },
  {
    title: 'Stimulation',
    description:
      'Application ciblée du faisceau sur les zones et points choisis selon votre profil.',
  },
  {
    title: 'Régulation',
    description:
      'La séance favorise l’autorégulation : effets ressentis souvent dans les jours qui suivent.',
  },
]

export const hormoneEffects: HormoneEffect[] = [
  {
    name: 'dopamine',
    role: 'Motivation, plaisir et gestion des habitudes (dont dépendances légères).',
  },
  {
    name: 'serotonine',
    role: 'Humeur, apaisement et équilibre émotionnel.',
  },
  {
    name: 'endorphine',
    role: 'Soulagement naturel, mieux-être global.',
  },
  {
    name: 'melatonine',
    role: 'Rythme veille-sommeil et récupération nocturne.',
  },
]

export const testimonials: Testimonial[] = [
  {
    name: 'Claire M.',
    rating: 5,
    content:
      'Accueil très humain, explications claires. J’ai retrouvé un sommeil plus stable après quelques séances.',
  },
  {
    name: 'Thomas L.',
    rating: 5,
    content:
      'Approche douce et structurée. Le suivi m’a aidé à tenir mes objectifs sans culpabiliser.',
  },
  {
    name: 'Sophie R.',
    rating: 5,
    content:
      'Je recommande pour la qualité d’écoute et la sensation de lâcher-prise après la séance.',
  },
]

export const services: Service[] = [
  {
    slug: 'poids',
    title: 'Perte de poids',
    goal: 'Soutenir une perte de poids progressive et durable, en travaillant sur l’équilibre métabolique et les automatismes.',
    intro:
      'La séance s’inscrit dans une démarche globale (alimentation, mouvement, sommeil) définie avec vous.',
    benefits: [
      'Réduction des envies compulsives',
      'Meilleure gestion du stress lié au poids',
      'Accompagnement motivationnel',
    ],
    duration: 'Environ 45 à 60 min',
    coverImage: '/images/programme_perte_de_poid.jpeg',
    detailGallery: [
      { src: '/images/programme_perte_de_poid.jpeg', alt: 'Programme perte de poids — visuel 1' },
      { src: '/images/programme_perte_de_poid2.jpeg', alt: 'Programme perte de poids — visuel 2' },
    ],
  },
  {
    slug: 'tabac',
    title: 'Arrêt du tabac',
    goal: 'Diminuer la dépendance physique et mentale à la nicotine et faciliter le sevrage.',
    intro:
      'Un protocole personnalisé, avec suivi des étapes clés du sevrage.',
    benefits: [
      'Réduction des sensations de manque',
      'Meilleure gestion du stress',
      'Renforcement de la motivation',
    ],
    duration: 'Environ 45 à 60 min',
    coverImage: '/images/programme_tabac.jpeg',
    detailGallery: [
      { src: '/images/programme_tabac.jpeg', alt: 'Programme arrêt du tabac — visuel 1' },
      { src: '/images/programme_tabac2.jpeg', alt: 'Programme arrêt du tabac — visuel 2' },
    ],
  },
  {
    slug: 'stress',
    title: 'Stress & anxiété',
    goal: 'Aider le corps à retrouver un état de calme et de régulation du système nerveux.',
    intro:
      'Utile en période de surcharge, d’hyper-réactivité ou de tensions persistantes.',
    benefits: [
      'Apaisement ressenti',
      'Sommeil souvent amélioré',
      'Meilleure concentration',
    ],
    duration: 'Environ 45 min',
    coverImage: '/images/programme_relaxation.jpeg',
    detailGallery: [
      { src: '/images/programme_relaxation.jpeg', alt: 'Programme relaxation — visuel 1' },
      { src: '/images/programme_relaxation2.jpeg', alt: 'Programme relaxation — visuel 2' },
      { src: '/images/programme_relaxation3.jpeg', alt: 'Programme relaxation — visuel 3' },
    ],
  },
  {
    slug: 'menopause',
    title: 'Ménopause',
    goal: 'Accompagner les manifestations liées à la périménopause et à la ménopause (bouffées, humeur, sommeil).',
    intro:
      'Approche individualisée selon vos symptômes et votre rythme de vie.',
    benefits: [
      'Meilleur confort au quotidien',
      'Soutien émotionnel',
      'Sommeil et énergie retravaillés',
    ],
    duration: 'Environ 45 à 60 min',
    coverImage: '/images/programme_bien_être_ménopause.jpeg',
    detailGallery: [
      { src: '/images/programme_bien_être_ménopause.jpeg', alt: 'Programme ménopause — visuel 1' },
      { src: '/images/programme_ménopause2.jpeg', alt: 'Programme ménopause — visuel 2' },
      { src: '/images/programme_ménopause3.jpeg', alt: 'Programme ménopause — visuel 3' },
    ],
  },
]

export const pricingRows = [
  { label: 'Séance en présentiel', price: '55 €', note: 'Au cabinet' },
  { label: 'Séance à distance', price: '45 €', note: 'À distance' },
  { label: 'Cure détox 21 jours', price: '190 €', note: 'Programme sur 21 jours' },
] as const

export const aboutPractitioner = {
  title: 'Votre praticienne',
  name: 'Camille Rombière',
  bio: [
    'Perte de poids durable, arrêt du tabac, gestion du stress, transit, sommeil, ménopause, ou encore stress chez les enfants dès 7 ans : nombreux sont les parcours qui patinent lorsque les approches sont trop agressives, peu efficaces, ou lorsqu’elles ne prennent pas en compte l’équilibre global du corps et des émotions.',
    'Vous visez des résultats mesurables et durables : un corps moins gonflé, un esprit plus apaisé, une humeur plus stable, moins de compulsions et d’inflammations, plus d’énergie. Vous souhaitez être accompagné·e sans jugement, avec douceur, par une praticienne qui comprend votre rythme et reste présente entre les séances — une approche sérieuse, à votre rythme, sans pression inutile.',
    'Luxothérapeute et hypnothérapeute depuis 2019, j’ai accompagné plusieurs centaines de personnes. À titre d’exemples : perte de poids notable en quelques mois (souvent 10–12 kg chez les femmes, 12–15 kg chez les hommes selon les profils), environ 95 % d’arrêt du tabac en 3 jours, 90,5 % de satisfaction en ménopause, ainsi qu’un meilleur sommeil, une meilleure digestion, moins de stress et moins de compulsions.',
    'J’utilise la luxothérapie (non invasive), l’hypnose en option, un rééquilibrage alimentaire et métabolique, des conseils adaptés et un suivi humain et continu — y compris à distance pour certains programmes, dont le programme détox à distance.',
    'Des témoignages vidéo sont disponibles sur Instagram, LinkedIn et Facebook. La luxothérapie n’est pas indiquée en cas de grossesse ni d’épilepsie ; un accompagnement à distance peut toutefois être envisagé selon votre situation.',
    'Pour échanger, vous pouvez me contacter sur LinkedIn, Instagram, Facebook, WhatsApp ou via ce site. La prise de rendez-vous se fait uniquement par téléphone, pour un entretien clair et personnalisé. Je vous reçois en cabinet à Avignon pour l’ensemble de mes accompagnements ; le programme détox se déroule aussi entièrement à distance.',
  ],
  credentials: [
    'Luxothérapeute et hypnothérapeute (depuis 2019)',
    'Luxothérapie non invasive, hypnose en option, rééquilibrage alimentaire et métabolique',
    'Suivi en présentiel à Avignon et accompagnement à distance selon les programmes',
  ],
} as const

export const contactInfo = {
  phone: '07 67 28 64 72',
  email: 'laplace.luxopuncture@gmail.com',
  address: 'Cabinet à Avignon — accompagnements sur place ; programme détox à distance possible',
  hours: 'Prise de rendez-vous uniquement par téléphone : lun–ven 9h–20h, sam 9h–18h',
} as const

export const socialLinks = {
  facebook: 'https://www.facebook.com/share/1EFxjFLqUv/',
  instagram: 'https://www.instagram.com/laplace.luxopuncture?igsh=eGs0aDk4dHZsNDFr',
  linkedin: 'https://www.linkedin.com/in/camille-laplace-843a66147/',
  whatsapp: 'https://wa.me/33767286472',
} as const

export const bookingCta = {
  text: 'Prêt·e à franchir le pas ? Réservez votre créneau dès maintenant.',
  button: 'Contacter le cabinet',
} as const

export function getServiceBySlug(slug: string, list: Service[]): Service | undefined {
  return list.find((s) => s.slug === slug)
}

export const mechanismCopy = {
  title: 'Mécanisme d’action',
  text: 'La stimulation lumineuse sollicite des zones réflexes reconnues ; la réponse est progressive et s’inscrit dans le temps. Les effets varient selon les personnes.',
} as const

export const physiologicalTitle = 'Effets physiologiques fréquemment évoqués'

export const benefitsSection = {
  title: 'Ce que vous pouvez en attendre',
  items: [
    { title: 'Non invasif', description: 'Sans aiguille, adapté à de nombreux profils.', icon: Sparkles },
    { title: 'Personnalisé', description: 'Protocole ajusté après échange et suivi.', icon: Waves },
    { title: 'Cadre posé', description: 'Temps d’écoute et séances à rythme humain.', icon: Heart },
  ],
} as const
