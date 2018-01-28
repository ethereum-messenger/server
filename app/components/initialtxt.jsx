import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Usertxt extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const userAddress = document.getElementById('userAddress').value;
    const roomAddress = document.getElementById('roomAddress').value;
    const keystore = document.getElementById('keystore').value;
    const password = document.getElementById('password').value;

    this.props.history.push(`/chat?userAddress=${userAddress}&roomAddress=${roomAddress}&keystore=${keystore}&password=${password}`);
    event.preventDefault();
  }
  render() {
    return (
      <div className="grid-container" >
      <form onSubmit={this.handleSubmit}>
        <label>Enter User Address:</label>
        <input type="text" id="userAddress" />

        <label>Enter Room Address:</label>
        <input type="text" id="roomAddress" />

        <label>Enter Keystore:</label>
        <input type="text" id="keystore" />

        <label>Enter Password:</label>
        <input type="text" id="password" />

        <input className="initialText" type="submit" value="Submit" />
      </form>
      </div>
    )
  }
}
