# Design général & parcours des pages — Laplace Luxopuncture

Ce document décrit les choix de design du site (couleurs, typo, mise en page) puis présente **chaque page** et son rôle dans le parcours visiteur. Il s’appuie sur l’état actuel du code (`src/index.css`, `SiteLayout`, pages).

---

## 1. Identité visuelle

- **Ambiance** : apaisante, naturelle, professionnelle — dominante **vert profond** pour le chrome (navigation, pied de page), **beiges chauds légèrement rosés** pour le fond de page, **vert vif organique** pour les actions principales.
- **Lecture** : texte corps en gris-vert (`--color-body`), titres en vert très foncé (`--color-ink`), titres de section en serif display pour une touche élégante.
- **Contraste** : les **cartes et boutons secondaires** utilisent du **blanc** (`--color-surface`) ou un **rosé très léger** (`--color-surface-rose`) pour se détacher nettement du **dégradé** de fond, sans bandes alternées de couleur d’une section à l’autre.

---

## 2. Typographie

| Usage | Police | Fichier / variable |
|--------|--------|---------------------|
| Titres, accroches | **Cormorant Garamond** (serif) | `--font-display` |
| Texte courant, UI | **DM Sans** (sans-serif) | `--font-sans` |

Les titres de page et les `SectionHeading` s’appuient sur la serif ; le reste du contenu est en DM Sans pour la lisibilité.

---

## 3. Couleurs (tokens principaux)

| Token | Rôle |
|--------|------|
| `--color-brand` | Fond barre de navigation et pied de page (vert bleuté profond, aligné sur le bandeau « trois plumes »). |
| `--color-brand-mid` / `--color-brand-dark` | Variantes pour survols, focus, menu mobile. |
| `--color-cta` / `--color-cta-hover` | Boutons d’action principale (ex. Réserver, liens forts). |
| `--color-on-cta` | Texte sur bouton CTA. |
| `--color-accent` | Détails, filets, libellés discrets. |
| `--color-beige`, `--color-beige-deep`, `--color-beige-shadow` | Palette du **dégradé horizontal** de fond. |
| `--color-surface` | Blanc des cartes / encarts. |
| `--color-surface-rose` | Rosé très léger (zones secondaires, vignettes). |

Les beiges de fond sont **chauds et légèrement rosés**, pour éviter un rendu gris-vert froid.

---

## 4. Fond de page (dégradé fixe)

- Le fond n’est **pas** recréé par section : une couche **`body::before`** en `position: fixed` affiche un **seul** dégradé horizontal (**blanc → beige → beige plus soutenu**), identique au scroll.
- Le **contenu** des pages est en `background: transparent` pour laisser voir ce dégradé ; seules les **cartes**, **figures** et **blocs** portent une surface opaque (blanc / rosé).

---

## 5. Composants de mise en page globale

- **Barre de navigation** : sticky, fond `--color-brand`, logo unique **`/images/logo-laplace-luxopuncture.png`** (texte + plume intégrés), liens en pastilles (actif = fond CTA). Même ressource en pied de page.
- **Pied de page** : même vert, liens utiles, coordonnées, réseaux.
- **Barre mobile « Bilan offert — contact »** (`BookingBar`) : pastille fixe en bas d’écran (petits écrans uniquement), lien vers `/contact`.
- **Curseur personnalisé** (`FeatherCursor`) : plume qui suit la souris (desktop / pointeur fin uniquement), avec traînée et léger mouvement — **désactivé** sur l’admin.

---

## 6. Patterns UI récurrents

- **Cartes** : souvent `rounded-2xl`, `border` vert léger, `bg-[var(--color-surface)]`, `shadow-sm` ou `shadow-soft`.
- **Titres de section** : composant `SectionHeading` (titre + sous-titre).
- **Bandeau d’avis** : carrousel horizontal infini (`WrittenReviewsMarquee`), cartes blanches sur le fond dégradé.

---

## 7. Tour des pages (parcours public)

### Accueil — `/`

**Objectif** : présenter l’offre, créer le lien émotionnel, orienter vers le programme à distance, le cabinet et le contact.

**Blocs (dans l’ordre)** :

1. **Hero** — Accroche « Programme à distance », titre « Détox 21 jours », texte descriptif, boutons *Prendre rendez-vous* (contact) et *Découvrir le programme à distance*, photo, réseaux sociaux.
2. **Accroche narrative** — « Vous avez l’impression de faire attention… » (hook émotionnel).
3. **Détox** — « C’est là qu’intervient la détox » + liste de bénéfices + lien vers le programme.
4. **À distance (brief)** — Résumé de l’accompagnement 21 jours + lien « En savoir plus ».
5. **Témoignages** — Bandeau d’avis + lien vers la page témoignages.
6. **Teaser cabinet** — Vidéo / entrée vers le cabinet.
7. **Bandeau CTA final** — Bloc vert fondu vers *Réserver votre bilan offert* (contact).

---

### À distance (programme détox 21 j.) — `/programme`

**Objectif** : détailler le programme à distance (contenu riche : bénéfices, déroulé, FAQ).

**Contenu typique** : en-tête avec photo, titre/sous-titre, CTA bilan offert ; sections « accompagnement à distance », bénéfices, déroulé, approche, pour qui, modalités tarifaires (renvoi tarifs), FAQ accordéon, CTA contact.

---

### Fiche programme thématique (cabinet) — `/programme/:slug`

**Objectif** : page dédiée à un objectif (ex. perte de poids, tabac, ménopause…) avec galerie d’images, texte depuis les données « services », liens vers contact / liste des programmes.

**Slugs** : issus des services définis côté données (ex. `poids`, `tabac`, `stress`, `menopause`).

---

### Cabinet & luxopuncture — `/cabinet`

**Objectif** : présenter les accompagnements au cabinet, puis **expliquer la luxopuncture** (fusion de l’ancienne page « Luxopuncture »).

**Contenu** : grille de cartes vers les fiches `/programme/:slug`, bloc détaillé luxopuncture + machine + comparaisons + hypnose + carrousel d’images explicatives, anc **`#luxopuncture`** pour les liens directs, CTA vers « À distance » et contact, bandeau d’avis écrits.

**Redirection** : `/luxopuncture` → `/cabinet#luxopuncture` (anciens favoris).

---

### Tarifs — `/tarifs`

**Objectif** : transparence tarifaire (programme à distance, suivi, séances cabinet).

**Contenu** : illustration, blocs structurés (prix, listes « comprend », séances cabinet, infos complémentaires), liens utiles vers contact / programme.

---

### Témoignages — `/temoignages`

**Objectif** : preuve sociale — vidéos + avis écrits en carrousel.

**Contenu** : grille de témoignages vidéo, section avis écrits (`WrittenReviewsMarquee`).

---

### À propos — `/a-propos`

**Objectif** : présenter la praticienne (bio, photo, réseaux, formations).

**Contenu** : texte modulaire depuis `aboutPractitioner`, encart formations, lien contact.

---

### Partenariat — `/partenariat`

**Objectif** : espace pour partenaires et réseaux (contenu évolutif).

**Contenu** : sections « Produits partenaires » et « Réseaux » (placeholder + `SocialLinks`).

---

### Contact — `/contact`

**Objectif** : convertir — prise de rendez-vous, bilan offert, coordonnées, agenda, formulaire.

**Contenu** : rappel du bilan offert, boutons appel / formulaire, visuel agenda, coordonnées, réseaux, bloc formulaire (ancre `#formulaire`).

---

### Blog (publications) — `/publications`

**Objectif** : liste des articles triés par date.

**Contenu** : cartes avec image de couverture ou placeholder, extrait, lien vers l’article.

---

### Article — `/publications/:slug`

**Objectif** : lecture d’un article (titre, date, image, corps HTML/Markdown selon implémentation).

---

### Admin (hors parcours visiteur) — `/admin/login`, `/admin`

Édition du contenu (publications, témoignages, textes, tarifs JSON, etc.) — **sans** curseur plume, interface dédiée.

---

## 8. Redirections utiles

| Ancienne URL | Comportement |
|----------------|---------------|
| `/luxopuncture` | → `/cabinet#luxopuncture` |
| `/prestations` | → `/programme` |
| `/prestations/:slug` | → `/programme/:slug` |
| route inconnue | → `/` |

---

## 9. Fichiers clés à connaître

| Fichier | Rôle |
|---------|------|
| `src/index.css` | Tokens couleur, typo, dégradé fixe, animations marquee. |
| `src/components/layout/site-layout.tsx` | Shell : curseur, navbar, main, footer, booking bar. |
| `src/data/site-content.ts` | Textes marketing (hero, programmes, tarifs, etc.). |
| `src/data/media.ts` | Chemins des images par page. |
| `src/App.tsx` | Table des routes. |

---

*Document généré pour l’équipe et la maintenance — à faire évoluer si le design ou les routes changent.*
