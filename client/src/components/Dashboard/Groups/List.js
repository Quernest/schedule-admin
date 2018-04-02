import React from 'react';
import PropTypes from 'prop-types';

const List = ({
 items, fetching, onRemove, onEdit 
}) => (
  <ul className="dashboard-groups__list">
    {!fetching &&
      items &&
      items.map((group, index) => (
        <li className="dashboard-groups__list-item" key={index}>
          <span>{group.name}</span>
          <div className="dashboard-groups__list-item-controls">
            <button
              className="dashboard-groups__list-item-edit"
              onClick={() => onEdit(group.id)}
            />
            <button
              className="dashboard-groups__list-item-remove"
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
