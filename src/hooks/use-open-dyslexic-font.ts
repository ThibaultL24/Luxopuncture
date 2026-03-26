// src/hooks/use-open-dyslexic-font.ts
import { useContext } from 'react'
import { AccessibilityContext } from '../contexts/accessibility-context-value'

export function useOpenDyslexicFont() {
  const ctx = useContext(AccessibilityContext)
  if (!ctx) throw new Error('AccessibilityProvider manquant')
  return {
    enabled: ctx.openDyslexicFont,
    setEnabled: ctx.setOpenDyslexicFont,
  }
}
