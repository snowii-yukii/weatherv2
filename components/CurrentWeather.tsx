import { WeatherData } from "@/types/weather";
import "@/app/globals.css"
import {
  Thermometer,
  Droplets,
  Wind,
  ThermometerSun,
  ThermometerSnowflake,
} from "lucide-react";

interface CurrentWeatherProps {
  weather: WeatherData;
}

export default function CurrentWeather({
  weather,
}: CurrentWeatherProps) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  const getHumidityFact = (humidity: number) => {
    if (humidity > 70) return "High humidity can make it feel warmer than it is.";
    if (humidity < 30) return "Low humidity can make the air feel dry.";
    return "Comfortable humidity levels right now.";
  };

  const getWindFact = (speed: number) => {
    if (speed > 10) return "Strong winds can make it feel cooler than the actual temp.";
    if (speed < 2) return "Light breeze, barely noticeable.";
    return "A gentle breeze is blowing.";
  };

  return (
    <section className="flex flex-col items-center gap-6 w-full max-w-5xl">
      <div className="flex flex-col items-center justify-center bg-white/30 border border-slate-100 shadow-md shadow-slate-100/50 backdrop-opacity-30 p-10 gap-2 w-full h-full rounded sm:h-120">
        <h2 className="text-4xl text-center">
          {weather.name}, {weather.sys.country}
        </h2>

        <img src={iconUrl} alt={weather.weather[0].description} />

        <div className="text-center text-2xl">
          <p>{Math.round(weather.main.temp)}°C</p>
          <p className="capitalize">{weather.weather[0].description}</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 w-full">
        <div className="card flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-orange-500" />
            <p className="font-medium">Feels like</p>
          </div>
          <div className="flex items-baseline gap-1 my-auto">
            <p className="text-4xl font-semibold">
              {Math.round(weather.main.feels_like)}
            </p>
            <span className="text-xl text-gray-400">°C</span>
          </div>
          <p className="text-sm text-gray-400 mt-auto pt-3">
            Combines temp, humidity, and wind into how it actually feels.
          </p>
        </div>

        <div className="card flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-500" />
            <p className="font-medium">Humidity</p>
          </div>
          <div className="flex items-baseline gap-1 my-auto">
            <p className="text-4xl font-semibold">{weather.main.humidity}</p>
            <span className="text-xl text-gray-400">%</span>
          </div>
          <p className="text-sm text-gray-400 mt-auto pt-3">
            {getHumidityFact(weather.main.humidity)}
          </p>
        </div>

        <div className="card flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center gap-2">
            <Wind className="w-5 h-5 text-sky-500" />
            <p className="font-medium">Wind speed</p>
          </div>
          <div className="flex items-baseline gap-1 my-auto">
            <p className="text-4xl font-semibold">{weather.wind.speed}</p>
            <span className="text-xl text-gray-400">m/s</span>
          </div>
          <p className="text-sm text-gray-400 mt-auto pt-3">
            {getWindFact(weather.wind.speed)}
          </p>
        </div>

        <div className="card flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center gap-2">
            <ThermometerSun className="w-5 h-5 text-red-500" />
            <p className="font-medium">Highest temperature</p>
          </div>
          <div className="flex items-baseline gap-1 my-auto">
            <p className="text-4xl font-semibold">
              {Math.round(weather.main.temp_max)}
            </p>
            <span className="text-xl text-gray-400">°C</span>
          </div>
          <p className="text-sm text-gray-400 mt-auto pt-3">
            The warmest point expected today.
          </p>
        </div>

        <div className="card flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center gap-2">
            <ThermometerSnowflake className="w-5 h-5 text-cyan-500" />
            <p className="font-medium">Lowest temperature</p>
          </div>
          <div className="flex items-baseline gap-1 my-auto">
            <p className="text-4xl font-semibold">
              {Math.round(weather.main.temp_min)}
            </p>
            <span className="text-xl text-gray-400">°C</span>
          </div>
          <p className="text-sm text-gray-400 mt-auto pt-3">
            The coolest point, usually just before sunrise.
          </p>
        </div>
      </div>
    </section>
  );
}