import { ICity, IRenderCity } from '../interfaces/City';
import { useEffect, useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import Loader from '../utils/Spinner';

function RenderCity({ value, onClick }: IRenderCity) {
  const [city, setCity] = useState(value);
  const [isLoading, setIsLoading] = useState(true);

  function deleteCity(id: number) {
    const filteredCities = city.filter(item => item.id !== id);
    setCity(filteredCities);
    localStorage.setItem('cities', JSON.stringify(filteredCities));
  }

  useEffect(() => {
    if (city) {
      const uniqueCities = city.reduce((arr: ICity[], item: ICity): ICity[] => {
        if (!arr.some((cur) => cur.id == item.id)) {
          arr.push(item);
        }
        return arr;
      }, []);
      setCity(uniqueCities);
      localStorage.setItem('cities', JSON.stringify(uniqueCities));
      setIsLoading(false);
    }
  }, [value]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="weather-app__city">
      {city.map((item: ICity, idx: number) => (
        <div className="list" key={idx} data-index={idx}>
          <div onClick={() => onClick(item.name)}>{item.name}</div>
          <IoTrashOutline onClick={() => deleteCity(item.id)} className="close" />
        </div>
      ))}
    </div>
  );
}

export default RenderCity;
