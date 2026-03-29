// src/lib/admin-types.ts — données éditables par l’admin (sans code côté praticienne)
import type { Publication } from '../data/publications'
import type { Service, Testimonial } from '../data/site-content'

export interface TarifsPageState {
  pageTitle: string
  pageSubtitle: string
  distanceTitle: string
  detox: { label: string; price: string; includes: string[] }
  suivi: { label: string; price: string; conditions: string[]; note: string }
  cabinetTitle: string
  cabinetRows: { label: string; price: string; note: string }[]
  infosTitle: string
  infosLines: string[]
}

export interface HeroCopyState {
  eyebrow: string
  title: string
  subtitle: string
  ctaPrimary: string
  ctaSecondary: string
}

/** Textes des blocs de la page d’accueil (hors hero). */
export interface HomeCopyEditable {
  hook: { lead: string; question: string; symptoms: string; closing: string }
  detoxSolution: { intro: string; subtitle: string; bullets: string[] }
  remoteBrief: { title: string; withLabel: string; bullets: string[]; footnote: string }
  cabinetTeaser: { title: string; lines: string[]; cta: string }
  testimonials: { eyebrow: string; title: string; intro: string }
}

export interface BookingCtaState {
  text: string
  button: string
}

/** Réseaux d’une personne mise en avant (chaîne vide = masqué sauf Instagram / Facebook / LinkedIn si utilisés ailleurs). */
export interface PartenariatPartnerSocials {
  instagram: string
  facebook: string
  linkedin: string
  /** Optionnel — profil GitHub. */
  github?: string
  /** Optionnel — profil X (Twitter). */
  x?: string
}

export interface PartenariatPartnerCard {
  id: string
  name: string
  role: string
  /** Texte riche léger : **gras** interprété côté affichage. */
  paragraphs: string[]
  images: { src: string; alt: string }[]
  websiteUrl: string
  websiteLabel: string
  socials: PartenariatPartnerSocials
}

export interface PartenariatPageState {
  pageTitle: string
  pageSubtitle: string
  /** Titre au-dessus des fiches (ex. Recommandations). */
  productsTitle: string
  /** Court paragraphe d’introduction. */
  productsBody: string
  /** Fiches personnes + textes + visuels (défaut : Caroline / CCC&BIO). */
  partners: PartenariatPartnerCard[]
  networksTitle: string
  networksBody: string
}

export interface AboutPageState {
  title: string
  name: string
  bio: string[]
  credentials: string[]
}

export interface ContactInfoState {
  phone: string
  email: string
  address: string
  hours: string
}

export interface SiteBrandingState {
  name: string
  tagline: string
  domain: string
}

/** Captures d’avis en bandeau (accueil / témoignages). Vide = liste par défaut du site (`avis-site`). */
export interface ReviewCaptureSlide {
  src: string
  alt: string
}

export interface AdminState {
  publications: Publication[]
  testimonials: Testimonial[]
  services: Service[]
  /** Page Tarifs complète (affichée sur le site). */
  tarifsPage: TarifsPageState
  heroCopy: HeroCopyState
  homeCopy: HomeCopyEditable
  bookingCta: BookingCtaState
  contactInfo: ContactInfoState
  site: SiteBrandingState
  testimonialVideoFiles: string[]
  /** Ordre = ordre d’affichage. Si vide, utilisation des fichiers par défaut dans `data/avis-site`. */
  reviewCaptureSlides: ReviewCaptureSlide[]
  aboutPage: AboutPageState
  partenariatPage: PartenariatPageState
}

export const ADMIN_STORAGE_KEY = 'laplace-admin-state-v1'
export const ADMIN_SESSION_KEY = 'laplace-admin-session'
