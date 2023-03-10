import icons from './WeatherIcon';
import { IWeather } from 'interfaces/Weather';

export const imageUrl = (weather: IWeather): string => {
  return weather ? `${icons.url + weather?.weather[0].icon}@2x.png` : '';
};

export const altImage = (weather: IWeather): string => {
  return weather ? `${weather?.weather[0].description}` : '';
};

export const weatherName = (weather: IWeather): string => {
  return weather ? `${weather?.name}, ${weather?.sys.country}` : '';
};

export const temperature = (weather: IWeather): string => {
  return weather ? `${Math.round(weather.main.temp)}°` : '';
};

export const feelLikeTemp = (weather: IWeather): string => {
  return weather ? `Feels like ${Math.round(weather?.main.feels_like)}°` : '';
};

export const descTemp = (weather: IWeather): string => {
  return `${weather?.weather[0].main} (${weather?.weather[0].description})`;
};

export const dayStyle = (weather: IWeather): string => {
  const mainDay = weather?.weather[0].icon.replace(/[0-9]/g, '');
  let result = '';

  switch(mainDay) {
  case 'd':
    result += 'day ';
    break;
  case 'n':
    result += 'night ';
    break;
  }

  return result;
};

export const weatherStyle = (weather: IWeather): string => {
  const mainDesc = weather?.weather[0].main;
  let result = '';

  switch(mainDesc) {
  case 'Snow': 
    result += 'snow';
    break;
  case 'Rain': 
    result += 'rain';
    break;
  case 'Drizzle': 
    result += 'rain';
    break;
  default:
    result += '';
  }
  return result;
};

export const hpaPressure = (weather: IWeather): string => {
  return weather ? `${weather.wind.speed}m/s ${weather.main.pressure}hPa` : '';
};

export const humidity = (weather: IWeather): string => {
  return weather ? `Humidity: ${weather.main.humidity}%` : '';
};

export const visibility = (weather: IWeather): string => {
  return weather ? `Visibility: ${(weather.visibility / 1000).toFixed(0)}km` : '';
};

export const styleArrow = (weather: IWeather): { transform: string; } => {
  const style = { transform: `rotate(${weather?.wind.deg}deg)` };
  return style;
};

export const inputClass = (searchBar: boolean): string | string => {
  return !searchBar ? '' : 'weather-app__search-bar hidden';
};

export const sectionBlockClass = (searchBar: boolean, weather: IWeather): string => {
  return `${!searchBar ? 'weather-app__section' : 'weather-app__section active'} ${weather ? 'open' : ''}`;
};

export const gearClass = (searchBar: boolean): string | string => {
  return !searchBar ? 'weather-app__gear' : 'weather-app__gear click';
};