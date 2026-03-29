// src/components/layout/site-layout.tsx
import { Outlet, useLocation } from "react-router-dom";
import { FeatherTrailBackground } from "../feather-trail-background";
import { FeatherCursor } from "../feather-cursor";
import { SiteGlobalJsonLd } from "../seo/site-global-json-ld";
import { BookingBar } from "./booking-bar";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { useEffect } from "react";

export function SiteLayout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Sur les ancres (#), on laisse le navigateur gérer le scroll vers l'élément.
    if (hash) return;
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname, hash]);

  return (
    <div className="relative isolate flex min-h-svh flex-col">
      <SiteGlobalJsonLd />
      <FeatherTrailBackground />
      <FeatherCursor />
      <Navbar />
      <main className="site-grain relative isolate flex-1 pb-24 sm:pb-0">
        <div className="relative z-[1] min-h-0">
          <Outlet />
        </div>
      </main>
      <Footer />
      <BookingBar />
    </div>
  );
}
