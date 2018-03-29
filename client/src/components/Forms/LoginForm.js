import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import Alert from '../Alert';

const LoginForm = ({
  intl,
  username,
  password,
  onChange,
  onSubmit,
  submitted,
  loading,
  alert,
}) => {
  const { formatMessage } = intl;

  return (
    <form className="login__form" onSubmit={onSubmit}>
      {alert.id && <Alert id={alert.id} type={alert.type} />}
      <input
        className={classNames('login__form-input', {
          invalid: submitted && !username,
        })}
        onChange={onChange}
        name="username"
        type="text"
        placeholder={formatMessage({ id: 'app.login.form.input.username' })}
      />
      {submitted &&
        !username && (
          <div className="login__form-feedback">
            {formatMessage({ id: 'app.login.form.input.username.feedback' })}
          </div>
        )}
      <input
        className={classNames('login__form-input', {
          invalid: submitted && !password,
        })}
        onChange={onChange}
        name="password"
        type="password"
        placeholder={formatMessage({ id: 'app.login.form.input.password' })}
      />
      {submitted &&
        !password && (
          <div className="login__form-feedback">
            {formatMessage({ id: 'app.login.form.input.password.feedback' })}
          </div>
        )}
      <button className="btn login__form-btn" type="submit">
        {loading ? (
          <div className="loader" />
        ) : (
          formatMessage({ id: 'app.login.form.button.submit' })
        )}
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  intl: intlShape.isRequired,
  username: PropTypes.string,
  password: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitted: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  alert: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string,
  }),
};

LoginForm.defaultProps = {
  username: '',
  password: '',
  loading: false,
  alert: {},
};

const mapStateToProps = (state) => {
  const { user, alert } = state;
  const { loading } = user;

  return {
    loading,
    alert,
  };
};

export default injectIntl(connect(mapStateToProps)(LoginForm));
