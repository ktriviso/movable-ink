import React, { Component } from 'react';
import { BrowserRouter, Route, Switch , History} from 'react-router-dom';
import Api from './Api';
import ApiError from './ApiError';
import './App.css';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state={}
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/error' component={ApiError} />
            <Route exact path='/' component={Api} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
