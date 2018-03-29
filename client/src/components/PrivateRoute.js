import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      ))
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
  loggedIn: PropTypes.bool,
};

PrivateRoute.defaultProps = {
  loggedIn: false,
  location: {
    pathname: '',
  },
};

const mapStateToProps = (state) => {
  const { user } = state;
  const { loggedIn } = user;

  return {
    loggedIn,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
