// src/components/layout/booking-bar.tsx
import { Link } from 'react-router-dom'

export function BookingBar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center pb-4 sm:hidden">
      <div className="pointer-events-auto w-[min(92vw,28rem)] rounded-full border border-[var(--color-on-cta)]/25 bg-[var(--color-cta)] px-4 py-3 text-center shadow-[var(--shadow-soft)]">
        <Link
          to="/contact"
          className="block text-sm font-bold text-[var(--color-on-cta)]"
        >
          Bilan offert — contact
        </Link>
      </div>
    </div>
  )
}
