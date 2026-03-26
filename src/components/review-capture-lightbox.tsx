// src/components/review-capture-lightbox.tsx — z-[10060] : rester sous le curseur plume (feather-cursor z-[10071])
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export interface ReviewCaptureLightboxProps {
  open: boolean
  onClose: () => void
  src: string
  alt: string
}

export function ReviewCaptureLightbox({ open, onClose, src, alt }: ReviewCaptureLightboxProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  useEffect(() => {
    if (open) queueMicrotask(() => closeBtnRef.current?.focus())
  }, [open])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[10060] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={alt ? `Avis : ${alt}` : 'Avis agrandi'}
    >
      <button
        type="button"
        className="absolute inset-0 bg-[var(--color-ink)]/50 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Fermer l’aperçu"
      />
      <div className="relative z-[1] max-h-[min(100vh-2rem,900px)] w-full max-w-4xl overflow-auto rounded-2xl border border-[var(--color-brand)]/15 bg-[var(--color-surface)] p-3 shadow-[var(--shadow-soft)]">
        <button
          ref={closeBtnRef}
          type="button"
          className="absolute right-2 top-2 z-[2] rounded-full bg-[var(--color-ink)]/10 p-2 text-[var(--color-ink)] transition hover:bg-[var(--color-ink)]/18 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
          onClick={onClose}
          aria-label="Fermer"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
        <img
          src={src}
          alt={alt || 'Capture d’avis'}
          className="mx-auto mt-8 block h-auto max-h-[min(85vh,800px)] w-full max-w-full object-contain"
        />
      </div>
    </div>,
    document.body,
  )
}
