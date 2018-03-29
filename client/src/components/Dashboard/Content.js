import React from 'react';
import PropTypes from 'prop-types';

const Content = ({ children }) => (
  <article className="dashboard-content">{children}</article>
);

Content.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Content.defaultProps = {
  children: undefined,
};

export default Content;
