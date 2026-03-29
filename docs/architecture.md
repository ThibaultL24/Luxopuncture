# Architecture du projet — Laplace Luxopuncture

Documentation technique : **stack**, **structure du dépôt**, **flux de données**, **SEO**, **routes**, **déploiement**. Le **design et les tokens visuels** sont décrits dans [`ui-kit.md`](./ui-kit.md).

---

## 1. Stack technique

| Couche | Technologie |
|--------|-------------|
| UI | **React 19**, **TypeScript** |
| Build | **Vite 8** |
| Styles | **Tailwind CSS v4** (`@tailwindcss/vite`, `@theme` dans `src/index.css`) |
| Routing | **React Router v7** (`BrowserRouter`, routes dans `src/App.tsx`) |
| Icônes | **lucide-react** |
| Accessibilité | **@fontsource/opendyslexic** — toggle utilisateur (`localStorage`) |

**Pas de backend** dans ce dépôt : après `vite build`, le site est une **SPA statique** (HTML + JS + assets). L’admin et une partie du contenu vivent dans le **navigateur** (`localStorage`).

---

## 2. Arborescence du dépôt (`src/`)

```
src/
├── App.tsx                 # Routes publiques + `/admin/*` + redirections
├── main.tsx                # Point d’entrée React, providers (Admin, Accessibilité)
├── index.css               # `@theme`, reset, fond global, animations, grain, curseur
├── components/
│   ├── layout/             # SiteLayout, Navbar, Footer, BookingBar, …
│   ├── editorial/          # RevealOnScroll, SectionAtmosphere, SectionDivider, …
│   ├── ui/                 # SectionHeading, boutons, carrousels, …
│   ├── home/               # Blocs page d’accueil
│   ├── admin/              # Champs éditeur, sections, légende couleurs, …
│   └── seo/                # JsonLd, SiteGlobalJsonLd (JSON-LD Schema.org)
├── pages/                  # Une route publique = souvent une page ici
├── pages/admin/            # Écrans admin (blog, témoignages, tarifs, …)
├── contexts/               # AdminProvider — état éditable + session
├── hooks/                  # useAdmin, useSiteData, usePageTitle, …
├── data/                   # Contenu par défaut : site-content, media, publications, …
└── lib/                    # Types admin, merge JSON, analytics, schema-org, …
```

**`public/`** : fichiers servis tels quels (`favicon.svg`, `images/`, `_redirects` pour hébergeurs statiques).

---

## 3. Flux de données (contenu public)

1. **Défauts** : `src/data/site-content.ts`, `media.ts`, `publications.ts`, `partenariat-defaults.ts`, etc.
2. **État admin** (`AdminContext`) : fusionné avec les défauts via `mergeAdminState` / `mergeImportedAdminState` (`src/lib/admin-merge.ts`).
3. **Lecture côté pages** : `useSiteData()` (`src/hooks/use-admin.ts`) retourne l’état fusionné (textes, tarifs, programmes, blog, témoignages, coordonnées, etc.).
4. **Persistance** : champs éditables sauvegardés en **localStorage** (clé `laplace-admin-state-v1` dans `admin-types.ts`) — export JSON via le menu admin (`persistedAdminPayload` dans `admin-merge.ts`).

Les pages **accueil** (hero, homeCopy) et **à propos** (`aboutPage`) sont surtout pilotées par le **code** ; le reste est largement éditable dans `/admin`.

---

## 4. SEO & données structurées

- **JSON-LD** : `src/lib/schema-org.ts` (LocalBusiness, Organization, WebSite, WebPage, BlogPosting, fil d’Ariane).
- **Injection** : `SiteGlobalJsonLd` dans `site-layout.tsx` ; pages article dans `publication-detail-page.tsx`.
- **URL canonique** : `VITE_SITE_URL` (optionnel, `.env.example`) ou domaine dans `site` + `siteOrigin()`.

Les meta **Open Graph** / Twitter Cards ne sont pas centralisées dans ce dépôt ; le titre de page utilise `usePageTitle`.

---

## 5. Analytics

- **Fichiers** : `src/lib/analytics.ts`, `analytics-store.ts`, `analytics-types.ts`.
- **Événements** : vues de page, clics, envois de formulaire trackés — stockage local + envoi optionnel vers `VITE_ANALYTICS_INGEST_URL`.
- **Admin** : page **Métriques** — lecture / export / purge des événements locaux.

---

## 6. Contact

- Formulaire **FormSubmit** (`formsubmit.co`) dans `src/components/contact-form.tsx` — `POST` vers l’email des coordonnées (admin).

---

## 7. Routes principales

| Chemin | Rôle |
|--------|------|
| `/` | Accueil |
| `/cabinet` | Cabinet, luxopuncture (`#luxopuncture`) |
| `/programme`, `/programme/:slug` | Programme à distance + fiches programmes |
| `/tarifs` | Tarifs |
| `/temoignages` | Vidéos + avis + bandeau captures |
| `/publications`, `/publications/:slug` | Blog |
| `/recommandations` | Partenariat (alias `/partenariat` → redirection) |
| `/a-propos`, `/contact` | Praticienne, contact |
| `/admin/login`, `/admin/*` | Connexion, édition (hors layout public) |

---

## 8. Redirections de routes (compatibilité liens)

Ces règles sont définies dans **`src/App.tsx`** (`<Navigate replace />`). Elles ne chargent **aucun contenu obsolète** : elles envoient simplement le visiteur vers l’**URL actuelle** du site si quelqu’un ouvre encore un **vieux favori**, un lien partagé ou une URL d’une ancienne version (ex. quand les chemins ont été renommés).

| URL demandée | Redirection vers |
|--------------|------------------|
| `/luxopuncture` | `/cabinet#luxopuncture` |
| `/partenariat` | `/recommandations` |
| `/prestations` | `/programme` |
| `/prestations/:slug` | `/programme/:slug` |
| route inconnue (hors admin) | `/` |

---

## 9. Parcours visiteur (condensé)

- **Accueil** : hero détox, accroches, témoignages, teaser cabinet, CTA bilan offert.
- **Programme / programmes** : détail à distance + fiches objectifs (poids, tabac, stress, ménopause…).
- **Cabinet** : cartes programmes, explication luxopuncture, CTA.
- **Conversion** : tarifs transparents, témoignages, contact, formulaire, barre mobile « bilan offert ».

---

## 10. Build & déploiement

```bash
npm install
npm run dev      # Vite dev
npm run build    # tsc + vite build → dist/
npm run preview  # sert dist/ en local
npm run lint     # ESLint
```

- **Hébergement statique** : déployer le contenu de **`dist/`**.
- **SPA** : `public/_redirects` (Netlify / Cloudflare Pages), `vercel.json` (Vercel) pour renvoyer `index.html` sur les routes profondes.

---

## 11. Variables d’environnement (Vite)

Préfixe **`VITE_`** — injectées au **build**. Voir **`.env.example`** : admin, analytics, `VITE_SITE_URL`.

---

## 12. Fichiers clés

| Fichier | Rôle |
|---------|------|
| `src/App.tsx` | Table des routes |
| `src/components/layout/site-layout.tsx` | Shell public, JSON-LD global, grain, curseur |
| `src/index.css` | Tokens, fond, animations, accessibilité |
| `src/lib/schema-org.ts` | Schémas JSON-LD |
| `src/lib/admin-merge.ts` | Fusion persistance / import |
| `vite.config.ts` | Plugins Vite, `server.allowedHosts` (ngrok) |

---

*Document à faire évoluer avec les changements de routes ou de persistance admin.*
