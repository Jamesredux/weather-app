import React, { Component } from 'react';
import { fromUnixTime } from 'date-fns';
import { format, utcToZonedTime } from 'date-fns-tz';

class HourlyData extends Component {
  constructor(props) {
    super(props);
    console.log('hourly data');
    console.log(props);
  }

  componentDidMount(prevProps, props) {
    console.log('hourly did mount');
    this.props.hourly.map((hour) => {
      console.log(hour.dt);
      this.getDateTime(hour.dt, this.props.timezone);
    });
  }

  componentDidUpdate(prevProps, props) {
    console.log('hourly did update');
  }

  getDateTime(data, timezone) {
    var convertedDate = fromUnixTime(data);
    const zonedDate = utcToZonedTime(convertedDate, timezone);
    const pattern = 'EEEEEE dd MMM yyyy HH:mm';
    const output = format(zonedDate, pattern, { timesZone: timezone });
    // return output;
    console.log(output);
  }

  render() {
    return (
      <div>
        <p>Hourly data will go here</p>
      </div>
    );
  }
}

export default HourlyData;
