import { ForecastData } from "@/types/weather";

interface ForecastProps {
    forecast: ForecastData;
}

export default function Forecast( { forecast }: ForecastProps) {
    return (
    <section className="w-full">
      <h2 className="mb-4 text-xl font-semibold">
        Forecast
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
        {forecast.list.slice(0, 8).map((item) => (
          <div
            key={item.dt}
            className="rounded-2xl p-4 text-center"
          >
            <p className="text-sm">
              {item.dt_txt}
            </p>

            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
              className="mx-auto h-16 w-16"
            />

            <p className="text-xl font-bold">
              {Math.round(item.main.temp)}°C
            </p>

            <p className="mt-1 text-sm capitalize">
              {item.weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </section>
    )
}