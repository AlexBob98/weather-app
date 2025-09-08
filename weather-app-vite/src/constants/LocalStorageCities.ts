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

export const saveCityToStorage = (newCity: ICity) => {
  const savedCities = localStorageCities();
  const exists = savedCities.some(c => c.id === newCity.id);
  if (exists) return;

  const updated = [...savedCities, newCity];
  localStorage.setItem('cities', JSON.stringify(updated));
  return updated;
};
