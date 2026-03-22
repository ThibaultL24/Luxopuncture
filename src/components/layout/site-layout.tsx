// src/components/layout/site-layout.tsx
import { Outlet } from 'react-router-dom'
import { BookingBar } from './booking-bar'
import { Footer } from './footer'
import { Navbar } from './navbar'

export function SiteLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      <main className="flex-1 pb-24 sm:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BookingBar />
    </div>
  )
}
