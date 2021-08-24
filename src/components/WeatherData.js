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
          <div className='large city-box'>{city},</div>
          <div className='large'>{country}</div>
        </div>
        <div className='date-box'>
          <div className='current-time yellow'>{dt}</div>
        </div>
        <div className='main-info-box'>
          <div className='current-temp'>
            {temp}
            {this.props.units === 'metric' ? (
              <span>&#xb0;C</span>
            ) : (
              <span>&#xb0;F</span>
            )}
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
        <div className='extra-box-1'>
          <div className='details-extra'>{details}</div>
          <div className='feels-like'>
            Feels Like: {feels_like}
            {this.props.units === 'metric' ? (
              <span>&#xb0;C</span>
            ) : (
              <span>&#xb0;F</span>
            )}
          </div>
        </div>
        <div className='extra-box-2'>
          <div className='uvi'>UVI: {uvi}</div>
          <div className='humidity'>Humidity: {humidity}</div>
        </div>
        <div className='sunrise-sunset'>
          <div className='sunrise'>
            Sunrise: <span className='yellow'>{sunrise}</span>
          </div>
          <div className='sunset'>
            Sunset: <span className='yellow'>{sunset}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherData;
