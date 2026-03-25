// src/components/admin/review-capture-slides-editor.tsx
import { useRef } from 'react'
import { avisSiteFilenames, avisSiteImageSrc } from '../../data/avis-site'
import type { ReviewCaptureSlide } from '../../lib/admin-types'
import { buildDefaultReviewCaptureSlidesFromSite } from '../../lib/review-captures'
import { MAX_IMAGE_BYTES, readFileAsDataUrl } from '../../lib/admin-file-helpers'
import { DropZone } from './drop-zone'

interface ReviewCaptureSlidesEditorProps {
  slides: ReviewCaptureSlide[]
  onChange: (slides: ReviewCaptureSlide[]) => void
}

export function ReviewCaptureSlidesEditor({ slides, onChange }: ReviewCaptureSlidesEditorProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const isCustom = slides.length > 0

  function move(from: number, to: number) {
    if (to < 0 || to >= slides.length) return
    const next = [...slides]
    const [row] = next.splice(from, 1)
    next.splice(to, 0, row)
    onChange(next)
  }

  async function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files
    e.target.value = ''
    if (!list?.length) return
    const added: ReviewCaptureSlide[] = []
    for (const file of Array.from(list)) {
      if (!file.type.startsWith('image/')) continue
      if (file.size > MAX_IMAGE_BYTES) {
        window.alert(
          `${file.name} : trop lourd (${Math.round(file.size / 1024)} Ko). Maximum environ ${Math.round(MAX_IMAGE_BYTES / 1024)} Ko.`,
        )
        continue
      }
      try {
        const src = await readFileAsDataUrl(file)
        added.push({ src, alt: file.name.replace(/\.[^.]+$/, '') })
      } catch {
        window.alert(`Impossible de lire ${file.name}.`)
      }
    }
    if (added.length) onChange([...slides, ...added])
  }

  function addFromKnownList(filename: string) {
    const src = avisSiteImageSrc(filename)
    if (slides.some((s) => s.src === src)) return
    onChange([...slides, { src, alt: '' }])
  }

  return (
    <div className="space-y-4">
      <div
        className={
          isCustom
            ? 'rounded-xl border border-rose-200/90 bg-gradient-to-br from-rose-50 to-white p-4 text-sm text-[var(--color-body)]/92 shadow-[inset_0_1px_0_rgb(255_255_255_/0.8)]'
            : 'rounded-xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 to-white p-4 text-sm text-[var(--color-body)]/92 shadow-[inset_0_1px_0_rgb(255_255_255_/0.8)]'
        }
      >
        {isCustom ? (
          <p>
            <strong className="text-rose-950">Liste personnalisée.</strong> Seules les images ci-dessous sont affichées,
            dans cet ordre. Pour revenir au défaut du site, videz la liste (bouton ci-dessous).
          </p>
        ) : (
          <p>
            <strong className="text-emerald-950">Mode automatique.</strong> Le site utilise les captures du dossier (liste
            fixe). Utilisez « Copier la liste du site » pour pouvoir retirer, réordonner ou ajouter des images.
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-full border border-[var(--color-brand)]/20 bg-white px-4 py-2 text-sm font-medium text-[var(--color-ink)] shadow-sm hover:bg-[var(--color-muted-green)]/50"
          onClick={() => onChange(buildDefaultReviewCaptureSlidesFromSite())}
        >
          Copier la liste du site (toutes les captures)
        </button>
        <button
          type="button"
          className="rounded-full border border-[var(--color-body)]/15 bg-white/80 px-4 py-2 text-sm text-[var(--color-body)] hover:bg-rose-50/80"
          onClick={() => {
            if (slides.length > 0 && !window.confirm('Effacer toute la liste ? Le bandeau repassera sur le défaut automatique.'))
              return
            onChange([])
          }}
        >
          Tout effacer (défaut automatique)
        </button>
        <button
          type="button"
          className="rounded-full border border-[var(--color-brand)]/20 bg-[var(--color-muted-green)]/35 px-4 py-2 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-muted-green)]/55"
          onClick={() => onChange([...slides, { src: '', alt: '' }])}
        >
          Ajouter une ligne (chemin URL)
        </button>
        <button
          type="button"
          className="rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:brightness-105"
          onClick={() => fileRef.current?.click()}
        >
          Importer une image depuis l’ordinateur
        </button>
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={onPickFile} />
      </div>

      <DropZone
        mode="images"
        label="Glissez-déposez une ou plusieurs images ici"
        hint="Les fichiers sont ajoutés à la liste (même principe que « Importer »). Formats image courants."
        onDropFiles={async (files) => {
          const added: ReviewCaptureSlide[] = []
          for (const file of files) {
            if (!file.type.startsWith('image/')) continue
            if (file.size > MAX_IMAGE_BYTES) {
              window.alert(
                `${file.name} est trop lourd (max. environ ${Math.round(MAX_IMAGE_BYTES / 1024)} Ko).`,
              )
              continue
            }
            try {
              const src = await readFileAsDataUrl(file)
              added.push({ src, alt: file.name.replace(/\.[^.]+$/, '') })
            } catch {
              window.alert(`Impossible de lire ${file.name}.`)
            }
          }
          if (added.length) onChange([...slides, ...added])
        }}
      />

      <label className="block text-sm text-[var(--color-ink)]">
        Ajouter une image déjà sur le site (dossier avis)
        <select
          className="mt-1 w-full max-w-xl rounded-xl border border-[var(--color-brand)]/20 bg-white px-3 py-2 text-sm"
          defaultValue=""
          onChange={(e) => {
            const v = e.target.value
            e.target.value = ''
            if (v) addFromKnownList(v)
          }}
        >
          <option value="">— Choisir un fichier…</option>
          {avisSiteFilenames.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </label>

      {slides.length > 0 ? (
        <ul className="space-y-4">
          {slides.map((row, i) => (
            <li
              key={i}
              className="rounded-xl border border-[var(--color-brand)]/15 bg-white/80 p-4"
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex h-28 w-full shrink-0 justify-center overflow-hidden rounded-lg border border-[var(--color-brand)]/10 bg-[var(--color-surface)] sm:h-32 sm:w-40">
                  {row.src.trim() ? (
                    <img src={row.src} alt="" className="max-h-full max-w-full object-contain" />
                  ) : (
                    <span className="self-center text-xs text-[var(--color-body)]/60">Aperçu</span>
                  )}
                </div>
                <div className="min-w-0 flex-1 space-y-3">
                  <label className="block text-xs font-medium text-[var(--color-ink)]">
                    Adresse de l’image
                    <input
                      value={row.src}
                      onChange={(e) => {
                        const next = [...slides]
                        next[i] = { ...next[i], src: e.target.value }
                        onChange(next)
                      }}
                      placeholder="/images/avis_site/nom.png ou collage après import"
                      className="mt-1 w-full rounded-lg border border-[var(--color-brand)]/20 px-2 py-2 font-mono text-xs"
                    />
                  </label>
                  <label className="block text-xs font-medium text-[var(--color-ink)]">
                    Texte alternatif (accessibilité)
                    <input
                      value={row.alt}
                      onChange={(e) => {
                        const next = [...slides]
                        next[i] = { ...next[i], alt: e.target.value }
                        onChange(next)
                      }}
                      className="mt-1 w-full rounded-lg border border-[var(--color-brand)]/20 px-2 py-2 text-sm"
                    />
                  </label>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="text-sm text-[var(--color-body)] hover:underline"
                  disabled={i === 0}
                  onClick={() => move(i, i - 1)}
                >
                  Monter
                </button>
                <button
                  type="button"
                  className="text-sm text-[var(--color-body)] hover:underline"
                  disabled={i === slides.length - 1}
                  onClick={() => move(i, i + 1)}
                >
                  Descendre
                </button>
                <button
                  type="button"
                  className="text-sm text-red-700 hover:underline"
                  onClick={() => onChange(slides.filter((_, j) => j !== i))}
                >
                  Retirer de la liste
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
