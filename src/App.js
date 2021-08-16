import './App.css';
import React, { Component } from 'react';
import Header from './components/header';
import Content from './components/content';
import Form from './components/form';

class App extends Component {
  constructor() {
    super();
    this.state = { city: {} };
    this.updateCity = this.updateCity.bind(this);
  }

  updateCity(cityData) {
    this.setState({
      city: cityData,
    });
  }

  render() {
    return (
      <div className='container'>
        <Header />
        <Form submitForm={this.updateCity} />
        <Content city={this.state.city} />
      </div>
    );
  }
}

export default App;
