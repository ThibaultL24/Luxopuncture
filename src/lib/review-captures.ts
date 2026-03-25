// src/lib/review-captures.ts — bandeau « captures d’avis » : défaut site vs liste admin
import { avisSiteFilenames, avisSiteImageSrc } from '../data/avis-site'
import type { AdminState, ReviewCaptureSlide } from './admin-types'

export function resolveReviewCaptureSlides(state: Pick<AdminState, 'reviewCaptureSlides'>): { src: string; alt: string }[] {
  const custom = state.reviewCaptureSlides.filter((x) => x.src.trim().length > 0)
  if (custom.length > 0) return custom.map((x) => ({ src: x.src.trim(), alt: x.alt.trim() }))
  return avisSiteFilenames.map((f) => ({ src: avisSiteImageSrc(f), alt: '' }))
}

export function buildDefaultReviewCaptureSlidesFromSite(): ReviewCaptureSlide[] {
  return avisSiteFilenames.map((f) => ({ src: avisSiteImageSrc(f), alt: '' }))
}
