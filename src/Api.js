import React, { Component } from 'react';
import Weather from './Weather'
import './App.css';
import geolocation from 'geolocation'
// import { withRouter } from "react-router-dom";
// import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router'

// this is for the api key security
// require('dotenv').config()

export default class Api extends Component {
  constructor(props){
    super(props)
    this.state={
      todaysForecastFromApi: '',
      tomorrowsForecastFromApi: '',
      dayAfterTomorrowsForecastFromApi: '',
      location: '',
      error: ''
    }
  }

  componentDidMount(){
    // this.state was out of scope
    const _this = this
    // this is for dynamically grabbing the users locations
    geolocation.getCurrentPosition(function (err, position) {
      if (err) throw err
      const url = 'http://api.wunderground.com/api/6ea7cf3bc006012f/geolookup/q/' + position.coords.latitude + ',' + position.coords.longitude + '.json'
      fetch(url)
      .then(res => res.json())
      .then((data) => {
        const location = `${data.location.city}, ${data.location.state}`
        _this.setState({
          location: location
        })
      })
      .catch(function() {
        console.log("error");
        // either way works, just remove line 94
        // _this.props.history.push(`/error`)
        _this.setState({
          error: "error"
        })
      });
    })

    // this is for pulling the weather data from the api
    fetch("http://api.wunderground.com/api/6ea7cf3bc006012f/forecast10day/q/NY/New_York.json")
    .then(res => res.json())
    .then((data) => {
      const forecast = data.forecast.simpleforecast.forecastday
      const today = {
        conditions: forecast[0].conditions,
        high: forecast[0].high.fahrenheit,
        low: forecast[0].low.fahrenheit,
        icon: forecast[0].icon,
        date: 'Today'
        // the image displayed showed "today" not the actual weekday so this is hardcoded
        // date: forecast[0].date.weekday
      }
      const tomorrow = {
        conditions: forecast[1].conditions,
        high: forecast[1].high.fahrenheit,
        low: forecast[1].low.fahrenheit,
        icon: forecast[1].icon,
        date: forecast[1].date.weekday
      }
      const dayAfterTomorrow = {
        conditions: forecast[2].conditions,
        high: forecast[2].high.fahrenheit,
        low: forecast[2].low.fahrenheit,
        icon: forecast[2].icon,
        date: forecast[2].date.weekday
      }

      this.setState({
        todaysForecastFromApi: today,
        tomorrowsForecastFromApi: tomorrow,
        dayAfterTomorrowsForecastFromApi: dayAfterTomorrow
      })
    })
    .catch(function() {
      console.log("error");
      // either way works, just remove line 94
      // _this.props.history.push(`/error`)
      _this.setState({
        error: "error"
      })
    });
  }

  render() {
    this.state.error === 'error' ? this.props.history.push(`/error`) : null


    return (
      <div className="App">

        <header>
          <p>weather forcast for {this.state.location === '' ? 'Your Location' : this.state.location}</p>
        </header>

        <section>
          <Weather data={this.state.todaysForecastFromApi}/>
          <Weather data={this.state.tomorrowsForecastFromApi}/>
          <Weather data={this.state.dayAfterTomorrowsForecastFromApi}/>
        </section>

      </div>
    );
  }
}
