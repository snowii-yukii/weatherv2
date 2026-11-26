import { WeatherData } from "@/types/weather"

export async function getWeather(city: string): Promise<WeatherData> {
    const API_KEY = process.env.WEATHER_API_KEY;
    
    if(!API_KEY) {
        throw new Error("OpenWeather API key is missing");
    }

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city.trim()
    )}&appid=${API_KEY}&units=metric`, { cache: 'no-store' })

    if(!response.ok) {
        throw new Error("City not found");
    }

    return response.json()
}