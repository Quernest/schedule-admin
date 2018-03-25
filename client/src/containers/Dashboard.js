import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Dashboard = ({ user }) => (
  <div className="dashboard">
    <p>You are logged, {user.username}</p>
  </div>
);

Dashboard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    token: PropTypes.string,
    username: PropTypes.string,
    loggedIn: PropTypes.bool,
    loading: PropTypes.bool,
  }),
};

Dashboard.defaultProps = {
  user: {},
};

const mapStateToProps = (state) => {
  const { user } = state;

  return {
    user,
  };
};

export default connect(mapStateToProps)(Dashboard);
