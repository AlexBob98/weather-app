import api from './ApiKey';

export default function url(city: string): string {
  const url = `${api.base}weather?q=${city}&units=metric&appid=${api.key}`;

  return url;
}