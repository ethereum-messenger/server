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
      <form className="initialForm" onSubmit={this.handleSubmit}>
        <label className="initialText">Enter User Key:</label>
        <input className="initialText" type="text" id="userKey" />

        <label className="initialText">Enter User private key:</label>
        <input className="initialText" type="text" id="privateUserKey" />

        <label className="initialText">Enter chat room Key:</label>
        <input className="initialText" type="text" id="roomKey" />

        <input className="initialText" type="submit" value="Submit" />
      </form>
      </div>
    )
  }
}
