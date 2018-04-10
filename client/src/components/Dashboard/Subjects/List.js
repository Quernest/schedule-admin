import React from 'react';
import PropTypes from 'prop-types';

const List = ({ items, onRemove }) => (
  <ul className="list">
    {items && items.map((item) => {
      const { id, type, name } = item;

      return (
        <li className="list__item" key={id}>
          <div>
            <h3>{name}</h3>
            <small>{type}</small>
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

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  onRemove: PropTypes.func.isRequired,
};

List.defaultProps = {
  items: [],
};

export default List;
