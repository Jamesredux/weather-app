import './App.css';
import './reset.css';
import React, { Component } from 'react';
import Content from './components/content';
import Form from './components/form';

class App extends Component {
  constructor() {
    super();
    this.state = { city: {}, units: 'metric' };
    this.updateCity = this.updateCity.bind(this);
    this.changeScale = this.changeScale.bind(this);
  }

  updateCity(cityData) {
    this.setState({
      city: cityData,
    });
  }

  changeScale(e) {
    if (e.target.checked) {
      this.setState(
        { units: 'imperial' }
        // , () => {
        // this.convertTemp('imperial');}
      );
    } else {
      this.setState(
        { units: 'metric' }
        // , () => {
        //   this.convertTemp('metric');}
      );
    }
  }

  render() {
    return (
      <div className='container'>
        <Form submitForm={this.updateCity} changeScale={this.changeScale} />
        <Content city={this.state.city} units={this.state.units} />
      </div>
    );
  }
}

export default App;
