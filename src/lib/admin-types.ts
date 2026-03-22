// src/lib/admin-types.ts — données éditables par l’admin
import type { Publication } from '../data/publications'
import type { Service, Testimonial } from '../data/site-content'

export interface PricingRow {
  label: string
  price: string
  note: string
}

export interface HeroCopyState {
  title: string
  subtitle: string
  ctaPrimary: string
  ctaSecondary: string
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

export interface AdminState {
  publications: Publication[]
  testimonials: Testimonial[]
  services: Service[]
  pricingRows: PricingRow[]
  heroCopy: HeroCopyState
  contactInfo: ContactInfoState
  site: SiteBrandingState
  testimonialVideoFiles: string[]
}

export const ADMIN_STORAGE_KEY = 'laplace-admin-state-v1'
export const ADMIN_SESSION_KEY = 'laplace-admin-session'
