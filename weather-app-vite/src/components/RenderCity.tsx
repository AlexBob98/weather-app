import { ICity, IRenderCity } from '../interfaces/City';
import { useEffect, useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import Loader from '../utils/Spinner';

function RenderCity({ value, onClick }: IRenderCity) {
  const [city, setCity] = useState(value);
  const [isLoading, setIsLoading] = useState(true);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  function deleteCity(id: number) {
    const filteredCities = city.filter(({ id: cityId }) => cityId !== id);
    setCity(filteredCities);
    localStorage.setItem('cities', JSON.stringify(filteredCities));
  }

  function handleDragStart(e: React.DragEvent, index: number) {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    const target = e.target as HTMLElement;
    target.classList.add('dragging');
  }

  function handleDragEnd() {
    const draggingElements = document.querySelectorAll('.dragging');
    draggingElements.forEach(el => el.classList.remove('dragging'));
    setDraggedIndex(null);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  function handleDrop(e: React.DragEvent, dropIndex: number) {
    e.preventDefault();
    if (draggedIndex || draggedIndex) {
      const newCities = [...city];
      const draggedItem = newCities[draggedIndex];
      newCities.splice(draggedIndex, 1);
      newCities.splice(dropIndex, 0, draggedItem);

      setCity(newCities);
      localStorage.setItem('cities', JSON.stringify(newCities));
      setDraggedIndex(null);
    }
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
      <ul>
        {city.map((item: ICity, idx: number) => (
          <li
            key={item.id}
            className="list"
            draggable
            onDragStart={(e) => handleDragStart(e, idx)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, idx)}
            onDragEnd={handleDragEnd}
          >
            <p className='city-name' onClick={() => onClick(item.name)}>
              {item.name}
              <IoTrashOutline
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCity(item.id);
                }}
                className="close"
              />
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RenderCity;
