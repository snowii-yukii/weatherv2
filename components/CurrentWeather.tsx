import { WeatherData } from "@/types/weather";
import "@/app/globals.css"

interface CurrentWeatherProps {
  weather: WeatherData;
}

export default function CurrentWeather({
  weather,
}: CurrentWeatherProps) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <section className="flex flex-col items-center gap-4 lg:flex-row">
      <div className="flex flex-col items-center justify-center bg-white/30 outline shadow-xl backdrop-blur-lg backdrop-opacity-30 p-10 gap-2 w-full h-full rounded sm:w-120 sm:h-120">
        <h2 className="text-4xl">
          {weather.name}, {weather.sys.country}
        </h2>

        <img
          src={iconUrl}
          alt={weather.weather[0].description}
        />

      <div className="text-center text-2xl">
        <p>{Math.round(weather.main.temp)}°C</p>

        <p className="capitalize">{weather.weather[0].description}</p>
      </div>
      </div>

        <div className="flex flex-wrap gap-4">
            <div className="card">
                <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
            </div>

            <div className="card">
                <p>Humidity: {weather.main.humidity}%</p>
            </div>

            <div className="card">
                <p>Wind speed: {weather.wind.speed} m/s</p>
            </div>

            <div className="card">
                <p>
                Highest temperature: {Math.round(weather.main.temp_max)}°C
                </p>
            </div>

            <div className="card">
                <p>
                Lowest temperature: {Math.round(weather.main.temp_min)}°C
                </p>
            </div>
        </div> 
    </section>
  );
}