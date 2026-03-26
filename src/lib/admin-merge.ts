// src/lib/admin-merge.ts — fusion des données admin (stockage / import) avec les défauts
import { getDefaultAdminState } from './admin-defaults'
import type { AboutPageState, AdminState, HomeCopyEditable, PartenariatPageState, TarifsPageState } from './admin-types'

function mergeHomeCopy(d: HomeCopyEditable, p?: Partial<HomeCopyEditable>): HomeCopyEditable {
  if (!p) return d
  return {
    hook: { ...d.hook, ...p.hook },
    detoxSolution: {
      ...d.detoxSolution,
      ...p.detoxSolution,
      bullets: p.detoxSolution?.bullets ?? d.detoxSolution.bullets,
    },
    remoteBrief: {
      ...d.remoteBrief,
      ...p.remoteBrief,
      bullets: p.remoteBrief?.bullets ?? d.remoteBrief.bullets,
    },
    cabinetTeaser: {
      ...d.cabinetTeaser,
      ...p.cabinetTeaser,
      lines: p.cabinetTeaser?.lines ?? d.cabinetTeaser.lines,
    },
    testimonials: normalizeTestimonialsBlock(
      { ...d.testimonials, ...p.testimonials },
      d.testimonials,
    ),
  }
}

/** Ancien accueil : eyebrow « Témoignages » + titre « Avis écrits » — un seul titre désormais. */
function normalizeTestimonialsBlock(
  merged: HomeCopyEditable['testimonials'],
  defaults: HomeCopyEditable['testimonials'],
): HomeCopyEditable['testimonials'] {
  let next = merged
  if (next.eyebrow === 'Témoignages' && next.title === 'Avis écrits') {
    next = { ...next, eyebrow: '', title: 'Témoignages' }
  }
  const oldIntro =
    'Avis écrits et vidéo de présentation — la page dédiée regroupe les retours et les vidéos.'
  if (next.intro === oldIntro) {
    next = { ...next, intro: defaults.intro }
  }
  return next
}

function mergeTarifsPage(d: TarifsPageState, p?: Partial<TarifsPageState>): TarifsPageState {
  if (!p) return d
  return {
    pageTitle: p.pageTitle ?? d.pageTitle,
    pageSubtitle: p.pageSubtitle ?? d.pageSubtitle,
    distanceTitle: p.distanceTitle ?? d.distanceTitle,
    detox: {
      label: p.detox?.label ?? d.detox.label,
      price: p.detox?.price ?? d.detox.price,
      includes: p.detox?.includes ?? d.detox.includes,
    },
    suivi: {
      label: p.suivi?.label ?? d.suivi.label,
      price: p.suivi?.price ?? d.suivi.price,
      conditions: p.suivi?.conditions ?? d.suivi.conditions,
      note: p.suivi?.note ?? d.suivi.note,
    },
    cabinetTitle: p.cabinetTitle ?? d.cabinetTitle,
    cabinetRows: p.cabinetRows ?? d.cabinetRows,
    infosTitle: p.infosTitle ?? d.infosTitle,
    infosLines: p.infosLines ?? d.infosLines,
  }
}

function mergeAbout(d: AboutPageState, p?: Partial<AboutPageState>): AboutPageState {
  if (!p) return d
  return {
    ...d,
    ...p,
    bio: p.bio ?? d.bio,
    credentials: p.credentials ?? d.credentials,
  }
}

function mergePartenariat(d: PartenariatPageState, p?: Partial<PartenariatPageState>): PartenariatPageState {
  if (!p) return d
  return { ...d, ...p }
}

/** Fusionne un état partiel (localStorage, import) avec les valeurs par défaut. */
export function mergeAdminState(defaults: AdminState, p: Partial<AdminState>): AdminState {
  return {
    publications: p.publications ?? defaults.publications,
    testimonials: p.testimonials ?? defaults.testimonials,
    services: p.services ?? defaults.services,
    tarifsPage: mergeTarifsPage(defaults.tarifsPage, p.tarifsPage),
    heroCopy: { ...defaults.heroCopy, ...p.heroCopy },
    homeCopy: mergeHomeCopy(defaults.homeCopy, p.homeCopy),
    bookingCta: { ...defaults.bookingCta, ...p.bookingCta },
    contactInfo: { ...defaults.contactInfo, ...p.contactInfo },
    site: { ...defaults.site, ...p.site },
    testimonialVideoFiles: p.testimonialVideoFiles ?? defaults.testimonialVideoFiles,
    reviewCaptureSlides: p.reviewCaptureSlides ?? defaults.reviewCaptureSlides,
    aboutPage: mergeAbout(defaults.aboutPage, p.aboutPage),
    partenariatPage: mergePartenariat(defaults.partenariatPage, p.partenariatPage),
  }
}

/** Import JSON : accepte d’anciens exports (sans tarifsPage / homeCopy complets). */
export function mergeImportedAdminState(parsed: Partial<AdminState>): AdminState {
  const defaults = getDefaultAdminState()
  return mergeAdminState(defaults, parsed)
}
