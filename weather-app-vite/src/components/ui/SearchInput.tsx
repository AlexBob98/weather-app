import { GoGear } from 'react-icons/go';
import { gearClass } from '../../constants/RenderElements';
import { ChangeEvent, KeyboardEvent } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: KeyboardEvent<HTMLInputElement>) => void;
  onToggleCities: () => void;
  showCities: boolean;
}

export default function SearchInput({
  onChange,
  onSearch,
  onToggleCities,
  showCities,
  value,
}: SearchInputProps) {
  return (
    <div className="weather-app__search-box">
      <input
        className="weather-app__search-bar"
        value={value}
        onChange={onChange}
        onKeyDown={onSearch}
        placeholder="Search your city..."
        id="city-search"
      />
      <GoGear onClick={onToggleCities} className={gearClass(!showCities)} />
    </div>
  );
}
