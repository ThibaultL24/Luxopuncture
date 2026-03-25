/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_IDENTIFIER?: string
  readonly VITE_ADMIN_PASSWORD?: string
  /** POST JSON des événements analytics (optionnel) */
  readonly VITE_ANALYTICS_INGEST_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
