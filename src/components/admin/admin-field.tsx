// src/components/admin/admin-field.tsx
import type { ChangeEvent } from 'react'

export interface AdminFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  multiline?: boolean
  /** Hauteur des zones multilignes (défaut 4). */
  rows?: number
}

export function AdminField({ label, value, onChange, multiline, rows = 4 }: AdminFieldProps) {
  const cls = 'admin-input'
  return (
    <label className="block text-sm font-medium text-[var(--color-ink)]">
      {label}
      {multiline ? (
        <textarea
          value={value}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
          rows={rows}
          className={cls}
        />
      ) : (
        <input
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          className={cls}
        />
      )}
    </label>
  )
}
