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
import React from 'react';
import Arrow from '../assets/svg/arrow.svg';

function RenderWeather({ value }: {value: IWeather}) {
  return (
    <div className='weather-app__block'>
      <div className={`${weatherStyle(value)}`}></div>
      <div className={`weather ${dayStyle(value)}`}></div>
      <div className="weather-app__block-image">
        <div><img className="image" src={imageUrl(value)} alt={altImage(value)} /></div>
        <div className="temp">{temperature(value)}</div>
      </div>
      <div className="desc">
        {feelLikeTemp(value)}
        <div className="desc">{descTemp(value)}</div>
      </div>
      <div className="wind">
        <img src={Arrow} className="wind-img" style={styleArrow(value)} />
        {hpaPressure(value)}
        <div className="humidity">{humidity(value)}</div>
      </div>
      <div className="visibility">{visibility(value)}</div>
    </div>
  );
}

export default RenderWeather;
