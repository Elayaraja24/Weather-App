import { useEffect, useState } from "react";
// import "./style.css"

import sunIcon from "./clear3.png"
import rainIcon from "./Rain1.png"
import cloudIcon from "./Cloud.png"
import windIcon from "./wind1.png"
import humidityIcon from "./Humidity.png"
import drizzleIcon from "./Drizzle1.png"

const WeatherDetails = ({ icon, temp, city, country, lat, log, wind, humidity }) => {
    return (
        <>
            <div className="image">
                <img src={icon} alt="Image" height="120px" width="150px" />
            </div>
            <div className="temp">{temp} °C</div>
            <div className="location">{city}</div>
            <div className="country">{country}</div>
            <div className="cordinates">
                <div>
                    <span className="lat">Latidude</span>
                    <span>{lat}</span>
                </div>
                <div>
                    <span className="log">Longitude</span>
                    <span>{log}</span>
                </div>
            </div>
            <div className="data-container">
                <div className="content">
                    <img src={humidityIcon} alt="humidity" className="humidity" height="50px" width="50px" />
                    <div className="data">
                        <div className="humidity-percent">{humidity}%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="content">
                    <img src={windIcon} alt="wind" className="wind" height="50px" width="50px" />
                    <div className="data">
                        <div className="wind-percent">{wind}km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>


                </div>
            </div>
        </>
    )
};

function Weather() {
    let api_key = "f1d1f0ce53630d09838fc5a7034f62f4";

    const [text, setText] = useState("Chennai")
    const [icon, setIcon] = useState(rainIcon);
    const [temp, setTemp] = useState(0);
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("")
    const [lat, setLat] = useState(0)
    const [log, setLog] = useState(0)
    const [humidity, setHumidity] = useState(0)
    const [wind, setWind] = useState(0)

    const [cityNotFound, setCityNotFound] =useState(false);
    const [loading, setLoading] = useState(false);

    const weatherUpdate ={
        "01d":sunIcon,
        '01n':sunIcon,
        "02d":cloudIcon,
        "02n":cloudIcon,
        "03d":drizzleIcon,
        "03n":drizzleIcon,
        "04d":drizzleIcon,
        "04n":drizzleIcon,
        "09d":rainIcon,
        "09n":rainIcon,
        "10d":rainIcon,
        "10n":rainIcon

    };

    const search = async () => {
        setLoading(true);
    
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=f1d1f0ce53630d09838fc5a7034f62f4&units=Metric`
        try{
            let res =await fetch(url);
            let data =await res.json();
            // console.log(data);
            if(data.cod === "404"){
                console.error("City Not Found");
                setCityNotFound(true)
                setLoading(false)
                return;
            }
            setHumidity (data.main.humidity);
            setWind (data.wind.speed)
            setTemp (Math.floor(data.main.temp));
            setCity(data.name);
            setCountry(data.sys.country);
            setLat(data.coord.lat);
            setLog(data.coord.lon);
            const weatherCode =data.weather[0].icon;
            setIcon(weatherUpdate[weatherCode] || sunIcon)
            setCityNotFound(false);
        } catch(error){
            console.error("An error occurred:", error.message);
        }finally{
            setLoading(false);
        }
    }
    const handleLocation =(e)=>{
        setText(e.target.value)
    }
    const handleKey =(e)=>{
        if(e.key === "Enter"){
            search()
        }
    }
    useEffect(function() {
        search()
    },[]);

    return (
        <>
            <div className="container">
                <div className="input-container">
                    <input type="text" placeholder="Enter City" className="input-box" onChange={handleLocation}
                    value={text} onKeyDown={handleKey}/>
                    <div className="search-icon" onClick={()=>search() }>
                        <button><i class='bx bx-search'></i></button>
                    </div>
                </div>
                {!cityNotFound&&<WeatherDetails icon={icon} temp={temp} city={city} country={country}
                    lat={lat} log={log} humidity={humidity} wind={wind} />}

                    {cityNotFound&& <div className="city-error">City-Not-Found</div>}
            </div>

        </>
    )
}

export default Weather