import { useEffect, useState } from "react";
import type { WeatherData } from "../types/sensor";
import { mockWeather } from "../data/mockData";

export function useLiveWeather() {
  const [weather, setWeather] = useState<WeatherData>(mockWeather);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const lat = import.meta.env.VITE_WEATHER_LAT;
    const lon = import.meta.env.VITE_WEATHER_LON;

    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        const data = await res.json();
        const nextForecast = data.list[0];
        const rainProbability = Math.round((nextForecast.pop || 0) * 100);
        const condition = nextForecast.weather[0].main;

        setWeather({ rainProbability, condition });
      } catch (error) {
        console.error("Weather fetch failed, using fallback data:", error);
      }
    }

    fetchWeather();
    const interval = setInterval(fetchWeather, 10 * 60 * 1000); // refresh every 10 min
    return () => clearInterval(interval);
  }, []);

  return weather;
}