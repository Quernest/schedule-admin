import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Heading = ({
  title,
  subtitle,
  hasRefreshBtn,
  onRefresh,
  hasLink,
  link,
}) => {
  const isVisibleControls = hasRefreshBtn || hasLink;

  return (
    <div
      className={classNames('heading', {
        'has-controls': isVisibleControls,
      })}
    >
      <h1 className="heading__title">{title}</h1>
      {subtitle && <p className="heading__subtitle">{subtitle}</p>}
      {isVisibleControls && (
        <div className="heading__controls">
          {hasRefreshBtn && (
            <button
              className="heading__controls-refresh"
              type="button"
              onClick={onRefresh}
            />
          )}
          {hasLink && (
            <Link className="btn" to={link.path}>
              {link.label}
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

Heading.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  hasRefreshBtn: PropTypes.bool,
  onRefresh: PropTypes.func,
  hasLink: PropTypes.bool,
  link: PropTypes.shape({
    path: PropTypes.string,
    // id from translations
    label: PropTypes.string,
  }),
};

Heading.defaultProps = {
  subtitle: '',
  hasRefreshBtn: false,
  hasLink: false,
  onRefresh: () => undefined,
  link: {},
};

export default Heading;
