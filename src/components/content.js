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
    };
    this.getCoords = this.getCoords.bind(this);
    this.getWeather = this.getWeather.bind(this);
  }

  componentDidMount() {
    this.getWeather();
  }

  componentDidUpdate() {
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
    console.log(coordinates);
    return coordinates;
  }

  async getWeather() {
    const coords = this.getCoords();

    const API_KEY = process.env.REACT_APP_MY_API;
    const weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coords[0]}&lon=${coords[1]}&exclude={part}&appid=${API_KEY}`
    ).then((res) => res.json());
    console.log(weatherData);
  }

  isEmpty = (obj) => {
    return Object.keys(obj).length > 0;
  };

  render() {
    return (
      <div className='header'>
        <p>content here</p>
      </div>
    );
  }
}

// const Content = (props) => {
//   console.log(props);
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const [data, setData] = useState([]);
//   const fetchData = async () => {
//     const API_KEY = process.env.REACT_APP_MY_API;

//     const fetchData = await fetch(
//       'https://api.openweathermap.org/data/2.5/weather?q=bangkok&APPID=' +
//         API_KEY
//     ).then((res) => res.json());
//     setData(fetchData);
//   };
// {data.main && (
//   <div className='data'>
//     <div>Temp: {data.main.temp - 273}</div>
//     <div>Humidity: {data.main.humidity}</div>
//   </div>
// )}

//   return (
//     <div className='header'>
//       <p>Content here</p>
//     </div>
//   );
// };

export default Content;
