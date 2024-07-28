import url from 'constants/GetResponse';
import getLocalStorage from 'constants/LocalStorage';
import localStorageCities from 'constants/LocalStorageCities';
import { inputClass, sectionBlockClass, gearClass } from 'constants/RenderElements';
import { ICity } from 'interfaces/City';
import { IWeather } from 'interfaces/Weather';
import React, { useEffect, useState } from 'react';
import { GoGear } from 'react-icons/go';
import RenderCity from './RenderCity';
import RenderInputSearch from './RenderInputSearch';
import RenderWeather from './RenderWeather';

export default function GetWeather() {
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [searchBar, setSearchbar] = useState(true);
  const [localData, setLocalData] = useState<ICity[]>(localStorageCities());
  const [weather, setWeather] = useState<IWeather>(getLocalStorage());

  useEffect(() => {
    if (weather && weather.name) {
      document.title = `Weather App ${weather.name}`;
      localStorage.setItem('data_weather', JSON.stringify(weather));
    }
  }, [weather]);

  async function getWeatherData(cityName: string): Promise<void> {
    try {
      const response: Response = await fetch(url(cityName));
      if (response.status === 200) {
        const data: IWeather = await response.json();
        setWeather(data);
        const newCity: ICity = { id: data.id, name: data.name };
        setLocalData((prevLocalData) => [...prevLocalData, newCity]);
        setMessage('');
        setCity('');
      } else if (response.status === 400) {
        setMessage('Error, please try again.');
        setTimeout(() => setMessage(''), 1000);
      } else if (response.status === 404) {
        setMessage('City not found.');
        setTimeout(() => setMessage(''), 1000);
        setCity('');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setMessage('Error fetching weather data.');
      setTimeout(() => setMessage(''), 1000);
    }
  }

  async function search(event: React.KeyboardEvent<HTMLInputElement>): Promise<void> {
    if (event.key === 'Enter') {
      await getWeatherData(city);
      setSearchbar(!searchBar);
    }
  }

  function handleCityClick(event: React.SyntheticEvent<HTMLDivElement>): void {
    const cityName = event.currentTarget.dataset.id || '';
    if (cityName) {
      getWeatherData(cityName);
      setSearchbar(!searchBar);
    }
  }

  return (
    <section className={sectionBlockClass(searchBar, weather)}>
      <div className="weather-app__search-box">
        {searchBar ? (
          <>
            <input className={inputClass(searchBar)} value={city} onChange={(e) => setCity(e.target.value)} onKeyUp={search} />
            <div className="name">{weather?.name}</div>
          </>
        ) : (
          <RenderInputSearch onChange={(e) => setCity(e.target.value)} value={city} onKeyUp={search} />
        )}
        <GoGear onClick={() => setSearchbar(!searchBar)} className={gearClass(searchBar)} />
      </div>
      {message ? (
        <div className="weather-app__block">
          <div className="name">{message}</div>
        </div>
      ) : (
        <>
          {searchBar ? (
            <RenderWeather value={weather} />
          ) : (
            <RenderCity onClick={handleCityClick} value={localData} />
          )}
        </>
      )}
    </section>
  );
}
