// src/lib/admin-merge.ts — fusion des données admin (stockage / import) avec les défauts
import { getDefaultAdminState } from './admin-defaults'
import type {
  AboutPageState,
  AdminState,
  HomeCopyEditable,
  PartenariatPartnerCard,
  PartenariatPartnerSocials,
  PartenariatPageState,
  TarifsPageState,
} from './admin-types'

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

function migrateDetoxIncludesLines(includes: string[]): string[] {
  return includes.map((line) =>
    /^3 séances de suivi$/i.test(line.trim()) ? line.replace(/3/i, '4') : line,
  )
}

function mergeTarifsPage(d: TarifsPageState, p?: Partial<TarifsPageState>): TarifsPageState {
  if (!p) return d
  const includes = migrateDetoxIncludesLines(p.detox?.includes ?? d.detox.includes)
  return {
    pageTitle: p.pageTitle ?? d.pageTitle,
    pageSubtitle: p.pageSubtitle ?? d.pageSubtitle,
    distanceTitle: p.distanceTitle ?? d.distanceTitle,
    detox: {
      label: p.detox?.label ?? d.detox.label,
      price: p.detox?.price ?? d.detox.price,
      includes,
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

function mergePartenariatPartnerSocials(
  def: PartenariatPartnerSocials,
  over?: PartenariatPartnerSocials,
): PartenariatPartnerSocials {
  if (!over) return def
  const pick = (persisted: string, fallback: string) =>
    persisted.trim() !== '' ? persisted : fallback
  return {
    instagram: pick(over.instagram, def.instagram),
    facebook: pick(over.facebook, def.facebook),
    linkedin: pick(over.linkedin, def.linkedin),
  }
}

const LEGACY_PARTENARIAT_PAGE_SUBTITLE =
  'Des personnes et des marques que j’aime vous faire découvrir — sélectionnées pour la qualité de leur démarche et leur exigence.'

/** Sous-titre : défaut vide ; on efface anciennes phrases et brouillons « note de rédaction » encore en localStorage. */
function mergePartenariatPageSubtitle(defaultSubtitle: string, persisted?: string): string {
  if (persisted === undefined) return defaultSubtitle
  const t = persisted.trim()
  if (t === '') return defaultSubtitle
  if (t === LEGACY_PARTENARIAT_PAGE_SUBTITLE.trim()) return defaultSubtitle
  if (t.toLowerCase().includes('présentation des produits de caroline')) return defaultSubtitle
  return persisted
}

/** Fiches partenaires : images et liens réseaux vides côté stockage sont complétés par les défauts du code. */
function mergePartenariatPartners(
  defaults: PartenariatPartnerCard[],
  persisted?: PartenariatPartnerCard[],
): PartenariatPartnerCard[] {
  if (!persisted?.length) return defaults
  const defaultIds = new Set(defaults.map((x) => x.id))
  const merged = defaults.map((def) => {
    const over = persisted.find((x) => x.id === def.id)
    if (!over) return def
    return {
      ...def,
      ...over,
      images: def.images,
      socials: mergePartenariatPartnerSocials(def.socials, over.socials),
    }
  })
  const extras = persisted.filter((x) => !defaultIds.has(x.id))
  return extras.length ? [...merged, ...extras] : merged
}

function mergePartenariat(d: PartenariatPageState, p?: Partial<PartenariatPageState>): PartenariatPageState {
  if (!p) return d
  const partners = mergePartenariatPartners(d.partners, p.partners)
  const pageSubtitle = mergePartenariatPageSubtitle(d.pageSubtitle, p.pageSubtitle)
  return { ...d, ...p, partners, pageSubtitle }
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
