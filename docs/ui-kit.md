# Kit UI — Laplace Luxopuncture

Document de référence pour la direction artistique et les patterns d’interface du site. Les valeurs ci‑dessous proviennent de `src/index.css` et des composants existants.

---

## 1. Identité visuelle

| Aspect | Choix |
|--------|--------|
| **Ambiance** | Bien‑être, naturel, professionnel rassurant — verts profonds, beiges chauds, sans froideur clinique. |
| **Contraste** | Le texte courant reste lisible sur fond crème ; les **actions** passent par un vert vif (`CTA`) pour se détacher du vert « chrome » (`brand`). |
| **Forme** | Beaucoup de **coins arrondis** (`rounded-full` pour les boutons, `rounded-2xl` / `rounded-3xl` pour cartes et blocs). |
| **Mise en page** | Contenu centré, **`max-width: 72rem`** (`max-w-6xl`), marges latérales **`px-4` → `sm:px-6`**. |

---

## 2. Palette de couleurs

Les couleurs sont déclarées en variables CSS dans `@theme` (`src/index.css`) et utilisées via `var(--color-*)` dans les composants.

### Fonds & surfaces

| Token | Hex | Usage |
|-------|-----|--------|
| `--color-page` | `#f8f6f1` | Fond principal de la page (blanc cassé / crème). |
| `--color-beige` | `#ebe7df` | Surfaces secondaires, zones douces. |
| `--color-beige-deep` | `#d6cfc2` | Variante plus marquée si besoin de relief. |
| `--color-muted-green` | `#e3f0ed` | Bandes ou cartes très légères, halos du hero. |

### Marque (chrome)

| Token | Hex | Usage |
|-------|-----|--------|
| `--color-brand` | `#0f3d3a` | Barre de navigation, pied de page, textes sur fond sombre. |
| `--color-brand-mid` | `#165a54` | Dégradés (bannière CTA, etc.). |
| `--color-brand-dark` | `#0a2c2a` | Renforcement (ex. menu mobile). |

### Actions (CTA)

| Token | Hex | Usage |
|-------|-----|--------|
| `--color-cta` | `#3ddc84` | Bouton principal, lien actif dans la nav — vert **plus organique** que le néon type SaaS. |
| `--color-cta-hover` | `#2aa86a` | Survol : un cran plus soutenu, toujours naturel. |
| `--color-on-cta` | `#0a1f1c` | Texte sur bouton CTA (contraste sur vert clair). |

### Texte & accent

| Token | Hex | Usage |
|-------|-----|--------|
| `--color-ink` | `#0f2523` | Titres, texte fort. |
| `--color-body` | `#3d4a48` | Corps de texte, paragraphes. |
| `--color-accent` | `#a68b6a` | Surtitre / « eyebrow » + **ligne de séparation** légère sous l’eyebrow (`SectionHeading`) pour ancrer l’accent dans la mise en page. |

### Ombre

| Token | Valeur | Usage |
|-------|--------|--------|
| `--shadow-soft` | double couche (teinte brand + noir très léger) | Ombre plus **diffuse et naturelle** que l’ombre unique forte. |

### Rayons & espacement (tokens optionnels)

| Token | Valeur | Usage |
|-------|--------|--------|
| `--radius-sm` … `--radius-xl` | `0.75rem` → `2rem` | Cartes, blocs — à réutiliser progressivement dans les composants. |
| `--spacing-section` | `5rem` | Rythme vertical type entre grandes sections. |

---

## 3. Typographie

| Rôle | Police | Chargement |
|------|--------|------------|
| **Titres** (display) | **Cormorant Garamond** — `font-display` | Google Fonts : 500, 600, 700 + italique 500 |
| **Interface & texte** | **DM Sans** — `font-sans` (défaut `body`) | Google Fonts : 400, 500, 600 |

### Échelle indicative

- **Hero** : `font-display`, `text-4xl` → `sm:text-5xl` → `lg:text-[3.25rem]`, `font-semibold`.
- **Titres de section** (`SectionHeading`) : `text-3xl` → `sm:text-4xl` → `lg:text-[2.75rem]`.
- **Surtitre (eyebrow)** : `text-xs`, `font-semibold`, `uppercase`, `tracking-[0.2em]` à `0.25em`, couleur `accent`.
- **Sous-titre de section** : `text-lg`, `leading-relaxed`, `text-[var(--color-body)]/90`.

---

## 4. Composants récurrents

### Bouton principal

- `rounded-full`, `bg-[var(--color-cta)]`, `text-[var(--color-on-cta)]`, `font-bold`, `text-sm`, padding type `px-8 py-3.5`.
- Hover : `hover:bg-[var(--color-cta-hover)]`, souvent `hover:text-white`.
- Ombre optionnelle : `shadow-[var(--shadow-soft)]`.

### Bouton secondaire

- `rounded-full`, `border border-[var(--color-brand)]/25`, fond `bg-white/90`, `backdrop-blur`, texte `ink`.
- Hover : bordure renforcée, fond plus opaque.

### Titres de section

- Composant `SectionHeading` : surtitre optionnel (accent), titre display (ink), sous-titre optionnel. Alignement par défaut **centré**, `max-w-3xl`.

### Cartes de contenu

- Souvent : `rounded-2xl`, `border border-[var(--color-brand)]/10`, fond `white` ou `bg-[var(--color-page)]`, `shadow-sm`.

### Barre de navigation

- Fond `brand`, texte blanc ; lien actif = **pill** avec fond `cta` et texte `on-cta`.
- CTA « Réserver » : même style que le bouton principal.

### Bandeau CTA pleine largeur

- Dégradé `from brand-mid via brand to brand-dark`, texte blanc, titre en `font-display`, bouton CTA identique au primaire.

### Banderole d’avis (captures)

- Piste en flex + animation `reviews-marquee` (~55 s, linéaire, infini) ; pause au survol (`animation-play-state: paused`).

---

## 5. Iconographie

- Icônes : **Lucide React** (`lucide-react`), taille souvent `h-4 w-4` à `h-5 w-5`, couleur héritée ou `text-[var(--color-cta-hover)]` pour les étoiles.

---

## 6. Images

- Photos : `object-cover` dans des cadres arrondis ; hero avec `rounded-[2rem]` et léger dégradé sombre en bas pour légende.
- Captures d’avis : `object-contain` dans des cartes étroites pour préserver la lecture du texte sur l’image.

---

## 7. Principes à respecter pour rester cohérent

1. **Ne pas introduire** de nouvelle couleur de marque forte hors de la palette (garder le duo vert profond + vert CTA + beige).
2. **Reserver le CTA vert** aux actions principales (réserver, contact, lien actif important) — éviter de l’utiliser pour de gros aplats de fond.
3. **Titres** : toujours en **Cormorant Garamond** — ne pas mélanger une autre serif pour les H1–H2.
4. **Espacements** : privilégier la grille `max-w-6xl` + `py-16` / `py-20` / `py-24` pour les sections verticales.
5. **Accessibilité** : conserver des contrastes suffisants (texte `body` sur `page` ; boutons CTA avec `on-cta`).
6. **Focus clavier** : `focus-visible` — contour `brand-mid` sur le contenu clair, **`cta` dans le `<header>`** (fond sombre) ; boutons `disabled` atténués.

---

## 8. Conversion & contenu (hors pure DA)

Checklist produit — le design soutient, le **message** convertit :

| Levier | Vérification |
|--------|----------------|
| Hero | Bénéfice lisible en une phrase + CTA principal au-dessus de la ligne de flottaison. |
| Répétition | CTA « Réserver / Contact » visible après scroll (bandeau, footer). |
| Preuve | Témoignages (captures + vidéos) accessibles depuis l’accueil. |
| Friction | Parcours contact simple, peu de champs inutiles. |

---

## 9. Fichiers sources utiles

| Fichier | Rôle |
|---------|------|
| `src/index.css` | Tokens `@theme`, animation banderole, styles de base. |
| `index.html` | Chargement des polices Google. |
| `src/components/ui/section-heading.tsx` | Pattern titre de section. |
| `src/components/home/hero-section.tsx` | Hero, CTA, gradient de fond. |
| `src/components/layout/navbar.tsx` | Navigation et états actifs. |

---

## 10. Note de synthèse (review produit)

Direction artistique et **système** (tokens, séparation brand / CTA, doc) sont au niveau « site vitrine premium ». Le prochain palier est surtout **conversion** : hiérarchie du hero, répétition des CTA, preuves sociales et friction contact — itérer avec tests utilisateurs ou analytics plutôt que seulement la palette.

---

*Ce document peut être mis à jour lorsque de nouveaux tokens ou composants sont ajoutés au projet.*
