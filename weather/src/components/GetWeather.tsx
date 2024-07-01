import url from 'constants/GetResponse';
import getLocalStorage from 'constants/LocalStorage';
import localStorageCities from 'constants/LocalStorageCities';
import { weatherName, inputClass, sectionBlockClass, gearClass } from 'constants/RenderElements';
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
    if (weather) {
      document.title = `Weather App ${weather.name}`;
      localStorage.setItem('data_weather', JSON.stringify(weather));
    }
  }, [weather]);

  async function getWeatherData (props: string) {
    const response: Response = await fetch(url(props));
    const data: IWeather = await response.json();
    const cityName = {
      id: data.id,
      name: data.name
    };

    switch (response.status) {
    case 200:
      setWeather(data);
      setLocalData([...localData, cityName]);
      setMessage('');
      setCity('');
      break;
    case 400:
      setMessage('Error, please try now');
      setTimeout(()=> { setMessage(''); }, 1000);
      break;
    case 404:
      setMessage('Your city not found');
      setTimeout(()=> { setMessage(''); }, 1000);
      setCity('');
      break;
    }
  }

  useEffect(() => {
    if (weather) {
      getWeatherData(weather.name);
    }
  }, []);

  async function search (event: { key: string }): Promise<void> {
    if (event.key === 'Enter') {
      await getWeatherData(city).catch(console.error);
      setSearchbar(!searchBar);
    }
  }

  async function handleCityClick(event: React.SyntheticEvent<HTMLDivElement>) {
    const cityName: string = event.currentTarget.dataset.id || '';
    if (cityName) {
      await getWeatherData(cityName).catch(console.error);
      setSearchbar(!searchBar);
    }
  }

  return (
    <>
      <section className={sectionBlockClass(searchBar, weather)}>
        <div className="weather-app__search-box">
          {searchBar ? (
            <>
              <input className={inputClass(searchBar)} />
              <div className="name">{`${weatherName(weather)}`}</div>
            </>
          ) : (
            <RenderInputSearch onChange={(e) => setCity(e.target.value)} value={city} onKeyUp={search}/>
          )}
          <GoGear onClick={() => setSearchbar(!searchBar)} className={gearClass(searchBar)} />
        </div>
        {message ? (
          <div className="weather-app__block">
            <div className="name">{message}</div>
          </div>
        ) : (
          <>
            {searchBar ? <RenderWeather value={weather} /> : <RenderCity onClick={(e) => handleCityClick(e)} value={localData}/>}
          </>
        )}
      </section>
    </>
  );
}
