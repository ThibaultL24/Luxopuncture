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
  },
} as const

export const heroCopy = {
  eyebrow: 'Programme à distance',
  title: 'Détox 21 jours',
  subtitle:
    'Retrouvez un corps plus léger, moins de fringales et plus d’énergie en 21 jours\n\nUn programme détox à distance pour rééquilibrer votre corps en douceur.',
  ctaPrimary: 'Prendre rendez-vous',
  ctaSecondary: '👉 Découvrir le programme à distance',
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

/** Conservé pour l’admin / import JSON ; l’affichage public utilise les images `public/images/avis_site/`. */
export const testimonials: Testimonial[] = []

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
    title: 'Relaxation & gestion du stress',
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

/** Page Tarifs — structure détaillée (spec Camille). */
export const tarifsPageSpec = {
  distanceTitle: 'Programme à distance',
  detox: {
    label: 'À distance',
    price: '190 €',
    includes: [
      'un bilan initial offert',
      '4 séances de suivi',
      'un accompagnement tout au long du programme',
      'des conseils et contenus personnalisés',
    ],
  },
  suivi: {
    label: 'Séance de suivi à distance',
    price: '45 €',
    conditions: [
      'réservée aux personnes ayant déjà réalisé le programme détox',
      'ou dans le cadre d’un accompagnement en cours',
    ],
    note: 'Elle permet de prolonger et consolider les résultats.',
  },
  cabinetTitle: 'Séances au cabinet',
  cabinetRows: [
    {
      label: 'Luxopuncture',
      price: '55 € la séance',
      note:
        'Les accompagnements se font généralement sous forme de programme, avec un nombre de séances adapté selon l’objectif (perte de poids, arrêt du tabac, relaxation, ménopause…).',
    },
    { label: 'Hypnose', price: '70 € la séance', note: '' },
    {
      label: 'Luxopuncture + hypnose',
      price: '80 €',
      note: 'Une approche complémentaire permettant de travailler à la fois sur le corps et sur les mécanismes plus profonds.',
    },
  ],
  infosTitle: 'Informations complémentaires',
  infosLines: [
    'Les accompagnements sont personnalisés',
    'Le nombre de séances est défini en fonction de votre objectif',
    'Pour toute question, possibilité de contacter directement',
  ],
} as const

export const aboutPractitioner = {
  title: 'Votre praticienne',
  name: 'Camille Laplace',
  bio: [
    'Praticienne depuis 2019, formée à la luxothérapie, j’accompagne depuis plusieurs années des personnes vers un mieux-être durable.',
    'C’est dans cette démarche que je me suis formée à l’accompagnement autour de l’alimentation et du rééquilibrage, afin d’avoir une approche plus complète.',
    'Au fil de mon parcours, j’ai ressenti le besoin d’aller encore plus loin dans ma pratique, pour mieux comprendre ce qui se joue derrière certaines difficultés. C’est ainsi que l’hypnose est venue naturellement dans un second temps.',
    'Elle me permet aujourd’hui d’accompagner plus en profondeur certains blocages, comportements ou mécanismes émotionnels.',
    'Je continue aujourd’hui à me former régulièrement, avec toujours cette même intention : vous proposer un accompagnement juste, adapté, et qui respecte votre rythme.',
    'Pour vous donner un aperçu concret de mon accompagnement, voici quelques exemples et résultats :',
  ],
  credentials: [
    'Luxothérapeute et hypnothérapeute (depuis 2019)',
    'Luxothérapie, hypnose, accompagnement alimentaire et rééquilibrage',
    'Cabinet à Avignon — programme détox à distance possible',
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
  text: 'Prêt·e à franchir le pas ? Réservez votre bilan offert (1h en visio).',
  button: 'Réserver votre bilan offert',
} as const

/** Accueil — textes Camille (notes site). */
export const homeCopy = {
  hook: {
    lead: 'Vous avez l’impression de faire attention…',
    question: 'mais votre corps ne suit plus ?',
    symptoms: 'Fatigue, ventre gonflé, envies de sucre…',
    closing: 'Parfois, le corps a simplement besoin d’être rééquilibré.',
  },
  detoxSolution: {
    intro: 'C’est là qu’intervient la détox.',
    subtitle: 'Un programme simple et progressif pour :',
    bullets: [
      'retrouver plus de légèreté',
      'diminuer les fringales',
      'retrouver de l’énergie',
      'apaiser le terrain inflammatoire',
    ],
  },
  remoteBrief: {
    title: 'Un accompagnement à distance sur 21 jours, adapté à votre rythme.',
    withLabel: 'Avec :',
    bullets: [
      'un accompagnement personnalisé tout au long du programme',
      'des conseils et contenus pour vous aider au quotidien',
    ],
    footnote: 'Sans détailler davantage ici — tout le détail est sur la page « À distance ».',
  },
  cabinetTeaser: {
    title: 'Je propose également des accompagnements au cabinet :',
    lines: [
      'Vidéo de présentation',
      'Luxopuncture (méthode de réflexothérapie par infrarouge)',
      'Hypnose',
    ],
    cta: 'En savoir plus',
  },
  testimonials: {
    eyebrow: '',
    title: 'Témoignages',
    intro:
      'Vidéo de présentation et bandeau d’avis en images — la page Témoignages rassemble aussi l’ensemble des retours.',
  },
} as const

/** Cartes cabinet (liens vers fiches programme). */
export const cabinetServiceTeasers: readonly {
  slug: string
  title: string
  description: string
}[] = [
  {
    slug: 'poids',
    title: 'Perte de poids',
    description:
      'Un accompagnement pour retrouver un équilibre durable, diminuer les fringales et faciliter une perte de poids progressive.',
  },
  {
    slug: 'stress',
    title: 'Relaxation & gestion du stress',
    description: 'Apaiser les tensions, retrouver un état de calme et améliorer la qualité du sommeil.',
  },
  {
    slug: 'menopause',
    title: 'Inconforts de la ménopause',
    description:
      'Un accompagnement pour mieux vivre les déséquilibres et retrouver un confort au quotidien.',
  },
  {
    slug: 'tabac',
    title: 'Arrêt du tabac',
    description:
      'Accompagnement en luxopuncture, avec possibilité d’intégrer l’hypnose en complément selon vos besoins.',
  },
] as const

export const detoxProgramCopy = {
  title: 'À distance',
  subtitle:
    'Retrouvez un corps plus léger, un ventre plus confortable et plus d’énergie, sans contrainte.',
  introLead: 'Vous avez l’impression de faire attention… mais votre corps ne suit plus ?',
  introSymptoms: 'Ballonnements, fatigue, envies de sucre…',
  introQuestion: 'Et si votre corps avait simplement besoin d’être rééquilibré ?',
  /** Bloc citation — rythme éditorial (page programme) */
  editorialQuote:
    '« Votre corps n’a pas besoin de plus de contraintes — il a besoin d’être réécouté. »',
  editorialInsight: {
    title: 'À retenir',
    body: 'Le programme est progressif : chaque étape s’adapte à votre rythme réel, sans rigidité ni culpabilisation.',
  },
  distanceSection: {
    title: 'Un accompagnement à distance, simple et personnalisé',
    p1: 'Ce programme de détox à distance vous accompagne sur 3 semaines pour aider votre corps à retrouver un équilibre, en douceur et sans frustration.',
    highlight: 'Je vous guide pas à pas, en m’adaptant à votre rythme et à votre fonctionnement.',
  },
  benefits: {
    title: 'Ce que ce programme peut vous apporter',
    items: [
      'retrouver un ventre plus confortable',
      'diminuer les fringales',
      'retrouver de l’énergie',
      'apaiser votre relation à l’alimentation',
      'apaiser le terrain inflammatoire et certaines inflammations liées à l’alimentation',
    ],
    closing: 'Et préparer une perte de poids plus naturelle ensuite.',
  },
  howItWorks: {
    title: 'Comment ça se passe',
    intro:
      'Je vous accompagne sur 3 semaines, avec un suivi régulier et un cadre adapté à vous. Concrètement :',
    bullets: [
      'un bilan en début de programme pour faire le point ensemble',
      '4 rendez-vous en visio pour vous suivre et ajuster si besoin',
      'des conseils personnalisés et des contenus concrets pour vous guider au quotidien',
      'ma présence tout au long du programme pour répondre à vos questions et vous accompagner',
    ],
    highlight1: 'Vous êtes suivie à chaque étape, avec un accompagnement qui s’adapte à vous.',
    highlight2:
      'À l’issue du programme, une suite est possible si vous en ressentez le besoin, notamment pour poursuivre vers un rééquilibrage ou une perte de poids durable.',
  },
  approach: {
    title: 'Mon approche',
    intro: 'Je ne travaille ni dans la restriction, ni dans la culpabilisation.',
    goalsLabel: 'Mon objectif est de :',
    goals: ['travailler avec votre corps', 'respecter votre rythme', 'vous accompagner avec bienveillance'],
  },
  forWho: {
    title: 'Pour qui ?',
    intro: 'Ce programme est fait pour vous si :',
    items: [
      'vous vous sentez fatiguée ou en surcharge',
      'vous avez des inconforts digestifs',
      'vous avez des envies de sucre ou des compulsions',
      'vous souhaitez retrouver un équilibre',
      'vous ressentez des tensions, un terrain inflammatoire ou un inconfort général',
      'ou préparer une perte de poids durable',
    ],
  },
  modalities: {
    title: 'Modalités',
    intro: 'Le programme se déroule sur 3 semaines avec un accompagnement personnalisé comprenant :',
    items: ['1 bilan initial en visio', '4 séances de suivi', 'un accompagnement tout au long du programme'],
    tarifsHint: 'Les tarifs sont disponibles sur la page dédiée.',
  },
} as const

export const detoxFaq: readonly { question: string; answer: string[] }[] = [
  {
    question: 'Est-ce que ce programme est fait pour moi ?',
    answer: [
      'Si vous vous reconnaissez dans certaines situations (fatigue, inconfort digestif, envies de sucre, difficulté à perdre du poids…), alors oui, ce programme peut vous correspondre.',
      'Mon rôle est justement d’adapter l’accompagnement à vous, à votre rythme et à votre fonctionnement.',
    ],
  },
  {
    question: 'Est-ce que c’est difficile à suivre ?',
    answer: [
      'Non.',
      'Je ne propose pas quelque chose de strict ou de frustrant. Au contraire, le programme est progressif et s’adapte à vous.',
      'L’objectif est que vous puissiez tenir dans le temps, sans vous mettre en difficulté.',
    ],
  },
  {
    question: 'Et si je n’y arrive pas ?',
    answer: [
      'Vous n’êtes pas seule. Je suis là pour vous accompagner tout au long du programme. On ajuste ensemble, on échange, et on avance à votre rythme.',
      'Il n’y a pas d’échec, seulement des ajustements.',
    ],
  },
  {
    question: 'Est-ce que je vais devoir me priver ?',
    answer: [
      'Non.',
      'Je ne travaille pas avec la privation ou la culpabilisation. On vient rééquilibrer progressivement, sans brusquer votre corps.',
      'Le but est que cela devienne naturel, pas contraignant.',
    ],
  },
  {
    question: 'Est-ce que c’est uniquement pour perdre du poids ?',
    answer: [
      'Non.',
      'La détox permet d’abord de remettre votre corps à l’équilibre : digestion, énergie, sommeil, apaisement du terrain inflammatoire…',
      'Et ensuite, la perte de poids devient plus simple et plus naturelle.',
    ],
  },
  {
    question: 'Est-ce que le suivi à distance est vraiment efficace ?',
    answer: [
      'Oui. J’ai construit cet accompagnement pour qu’il fonctionne pleinement à distance, tout en restant très présente.',
      'Les retours sont très positifs : les personnes se sentent accompagnées, soutenues et guidées tout au long du programme.',
      'Entre les séances, je reste disponible pour répondre à vos questions, ajuster si nécessaire et vous accompagner à chaque étape.',
      'Vous n’êtes jamais seule dans le processus.',
    ],
  },
]

export const cabinetLuxoHypnoCopy = {
  luxopunctureTitle: 'La luxopuncture',
  luxopunctureIntro:
    'La luxopuncture est une méthode douce, inspirée de l’acupuncture, qui utilise un rayonnement infrarouge pour stimuler des points réflexes du corps.',
  luxopuncturePoints: [
    'Elle agit notamment sur l’équilibre du système hormonal, digestif et lymphatique.',
    'À l’aide d’un appareil médical certifié (CE), les points sont stimulés sans aiguilles, grâce à un stylet diffusant un faisceau infrarouge.',
  ],
  forWhatTitle: 'Pour quelles problématiques ?',
  forWhatIntro: 'La luxopuncture peut accompagner différentes situations :',
  forWhatList: [
    'perte de poids',
    'inconforts liés à la pré, péri ou post-ménopause',
    'stress et tensions',
    'arrêt du tabac',
    'troubles du sommeil',
    'difficultés de concentration ou surmenage',
  ],
  vsAcupunctureTitle: 'Quelle différence avec l’acupuncture ?',
  vsAcupuncture: [
    'Comme l’acupuncture, la luxopuncture s’appuie sur les principes de la médecine traditionnelle chinoise.',
    'La différence principale réside dans la méthode utilisée : la luxopuncture se pratique sans aiguilles, avec un stylet infrarouge.',
    'Une approche douce et non invasive.',
  ],
  contraTitle: 'Contre-indications',
  contraList: ['troubles épileptiques', 'grossesse', 'traitement pour une maladie grave'],
  contraFoot: 'En cas de doute, un avis médical est recommandé.',
  painTitle: 'Est-ce douloureux ?',
  painAnswer: 'Non. Cette méthode est indolore et sans effets indésirables.',
  hypnoComplementTitle: 'Et pour aller plus loin…',
  hypnoComplement: [
    'Selon les besoins, l’accompagnement peut être complété par l’hypnose.',
    'Elle permet de travailler plus en profondeur sur les comportements, les habitudes et les mécanismes émotionnels.',
    'En complément de la luxopuncture, elle vient soutenir les changements et les ancrer dans la durée.',
  ],
  hypnoTitle: 'L’hypnose',
  hypnoIntro:
    'L’hypnose est un outil qui permet de travailler en profondeur sur certains comportements, habitudes ou mécanismes émotionnels.',
  hypnoHighlight: 'Elle agit là où la volonté seule ne suffit pas toujours.',
  hypnoCasesTitle: 'Dans quels cas ?',
  hypnoCases: [
    'l’arrêt du tabac',
    'les comportements alimentaires',
    'la gestion des émotions',
    'les phobies',
    'le manque de confiance ou d’estime de soi',
    'certains blocages ou automatismes',
  ],
  hypnoHowTitle: 'Comment cela se passe ?',
  hypnoHow: [
    'L’hypnose est un état naturel, que vous expérimentez déjà au quotidien (lorsque vous êtes absorbée dans vos pensées, par exemple).',
    'Vous restez consciente tout au long de la séance.',
    'L’objectif est de vous aider à accéder à vos propres ressources, pour faciliter le changement.',
  ],
  hypnoComplement2Title: 'En complément de l’accompagnement',
  hypnoComplement2: [
    'L’hypnose peut venir compléter la luxopuncture, notamment dans certaines situations comme l’arrêt du tabac ou les comportements alimentaires.',
    'Elle permet de renforcer les changements et de les ancrer dans la durée.',
  ],
  hypnoAdaptTitle: 'Un accompagnement adapté',
  hypnoAdapt:
    'Chaque séance est adaptée à vous, à votre rythme et à vos besoins. L’objectif est de vous accompagner de manière simple, progressive et respectueuse.',
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
