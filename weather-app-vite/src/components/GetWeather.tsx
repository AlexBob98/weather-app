import { fetchWeather, IFetchWeatherResult } from '../api/fetchWeather';
import getLocalStorage from "../constants/LocalStorage";
import localStorageCities from "../constants/LocalStorageCities";
import {
  inputClass,
  sectionBlockClass,
  gearClass,
} from "../constants/RenderElements";
import { ICity } from "../interfaces/City";
import { IWeather } from "../interfaces/Weather";
import { useCallback, useEffect, useState } from "react";
import { GoGear } from "react-icons/go";
import RenderCity from "./RenderCity";
import RenderWeather from "./RenderWeather";
import Loader from '../utils/Spinner';
import { getTimeOfDayClass } from '../constants/RenderElements';
import { loadLastCity, saveLastCity } from '../constants/LastCity';

export default function GetWeather() {
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showCities, setShowCities] = useState(false);
  const [localData, setLocalData] = useState<ICity[]>(localStorageCities());
  const [weather, setWeather] = useState<IWeather>(getLocalStorage());

  const syncWeatherWithCities = useCallback(() => {
    const savedCities = localStorageCities();
    if (savedCities.length === 0) {
      setWeather({} as IWeather);
      localStorage.removeItem('data_weather');
    }
  }, []);

  useEffect(() => {
    const savedCities = localStorageCities();
    setLocalData(savedCities);

    if (!weather.name && savedCities.length > 0) {
      setIsLoading(true);

      const lastCity = loadLastCity();
      const cityToLoad = lastCity || savedCities[0].name;

      getWeatherData(cityToLoad).finally(() => {
        setIsLoading(false);
      });
    } else {
      syncWeatherWithCities();
    }
  }, [syncWeatherWithCities]);

  async function getWeatherData(cityName: string): Promise<void> {
    if (!cityName.trim()) return;

    setIsLoading(true);
    setMessage("");

    try {
      const result: IFetchWeatherResult = await fetchWeather(cityName);

      if (result.success && result.data) {
        const data = result.data;
        setWeather(data);
        const newCity: ICity = { id: data.id, name: data.name };
        setLocalData((prev) => [...prev, newCity]);
        setCity("");
        saveLastCity(data.name);
      } else if (result.error) {
        setMessage(result.error);
        setTimeout(() => setMessage(""), 1000);

        if (result.status === 404) {
          setCity("");
        }
      }
    } catch (unexpectedError) {
      console.error('Unexpected error in getWeatherData:', unexpectedError);
      setMessage('Something went wrong. Please try again.');
      setTimeout(() => setMessage(''), 1000);
    } finally {
      setIsLoading(false);
    }
  }

  async function search(event: React.KeyboardEvent<HTMLInputElement>): Promise<void> {
    if (event.key === "Enter") {
      await getWeatherData(city);
      setShowCities(!showCities);
    }
  }

  async function handleCityClick(cityName: string): Promise<void> {
    if (cityName) {
      await getWeatherData(cityName);
      setShowCities(!showCities)
    }
  }

  const timeOfDayClass = weather && !showCities ? getTimeOfDayClass(weather) : '';

  return (
    <section className={`${sectionBlockClass(true, weather)}${showCities ? ' city-list' : ''} ${timeOfDayClass} `}>
      <div className="weather-app__search-box">
        <input
          className={`weather-app__search-bar ${inputClass(showCities)}`}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={search}
          placeholder="Search your city..."
          id="city-search"
        />
        {!showCities && weather?.name && (<div className="name">{weather.name}</div>)}
        <GoGear onClick={() => setShowCities(!showCities)} className={gearClass(!showCities)}/>
      </div>
      {isLoading ? (<div className="weather-app__loader"><Loader /></div>) : (
        <>
          {message ? (
            <div className="weather-app__block">
              <div className="name">{message}</div>
            </div>
          ) : (
            <>
              {showCities ? (
                <RenderCity onClick={handleCityClick} value={localData} />
              ) : weather?.name ? (
                <RenderWeather value={weather} />
              ) : (
                <div className="weather-app__block">
                  <div className="name">Search a city to see the weather</div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}
