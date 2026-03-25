// src/pages/home-page.tsx
import { CtaBanner } from '../components/home/cta-banner'
import { HeroSection } from '../components/home/hero-section'
import { HomeCabinetTeaserSection } from '../components/home/home-cabinet-teaser-section'
import { HomeDetoxSolutionSection } from '../components/home/home-detox-solution-section'
import { HomeHookSection } from '../components/home/home-hook-section'
import { HomeRemoteBriefSection } from '../components/home/home-remote-brief-section'
import { TestimonialsSection } from '../components/home/testimonials-section'
import {
  EditorialQuote,
  EditorialSectionImmersive,
  RevealOnScroll,
  SectionDivider,
  SectionGradientSpacer,
} from '../components/editorial'
import { detoxProgramCopy } from '../data/site-content'
import { usePageTitle } from '../hooks/use-page-title'

export function HomePage() {
  usePageTitle('Laplace Luxopuncture')
  return (
    <div className="bg-transparent">
      <HeroSection />
      <HomeHookSection />
      <SectionDivider className="!py-5 sm:!py-7" />
      <EditorialSectionImmersive
        className="!py-14 sm:!py-20 lg:!py-24"
        atmosphereVariant="strong"
        atmospherePlacement="center"
      >
        <RevealOnScroll variant="scale">
          <EditorialQuote quote={detoxProgramCopy.editorialQuote} variant="featured" />
        </RevealOnScroll>
      </EditorialSectionImmersive>
      <SectionGradientSpacer className="!py-5 sm:!py-7" />
      <HomeDetoxSolutionSection />
      <HomeRemoteBriefSection />
      <TestimonialsSection />
      <HomeCabinetTeaserSection />
      <CtaBanner />
    </div>
  )
}
