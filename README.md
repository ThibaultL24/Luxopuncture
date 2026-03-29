# Laplace Luxopuncture — site vitrine

Site web pour **Camille Laplace**, luxothérapeute et hypnothérapeute à **Avignon**. Il présente la **luxopuncture** (méthode douce sans aiguilles), les **programmes** au cabinet (perte de poids, tabac, stress, ménopause, etc.), le **programme détox 21 jours à distance**, les **tarifs**, les **témoignages** (vidéos et avis), le **blog** / publications, la page **partenariat / recommandations**, et les **coordonnées** avec formulaire de contact.

Domaine de référence : **laplaceluxopuncture.fr** (configurable dans les textes / admin).

---

## Stack technique

| Élément | Choix |
|--------|--------|
| UI | **React 19**, **TypeScript** |
| Build | **Vite 8** |
| Styles | **Tailwind CSS v4** (`@tailwindcss/vite`) |
| Routing | **React Router v7** (`BrowserRouter`, routes déclarées dans `src/App.tsx`) |
| Icônes | **lucide-react** |
| Police accessibilité | **@fontsource/opendyslexic** (option utilisateur) |

Pas de backend dédié : application **100 % statique** après `vite build` ; l’admin et les contenus éditables reposent sur le **navigateur** (voir ci‑dessous).

---

## Architecture du dépôt

```
src/
├── App.tsx                 # Routes publiques + routes /admin + redirections (prestations → programme, etc.)
├── main.tsx
├── index.css               # Design tokens, thème, grain
├── components/             # UI réutilisable (layout, editorial, admin, home, …)
├── pages/                  # Une page = une route (ex. home-page, tarifs-page, admin/*)
├── contexts/               # AdminProvider — état global admin + session
├── hooks/                  # use-admin (données site), use-page-title, …
├── data/                   # Contenu par défaut : site-content.ts, media.ts, publications.ts, …
└── lib/                    # Types admin, fusion JSON, analytics, merge des imports
```

### Contenu public

- **`src/data/site-content.ts`** — textes marketing, programmes (`services`), page tarifs (`tarifsPageSpec`), accueil (`homeCopy`), à propos, contact, etc.
- **`src/data/media.ts`** — chemins vers fichiers dans `public/images/` (photos, vidéos témoignages, bandeaux).
- **`public/images/`** — médias servis tels quels (y compris `témoignages/*.mp4`).

Les pages consomment ces données via **`useSiteData()`** (`src/hooks/use-admin.tsx`), qui part de l’état admin fusionné avec les défauts.

### Zone `/admin`

- **Authentification** : login sur `/admin/login` ; session en **sessionStorage** ; identifiants surchargeables par **`VITE_ADMIN_IDENTIFIER`** et **`VITE_ADMIN_PASSWORD`** (voir `.env.example`).
- **Persistance** : état éditable sérialisé en **localStorage** (clé définie dans `src/lib/admin-types.ts`), fusionné avec **`getDefaultAdminState()`** (`src/lib/admin-defaults.ts`) pour rester compatible après évolutions du schéma.
- **Import / export JSON** : sauvegarde et restauration du contenu depuis l’interface admin (`mergeImportedAdminState` dans `src/lib/admin-merge.ts`).

### Analytics

- Suivi de navigation léger côté client (`AnalyticsRouteTracker`, `src/lib/analytics*.ts`) ; URL d’ingestion optionnelle via **`VITE_ANALYTICS_INGEST_URL`**.

### Contact

- Formulaire sur **`/contact`** : envoi via **FormSubmit** (`formsubmit.co`) vers l’e-mail des coordonnées (pas de SMTP dans le repo). Premier envoi : validation par e-mail côté FormSubmit.

---

## Routes principales (aperçu)

| Chemin | Rôle |
|--------|------|
| `/` | Accueil |
| `/cabinet` | Cabinet, luxopuncture au cabinet |
| `/programme`, `/programme/:slug` | Liste et détail des accompagnements |
| `/tarifs` | Tarifs distance + cabinet |
| `/temoignages` | Vidéos + avis texte + bandeau captures |
| `/publications`, `/publications/:slug` | Blog / articles |
| `/recommandations` | Partenariat (alias `/partenariat` → redirection) |
| `/a-propos`, `/contact` | Praticienne, contact |
| `/admin/login` | Connexion |
| `/admin/*` | Édition contenu (accueil, coordonnées, programmes, blog, témoignages, métriques, …) |

---

## Prérequis

- **Node.js** (LTS recommandé)
- **npm**, **pnpm** ou **yarn**

## Scripts

```bash
npm install
npm run dev      # serveur de dev (Vite)
npm run build    # tsc + build production → dossier dist/
npm run preview  # sert dist/ en local
npm run lint     # ESLint
```

## Variables d’environnement

Copier `.env.example` vers `.env.local` et renseigner si besoin :

- `VITE_ADMIN_IDENTIFIER` / `VITE_ADMIN_PASSWORD` — admin en production (**à définir** ; ne pas laisser les valeurs par défaut du code en prod).
- `VITE_ANALYTICS_INGEST_URL` — optionnel.

Les variables **`VITE_*`** sont injectées au **build** ; les modifier nécessite un **nouveau build** sur l’hébergeur.

## Déploiement

1. `npm run build`
2. Publier le contenu de **`dist/`** sur un hébergement statique (Netlify, Cloudflare Pages, Vercel, S3+CloudFront, etc.).

Fichiers présents pour le routage SPA (rechargement des URLs profondes) :

- **`public/_redirects`** — copié dans `dist/` (Netlify, Cloudflare Pages).
- **`vercel.json`** — réécritures pour Vercel.

---

## Documentation interne

Le fichier `docs/design-et-parcours-pages.md` décrit le parcours et les pages si besoin de contexte produit plus détaillé.
