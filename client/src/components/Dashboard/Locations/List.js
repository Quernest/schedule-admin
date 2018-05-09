import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NoRecordsMessage from '../../NoRecordsMessage';

const List = ({
  items,
  onRemove,
}) => (
  <ul className="list">
    { items &&
      items.map((item, index) => (
        <li className="list__item" key={index}>
          <span>{item.name}</span>
          <div className="list__item-controls">
            <Link
              className="icon icon-pencil list__item-controls-btn"
              to={`/dashboard/locations/edit/${item.id}`}
            />
            <button
              className="icon icon-dustbin list__item-controls-btn"
              onClick={() => onRemove(item.id)}
            />
          </div>
        </li>
      ))}
    <NoRecordsMessage records={items} />
  </ul>
);

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  onRemove: PropTypes.func,
};

List.defaultProps = {
  items: [],
  onRemove: () => undefined,
};

export default List;
