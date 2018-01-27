import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "../styles/index.scss";

class Index extends Component {
  render() {
    return (
      <h1>Hello, react</h1>
    )
  }
}

ReactDOM.render(<Index/>, document.getElementById('root'));
