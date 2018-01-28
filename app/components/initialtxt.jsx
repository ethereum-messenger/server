import React, { Component } from 'react';

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
    const userKey = document.getElementById('userKey').value;
    const privateUserKey = document.getElementById('privateUserKey').value;
    const roomKey = document.getElementById('roomKey').value;

    alert(userKey);
    alert(privateUserKey);
    alert(roomKey);
    this.props.history.push('/chat')
    event.preventDefault();
  }
  render() {
    return (
      <div className="grid-container" >
      <form onSubmit={this.handleSubmit}>
        <label>Enter User Key:</label>
        <input type="text" id="userKey" />

        <label>Enter User private key:</label>
        <input type="text" id="privateUserKey" />

        <label>Enter chat room Key:</label>
        <input type="text" id="roomKey" />

        <input type="submit" value="Submit" />
      </form>
      </div>
    )
  }
}
