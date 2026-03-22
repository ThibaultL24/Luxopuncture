// src/lib/admin-defaults.ts — valeurs initiales (données du site)
import { defaultPublications } from '../data/publications'
import {
  contactInfo,
  heroCopy,
  pricingRows,
  services,
  site,
  testimonials,
} from '../data/site-content'
import { testimonialVideoFiles } from '../data/media'
import type { AdminState } from './admin-types'

function clone<T>(x: T): T {
  return JSON.parse(JSON.stringify(x)) as T
}

export function getDefaultAdminState(): AdminState {
  return {
    publications: clone(defaultPublications),
    testimonials: clone(testimonials),
    services: clone(services),
    pricingRows: clone([...pricingRows] as AdminState['pricingRows']),
    heroCopy: clone(heroCopy as AdminState['heroCopy']),
    contactInfo: clone(contactInfo as AdminState['contactInfo']),
    site: clone(site as AdminState['site']),
    testimonialVideoFiles: [...testimonialVideoFiles],
  }
}
