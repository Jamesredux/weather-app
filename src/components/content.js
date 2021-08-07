import React, { useState, useEffect } from 'react';

const Content = (props) => {
  console.log(props);
  useEffect(() => {
    fetchData();
  }, []);

  const [data, setData] = useState([]);
  const fetchData = async () => {
    const API_KEY = process.env.REACT_APP_MY_API;

    const fetchData = await fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=bangkok&APPID=' +
        API_KEY
    ).then((res) => res.json());
    setData(fetchData);
  };

  return (
    <div className='header'>
      {data.main && (
        <div className='data'>
          <div>Temp: {data.main.temp - 273}</div>
          <div>Humidity: {data.main.humidity}</div>
        </div>
      )}
    </div>
  );
};

export default Content;
