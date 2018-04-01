import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

const Content = ({ children, isOpened }) => (
  <article className={classNames('dashboard-content', { in: isOpened })}>
    <div className="dashboard-content__container">{children}</div>
  </article>
);

Content.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  isOpened: PropTypes.bool.isRequired,
};

Content.defaultProps = {
  children: undefined,
};

const mapStateToProps = (state) => {
  const { sidebar } = state;
  const { isOpened } = sidebar;

  return {
    isOpened,
  };
};

export default connect(mapStateToProps)(Content);
