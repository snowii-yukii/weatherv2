import { ForecastData } from "@/types/weather";

interface ForecastProps {
  forecast: ForecastData;
  hasTheme: boolean;
}

export default function Forecast({ forecast, hasTheme }: ForecastProps) {
  const text = hasTheme ? 'text-white' : 'text-slate-700';
  const subText = hasTheme ? 'text-white/55' : 'text-slate-400';
  const cardBg = hasTheme
    ? 'bg-white/10 border-white/15'
    : 'bg-black/5 border-slate-200';

  return (
    <section className="w-full">
      <h2 className={`mb-3 text-xs font-semibold uppercase tracking-widest ${subText}`}>
        hourly forecast
      </h2>

      <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
        {forecast.list.slice(0, 8).map((item) => {
          const time = new Date(item.dt_txt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          return (
            <div
              key={item.dt}
              className={`flex flex-col items-center gap-1 py-3 px-1 rounded-xl backdrop-blur-md border text-center ${cardBg}`}
            >
              <p className={`text-xs font-medium ${subText}`}>{time}</p>

              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
                className="w-9 h-9"
              />

              <p className={`text-sm font-semibold tabular-nums ${text}`}>
                {Math.round(item.main.temp)}°
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}