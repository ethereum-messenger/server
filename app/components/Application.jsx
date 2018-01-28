import React, { Component } from 'react';
import Usertxt from './initialtxt.jsx';
import Chattxt from './chattxt.jsx';
export default class Application extends Component {
  render() {
    return (
      <div >
      <h1>Ether Messenger</h1>
      <Usertxt/>
      <Chattxt/>
      </div>
    )
  }
}
