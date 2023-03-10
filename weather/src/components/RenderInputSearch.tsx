import { IPropsInputSearch } from 'interfaces/RenderInputSearch';
import React from 'react';

function RenderInputSearch({ onChange, value, onKeyUp }: IPropsInputSearch) {
  return (
    <input
      type="text"
      className="weather-app__search-bar"
      placeholder="Search your city..."
      onChange={onChange}
      value={value}
      onKeyUp={onKeyUp}
    />
  );
}

export default RenderInputSearch;