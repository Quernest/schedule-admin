import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const List = ({
  items,
  fetching,
  onRemove,
  onEdit,
}) => (
  <ReactCSSTransitionGroup
    transitionName="fade"
    transitionAppear
    transitionAppearTimeout={300}
    transitionEnterTimeout={300}
    transitionLeaveTimeout={300}
  >
    <ul className="list">
      {!fetching &&
        items &&
        items.map((item, index) => (
          <li className="list__item" key={index}>
            <span>{item.name}</span>
            <div className="list__item-controls">
              <button
                className="icon icon-pencil list__item-controls-btn"
                onClick={() => onEdit(item.id)}
              />
              <button
                className="icon icon-dustbin list__item-controls-btn"
                onClick={() => onRemove(item.id)}
              />
            </div>
          </li>
        ))}
    </ul>
  </ReactCSSTransitionGroup>
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
