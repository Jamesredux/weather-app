import React, { Component } from 'react';
import { fromUnixTime } from 'date-fns';
import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import WeatherData from './WeatherData';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      current: {},
      hourly: [],
    };
    this.getCoords = this.getCoords.bind(this);
    this.getWeather = this.getWeather.bind(this);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (this.props.city !== prevProps.city) {
      this.getWeather();
    }
    console.log(this.state);
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
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coords[0]}&lon=${coords[1]}&units=metric&exclude={part}&appid=${API_KEY}`
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
    console.log('all data');
    console.log(data);
    const currentData = this.parseCurrentData(data.current, timezone);
    console.log(currentData);
    this.setState({
      error: null,
      current: currentData,
      hourly: [...data.hourly],
    });
  }

  parseCurrentData(data, timezone) {
    const editedData = {
      temp: data.temp,
      feels_like: data.feels_like,
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

  render() {
    return (
      <div className='content-container'>
        {this.state.error && (
          <div className='error-box'>
            <p>{this.state.error}</p>
          </div>
        )}
        <div className='city-box'>
          <span className='city-name'>{this.props.city.name}</span>
          <span className='city-country'>{this.props.city.country}</span>
        </div>
        <WeatherData data={this.state.current} />
      </div>
    );
  }
}

export default Content;
