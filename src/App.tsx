// src/App.tsx
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { SiteLayout } from './components/layout/site-layout'
import { AProposPage } from './pages/a-propos-page'
import { ContactPage } from './pages/contact-page'
import { HomePage } from './pages/home-page'
import { LuxopuncturePage } from './pages/luxopuncture-page'
import { ProgrammeDetailPage } from './pages/programme-detail-page'
import { ProgrammePage } from './pages/programme-page'
import { PublicationDetailPage } from './pages/publication-detail-page'
import { PublicationsPage } from './pages/publications-page'
import { TarifsPage } from './pages/tarifs-page'
import { TemoignagesPage } from './pages/temoignages-page'
import { RequireAdmin } from './components/admin/require-admin'
import { AdminDashboardPage } from './pages/admin/admin-dashboard-page'
import { AdminLoginPage } from './pages/admin/admin-login-page'

function RedirectPrestationSlugToProgramme() {
  const { slug } = useParams()
  if (!slug) return <Navigate to="/programme" replace />
  return <Navigate to={`/programme/${slug}`} replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="admin/login" element={<AdminLoginPage />} />
        <Route
          path="admin"
          element={
            <RequireAdmin>
              <AdminDashboardPage />
            </RequireAdmin>
          }
        />
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="luxopuncture" element={<LuxopuncturePage />} />
          <Route path="programme" element={<ProgrammePage />} />
          <Route path="programme/:slug" element={<ProgrammeDetailPage />} />
          <Route path="publications" element={<PublicationsPage />} />
          <Route path="publications/:slug" element={<PublicationDetailPage />} />
          <Route path="tarifs" element={<TarifsPage />} />
          <Route path="temoignages" element={<TemoignagesPage />} />
          <Route path="a-propos" element={<AProposPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="prestations" element={<Navigate to="/programme" replace />} />
          <Route path="prestations/:slug" element={<RedirectPrestationSlugToProgramme />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
