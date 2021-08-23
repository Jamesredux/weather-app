import './App.css';
import './reset.css';
import React, { Component } from 'react';
import Content from './components/content';
import Form from './components/form';

class App extends Component {
  constructor() {
    super();
    this.state = { city: null, units: 'metric', errorMessage: null };
    this.updateCity = this.updateCity.bind(this);
    this.changeScale = this.changeScale.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  updateCity(cityData) {
    console.log('called');
    this.setState({
      city: cityData,
      errorMessage: null,
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

  handleError(message) {
    this.setState({ city: null, errorMessage: message });
    console.log(this.state);
  }

  render() {
    return (
      <div className='container'>
        <Form
          submitForm={this.updateCity}
          changeScale={this.changeScale}
          handleError={this.handleError}
        />
        {this.state.errorMessage && (
          <div className='error-box'>
            <p className='alert'>{this.state.errorMessage}</p>
            <p className='small-text'>
              To make search more precise put the city's name, comma, 2-letter
              country code (ISO3166). Example: London, GB or London, CA
            </p>
          </div>
        )}
        {!this.state.errorMessage && (
          <Content city={this.state.city} units={this.state.units} />
        )}
      </div>
    );
  }
}

export default App;
