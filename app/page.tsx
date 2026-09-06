'use client'

import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import { WeatherData } from "@/types/weather";
import CurrentWeather from "@/components/CurrentWeather";


export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null)

  const handleSearch = async (city: string) => {
    try {
      const response = await fetch(
        `/api/weather?city=${encodeURIComponent(city)}`
      )

      if(!response.ok) {
        throw new Error("City not found")
      }

      const data: WeatherData = await response.json();

      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather:', error)
    }
  }

  return (
    
    <section className="flex flex-col items-center gap-20">
      <SearchBar onSearch={handleSearch} />

      {weather ? (
        <CurrentWeather weather={weather} />
      ) : (
        <div className="text-center text-gray-500 text-lg">
          <p>Try searching for a city to see the weather forecast.</p>
        </div>
      )}
    </section>
      
  );
}
