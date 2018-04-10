import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import parsers from '../../../helpers/parsers';

const { parseSubjectTypes } = parsers;

const List = ({ items, onRemove, intl }) => {
  const { formatMessage } = intl;

  return (
    <ul className="list">
      {items && items.map((item) => {
        const { id, type, name } = item;

        return (
          <li className="list__item" key={id}>
            <div>
              <h3>{name}</h3>
              <small>{formatMessage({ id: parseSubjectTypes(type) })}</small>
            </div>
            <div className="list__item-controls">
              <button
                className="icon icon-dustbin list__item-controls-btn"
                onClick={() => onRemove(id)}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

List.propTypes = {
  intl: intlShape.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  onRemove: PropTypes.func.isRequired,
};

List.defaultProps = {
  items: [],
};

export default injectIntl(List);
