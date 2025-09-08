import { IWeather } from '../interfaces/Weather';

export default function getLocalStorage(): IWeather {
  const data = localStorage.getItem('data_weather');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse weather from localStorage', e);
    }
  }
  return {} as IWeather;
}
