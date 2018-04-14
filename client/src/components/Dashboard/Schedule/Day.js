import React from 'react';
import { injectIntl } from 'react-intl';
import moment from 'moment';
import PropTypes from 'prop-types';

const Day = ({
  children,
  index,
  lang,
}) => {
  const isoWeekDay = index + 1;

  return (
    <div className="form__group" key={index}>
      <fieldset className="form__fieldset">
        <legend>
          {moment().locale(lang).day(isoWeekDay).format('dddd')}
        </legend>
        {children}
      </fieldset>
    </div>
  );
};

Day.defaultProps = {
  children: null,
  index: 0,
};

Day.propTypes = {
  children: PropTypes.node,
  lang: PropTypes.string.isRequired,
  index: PropTypes.number,
};

export default injectIntl(Day);
