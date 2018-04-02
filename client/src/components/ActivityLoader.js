import React from 'react';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';

const ActivityLoader = ({ size, color, fetching }) => {
  if (fetching) {
    return (
      <div className="activity-loader">
        <ClipLoader size={size} color={color} />
      </div>
    );
  }

  return null;
};

ActivityLoader.propTypes = {
  fetching: PropTypes.bool,
  size: PropTypes.number,
  color: PropTypes.string,
};

ActivityLoader.defaultProps = {
  size: 35,
  color: '#38498c',
  fetching: false,
};

export default ActivityLoader;
