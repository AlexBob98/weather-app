import {
  altImage,
  dayStyle,
  descTemp,
  feelLikeTemp,
  hpaPressure,
  humidity,
  imageUrl,
  styleArrow,
  temperature,
  visibility,
  weatherStyle,
} from 'constants/RenderElements';
import { IWeather } from 'interfaces/Weather';
import React, { useMemo } from 'react';
import Arrow from '../assets/svg/arrow.svg';

function RenderWeather({ value }: { value: IWeather }) {
  const memoizedValues = useMemo(() => ({
    weatherClass: weatherStyle(value),
    dayClass: dayStyle(value),
    imageSrc: imageUrl(value),
    imageAlt: altImage(value),
    temp: temperature(value),
    feelTemp: feelLikeTemp(value),
    desc: descTemp(value),
    arrowStyle: styleArrow(value),
    pressure: hpaPressure(value),
    humid: humidity(value),
    vis: visibility(value),
  }), [value]);

  return (
    <div className='weather-app__block'>
      <div className={memoizedValues.weatherClass}></div>
      <div className={`weather ${memoizedValues.dayClass}`}></div>
      <div className="weather-app__block-image">
        <div><img className="image" src={memoizedValues.imageSrc} alt={memoizedValues.imageAlt} /></div>
        <div className="temp">{memoizedValues.temp}</div>
      </div>
      <div className="desc">
        {memoizedValues.feelTemp}
        <div className="desc">{memoizedValues.desc}</div>
      </div>
      <div className="wind">
        <img src={Arrow} className="wind-img" style={memoizedValues.arrowStyle} />
        {memoizedValues.pressure}
        <div className="humidity">{memoizedValues.humid}</div>
      </div>
      <div className="visibility">{memoizedValues.vis}</div>
    </div>
  );
}

export default RenderWeather;
