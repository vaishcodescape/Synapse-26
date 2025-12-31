"use client"

import { useEffect, useRef } from "react"
import { Roboto } from "next/font/google"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowLeft } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

/* font  */

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
})

const pClass = roboto.className

/*  static data  */

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
  {
    id: 1,
    name: "Tech Summit 2024",
    category: "Business",
    status: "Registered",
  },
  {
    id: 2,
    name: "AI & Machine Learning Conference",
    category: "Technology",
    status: "Form Incomplete",
  },
  {
    id: 3,
    name: "User-experience Workshop",
    category: "Design",
    status: "Registered",
  },
]

const hasAccommodation = true

/*  component  */

export default function UserProfile() {
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!profileRef.current) return

    const leftColumn = profileRef.current.querySelector(".left-column")
    const rightColumn = profileRef.current.querySelector(".right-column")
    const detailItems = profileRef.current.querySelectorAll(".detail-item")
    const eventCards = profileRef.current.querySelectorAll(".event-card")
    const accommodationSection = profileRef.current.querySelector(".accommodation-section")

    gsap.fromTo(leftColumn, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1, delay: 0.2 })
    gsap.fromTo(rightColumn, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1, delay: 0.4 })

    detailItems.forEach((item, i) => {
      gsap.fromTo(item, { opacity: 0, y: 20 }, { opacity: 1, y: 0, delay: 0.8 + i * 0.1 })
    })

    eventCards.forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 30 }, { opacity: 1, y: 0, delay: 1.2 + i * 0.1 })
    })

    if (accommodationSection) {
      gsap.fromTo(accommodationSection, { opacity: 0, y: 30 }, { opacity: 1, y: 0, delay: 1.8 })
    }
  }, [])

  return (
    <div ref={profileRef} className="min-h-screen bg-background py-12 px-4 md:py-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <button className="group relative -left-4 inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-all-ml-5">
          <ArrowLeft className="w-13 h-13 group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT COLUMN */}
        <div className="left-column">
          <h2 className="text-4xl font-bold mb-6">Profile</h2>

          <div className="space-y-4">
            {/* First + Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="detail-item p-3 border border-white">
                <p className={`text-xs text-muted-foreground mb-1 ${pClass}`}>First Name</p>
                <p className={`text-base font-semibold ${pClass}`}>{userDetails.firstName}</p>
              </div>
              <div className="detail-item p-3 border border-white">
                <p className={`text-xs text-muted-foreground mb-1 ${pClass}`}>Last Name</p>
                <p className={`text-base font-semibold ${pClass}`}>{userDetails.lastName}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="detail-item p-3 border border-white">
              <p className={`text-xs text-muted-foreground mb-1 ${pClass}`}>Phone Number</p>
              <p className={`text-base font-semibold ${pClass}`}>{userDetails.phone}</p>
            </div>

            {/* DOB + Gender */}
            <div className="grid grid-cols-2 gap-4">
              <div className="detail-item p-3 border border-white">
                <p className={`text-xs text-muted-foreground mb-1 ${pClass}`}>Date of Birth</p>
                <p className={`text-base font-semibold ${pClass}`}>{userDetails.dateOfBirth}</p>
              </div>
              <div className="detail-item p-3 border border-white">
                <p className={`text-xs text-muted-foreground mb-1 ${pClass}`}>Gender</p>
                <p className={`text-base font-semibold ${pClass}`}>{userDetails.gender}</p>
              </div>
            </div>

            {/* University */}
            <div className="detail-item p-3 border border-white">
              <p className={`text-xs text-muted-foreground mb-1 ${pClass}`}>College</p>
              <p className={`text-base font-semibold ${pClass}`}>{userDetails.university}</p>
            </div>

            {/* Email */}
            <div className="detail-item p-3 border border-white">
              <p className={`text-xs text-muted-foreground mb-1 ${pClass}`}>Email Address</p>
              <p className={`text-base font-semibold break-all ${pClass}`}>{userDetails.email}</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="right-column space-y-8">
          {/* events */}
          <div>
            <h2 className="text-4xl font-bold mb-6">Registered Events</h2>
            <div className="space-y-4">
              {registeredEvents.map((event) => (
                <div key={event.id} className="event-card p-4 border border-white">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-base font-semibold leading-tight">{event.name}</h3>

                    <span
                      className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
                        event.status === "Registered"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-orange-500/20 text-orange-400"
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>

                  <p className={`mt-2 text-sm ${pClass}`}>{event.category}</p>
                </div>
              ))}
            </div>
          </div>

          {/* accommodation */}
          <div className="accommodation-section">
            <h2 className="text-4xl font-bold mb-6">Accommodation</h2>

            <div className="p-4 border border-white flex items-center justify-between gap-4">
              <p className={`text-base font-semibold ${pClass}`}>2 days accommodation</p>

              <span
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
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
