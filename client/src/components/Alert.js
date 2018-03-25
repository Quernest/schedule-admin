import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';

const Alert = ({ id, type, intl }) => {
  const { formatMessage } = intl;

  return <div className={`alert alert-${type}`}>{formatMessage({ id })}</div>;
};

Alert.propTypes = {
  // id is react-intl translations message id
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(Alert);
