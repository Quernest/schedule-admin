import React from 'react';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';

const ActivityLoader = ({ size, color }) => (
  <div className="activity-loader">
    <ClipLoader size={size} color={color} />
  </div>
);

ActivityLoader.defaultProps = {
  size: 35,
  color: '#38498c',
};

ActivityLoader.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

export default ActivityLoader;
