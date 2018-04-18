import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import NoRecordsMessage from '../../NoRecordsMessage';
import parsers from '../../../helpers/parsers';

const formatDate = date => moment(date).format('DD/MM');
const { parseWeekTypes } = parsers;

const List = ({
  semesters,
  intl: {
    formatMessage,
  },
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
                  {firstWeekType && <strong className="info-value">{formatMessage({ id: parseWeekTypes(firstWeekType) })}</strong>}
                </small>
              </div>
            </div>

            <div className="list__item-controls">
              <Link
                className="icon icon-pencil list__item-controls-btn"
                to={`/dashboard/semesters/edit/${id}`}
              />
              <button
                className="icon icon-dustbin list__item-controls-btn"
                onClick={() => onRemove(id)}
              />
            </div>
          </li>
        );
      })}

    <NoRecordsMessage records={semesters} />
  </ul>
);

List.propTypes = {
  intl: intlShape.isRequired,
  semesters: PropTypes.arrayOf(PropTypes.object),
  onRemove: PropTypes.func,
};

List.defaultProps = {
  semesters: [],
  onRemove: () => undefined,
};

export default injectIntl(List);
