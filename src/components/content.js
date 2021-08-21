import React, { Component } from 'react';
import { fromUnixTime } from 'date-fns';
import { format, utcToZonedTime } from 'date-fns-tz';
import WeatherData from './WeatherData';
import HourlyData from './HourlyData';
import snow from '../images/snow.jpg';
import clouds from '../images/clouds.jpg';
import clear from '../images/clear.jpg';
import thunderstorm from '../images/thunderstorm.jpg';
import weather from '../images/weather.jpg';
import rain from '../images/rain.jpg';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: 'metric',
      error: null,
      current: {},
      hourly: [],
    };
    this.getCoords = this.getCoords.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.changeScale = this.changeScale.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.city !== prevProps.city) {
      this.getWeather();
    }
  }

  getCoords() {
    const coordinates = [];
    if (this.isEmpty(this.props.city) === false) {
      // Ṭhis should never fire but maybe update error if it does
      console.log('getCoords error - -no city in props');
    } else {
      coordinates.push(this.props.city.lat, this.props.city.lon);
    }
    return coordinates;
  }

  async getWeather() {
    const coords = this.getCoords();
    const API_KEY = process.env.REACT_APP_MY_API;
    const weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coords[0]}&lon=${coords[1]}&units=${this.state.units}&exclude={part}&appid=${API_KEY}`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error(`Error Fetching Data. Reason: ${res.statusText}`);
        }
        return res;
      })
      .then((res) => res.json())
      .catch((err) => {
        this.setState({ error: err.message });
      });
    if (weatherData) {
      this.updateWeatherState(weatherData);
    }
  }

  updateWeatherState(data) {
    this.updateBackground(data.current.weather[0].id);
    const timezone = data.timezone;
    const currentData = this.parseCurrentData(data.current, timezone);
    const hourlyData = this.parseHourlyData(data.hourly, timezone);
    this.setState({
      error: null,
      timezone: timezone,
      current: currentData,
      hourly: [...hourlyData],
    });
  }

  updateBackground(weatherId) {
    const htmlElement = document.documentElement;
    let background;
    if (weatherId < 300) {
      background = thunderstorm;
    } else if (weatherId < 600) {
      background = rain;
    } else if (weatherId < 700) {
      background = snow;
    } else if (weatherId === 800) {
      background = clear;
    } else if (weatherId > 800) {
      background = clouds;
    } else {
      background = weather;
    }
    htmlElement.style.backgroundImage = `url(${background})`;
  }

  parseCurrentData(data, timezone) {
    const editedData = {
      temp: Math.round(data.temp),
      feels_like: Math.round(data.feels_like),
      uvi: data.uvi,
      main: data.weather[0].main,
      details: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.humidity,
    };

    const dateTime = this.getDateTime(data.dt, timezone);
    const sunrise = this.getTime(data.sunrise, timezone);
    const sunset = this.getTime(data.sunset, timezone);
    editedData.dt = dateTime;
    editedData.sunrise = sunrise;
    editedData.sunset = sunset;
    return editedData;
  }

  getDateTime(data, timezone) {
    var convertedDate = fromUnixTime(data);
    const zonedDate = utcToZonedTime(convertedDate, timezone);
    const pattern = 'EEEEEE dd MMM yyyy HH:mm';
    const output = format(zonedDate, pattern, { timesZone: timezone });
    return output;
  }

  getTime(data, timezone) {
    const time = fromUnixTime(data);
    const localTime = utcToZonedTime(time, timezone);
    const pattern = 'HH:mm';
    const output = format(localTime, pattern, { timeZone: timezone });
    return output;
  }

  isEmpty = (obj) => {
    return Object.keys(obj).length > 0;
  };

  // ######################
  // convert temp scale

  changeScale(e) {
    if (e.target.checked) {
      this.setState({ units: 'imperial' }, () => {
        this.convertTemp('imperial');
      });
    } else {
      this.setState({ units: 'metric' }, () => {
        this.convertTemp('metric');
      });
    }
  }

  convertTemp(scale) {
    if (!this.state.current.temp) return;
    const newHourly = this.updateHourlyTemps(scale);
    let currentTemps = [this.state.current.temp, this.state.current.feels_like];
    const newCurrentTemps = this.convertCurrentTemps(currentTemps, scale);
    this.updateTemps(newCurrentTemps, newHourly);
  }

  convertCurrentTemps(array, scale) {
    let newArray = [];
    array.forEach((temp) => {
      newArray.push(this.calcNewTemp(temp, scale));
    });
    return newArray;
  }

  updateHourlyTemps(scale) {
    const copyHourly = this.state.hourly.map((obj) => ({ ...obj }));
    const updatedArray = copyHourly.map((hour) => {
      let newTemp = this.calcNewTemp(hour.temp, scale);
      hour.temp = newTemp;
      return hour;
    });
    return updatedArray;
  }

  calcNewTemp(temp, scale) {
    if (scale === 'metric') {
      const newTemp = this.getCelsiusFromFahrenheit(temp);
      return newTemp;
    } else {
      const newTemp = this.getFahrenheitFromCelsius(temp);
      return newTemp;
    }
  }

  updateTemps(newCurrentTemps, newHourly) {
    this.setState((prevState) => ({
      current: {
        ...prevState.current,
        temp: newCurrentTemps[0],
        feels_like: newCurrentTemps[1],
      },
      hourly: [...newHourly],
    }));
  }

  getCelsiusFromFahrenheit(f) {
    return Math.round((f - 32) * (5 / 9));
  }

  getFahrenheitFromCelsius(c) {
    return Math.round(c * (9 / 5) + 32);
  }

  // ################################################################
  //  process hourly data

  parseHourlyData(data, timezone) {
    console.log(data);
    data.splice(24);
    const hourlyData = data.map((obj) => {
      let convertedData = this.convertHourlyData(obj, timezone);
      return convertedData;
    });

    return hourlyData;
  }

  convertHourlyData(hour, timezone) {
    const resultObject = {
      id: hour.dt,
      temp: Math.round(hour.temp),
      pop: hour.pop,
      main: hour.weather[0].main,
    };
    const time = this.getTime(hour.dt, timezone);
    resultObject.time = time;
    return resultObject;
  }

  //   Render

  render() {
    return (
      <div className='content-container'>
        {this.state.error && (
          <div className='error-box'>
            <p>{this.state.error}</p>
          </div>
        )}
        <div className='temp-switch'>
          <label className='switch to F'>
            Switch to F
            <input type='checkbox' name='temp' onClick={this.changeScale} />
          </label>
        </div>
        <div className='city-box'>
          <span className='city-name'>{this.props.city.name}</span>
          <span className='city-country'>{this.props.city.country}</span>
        </div>

        {this.state.current.dt && (
          <WeatherData data={this.state.current} units={this.state.units} />
        )}

        {this.state.hourly.length > 0 && (
          <HourlyData hourly={this.state.hourly} units={this.state.units} />
        )}
      </div>
    );
  }
}

export default Content;
