import React, { Component } from 'react';

export default class Weather extends Component {
  constructor(props){
    super(props)
    this.state={
      icon: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      icon: `https://icons.wxug.com/i/c/g/${nextProps.data.icon}.gif`
    })
  }

  render() {

    return (
      <div className="weather-boxes">
        <header>{this.props.data.date}</header>
        <div className="container">
          <div className="weather-icon">
            <img alt="weather icon" src={`${this.state.icon}`}/>
          </div>
          <div className="weather-details">
            <p>{this.props.data.conditions}</p>
            <p><span>{this.props.data.high}</span> / {this.props.data.low} ˚F</p>
            <p></p>
          </div>
        </div>
      </div>
    );
  }
}
