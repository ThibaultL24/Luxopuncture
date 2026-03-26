import '@fontsource/opendyslexic/400.css'
import '@fontsource/opendyslexic/700.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AccessibilityProvider } from './contexts/accessibility-context'
import { AdminProvider } from './contexts/admin-context'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AccessibilityProvider>
      <AdminProvider>
        <App />
      </AdminProvider>
    </AccessibilityProvider>
  </StrictMode>,
)
