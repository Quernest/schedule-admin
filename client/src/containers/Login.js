import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../components/Login/Form';
import Jumbotron from '../components/Jumbotron';
import userActions from '../actions/user.actions';
import history from '../helpers/history';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      username: '',
      password: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    const { user } = this.props;
    const { loggedIn } = user;

    if (loggedIn) {
      history.push('dashboard');
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    const { username, password } = this.state;

    if (username && password) {
      dispatch(userActions.login(username, password));
    }

    this.setState({
      submitted: true,
    });
  }

  onChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { submitted, username, password } = this.state;

    return (
      <div className="login">
        <Jumbotron />
        <Form
          username={username}
          password={password}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          submitted={submitted}
        />
      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    token: PropTypes.string,
    username: PropTypes.string,
    loggedIn: PropTypes.bool,
    loading: PropTypes.bool,
  }),
  dispatch: PropTypes.func.isRequired,
};

Login.defaultProps = {
  user: {},
};

const mapStateToProps = (state) => {
  const { user } = state;

  return {
    user,
  };
};

export default connect(mapStateToProps)(Login);
