// src/components/admin/drop-zone.tsx — glisser-déposer de fichiers (sans dépendance externe)
import { useCallback, useState } from 'react'

interface DropZoneProps {
  label: string
  hint?: string
  /** Si défini, seuls ces types sont traités (fichiers ignorés sinon). */
  mode: 'image' | 'text' | 'images'
  disabled?: boolean
  className?: string
  onDropFiles: (files: File[]) => void | Promise<void>
}

export function DropZone({ label, hint, mode, disabled, className = '', onDropFiles }: DropZoneProps) {
  const [over, setOver] = useState(false)

  const filterFiles = useCallback(
    (files: FileList | File[]) => {
      const list = Array.from(files)
      if (mode === 'image') {
        return list.filter((f) => f.type.startsWith('image/')).slice(0, 1)
      }
      if (mode === 'images') {
        return list.filter((f) => f.type.startsWith('image/'))
      }
      if (mode === 'text') {
        return list
          .filter(
            (f) =>
              f.type === 'text/plain' ||
              f.type === 'text/markdown' ||
              f.name.toLowerCase().endsWith('.md') ||
              f.name.toLowerCase().endsWith('.txt'),
          )
          .slice(0, 1)
      }
      return []
    },
    [mode],
  )

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setOver(false)
      if (disabled) return
      const picked = filterFiles(e.dataTransfer.files)
      if (picked.length === 0) return
      await onDropFiles(picked)
    },
    [disabled, filterFiles, onDropFiles],
  )

  return (
    <div
      role="group"
      aria-label={label}
      tabIndex={0}
      onDragEnter={(e) => {
        e.preventDefault()
        if (!disabled) setOver(true)
      }}
      onDragOver={(e) => {
        e.preventDefault()
        if (!disabled) setOver(true)
      }}
      onDragLeave={(e) => {
        if (e.currentTarget.contains(e.relatedTarget as Node)) return
        setOver(false)
      }}
      onDrop={handleDrop}
      className={[
        'rounded-2xl border-2 border-dashed px-4 py-8 text-center transition',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        over
          ? 'border-[var(--color-cta)] bg-[var(--color-muted-green)]/65 shadow-inner'
          : 'border-[var(--color-brand)]/22 bg-gradient-to-br from-[var(--color-muted-green)]/30 to-white/90',
        className,
      ].join(' ')}
    >
      <p className="text-sm font-semibold text-[var(--color-ink)]">{label}</p>
      {hint ? <p className="mt-2 text-xs text-[var(--color-body)]/85">{hint}</p> : null}
    </div>
  )
}
