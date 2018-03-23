import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Header from '../components/Header';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { onChangeLang } = this.props;

    return (
      <div className="login">
        <Header onChangeLang={onChangeLang} />
        <h1 className="login-title">
          <FormattedMessage id="app.title" defaultMessage="..." />
        </h1>
      </div>
    );
  }
}

Login.propTypes = {
  onChangeLang: PropTypes.func.isRequired,
};
