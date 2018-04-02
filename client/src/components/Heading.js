import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Heading = ({
 title, hasRefreshBtn, onRefresh, link 
}) => {
  const { path, label } = link;

  return (
    <div className="heading">
      <h1 className="heading__title">{title}</h1>
      <div className="heading__controls">
        {hasRefreshBtn && (
          <button
            className="heading__controls-refresh"
            type="button"
            onClick={onRefresh}
          />
        )}
        {link && (
          <Link className="btn" to={path}>
            {label}
          </Link>
        )}
      </div>
    </div>
  );
};

Heading.propTypes = {
  title: PropTypes.string.isRequired,
  hasRefreshBtn: PropTypes.bool,
  onRefresh: PropTypes.func,
  link: PropTypes.shape({
    path: PropTypes.string.isRequired,
    // id from translations
    label: PropTypes.string.isRequired,
  }),
};

Heading.defaultProps = {
  hasRefreshBtn: false,
  onRefresh: () => undefined,
  link: {},
};

export default Heading;
