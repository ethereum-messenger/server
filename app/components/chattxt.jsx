import React, { Component } from 'react';
import {Rectangle} from 'react-shapes';

export default class Chattxt extends Component {
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
    alert('A message was submitted: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <div>
      <div className="container3" >
      <form onSubmit={this.handleSubmit}>
        <label>
          Enter Message:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
      <div className="container4" >
      <p> 12345678990754 </p>
      <p> 12345678990754 </p>
      <p> 12345678990754 </p>
      <p> 12345678990754 </p>
      </div>
      {/*<Rectangle width={400} height={100} fill={{color:'#fafafa'}} stroke={{color:'#E65243'}} strokeWidth={3} />*/}
      </div>
    )
  }
}
