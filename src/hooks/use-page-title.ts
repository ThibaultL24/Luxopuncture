// src/hooks/use-page-title.ts
import { useEffect } from 'react'

export function usePageTitle(title: string) {
  useEffect(() => {
    const base = 'Laplace Luxopuncture'
    document.title = title === base ? base : `${title} · ${base}`
    return () => {
      document.title = base
    }
  }, [title])
}
