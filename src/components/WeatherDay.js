import { useState, useEffect } from 'react';
import weatherApi from './services/weatherApi';
import Loading from './Loading';
import CurrenInfo from './CurrenInfo';
import Weather from './Weather'
import images from '../images.json';



const WeatherDay = () => {

    //uso de state

    const [state, setState] = useState('');
    const [img, setImg] = useState('');
    const [hasDataLocation, setHasDataLocation] = useState(false);
    const [hasDataWeather, setHasDataWeather] = useState(false)
    const [country, setCountry] = useState('');
    const [icon, setIcon] = useState('');
    const [cloudy, setCloudy] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [wind, setWind] = useState(0);
    const [rain, setRain] = useState(0)
    const [description, setDescription] = useState('');
    const [tempCelsious, setTempCelcious] = useState(0);
    const [tempFarenheit, setTempFarenheit] = useState(0);

    //Weather api

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) =>{
            setHasDataLocation(true)
            weatherApi(pos.coords.latitude, pos.coords.longitude).then((res) =>{
                setHasDataWeather(true)
                setCloudy(res.data.current.cloud);
                setHumidity(res.data.current.humidity);
                setWind(res.data.current.wind_kph);
                setRain(res.data.current.precip_mm);
                setState(res.data.location.region)
                setCountry(res.data.location.country)
                setTempCelcious(res.data.current.temp_c);
                setImg(images[res.data.current.condition.text].img);
                setTempFarenheit(res.data.current.temp_f);
                setIcon(res.data.current.condition.icon);
                setDescription(res.data.current.condition.text);
            })
        })
    }, [])
    return(
        <div className='weather-container' style={{backgroundImage: `url(${img})`}}>
            {hasDataLocation && hasDataWeather ? (
                <>
                <Weather tempCelsious={tempCelsious} tempFarenheit={tempFarenheit} state={state} country={country} icon={icon} description={description}/>
                    <CurrenInfo cloudy={cloudy} humidity={humidity} wind={wind} rain={rain} />
                    </>) : (<Loading/>)
            }
        </div>
    )
}
export default WeatherDay