// src/pages/home-page.tsx
import { BenefitsStrip } from '../components/home/benefits-strip'
import { CtaBanner } from '../components/home/cta-banner'
import { HeroSection } from '../components/home/hero-section'
import { HormoneEffects } from '../components/home/hormone-effects'
import { MethodSteps } from '../components/home/method-steps'
import { ProblemGrid } from '../components/home/problem-grid'
import { TestimonialsSection } from '../components/home/testimonials-section'
import { usePageTitle } from '../hooks/use-page-title'

export function HomePage() {
  usePageTitle('Laplace Luxopuncture')
  return (
    <>
      <HeroSection />
      <ProblemGrid />
      <MethodSteps />
      <HormoneEffects />
      <BenefitsStrip />
      <TestimonialsSection />
      <CtaBanner />
    </>
  )
}
