'use client'

import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { WeatherData, ForecastData, WeatherResponse } from "@/types/weather";
import CurrentWeather from "@/components/CurrentWeather";
import Loader from "@/components/Loader";
import Forecast from "@/components/Forecast";

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastData | null>(null)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async (city: string) => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(
        `/api/weather?city=${encodeURIComponent(city)}`
      )
      if(!response.ok) {
        throw new Error("City not found")
      }
      const data: WeatherResponse = await response.json();
      setWeather(data.weather);
      setForecast(data.forecast);
    } catch (error) {
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

            const response = await fetch (
              `/api/weather?lat=${latitude}&lon=${longitude}`
            )

            if(!response.ok) {
              throw new Error('Failed to fetch weather')
            }

            const data: WeatherResponse = await response.json()

            setWeather(data.weather)
            setForecast(data.forecast)
          } catch (error) {
            setError('Could not get weather')
          } finally {
            setLoading(false)
          }
        },
        (error) => {
          console.log(error)
        }
      )
    }, [])

  return (
    <section className="flex flex-col items-center gap-8 w-full">
      <Navbar onSearch={handleSearch} />

      {isLoading && (
        <div className="min-h-[60vh] flex flex-1 justify-center items-center">
          <Loader />
        </div>
        
      )}

      {error && (
        <div className="min-h-[60vh] flex flex-1 justify-center items-center">
          <p className="mt-6 text-center text-red-400">
          {error}
        </p>
        </div>
        
      )}

      {weather && forecast && !isLoading && !error ? (
        <>
          <CurrentWeather weather={weather} forecast={forecast} />
        </>
        
      ) : (
        !isLoading &&
        !error &&
        <div className="min-h-[60vh] flex flex-1 justify-center items-center">
          <div className="text-center text-gray-500 text-lg pt-12">
          <p>Turn on your <span className="font-bold">location</span> or Try <span className="font-bold">searching</span> for a city to see the weather forecast.</p>
        </div>
        </div>
        
      )}
    </section>
  );
}