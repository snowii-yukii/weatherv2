'use client'

import Navbar from "@/components/Navbar";
import Particles from "@/components/Particles";
import { useState, useEffect, useMemo } from "react";
import { WeatherData, ForecastData, WeatherResponse } from "@/types/weather";
import CurrentWeather from "@/components/CurrentWeather";
import Loader from "@/components/Loader";
import { getWeatherTheme, WeatherTheme } from "@/lib/weatherTheme";

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastData | null>(null)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const theme: WeatherTheme | null = useMemo(() => {
    if (!weather) return null;
    const now = Date.now() / 1000;
    const isDaytime = now > weather.sys.sunrise && now < weather.sys.sunset;
    return getWeatherTheme(weather.weather[0].id, isDaytime);
  }, [weather]);

  const handleSearch = async (city: string) => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(
        `/api/weather?city=${encodeURIComponent(city)}`
      )
      if (!response.ok) {
        throw new Error("City not found")
      }
      const data: WeatherResponse = await response.json();
      setWeather(data.weather);
      setForecast(data.forecast);
    } catch {
      setError("Could not find the city")
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords
      try {
        setLoading(true)
        setError('')
        const response = await fetch(
          `/api/weather?lat=${latitude}&lon=${longitude}`
        )
        if (!response.ok) throw new Error('Failed to fetch weather')
        const data: WeatherResponse = await response.json()
        setWeather(data.weather)
        setForecast(data.forecast)
      } catch {
        setError('Could not get weather')
      } finally {
        setLoading(false)
      }
    },
      (err) => { console.log(err) }
    )
  }, [])

  return (
    <>
      {/* Reactive full-screen background */}
      <div
        className="fixed inset-0 z-0 transition-all duration-1000 ease-in-out"
        style={{
          background: theme?.gradient ?? 'linear-gradient(160deg, #f8fafc 0%, #e2e8f0 100%)',
        }}
      />

      {/* Particle layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          key={weather?.weather[0].id ?? 'default'}
          particleColors={theme?.particleColors ?? ['#94a3b8', '#cbd5e1']}
          particleCount={theme?.particleCount ?? 140}
          particleSpread={14}
          speed={theme?.particleSpeed ?? 0.6}
          particleBaseSize={80}
          alphaParticles={theme?.alphaParticles ?? true}
          disableRotation
          pixelRatio={1}
        />
      </div>

      {/* Content */}
      <section className="relative z-10 flex flex-col items-center gap-8 w-full">
        <Navbar onSearch={handleSearch} />

        {isLoading && (
          <div className="min-h-[60vh] flex flex-1 justify-center items-center">
            <Loader />
          </div>
        )}

        {error && !isLoading && (
          <div className="min-h-[60vh] flex flex-1 justify-center items-center">
            <p className={`mt-6 text-center text-sm font-medium px-4 py-2 rounded-xl backdrop-blur-sm ${theme ? 'text-white/80 bg-white/10' : 'text-red-500 bg-red-50'}`}>
              {error}
            </p>
          </div>
        )}

        {weather && forecast && !isLoading && !error && (
          <CurrentWeather weather={weather} forecast={forecast} hasTheme={!!theme} />
        )}

        {!weather && !isLoading && !error && (
          <div className="min-h-[60vh] flex flex-1 justify-center items-center">
            <p className="text-center text-slate-400 text-sm">
              Turn on your <span className="font-semibold text-slate-600">location</span> or{" "}
              <span className="font-semibold text-slate-600">search</span> for a city.
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className={`relative z-10 mt-auto py-6 px-4 flex flex-col items-center gap-3`}>
        {/* Tech stack */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { label: 'Next.js' },
            { label: 'React' },
            { label: 'Tailwind CSS' },
            { label: 'TypeScript' },
          ].map(({ label }) => (
            <span
              key={label}
              className={`text-xs font-medium px-2.5 py-1 rounded-full border backdrop-blur-sm transition-colors ${
                theme
                  ? 'text-white/60 border-white/15 bg-white/5'
                  : 'text-slate-500 border-slate-200 bg-slate-100/70'
              }`}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Bottom row */}
        <div className={`flex items-center gap-3 text-xs ${theme ? 'text-white/40' : 'text-slate-400'}`}>
          <span>© 2026 Carms</span>
          <span className="opacity-40">·</span>
          <a
            href="https://github.com/snowii-yukii"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className={`flex items-center gap-1.5 transition-opacity hover:opacity-80 ${theme ? 'text-white/50 hover:text-white/80' : 'text-slate-400 hover:text-slate-700'}`}
          >
            {/* GitHub SVG icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3.5 h-3.5"
              aria-hidden="true"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
            </svg>
            snowii-yukii
          </a>
        </div>
      </footer>
    </>
  );
}