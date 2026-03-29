# Kit UI & design — Laplace Luxopuncture

Référence **direction artistique** : **couleurs**, **typographie**, **CSS**, **composants**, **effets** et **principes de cohérence**. Les valeurs numériques (hex, rayons) proviennent de `src/index.css` (`@theme`).

L’**architecture technique** du dépôt est décrite dans [`architecture.md`](./architecture.md).

---

## 1. Identité visuelle

| Aspect | Choix |
|--------|--------|
| **Ambiance** | Bien-être, naturel, professionnel — verts profonds (chrome), beiges chauds légèrement rosés, **pas** de « clinique froide ». |
| **Contraste** | Texte sur fond crème lisible ; **actions** via un vert **CTA** distinct du vert **brand** (barre nav / footer). |
| **Forme** | Coins arrondis : `rounded-full` (boutons), `rounded-2xl` / `rounded-3xl` (cartes, blocs). |
| **Mise en page** | Contenu centré, **`max-w-6xl`** (`72rem`), marges `px-4` → `sm:px-6`, sections verticales `py-16`–`py-24`. |

---

## 2. Typographie

| Rôle | Police | Variable CSS |
|------|--------|----------------|
| Titres (display) | **Cormorant Garamond** | `--font-display` |
| Corps & UI | **DM Sans** | `--font-sans` (défaut `body`) |
| Option dyslexie | **OpenDyslexic** (remplace display + sans) | `html[data-dyslexic-font='true']` |

**Chargement** : Google Fonts (Cormorant + DM Sans) dans `index.html` ; OpenDyslexic via `@fontsource` dans `main.tsx`.

**Échelle indicative** : hero en `font-display` `text-4xl` → `lg:text-[3.25rem]` ; `SectionHeading` en display `text-3xl` → `lg:text-[2.75rem]` ; eyebrow en `text-xs`, `uppercase`, `tracking-[0.2em]`, couleur accent.

---

## 3. Palette de couleurs (`@theme` dans `index.css`)

Les couleurs sont exposées en **variables CSS** et utilisées en Tailwind via `text-[var(--color-ink)]`, `bg-[var(--color-brand)]`, etc. (ou extensions si configurées).

### Fonds & surfaces

| Token | Hex (réf.) | Usage |
|-------|--------------|--------|
| `--color-page` | `#faf6f2` | Fond « page » dans le dégradé |
| `--color-beige` | `#efe5df` | Zone beige du dégradé |
| `--color-beige-deep` | `#dcc9c0` | Extrémité chaude du dégradé |
| `--color-beige-shadow` | `#c4a898` | Taupe rosé (référence extrême) |
| `--color-beige-rose-end` | `#d4b8a8` | Fin du dégradé horizontal |
| `--color-surface` | `#ffffff` | Cartes, encarts blancs |
| `--color-surface-rose` | `#f8f6f1` | Fonds rosé très léger |
| `--color-muted-green` | `#e3f0ed` | Halos, bandes douces |

### Chrome (navigation & footer)

| Token | Hex | Usage |
|-------|-----|--------|
| `--color-brand` | `#23413b` | Nav, footer, texte sur fond sombre |
| `--color-brand-mid` | `#2f5a52` | Survols, focus, dégradés CTA |
| `--color-brand-dark` | `#1a322e` | Renforcement (ex. menu mobile) |

### Actions (CTA)

| Token | Hex | Usage |
|-------|-----|--------|
| `--color-cta` | `#3ddc84` | Bouton principal, lien actif fort |
| `--color-cta-hover` | `#2aa86a` | Survol |
| `--color-on-cta` | `#0a1f1c` | Texte sur bouton CTA |

### Texte & accents

| Token | Hex | Usage |
|-------|-----|--------|
| `--color-ink` | `#0f2523` | Titres, texte fort |
| `--color-body` | `#3d4a48` | Corps de texte |
| `--color-accent` | `#a68b6a` | Eyebrows, filets, détails |

### Plume / identité rose (logo, admin, curseur)

| Token | Hex | Usage |
|-------|-----|--------|
| `--color-logo-feather` | `#e86888` | Référence teinte plume |
| `--color-logo-feather-mid` | `#d45078` | Variantes |
| `--color-logo-feather-deep` | `#a83858` | Variantes |
| `--logo-png-filter` | `saturate(0.62) brightness(1.045)` | Classe `.logo-laplace` sur le PNG navbar |

### Ombre & rythme

| Token | Rôle |
|-------|------|
| `--shadow-soft` | Double couche (teinte brand + noir léger) — ombres cartes |
| `--radius-sm` … `--radius-xl` | `0.75rem` → `2rem` |
| `--spacing-section` | `5rem` — rythme vertical entre grandes sections |

---

## 4. Fond de page (dégradé fixe)

- **Un seul** dégradé horizontal, **fixe** (`body::before`, `z-index: -1`), défini par `--page-bg-gradient` : blanc → crème → beige → rose-beige.
- **Pas** d’alternance de fond par section : le contenu est en `background: transparent` ; seules **cartes** et **blocs** apportent une surface opaque (`--color-surface`, etc.).

---

## 5. Grain & effets de surface

| Élément | Implémentation |
|---------|----------------|
| **Grain** | Classe `.site-grain` sur `<main>` : `::after` avec `repeating-linear-gradient`, opacité très faible, léger bruit visuel. |
| **Glass** | `.glass-soft` : blanc semi-transparent + `backdrop-filter: blur` (désactivé si `prefers-reduced-motion` / pas de blur forcé). |

---

## 6. Animations & éditorial

### Reveal au scroll (`RevealOnScroll` + composants editorial)

Classes CSS dans `index.css` :

- `.reveal` + variantes : `reveal--fade-up`, `reveal--fade`, `reveal--slide-left`, `reveal--slide-right`, `reveal--scale`
- Transition `opacity` + `transform` ; état visible `.reveal--visible`
- **`prefers-reduced-motion: reduce`** : passages en visible sans animation

### SectionAtmosphere (`SectionAtmosphere`)

Fonds de section alternés (variants `soft`, `medium`, diagonal) pour structurer visuellement sans changer le dégradé global de page.

### Banderole d’avis (`reviews-marquee`)

- `@keyframes reviews-marquee` — translation horizontale, durée ~55s, linéaire, infini
- `.reviews-marquee-track:hover` → `animation-play-state: paused`

### Curseur plume (`FeatherCursor` + `FeatherTrailBackground`)

- Canvas / overlay sur le site **public** uniquement
- `html[data-feather-cursor]` → curseur natif masqué ; exceptions pour lightbox avis (curseur normal)
- **Admin** : pas de curseur plume

---

## 7. Composants récurrents (patterns)

### Boutons

- **Primaire** : `rounded-full`, `bg-[var(--color-cta)]`, `text-[var(--color-on-cta)]`, `font-bold`, hover `hover:bg-[var(--color-cta-hover)]`
- **Secondaire** : bordure `brand`, fond blanc / semi-transparent

### `SectionHeading`

Surtitre (eyebrow) optionnel en accent, titre display, sous-titre optionnel ; souvent centré, `max-w-3xl`.

### Cartes

- `rounded-2xl`, `border` vert léger, `bg-[var(--color-surface)]` ou blanc, `shadow-sm` ou `shadow-[var(--shadow-soft)]`

### Navigation

- Fond `--color-brand`, texte clair ; lien actif = **pilule** avec fond `--color-cta` et `--color-on-cta`

### Bandeau CTA pleine largeur

- Dégradé `brand-mid` → `brand` → `brand-dark`, texte blanc, titre en `font-display`

### Icônes

- **Lucide React** — tailles courantes `h-4 w-4` à `h-6 w-6`

---

## 8. Images

- Photos : souvent `object-cover` dans cadres arrondis ; hero avec coins arrondis larges.
- Captures d’avis : `object-contain` pour préserver la lecture du texte.

---

## 9. Accessibilité

- **Focus** : `:focus-visible` — contour `brand-mid` ; dans le **header** (fond sombre), outline **CTA** pour contraste.
- **Dyslexie** : toggle → `data-dyslexic-font` sur `<html>`.
- **Mouvement réduit** : reveals et glass adaptés (voir sections ci-dessus).

---

## 10. Espace admin (shell)

- `.admin-shell` : fond `--color-surface-rose` + léger **radial-gradient** vert
- `.admin-input` : champs formulaire cohérents avec la palette admin (bordures `brand` douces)

---

## 11. Principes pour rester cohérent

1. Ne pas introduire de **nouvelle couleur de marque** hors palette (brand / CTA / beige / accent).
2. Réserver le **vert CTA** aux actions principales — pas pour de grands aplats de fond.
3. **Titres** : rester sur **Cormorant Garamond** pour les H1–H2 de marque.
4. **Espacements** : privilégier `max-w-6xl` + rythme vertical homogène entre sections.
5. **Contraste** : `body` sur fond page ; `on-cta` sur boutons CTA.

---

## 12. Fichiers sources utiles

| Fichier | Rôle |
|---------|------|
| `src/index.css` | `@theme`, `body::before`, animations, reveal, marquee, grain, curseur |
| `index.html` | Polices Google, meta de base |
| `src/components/ui/section-heading.tsx` | Titres de section |
| `src/components/layout/site-layout.tsx` | Shell, grain, JSON-LD, curseur |
| `src/components/editorial/` | Reveal, sections, dividers |

---

*Document à mettre à jour lorsque de nouveaux tokens ou composants sont ajoutés.*
