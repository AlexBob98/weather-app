import api from './ApiKey';
const apiKey = process.env.REACT_APP_API_KEY;

export default function url(city: string): string {
  const url = `${api.base}weather?q=${city}&units=metric&appid=${apiKey}`;

  return url;
}