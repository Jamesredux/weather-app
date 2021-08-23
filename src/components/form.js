import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const icon = <FontAwesomeIcon icon={faSearch} />;

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      searchResult: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(e) {
    this.fetchCity(this.state.value);
    e.preventDefault();
  }

  async fetchCity(city) {
    const API_KEY = process.env.REACT_APP_MY_API;
    const cityResult = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&APPID=${API_KEY}`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error(`Error fetching data. Reason: ${res.statusText}`);
        }

        return res;
      })
      .then((res) => res.json())
      .catch((err) => {
        this.props.handleError(err.message);
      });
    if (cityResult) {
      this.updateState(cityResult);
    }
  }

  updateState(city) {
    if (city.length < 1) {
      this.setState({ searchError: true });
      const message = 'Sorry: Not Found. Please try again';
      this.props.handleError(message);
    } else {
      this.setState(
        (prevState) => ({
          value: '',
          searchResult: city[0],
          searchError: false,
          error: null,
        }),
        () => {
          this.props.submitForm(this.state.searchResult);
        }
      );
    }
  }

  render() {
    return (
      <div className='form-area'>
        <h2 className='logo'>Weather App</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            value={this.state.value}
            placeholder='Search Location'
            onChange={this.handleChange}
          />

          <button className='search' type='submit'>
            {icon}
          </button>
        </form>

        <div className='temp-switch'>
          <label className='switch'>
            <input
              type='checkbox'
              name='temp'
              onClick={this.props.changeScale}
            />
            <span className='slider round'>
              <div className='temp-letters'>
                <span>C</span>
                <span>F</span>
              </div>
            </span>
          </label>
        </div>
      </div>
    );
  }
}

export default Form;
