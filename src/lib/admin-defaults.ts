// src/lib/admin-defaults.ts — valeurs initiales (données du site)
import { defaultPublications } from '../data/publications'
import {
  aboutPractitioner,
  bookingCta,
  contactInfo,
  heroCopy,
  homeCopy,
  services,
  site,
  tarifsPageSpec,
  testimonials,
} from '../data/site-content'
import { defaultPartenariatPartnerCards } from '../data/partenariat-defaults'
import { testimonialVideoFiles } from '../data/media'
import type { AdminState, TarifsPageState } from './admin-types'

function clone<T>(x: T): T {
  return JSON.parse(JSON.stringify(x)) as T
}

function defaultTarifsPage(): TarifsPageState {
  const s = tarifsPageSpec
  return {
    pageTitle: 'Tarifs',
    pageSubtitle:
      'Programme à distance et séances au cabinet — accompagnements personnalisés selon votre objectif.',
    distanceTitle: s.distanceTitle,
    detox: {
      label: s.detox.label,
      price: s.detox.price,
      includes: [...s.detox.includes],
    },
    suivi: {
      label: s.suivi.label,
      price: s.suivi.price,
      conditions: [...s.suivi.conditions],
      note: s.suivi.note,
    },
    cabinetTitle: s.cabinetTitle,
    cabinetRows: s.cabinetRows.map((r) => ({ ...r })),
    infosTitle: s.infosTitle,
    infosLines: [...s.infosLines],
  }
}

function defaultHomeCopy(): AdminState['homeCopy'] {
  const h = homeCopy
  return {
    hook: { ...h.hook },
    detoxSolution: {
      intro: h.detoxSolution.intro,
      subtitle: h.detoxSolution.subtitle,
      bullets: [...h.detoxSolution.bullets],
    },
    remoteBrief: {
      title: h.remoteBrief.title,
      withLabel: h.remoteBrief.withLabel,
      bullets: [...h.remoteBrief.bullets],
      footnote: h.remoteBrief.footnote,
    },
    cabinetTeaser: {
      title: h.cabinetTeaser.title,
      lines: [...h.cabinetTeaser.lines],
      cta: h.cabinetTeaser.cta,
    },
    testimonials: { ...h.testimonials },
  }
}

function defaultPartenariat(): AdminState['partenariatPage'] {
  return {
    pageTitle: 'Recommandations',
    pageSubtitle: '',
    productsTitle: 'À découvrir',
    productsBody:
      'Chaque fiche résume en quelques lignes le parcours et l’offre : n’hésitez pas à aller voir directement sur leurs sites ou leurs réseaux.',
    partners: clone(defaultPartenariatPartnerCards),
    networksTitle: 'Mes réseaux',
    networksBody:
      'Pour échanger sur la luxopuncture, l’hypnose ou le cabinet, vous pouvez aussi me suivre ici :',
  }
}

function defaultAbout(): AdminState['aboutPage'] {
  return {
    title: aboutPractitioner.title,
    name: aboutPractitioner.name,
    bio: [...aboutPractitioner.bio],
    credentials: [...aboutPractitioner.credentials],
  }
}

export function getDefaultAdminState(): AdminState {
  return {
    publications: clone(defaultPublications),
    testimonials: clone(testimonials),
    services: clone(services),
    tarifsPage: defaultTarifsPage(),
    heroCopy: clone(heroCopy as AdminState['heroCopy']),
    homeCopy: defaultHomeCopy(),
    bookingCta: clone(bookingCta as AdminState['bookingCta']),
    contactInfo: clone(contactInfo as AdminState['contactInfo']),
    site: clone(site as AdminState['site']),
    testimonialVideoFiles: [...testimonialVideoFiles],
    reviewCaptureSlides: [],
    aboutPage: defaultAbout(),
    partenariatPage: defaultPartenariat(),
  }
}
