import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';

const Dashboard = ({ user, intl }) => {
  const { formatMessage } = intl;

  return (
    <div className="dashboard">
      <Helmet>
        <title>Schedule - {formatMessage({ id: 'app.dashboard.title' })}</title>
      </Helmet>
      <button type="button" className="btn btn-lg dashboard-btn-addgroup">
        {formatMessage({ id: 'app.dashboard.buttons.addgroup' })}
      </button>
    </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    token: PropTypes.string,
    username: PropTypes.string,
    loggedIn: PropTypes.bool,
    loading: PropTypes.bool,
  }),
  intl: intlShape.isRequired,
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

export default injectIntl(connect(mapStateToProps)(Dashboard));
