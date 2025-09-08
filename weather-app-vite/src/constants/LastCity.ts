export const LAST_CITY_KEY = 'last_city';

export function saveLastCity(cityName: string): void {
  localStorage.setItem(LAST_CITY_KEY, cityName);
}

export function loadLastCity(): string | null {
  return localStorage.getItem(LAST_CITY_KEY);
}
