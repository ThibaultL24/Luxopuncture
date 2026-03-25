// src/components/editorial/editorial-section-immersive.tsx
import type { ReactNode } from 'react'
import type { AtmospherePlacement, AtmosphereVariant } from './section-atmosphere'
import { SectionAtmosphere } from './section-atmosphere'

interface EditorialSectionImmersiveProps {
  children: ReactNode
  className?: string
  innerClassName?: string
  atmosphereVariant?: AtmosphereVariant
  atmospherePlacement?: AtmospherePlacement
}

/** Section « respiration » : peu de contenu, beaucoup d’air, halo marqué. */
export function EditorialSectionImmersive({
  children,
  className = '',
  innerClassName = '',
  atmosphereVariant = 'strong',
  atmospherePlacement = 'center',
}: EditorialSectionImmersiveProps) {
  return (
    <section className={['relative overflow-hidden py-20 sm:py-28 lg:py-32', className].filter(Boolean).join(' ')}>
      <SectionAtmosphere variant={atmosphereVariant} placement={atmospherePlacement}>
        <div className={['mx-auto max-w-3xl px-4 text-center sm:px-6', innerClassName].filter(Boolean).join(' ')}>
          {children}
        </div>
      </SectionAtmosphere>
    </section>
  )
}
