import React, { Component } from 'react';

class WeatherData extends Component {
  componentDidUpdate(prevProps, props) {
    console.log('weatherdata did update');
  }

  render() {
    const {
      city,
      country,
      sunrise,
      sunset,
      temp,
      feels_like,
      uvi,
      humidity,
      dt,
      main,
      icon,
      details,
    } = this.props.data;
    return (
      <div className='weather-current'>
        <div className='city-name'>
          <div className='large'>{city}</div>
          <div className='large'>{country}</div>
        </div>
        <div className='current-top'>
          <div className='current-time'>{dt}</div>
          <div className='current-temp'>
            {temp}
            {this.props.units === 'metric' ? <span> C</span> : <span> F</span>}
          </div>
          <div className='feels-like'>
            Feels Like: {feels_like}
            {this.props.units === 'metric' ? <span> C</span> : <span> F</span>}
          </div>
        </div>
        <div className='current-extra'>
          <div className='current-details'>
            <div className='details-box'>
              <div className='details-text'>
                <div className='details-main'>{main}</div>
                <div className='details-extra'>{details}</div>
              </div>
              <div className='details-icon'>
                <img
                  src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                  height='100'
                  width='100'
                  alt='icon'
                />
              </div>
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
}

export default WeatherData;
