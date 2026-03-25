// src/components/admin/string-list-editor.tsx
interface StringListEditorProps {
  label: string
  items: string[]
  onChange: (items: string[]) => void
  addLabel?: string
  placeholder?: string
}

export function StringListEditor({
  label,
  items,
  onChange,
  addLabel = 'Ajouter une ligne',
  placeholder = '…',
}: StringListEditorProps) {
  return (
    <div>
      <p className="text-sm font-medium text-[var(--color-ink)]">{label}</p>
      <ul className="mt-2 space-y-2">
        {items.map((line, i) => (
          <li key={i} className="flex gap-2 rounded-xl bg-white/80 p-1.5 ring-1 ring-[var(--color-brand)]/10">
            <input
              value={line}
              onChange={(e) => {
                const next = [...items]
                next[i] = e.target.value
                onChange(next)
              }}
              placeholder={placeholder}
              className="admin-input min-w-0 flex-1 border-[var(--color-brand)]/14 !mt-0"
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="shrink-0 self-center rounded-lg border border-rose-200/90 bg-rose-50/80 px-3 py-2 text-sm text-rose-800 hover:bg-rose-100/90"
            >
              Retirer
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => onChange([...items, ''])}
        className="mt-3 rounded-full border border-[var(--color-brand)]/22 bg-[var(--color-muted-green)]/40 px-4 py-2 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-muted-green)]/70"
      >
        {addLabel}
      </button>
    </div>
  )
}
