import React, { useEffect, useState } from "react";
import "./WeatherApp.css";

import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import search_icon from "../assets/search.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

export const WeatherApp = () => {
  const api_key = "86e2226b9b4b9bc40798aad82d06d7d7";

  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(cloud_icon);
  const [temperature, setTemperature] = useState("-- °C");
  const [location, setLocation] = useState("--");
  const [humidity, setHumidity] = useState("-- %");
  const [wind, setWind] = useState("-- km/h");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    if (searchTerm === "") {
      return 0;
    } else {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=Metric&appid=${api_key}`
        );
        const result = await response.json();

        setData(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (data) {
      setTemperature(`${Math.floor(data.main.temp)} °C`);
      setLocation(`${data.name}`);
      setHumidity(`${data.main.humidity} %`);
      setWind(`${Math.floor(data.wind.speed)} km/h`);

      switch (data.weather[0].main) {
        case "Clear":
          setWeatherIcon(clear_icon);
          break;
        case "Drizzle":
          setWeatherIcon(drizzle_icon);
          break;
        case "Rain":
          setWeatherIcon(rain_icon);
          break;
        case "Snow":
          setWeatherIcon(snow_icon);
          break;
        default:
          setWeatherIcon(cloud_icon);
      }
    }
  }, [data]);

  return (
    <div className="container">
      <div className="top-bar">
        <input
          className="cityInput"
          onChange={handleInputChange}
          value={searchTerm}
          type="text"
          placeholder="Search..."
        />
        <div className="search-icon">
          <img src={search_icon} alt="" onClick={handleSearch} />
        </div>
      </div>
      <div className="weather-image">
        <img src={weatherIcon} alt="" />
      </div>
      <div className="weather-temp">{temperature}</div>
      <div className="weather-location">{location}</div>
      <div className="data-container">
        <div className="element">
          <img className="icon" src={humidity_icon} alt="" />
          <div className="data">
            <div className="humidity-percent">{humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img className="icon" src={wind_icon} alt="" />
          <div className="data">
            <div className="wind-rate">{wind}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};
