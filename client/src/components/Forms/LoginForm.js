import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

const LoginForm = ({
  submitted, username, password, onChange, onSubmit, error, loading,
}) => (
  <form className="login__form" onSubmit={onSubmit}>
    {error && <div className="login__form-feedback">{error}</div>}
    <FormattedMessage id="app.login.form.input.username">
      {placeholder => (
        <input
          className={classNames('login__form-input', { invalid: submitted && !username })}
          onChange={onChange}
          name="username"
          type="text"
          placeholder={placeholder}
        />
      )}
    </FormattedMessage>
    {submitted &&
      !username && (
        <div className="login__form-feedback">
          <FormattedMessage id="app.login.form.input.username.feedback" />
        </div>
      )}
    <FormattedMessage id="app.login.form.input.password">
      {placeholder => (
        <input
          className={classNames('login__form-input', { invalid: submitted && !password })}
          onChange={onChange}
          name="password"
          type="password"
          placeholder={placeholder}
        />
      )}
    </FormattedMessage>
    {submitted &&
      !password && (
        <div className="login__form-feedback">
          <FormattedMessage id="app.login.form.input.password.feedback" />
        </div>
      )}
    <FormattedMessage id="app.login.form.button.submit">
      {label => (
        <button className="login__form-button" type="submit">
          {loading ? <div className="loader" /> : label}
        </button>
      )}
    </FormattedMessage>
  </form>
);

LoginForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  submitted: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  username: PropTypes.string,
  password: PropTypes.string,
  error: PropTypes.string,
};

LoginForm.defaultProps = {
  error: '',
  username: '',
  password: '',
};

export default LoginForm;
