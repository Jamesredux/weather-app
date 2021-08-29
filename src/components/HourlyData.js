import React, { Component } from 'react';

class HourlyData extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    const hourList = this.props.hourly.map((hour) => (
      <div className='hour-row' key={hour.id}>
        <div className='hour-box yellow bigger'>
          <p>{hour.time}</p>
        </div>
        <div className='hour-temp bigger'>
          <p>
            {hour.temp}
            {this.props.units === 'metric' ? (
              <span>&#xb0;C</span>
            ) : (
              <span>&#xb0;F</span>
            )}
          </p>
        </div>
        <div className='hour-weather bigger'>
          <p>{hour.main}</p>
        </div>
        <div className='rain-chance'>Chance of Rain: {hour.pop}%</div>
      </div>
    ));
    return (
      <div className='hours-container'>
        <div className='hours-header'>
          <p className='large'>Hourly Forcast</p>
        </div>
        <div className='hours-roll'>{hourList}</div>
      </div>
    );
  }
}

export default HourlyData;
