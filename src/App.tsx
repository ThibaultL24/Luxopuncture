// src/App.tsx
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { SiteLayout } from './components/layout/site-layout'
import { AProposPage } from './pages/a-propos-page'
import { ContactPage } from './pages/contact-page'
import { HomePage } from './pages/home-page'
import { ProgrammeDetailPage } from './pages/programme-detail-page'
import { ProgrammePage } from './pages/programme-page'
import { PublicationDetailPage } from './pages/publication-detail-page'
import { PartenariatPage } from './pages/partenariat-page'
import { PublicationsPage } from './pages/publications-page'
import { TarifsPage } from './pages/tarifs-page'
import { CabinetPage } from './pages/cabinet-page'
import { TemoignagesPage } from './pages/temoignages-page'
import { RequireAdmin } from './components/admin/require-admin'
import { AdminLayout } from './pages/admin/admin-layout'
import { AdminIndexPage } from './pages/admin/admin-index-page'
import { AdminAccueilPage } from './pages/admin/admin-accueil-page'
import { AdminCoordonneesPage } from './pages/admin/admin-coordonnees-page'
import { AdminAProposPage } from './pages/admin/admin-a-propos-page'
import { AdminPartenariatPage } from './pages/admin/admin-partenariat-page'
import { AdminTarifsPage } from './pages/admin/admin-tarifs-page'
import { AdminProgrammesPage } from './pages/admin/admin-programmes-page'
import { AdminBlogPage } from './pages/admin/admin-blog-page'
import { AdminTemoignagesPage } from './pages/admin/admin-temoignages-page'
import { AdminLoginPage } from './pages/admin/admin-login-page'
import { AdminMetriquesPage } from './pages/admin/admin-metriques-page'
import { AnalyticsRouteTracker } from './components/analytics-route-tracker'

function RedirectPrestationSlugToProgramme() {
  const { slug } = useParams()
  if (!slug) return <Navigate to="/programme" replace />
  return <Navigate to={`/programme/${slug}`} replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <AnalyticsRouteTracker />
      <Routes>
        <Route path="admin/login" element={<AdminLoginPage />} />
        <Route
          path="admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<AdminIndexPage />} />
          <Route path="accueil" element={<AdminAccueilPage />} />
          <Route path="coordonnees" element={<AdminCoordonneesPage />} />
          <Route path="a-propos" element={<AdminAProposPage />} />
          <Route path="recommandations" element={<AdminPartenariatPage />} />
          <Route path="partenariat" element={<Navigate to="/admin/recommandations" replace />} />
          <Route path="tarifs" element={<AdminTarifsPage />} />
          <Route path="programmes" element={<AdminProgrammesPage />} />
          <Route path="blog" element={<AdminBlogPage />} />
          <Route path="temoignages" element={<AdminTemoignagesPage />} />
          <Route path="metriques" element={<AdminMetriquesPage />} />
        </Route>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="luxopuncture" element={<Navigate to="/cabinet#luxopuncture" replace />} />
          <Route path="cabinet" element={<CabinetPage />} />
          <Route path="programme" element={<ProgrammePage />} />
          <Route path="programme/:slug" element={<ProgrammeDetailPage />} />
          <Route path="recommandations" element={<PartenariatPage />} />
          <Route path="partenariat" element={<Navigate to="/recommandations" replace />} />
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
