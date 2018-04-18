import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import parsers from '../../../helpers/parsers';

const { parseWeekTypes } = parsers;

const Week = ({
  intl,
  children,
  className,
  type,
}) => {
  const { formatMessage } = intl;

  return (
    <div className={className} key={type}>
      <h3 className="form__week-title">
        {formatMessage({ id: parseWeekTypes(type) })} {formatMessage({ id: 'app.dashboard.semesters.form.editgroup.schedule.week' })}
      </h3>
      {children}
    </div>
  );
};

Week.defaultProps = {
  className: 'form__week',
  children: null,
};

Week.propTypes = {
  intl: intlShape.isRequired,
  type: PropTypes.number.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default injectIntl(Week);
