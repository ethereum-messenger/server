import React, { Component } from 'react';
//import {Rectangle} from 'react-shapes';

export default class Chattxt extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: []};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const messageBox = document.getElementById('message');
    const message = messageBox.value;
    messageBox.value = "";
    let messages = this.state.messages;
    messages.push(message);
    this.setState({messages});
    event.preventDefault();
  }

  render() {
    return (
      <div>
      <div className="container3" >
      <form onSubmit={this.handleSubmit}>
        <label>
          Enter Message:
          <input type="text" id="message" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
      <div className="container4" >
      <ul>
      {
        this.state.messages.map(function(name, index){
          return <li key={ index }>{name}</li>;
        })
      }
      </ul>
      </div>
      {/*<Rectangle width={400} height={100} fill={{color:'#fafafa'}} stroke={{color:'#E65243'}} strokeWidth={3} />*/}
      </div>
    )
  }
}
