import React, { Component } from 'react';

class WeatherData extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, props) {
    console.log('weatherdata did update');
  }

  render() {
    if (this.props.data.dt) {
      const {
        sunrise,
        sunset,
        temp,
        feels_like,
        uvi,
        humidity,
        dt,
        main,
        details,
      } = this.props.data;
      return (
        <div className='weather-current'>
          <div className='current-top'>
            <div className='current-time'>{dt}</div>
            <div className='current-temp'>
              {temp}
              {this.props.units === 'metric' ? (
                <span> C</span>
              ) : (
                <span> F</span>
              )}
            </div>
            <div className='feels-like'>
              Feels Like: {feels_like}
              {this.props.units === 'metric' ? (
                <span> C</span>
              ) : (
                <span> F</span>
              )}
            </div>
            <div className='current-icon'>
              <p>ICON</p>
            </div>
          </div>
          <div className='current=extra'>
            <div className='current-details'>
              <div className='details-text'>
                <div className='details-main'>{main}</div>
                <div className='details-extra'>{details}</div>
              </div>

              <div className='uvi-humid'>
                <div className='uvi'>UVI: {uvi}</div>
                <div className='humidity'>Humidity: {humidity}</div>
              </div>
              <div className='sun-updown'>
                <div className='sunrise'>Sunrise: {sunrise}</div>
                <div className='sunset'>Sunset: {sunset}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <p>This is where the weather data goes</p>
      </div>
    );
  }
}

export default WeatherData;
