import React, { Component } from 'react';
import { fromUnixTime } from 'date-fns';
import { format, utcToZonedTime } from 'date-fns-tz';
import WeatherData from './WeatherData';

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
    this.convertTemp = this.convertTemp.bind(this);
    // this.getCelsiusFromFahrenheit = this.getCelsiusFromFahrenheit.bind(this);
    // this.getFahrenheitFromCelsius = this.getFahrenheitFromCelsius.bind(this);
  }

  componentDidMount() {}

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
    const timezone = data.timezone;
    const currentData = this.parseCurrentData(data.current, timezone);
    this.setState({
      error: null,
      current: currentData,
      hourly: [...data.hourly],
    });
  }

  parseCurrentData(data, timezone) {
    // this could be where convert temp - put button by search box
    const editedData = {
      temp: Math.round(data.temp),
      feels_like: Math.round(data.feels_like),
      uvi: data.uvi,
      main: data.weather[0].main,
      details: data.weather[0].description,
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

  convertTemp(e) {
    if (e.target.checked) {
      this.setState({ units: 'imperial' }, () => {
        this.updateUnits();
      });
    } else {
      this.setState({ units: 'metric' }, () => {
        this.updateUnits();
      });
    }
  }

  updateUnits() {
    // needs refactor
    if (this.state.current.temp) {
      if (this.state.units === 'metric') {
        const oldTemp = this.state.current.temp;
        const oldFeelsLike = this.state.current.feels_like;
        const newTemp = this.getCelsiusFromFahrenheit(oldTemp);
        const newFeelsLike = this.getCelsiusFromFahrenheit(oldFeelsLike);
        this.setState((prevState) => ({
          current: {
            ...prevState.current,
            temp: newTemp,
            feels_like: newFeelsLike,
          },
        }));
      } else if (this.state.units === 'imperial') {
        const oldTemp = this.state.current.temp;
        const oldFeelsLike = this.state.current.feels_like;
        const newTemp = this.getFahrenheitFromCelsius(oldTemp);
        const newFeelsLike = this.getFahrenheitFromCelsius(oldFeelsLike);
        this.setState((prevState) => ({
          current: {
            ...prevState.current,
            temp: newTemp,
            feels_like: newFeelsLike,
          },
        }));
      }
    }
  }

  getCelsiusFromFahrenheit(f) {
    return Math.round((f - 32) * (5 / 9));
  }

  getFahrenheitFromCelsius(c) {
    return Math.round(c * (9 / 5) + 32);
  }

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
            <input type='checkbox' name='temp' onClick={this.convertTemp} />
          </label>
        </div>
        <div className='city-box'>
          <span className='city-name'>{this.props.city.name}</span>
          <span className='city-country'>{this.props.city.country}</span>
        </div>
        <WeatherData data={this.state.current} units={this.state.units} />
      </div>
    );
  }
}

export default Content;
