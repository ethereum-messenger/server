import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Initialtxt from './initialtxt.jsx';
import Chattxt from './chattxt.jsx';

export default class Application extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Initialtxt}/>
          <Route path="/chat" component={Chattxt}/>
        </Switch>
      </BrowserRouter>
    )
  }
}
