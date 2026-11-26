'use client'

import React, { useState } from "react"
import {
  Sparkles,
  Navigation,
  Search,
  ArrowRight,
  SunMedium,
  Clock,
  Gauge,
  CloudSun,
  MapPin,
  TrendingUp,
} from "lucide-react"

interface LandingPageProps {
  onSearch: (city: string) => void
  onDetectLocation: () => void
  isDetectingLocation?: boolean
}

const POPULAR_CITIES = [
  { name: "Tokyo", country: "JP", desc: "Cherry blossoms & sky towers" },
  { name: "London", country: "GB", desc: "Historic riverfront & rain" },
  { name: "New York", country: "US", desc: "Dynamic urban microclimate" },
  { name: "Paris", country: "FR", desc: "Continental breeze & avenues" },
  { name: "Manila", country: "PH", desc: "Tropical warmth & sea air" },
  { name: "Sydney", country: "AU", desc: "Harbor sun & coastal wind" },
]

export default function LandingPage({
  onSearch,
  onDetectLocation,
  isDetectingLocation = false,
}: LandingPageProps) {
  const [inputVal, setInputVal] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputVal.trim()) {
      onSearch(inputVal.trim())
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-12 py-6 sm:py-10 animate-fade-in">
      {/* Hero Header */}
      <div className="flex flex-col items-center text-center max-w-2xl gap-4 px-2">

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
          Atmospheric clarity,{" "}
          <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            wherever you go.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
          Live microclimate telemetry, reactive atmospheric physics, and localized next-hour forecasts.
        </p>
      </div>

      {/* Hero Interactive Search Bar & Geolocation Action */}
      <div className="w-full max-w-xl flex flex-col gap-3 px-2">

        {/* Location Detection Button */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={onDetectLocation}
            disabled={isDetectingLocation}
            className="inline-flex items-center gap-2 px-6 py-4 text-sm font-semibold text-slate-700 hover:text-sky-600 bg-white/50 hover:bg-white/90 border border-slate-200/80 rounded-full backdrop-blur-md shadow-sm transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            <Navigation className={`w-4 h-4 text-sky-500 ${isDetectingLocation ? "animate-spin" : ""}`} />
            <span>{isDetectingLocation ? "Locating your position..." : "Use my current location"}</span>
          </button>
        </div>
      </div>

      {/* Popular City Quick-Launch Cards */}
      <div className="w-full flex flex-col items-center gap-3 px-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <MapPin className="w-3.5 h-3.5" />
          <span>Popular destinations</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 w-full">
          {POPULAR_CITIES.map((city) => (
            <button
              key={city.name}
              type="button"
              onClick={() => onSearch(city.name)}
              className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/60 hover:bg-white/95 border border-white/80 hover:border-sky-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 backdrop-blur-md transition-all duration-200 cursor-pointer group"
            >
              <span className="text-sm font-bold text-slate-800 group-hover:text-sky-600 transition-colors">
                {city.name}
              </span>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {city.country}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
