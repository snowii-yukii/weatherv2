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

  const now = Date.now();
  // Filter out earlier hours: only show future intervals (next hour forecast)
  const upcomingList = forecast.list.filter((item) => item.dt * 1000 > now);
  const displayItems = (upcomingList.length > 0 ? upcomingList : forecast.list).slice(0, 8);

  const cityTimezone = forecast.city?.timezone ?? 0;
  const currentCityDate = new Date(now + cityTimezone * 1000);

  return (
    <section className="w-full">
      <h2 className={`mb-3 text-xs font-semibold uppercase tracking-widest ${subText}`}>
        hourly forecast
      </h2>

      <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
        {displayItems.map((item) => {
          // Adjust UTC timestamp by city timezone offset to display target city's local time
          const cityDate = new Date((item.dt + cityTimezone) * 1000);

          const time = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            timeZone: 'UTC',
          }).format(cityDate);

          const isToday =
            cityDate.getUTCDate() === currentCityDate.getUTCDate() &&
            cityDate.getUTCMonth() === currentCityDate.getUTCMonth();

          const dayLabel = isToday
            ? 'Today'
            : new Intl.DateTimeFormat('en-US', {
                weekday: 'short',
                timeZone: 'UTC',
              }).format(cityDate);

          return (
            <div
              key={item.dt}
              className={`flex flex-col items-center gap-1 py-3 px-1 rounded-xl backdrop-blur-md border text-center ${cardBg}`}
            >
              <span className={`text-[10px] font-semibold uppercase tracking-wider opacity-60 ${subText}`}>
                {dayLabel}
              </span>

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
