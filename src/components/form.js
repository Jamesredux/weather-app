import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', searchResult: {}, searchError: false };

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
    const API_KEY = process.env.REACT_APP_MY_API;
    const cityResult = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&APPID=${API_KEY}`
    ).then((res) => res.json());

    if (cityResult.length < 1) {
      this.setState({ searchError: true });
    } else {
      this.setState(
        (prevState) => ({
          value: '',
          searchResult: cityResult[0],
          searchError: false,
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

        {this.state.searchError && (
          <div className='error-box'>
            <p>Sorry: Unrecognised query. Please try again</p>
          </div>
        )}
      </div>
    );
  }
}

export default Form;
