"use client"

import { useEffect, useRef } from "react"
import { Roboto } from "next/font/google"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowLeft } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

/* font */
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
})
const pClass = roboto.className

/**
 * NOTE FOR BACKEND / INTEGRATION:
 * ---------------------------------------------------------
 * The data objects below (`userDetails`, `registeredEvents`,
 * `hasAccommodation`) are TEMPORARY placeholders used only
 * for UI development and layout testing.
 *
 * When integrating with the backend:
 * 1. Replace these constants with data fetched from the API
 *    (e.g. via server actions, API routes, or client-side fetch).
 * 2. Map API response fields directly to the props/fields
 *    used in this component (keep the same shape if possible).
 * 3. This component assumes:
 *    - `userDetails` represents the logged-in user profile
 *    - `registeredEvents` is an array of events the user has
 *      registered for
 *    - `hasAccommodation` is a boolean derived from user data
 *
 * IMPORTANT:
 * - Do NOT change layout or animation logic when wiring data.
 * - Component is already backend-ready; only data source
 *   replacement is required.
 * ---------------------------------------------------------
 */


/* data */
const userDetails = {
  firstName: "Alex",
  lastName: "Johnson",
  phone: "+01 123-456-7890",
  dateOfBirth: "March 15, 1998",
  gender: "Male",
  university: "DAIICT",
  email: "202601111@dau.ac.in",
}

const registeredEvents = [
  { id: 1, name: "Tech Summit 2024", category: "Business", status: "Registered" },
  { id: 2, name: "AI & Machine Learning Conference", category: "Technology", status: "Form Incomplete" },
  { id: 3, name: "User-experience Workshop", category: "Design", status: "Registered" },
  { id: 4, name: "Advanced Frontend Systems", category: "Technology", status: "Form Incomplete" },
]

const hasAccommodation = true

/* data */
export default function UserProfile() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(
      ref.current.querySelectorAll(".animate"),
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, stagger: 0.05 }
    )
  }, [])

  return (
    <div ref={ref} className="min-h-screen bg-background px-4 py-12">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-10">
        <button className="group relative -left-4 inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-all-ml-5">
          <ArrowLeft className="w-8 h-8" />
        </button>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* left column */}
        <div>
          <h2 className="text-4xl font-bold mb-6">Profile</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                ["First Name", userDetails.firstName],
                ["Last Name", userDetails.lastName],
              ].map(([label, value]) => (
                <div key={label} className="animate border border-white p-4 min-h-[72px]">
                  <p className={`text-xs text-muted-foreground ${pClass}`}>{label}</p>
                  <p className={`text-base font-semibold ${pClass}`}>{value}</p>
                </div>
              ))}
            </div>

            {[
              ["Phone", userDetails.phone],
              ["College", userDetails.university],
              ["Email Address", userDetails.email],
            ].map(([label, value]) => (
              <div key={label} className="animate border border-white p-4 min-h-[72px]">
                <p className={`text-xs text-muted-foreground ${pClass}`}>{label}</p>
                <p className={`text-base font-semibold break-all ${pClass}`}>{value}</p>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4">
              {[
                ["Date of Birth", userDetails.dateOfBirth],
                ["Gender", userDetails.gender],
              ].map(([label, value]) => (
                <div key={label} className="animate border border-white p-4 min-h-[72px]">
                  <p className={`text-xs text-muted-foreground ${pClass}`}>{label}</p>
                  <p className={`text-base font-semibold ${pClass}`}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* right column */}
        <div>
          {/* EVENTS */}
          <h2 className="text-4xl font-bold mb-6">Registered Events</h2>

          <div className="space-y-4 max-h-[265px] overflow-y-auto pr-2 mb-10 thin-scrollbar">
            {registeredEvents.map((event) => (
              <div key={event.id} className="animate border border-white p-4">
                <div className="flex justify-between gap-4">
                  <h3 className="font-semibold">{event.name}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      event.status === "Registered"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-orange-500/20 text-orange-400"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>
                <p className={`mt-1 text-sm ${pClass}`}>{event.category}</p>
              </div>
            ))}
          </div>

          {/* ACCOMMODATION */}
          <h2 className="text-4xl font-bold mt-10 mb-4">Accommodation</h2>

          <div className="border border-white p-4 min-h-[72px]">
            <div className="flex justify-between items-center">
              <p className={`text-base font-semibold ${pClass}`}>2 days accommodation</p>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  hasAccommodation
                    ? "bg-green-500/20 text-green-400"
                    : "bg-orange-500/20 text-orange-400"
                }`}
              >
                {hasAccommodation ? "Registered" : "Unregistered"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
