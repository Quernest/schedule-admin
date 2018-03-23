import React, { Component } from 'react';
import Header from '../components/Header';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="login">
        <Header />
      </div>
    );
  }
}
