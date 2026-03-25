// src/components/editorial/editorial-insight.tsx
import { Feather } from 'lucide-react'
import type { ReactNode } from 'react'

interface EditorialInsightProps {
  title: string
  children: ReactNode
  className?: string
}

export function EditorialInsight({ title, children, className = '' }: EditorialInsightProps) {
  return (
    <div
      className={[
        'glass-soft rounded-xl border border-[var(--color-brand)]/10 bg-[var(--color-surface-rose)]/90 p-6 sm:p-7',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <p className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
        <Feather className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
        {title}
      </p>
      <div className="mt-3 text-[15px] leading-relaxed text-[var(--color-body)]/95">{children}</div>
    </div>
  )
}
