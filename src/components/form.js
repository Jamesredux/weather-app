import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(e) {
    this.fetchCity(this.state.value);
    e.preventDefault();
  }

  async fetchCity(city) {
    console.log('city is' + city);
    const API_KEY = process.env.REACT_APP_MY_API;
    const cityResult = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&APPID=${API_KEY}`
    ).then((res) => res.json());
    console.log(cityResult);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          City:
          <input
            type='text'
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type='submit' value='Submit' />
      </form>
    );
  }
}

export default Form;
