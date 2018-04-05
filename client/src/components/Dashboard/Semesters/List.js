import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

const formatDate = (date) => moment(date).format('DD/MM');

const List = ({
  semesters,
  intl: {
    formatMessage,
  },
  onEdit,
  onRemove,
}) => (
  <ul className="list">
    {semesters &&
      semesters.map((semester) => {
        const {
          id,
          number,
          start,
          end,
          firstWeekType,
        } = semester;

        return (
          <li key={id} className="list__item">
            <h4 className="list__item-number">{number}</h4>

            <div className="list__item-body">
              <div className="info-wrap">
                <div className="info">
                  <span className="info-label">{formatMessage({ id: 'app.dashboard.semesters.item.duration' })}:</span>
                  <strong className="info-value">
                    {formatDate(start)} - {formatDate(end)}
                  </strong>
                </div>
                <small className="info">
                  <span className="info-label">{formatMessage({ id: 'app.dashboard.semesters.item.firstWeekType' })}:</span>
                  <strong className="info-value">{firstWeekType}</strong>
                </small>
              </div>
            </div>

            <div className="list__item-controls">
              <button
                className="icon icon-pencil list__item-controls-btn"
                onClick={() => onEdit(id)}
              />
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
  intl: intlShape.isRequired,
  semesters: PropTypes.arrayOf(PropTypes.object),
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
};

List.defaultProps = {
  semesters: [],
  onEdit: () => undefined,
  onRemove: () => undefined,
};

export default injectIntl(List);
