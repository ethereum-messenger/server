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
    alert('A key was submitted: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <div className="grid-container" >
      <form onSubmit={this.handleSubmit}>
        <label>
          Enter User Key:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <form onSubmit={this.handleSubmit}>
        <label>
          Enter User private key:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <form onSubmit={this.handleSubmit}>
        <label>
          Enter chat room Key:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    )
  }
}
