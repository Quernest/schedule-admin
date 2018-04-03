import React from 'react';
import PropTypes from 'prop-types';

const List = ({
 items, fetching, onRemove, onEdit 
}) => (
  <ul className="list">
    {!fetching &&
      items &&
      items.map((group, index) => (
        <li className="list__item" key={index}>
          <span>{group.name}</span>
          <div className="list__item-controls">
            <button
              className="list__item-edit"
              onClick={() => onEdit(group.id)}
            />
            <button
              className="list__item-remove"
              onClick={() => onRemove(group.id)}
            />
          </div>
        </li>
      ))}
  </ul>
);

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  fetching: PropTypes.bool,
  onRemove: PropTypes.func,
  onEdit: PropTypes.func,
};

List.defaultProps = {
  items: [],
  fetching: false,
  onRemove: () => undefined,
  onEdit: () => undefined,
};

export default List;
