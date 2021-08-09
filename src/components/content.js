import React, { Component } from 'react';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      example: {
        name: 'Bangkok',
        country: 'TH',
        lat: 13.75,
        lon: 100.5167,
      },
      error: null,
    };
    this.getCoords = this.getCoords.bind(this);
    this.getWeather = this.getWeather.bind(this);
  }

  componentDidMount() {
    // VERY IMPORTANT NEED TO CHECKED THAT STATE HAS UPDATED
    // BEFORE YOU  RUN GET WEATHER FUNCTION COMPARE PREV STATE AND NEW OR PROPS?
    this.getWeather();
  }

  componentDidUpdate() {
    // VERY IMPORTANT NEED TO CHECKED THAT STATE HAS UPDATED
    // BEFORE YOU  RUN GET WEATHER FUNCTION COMPARE PREV STATE AND NEW OR PROPS?
    console.log(this.props);
    this.getWeather();
  }

  getCoords() {
    const coordinates = [];

    if (this.isEmpty(this.props.city) === false) {
      coordinates.push(this.state.example.lat, this.state.example.lon);
    } else {
      coordinates.push(this.props.city.lat, this.props.city.lon);
    }
    return coordinates;
  }

  async getWeather() {
    const coords = this.getCoords();

    const API_KEY = process.env.REACT_APP_MY_API;
    const weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coords[0]}&lon=${coords[1]}&exclude={part}&appid=${API_KEY}`
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
    // when update state - reset error to null
    console.log(data);
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
        <p>content here</p>
      </div>
    );
  }
}

export default Content;
