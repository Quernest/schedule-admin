import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

const Week = ({ children, className, type }) => (
  <div className={className} key={type}>
    <h3 className="form__week-title">{type}</h3>
    {children}
  </div>
);

Week.defaultProps = {
  className: 'form__week',
  children: null,
};

Week.propTypes = {
  type: PropTypes.number.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default injectIntl(Week);
