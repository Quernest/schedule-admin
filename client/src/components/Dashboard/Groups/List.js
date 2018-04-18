import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router-dom';
import NoRecordsMessage from '../../NoRecordsMessage';

const List = ({
  items,
  onRemove,
}) => (
  <ReactCSSTransitionGroup
    transitionName="fade"
    transitionAppear
    transitionAppearTimeout={300}
    transitionEnterTimeout={300}
    transitionLeaveTimeout={300}
  >
    <ul className="list">
      { items &&
        items.map((item, index) => (
          <li className="list__item" key={index}>
            <span>{item.name}</span>
            <div className="list__item-controls">
              <Link
                className="icon icon-pencil list__item-controls-btn"
                to={`/dashboard/groups/edit/${item.id}`}
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
  </ReactCSSTransitionGroup>
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
