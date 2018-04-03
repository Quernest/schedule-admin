import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Heading = ({
 title, subtitle, hasLink, link 
}) => (
  <div className="heading">
    <h1 className="heading__title">{title}</h1>
    {subtitle && <p className="heading__subtitle">{subtitle}</p>}
    {}
    {hasLink && (
      <div className="heading__controls">
        <Link className="btn heading__controls-link" to={link.path}>
          {link.label}
        </Link>
      </div>
    )}
  </div>
);

Heading.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  hasLink: PropTypes.bool,
  link: PropTypes.shape({
    path: PropTypes.string,
    // id from translations
    label: PropTypes.string,
  }),
};

Heading.defaultProps = {
  subtitle: '',
  hasLink: false,
  link: {},
};

export default Heading;
