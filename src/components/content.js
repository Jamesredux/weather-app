import React, { useState, useEffect } from 'react';

const Content = () => {
  useEffect(() => {
    fetchData();

    console.log(data);
  }, []);

  const [data, setData] = useState([]);
  const fetchData = async () => {
    const fetchData = await fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=bangkok&APPID=1298e2c44b15a4187449fd0c07c579b8'
    ).then((res) => res.json());
    setData(fetchData);
    console.log(data);
  };

  return (
    <div className='header'>
      <p>this is where the content goes</p>

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
