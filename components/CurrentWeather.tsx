import { WeatherData, ForecastData } from "@/types/weather";
import Forecast from "@/components/Forecast";
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
  forecast: ForecastData;
  /** True when a colour theme is active (dark bg) */
  hasTheme: boolean;
}

export default function CurrentWeather({ weather, forecast, hasTheme }: CurrentWeatherProps) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  const text = hasTheme ? 'text-white' : 'text-slate-800';
  const subText = hasTheme ? 'text-white/60' : 'text-slate-400';
  const cardBg = hasTheme
    ? 'bg-white/10 border-white/15 shadow-black/10'
    : 'bg-black/5 border-slate-200 shadow-slate-100/50';

  const getHumidityFact = (h: number) => {
    if (h > 70) return "High humidity can make it feel warmer than it is.";
    if (h < 30) return "Low humidity — the air feels dry.";
    return "Comfortable humidity levels right now.";
  };

  const getWindFact = (s: number) => {
    if (s > 10) return "Strong winds make it feel cooler than the actual temp.";
    if (s < 2) return "Barely a breeze.";
    return "A gentle breeze is blowing.";
  };

  return (
    <section className="flex flex-col items-center gap-6 w-full max-w-5xl">

      {/* Hero */}
      <div className={`flex flex-col items-center justify-center backdrop-blur-xl bg-white/10 border border-white/15 shadow-lg p-10 gap-1 w-full rounded-2xl sm:h-72`}>
        <h2 className={`text-3xl font-semibold tracking-tight ${text}`}>
          {weather.name}, {weather.sys.country}
        </h2>

        <img
          src={iconUrl}
          alt={weather.weather[0].description}
          className="w-20 h-20 drop-shadow-md"
        />

        <p className={`text-6xl font-bold tabular-nums ${text}`}>
          {Math.round(weather.main.temp)}°
        </p>
        <p className={`text-base capitalize tracking-wide ${subText}`}>
          {weather.weather[0].description}
        </p>
      </div>

      {/* Forecast strip */}
      <Forecast forecast={forecast} hasTheme={hasTheme} />

      {/* Stat cards */}
      <div className="flex flex-wrap justify-center gap-4 w-full">
        {[
          {
            icon: <Thermometer className="w-4 h-4 text-orange-400" />,
            label: 'Feels like',
            value: Math.round(weather.main.feels_like),
            unit: '°C',
            note: 'Combines temp, humidity & wind.',
          },
          {
            icon: <Droplets className="w-4 h-4 text-blue-400" />,
            label: 'Humidity',
            value: weather.main.humidity,
            unit: '%',
            note: getHumidityFact(weather.main.humidity),
          },
          {
            icon: <Wind className="w-4 h-4 text-sky-400" />,
            label: 'Wind',
            value: weather.wind.speed,
            unit: 'm/s',
            note: getWindFact(weather.wind.speed),
          },
          {
            icon: <ThermometerSun className="w-4 h-4 text-red-400" />,
            label: 'High',
            value: Math.round(weather.main.temp_max),
            unit: '°C',
            note: 'Warmest point expected today.',
          },
          {
            icon: <ThermometerSnowflake className="w-4 h-4 text-cyan-400" />,
            label: 'Low',
            value: Math.round(weather.main.temp_min),
            unit: '°C',
            note: 'Coolest point, usually near sunrise.',
          },
        ].map(({ icon, label, value, unit, note }) => (
          <div
            key={label}
            className={`stat-card flex flex-col justify-between backdrop-blur-xl border shadow-md ${cardBg}`}
          >
            <div className="flex items-center gap-2">
              {icon}
              <p className={`text-sm font-medium ${subText}`}>{label}</p>
            </div>
            <div className="flex items-baseline gap-1 my-auto">
              <p className={`text-4xl font-semibold tabular-nums ${text}`}>{value}</p>
              <span className={`text-lg ${subText}`}>{unit}</span>
            </div>
            <p className={`text-xs mt-auto pt-2 leading-snug ${subText}`}>{note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}