import { ICity } from '../interfaces/City';

export default function localStorageCities(): ICity[] {
  const data = localStorage.getItem('cities');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse cities from localStorage', e);
      return [];
    }
  }
  return [];
}
