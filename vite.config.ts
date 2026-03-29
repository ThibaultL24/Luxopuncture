import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// vite.config.ts
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    /** Sous-domaines ngrok (le tunnel change d’URL à chaque démarrage). Préfixe "." = ce domaine et ses sous-domaines. */
    allowedHosts: ['.ngrok-free.app', '.ngrok.io', '.ngrok.app'],
  },
})
