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
} from '../constants/RenderElements';
import { IWeather } from '../interfaces/Weather';
import Arrow from '../assets/svg/arrow.svg';

function RenderWeather({ value }: { value: IWeather }) {
  const weatherClass = weatherStyle(value);
  const dayClass = dayStyle(value);
  const imageSrc = imageUrl(value);
  const imageAlt = altImage(value);
  const temp = temperature(value);
  const feelTemp = feelLikeTemp(value);
  const desc = descTemp(value);
  const arrowStyle = styleArrow(value);
  const pressure = hpaPressure(value);
  const humid = humidity(value);
  const vis = visibility(value);

  return (
    <div className='weather-app__block'>
      <div className={weatherClass}></div>
      <div className={`weather ${dayClass}`}></div>
      <div className="weather-app__block-image">
        <div>
          <img className="image" src={imageSrc} alt={imageAlt} />
        </div>
        <div className="temp">{temp}</div>
      </div>
      <div className="desc-container">
        {feelTemp}
        <div className="desc">{desc}</div>
      </div>
      <div className="wind">
        <img src={Arrow} className="wind-img" style={arrowStyle} />
        {pressure}
        <div className="humidity">{humid}</div>
      </div>
      <div className="visibility">{vis}</div>
    </div>
  );
}

export default RenderWeather;
