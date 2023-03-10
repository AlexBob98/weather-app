import { ICity, IRenderCity } from 'interfaces/City';
import React, { useEffect, useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import Loader from 'utils/Spinner';

function RenderCity({ value, onClick }: IRenderCity) {
  const [city, setCity] = useState(value);
  const [isLoading, setIsLoading] = useState(true);

  function deleteCity(id: number): void {
    const deleteItem: ICity[] = city.filter((item: ICity): boolean => {
      return item.id !== id;
    });
    setCity(deleteItem);
    localStorage.setItem('cities', JSON.stringify(deleteItem));
  }

  useEffect(() => {
    if (city) {
      const result = city.reduce((arr: ICity[], item: ICity): ICity[] => {
        if (!arr.find((cur: ICity): boolean => cur.id == item.id)) {
          arr.push(item);
        }
        return arr;
      }, []);
      setCity(result);
      localStorage.setItem('cities', JSON.stringify(result));
    }
  }, []);

  useEffect(() => {
    if (city) {
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }
  }, [city]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="weather-app__city">
      {city.map((item: ICity, idx: number) => (
        <div className="list" key={idx} data-index={idx}>
          <div onClick={onClick} data-id={item.name}>{item.name}</div>
          <IoTrashOutline onClick={() => deleteCity(item.id)} className="close" />
        </div>
      ))}
    </div>
  );
}

export default RenderCity;
