// src/contexts/accessibility-context.tsx
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { AccessibilityContext } from './accessibility-context-value'

const STORAGE_KEY = 'luxopuncture-open-dyslexic'

function readStored(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(STORAGE_KEY) === '1'
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [openDyslexicFont, setOpenDyslexicFontState] = useState(readStored)

  useEffect(() => {
    const root = document.documentElement
    if (openDyslexicFont) root.setAttribute('data-dyslexic-font', 'true')
    else root.removeAttribute('data-dyslexic-font')
    try {
      localStorage.setItem(STORAGE_KEY, openDyslexicFont ? '1' : '0')
    } catch {
      /* quota */
    }
  }, [openDyslexicFont])

  const value = useMemo(
    () => ({
      openDyslexicFont,
      setOpenDyslexicFont: setOpenDyslexicFontState,
    }),
    [openDyslexicFont, setOpenDyslexicFontState],
  )

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>
}
