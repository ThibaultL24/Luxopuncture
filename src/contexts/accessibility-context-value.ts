// src/contexts/accessibility-context-value.ts
import { createContext } from 'react'

export const AccessibilityContext = createContext<{
  openDyslexicFont: boolean
  setOpenDyslexicFont: (value: boolean) => void
} | null>(null)
