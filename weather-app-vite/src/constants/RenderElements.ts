import icons from "./WeatherIcon";
import { IWeather } from "../interfaces/Weather";

export const imageUrl = (weather: IWeather): string => {
  const icon = weather?.weather?.[0]?.icon;
  return icon ? `${icons.url}${icon}@2x.png` : "";
};

export const altImage = (weather: IWeather): string => {
  const description = weather?.weather?.[0]?.description;
  return description || "";
};

export const weatherName = (weather: IWeather): string => {
  return weather && weather.name && weather.sys?.country
    ? `${weather.name}, ${weather.sys.country}`
    : "";
};

export const temperature = (weather: IWeather): string => {
  return weather ? `${Math.round(weather.main?.temp)}°` : "";
};

export const feelLikeTemp = (weather: IWeather): string => {
  return weather ? `Feels like ${Math.round(weather.main?.feels_like)}°` : "";
};

export const descTemp = (weather: IWeather): string => {
  const w = weather?.weather?.[0];
  return w ? `${w.main} (${w.description})` : "Unknown";
};

export const dayStyle = (weather: IWeather) => {
  const icon = weather?.weather?.[0]?.icon;
  if (icon) {
    const mainDay = icon.replace(/[0-9]/g, "");
    switch (mainDay) {
      case "d":
        return "day ";
      case "n":
        return "night ";
      default:
        return "";
    }
  }
};

export const weatherStyle = (weather: IWeather) => {
  if (weather) {
    const mainDesc = weather?.weather?.[0]?.main;
    switch (mainDesc) {
      case "Snow":
        return "snow";
      case "Rain":
      case "Drizzle":
        return "rain";
      default:
        return "";
    }
  }
};

export const hpaPressure = (weather: IWeather): string => {
  return weather
    ? `${weather.wind?.speed}m/s ${weather.main?.pressure}hPa`
    : "";
};

export const humidity = (weather: IWeather): string => {
  return weather ? `Humidity: ${weather.main?.humidity}%` : "";
};

export const visibility = (weather: IWeather): string => {
  return weather
    ? `Visibility: ${(weather.visibility / 1000).toFixed(0)}km`
    : "";
};

export const styleArrow = (weather: IWeather): { transform: string } => {
  const deg = weather?.wind?.deg ?? 0;
  return { transform: `rotate(${deg}deg)` };
};

export const inputClass = (showCities: boolean): string => {
  return showCities ? "" : "weather-app__search-bar hidden";
};

export const sectionBlockClass = (
  searchBar: boolean,
  weather: IWeather,
): string => {
  const base = "weather-app__section";
  const active = searchBar ? "active" : "";
  const open = weather ? "show-current-wear" : "";
  return [base, active, open].filter(Boolean).join(" ");
};

export const gearClass = (showCities: boolean): string => {
  return showCities ? 'weather-app__gear active' : 'weather-app__gear';
};
