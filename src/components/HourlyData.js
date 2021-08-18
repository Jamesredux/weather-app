import React, { Component } from 'react';

class HourlyData extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    const hourList = this.props.hourly.map((hour) => (
      <div className='hour-container' key={hour.id}>
        <div className='hour-box'>
          <p>{hour.time}</p>
        </div>
        <div className='hour-temp'>
          <p>
            {hour.temp}{' '}
            {this.props.units === 'metric' ? <span> C</span> : <span> F</span>}
          </p>
        </div>
        <div className='hour-weather'>
          <p>{hour.main}</p>
        </div>
        <div className='rain-chance'>Chance of Rain: {hour.pop}</div>
      </div>
    ));
    return (
      <div className='hours-container'>
        <div className='hours-header'>
          <h1>Hourly Forcast</h1>
        </div>
        <div className='hours-sroll'>{hourList}</div>
      </div>
    );
  }
}

export default HourlyData;
