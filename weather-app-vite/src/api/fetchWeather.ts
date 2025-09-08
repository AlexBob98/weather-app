import url from '../constants/GetResponse';
import { IWeather } from '../interfaces/Weather';

export interface IFetchWeatherResult {
  success: boolean;
  data?: IWeather;
  error?: string;
  status?: number;
}

export async function fetchWeather(cityName: string): Promise<IFetchWeatherResult> {
  try {
    const response = await fetch(url(cityName));

    if (response.status === 200) {
      const data: IWeather = await response.json();
      return { success: true, data };
    }

    if (response.status === 400) {
      return { success: false, error: 'Error, please try again.', status: 400 };
    }

    if (response.status === 404) {
      return { success: false, error: 'City not found.', status: 404 };
    }

    return {
      success: false,
      error: 'Something went wrong. Please try again later.',
      status: response.status,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection.',
    };
  }
}
