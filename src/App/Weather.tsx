import React from "react";
import { ThemeContext } from "./ThemeProvider";

interface WeatherProps {
  city: string | null;
}

interface WeatherInfo {
  city: string | null;
  temp: number | null;
  humidity: number | null;
  wind: number | null;
  icon: string | undefined;
  country: string | null;
  state: string | null;
  flag: string | null;
  temp_min: number | null;
  temp_max: number | null;
  sunrise: string | null;
  sunset: string | null;
}

const Weather: React.FC<WeatherProps> = ({ city }) => {
  const [info, setWeatherInfo] = React.useState<WeatherInfo>({
    city: null,
    temp: null,
    humidity: null,
    wind: null,
    icon: undefined,
    country: null,
    state: null,
    flag: null,
    temp_min: null,
    temp_max: null,
    sunrise: null,
    sunset: null,
  });

  const getWeatherInfo = (data: any) => {
    setWeatherInfo({
      city: data.name,
      temp: data.main.temp,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
      country: data.sys.country,
      state: data.sys.state,
      flag: `https://flagcdn.com/w160/${data.sys.country.toLowerCase()}.png`,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  };

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=4c4f0b1876954338598a7be96c66527b`
    );
    const data = await response.json();
    getWeatherInfo(data);
  };

  const fetchLocationData = async (city: string) => {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=4c4f0b1876954338598a7be96c66527b`
    );
    const data = await response.json();

    if (data.length > 0) {
      fetchWeatherData(data[0].lat, data[0].lon);
    } else {
      setWeatherInfo({
        city: `Sorry, we couldn't find the weather for ${city}.`,
        temp: null,
        humidity: null,
        wind: null,
        icon: `https://i.pravatar.cc/150?img=6}`,
        country: null,
        state: null,
        flag: null,
        temp_min: null,
        temp_max: null,
        sunrise: null,
        sunset: null,
      });
    }
  };

  React.useEffect(() => {
    if (city) {
      fetchLocationData(city);
    }
  }, [city]);
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div className="weather-wrapper">
          <div className={`weather-card ${theme.background === "#1e1e1e" ? "dark" : ""}`}>
            {info.city ? (
              <>
                <div className="weather-header">
                  <h1>
                    {info.city}, {info.country} {info.state && `(${info.state})`}
                  </h1>
                  {info.flag && (
                    <img className="flag" src={info.flag} alt={`${info.country} flag`} />
                  )}
                </div>
                <div className="weather-body">
                  <div className="temperature-info">
                    <img src={info.icon} alt="weather icon" className="weather-icon" />
                    <p className="temp">{Math.round(info.temp!)}°C</p>
                  </div>
                  <div className="details">
                    <p>
                      Humidity: <span>{info.humidity}%</span>
                    </p>
                    <p>
                      Wind: <span>{info.wind} m/s</span>
                    </p>
                    <p>
                      Temperature Range:{" "}
                      <span>
                        {Math.round(info.temp_min!)}°C to {Math.round(info.temp_max!)}°C
                      </span>
                    </p>
                    <p>
                      Sunrise: <span>{info.sunrise}</span>
                    </p>
                    <p>
                      Sunset: <span>{info.sunset}</span>
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <p>{info.city}</p>
            )}
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  );
  
}; 
            
export { Weather}