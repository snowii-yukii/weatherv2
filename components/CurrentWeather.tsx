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
    <section className="flex flex-col items-center gap-4">
      <div className="card flex flex-col items-center w-74 sm:w-full sm:block">
        <h2>
          {weather.name}, {weather.sys.country}
        </h2>

        <img
          src={iconUrl}
          alt={weather.weather[0].description}
        />

        <p>{Math.round(weather.main.temp)}°C</p>

        <p className="capitalize">{weather.weather[0].description}</p>
      </div>

        <div className="flex flex-wrap gap-4 w-full">
            <div className="card">
                <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
            </div>

            <div className="card">
                <p>Humidity: {weather.main.humidity}%</p>
            </div>

            <div className="card">
                <p>Wind: {weather.wind.speed} m/s</p>
            </div>

            <div className="card">
                <p>
                High: {Math.round(weather.main.temp_max)}°C
                </p>
            </div>

            <div className="card">
                <p>
                Low: {Math.round(weather.main.temp_min)}°C
                </p>
            </div>
        </div> 
    </section>
  );
}