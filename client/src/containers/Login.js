import React, { Component } from 'react';
import API from '../services/api.service';

import LoginForm from '../components/Forms/LoginForm';
import Jumbotron from '../components/Jumbotron';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      submitted: false,
      username: '',
      password: '',
      error: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  }

  onSubmit(e) {
    const { username, password } = this.state;
    e.preventDefault();

    this.setState({
      submitted: true,
    });

    if (username && password) {
      this.clearErrors();

      this.setState({
        loading: true,
      });

      API.login(username, password)
        .then(() => {
          this.setState({
            loading: false,
          });
        })
        .catch((error) => {
          this.setState({
            loading: false,
            error,
          });
        });
    }
  }

  onChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  clearErrors() {
    this.setState({
      error: '',
    });
  }

  render() {
    const {
      submitted, username, password, loading, error,
    } = this.state;

    return (
      <div className="login">
        <Jumbotron />
        <LoginForm
          loading={loading}
          username={username}
          password={password}
          submitted={submitted}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          error={error}
        />
      </div>
    );
  }
}
