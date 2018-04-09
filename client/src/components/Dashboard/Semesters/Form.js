import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { injectIntl, intlShape } from 'react-intl';
import ActivityLoader from '../../ActivityLoader';

// DD/MMMM = 1 March
const dateFormat = 'DD/MMMM';

const Form = ({
  onSubmit,
  onChange,
  onDateChange,
  submitted,
  fetching,
  number,
  start,
  end,
  firstWeekType,
  lang,
  intl: {
    formatMessage,
  },
}) => (
  <form className="form" onSubmit={onSubmit}>

    <div className="form__group">
      <label className="form__label" htmlFor="number">
        {formatMessage({ id: 'app.dashboard.semesters.form.addsemester.number' })}
        <input
          id="number"
          name="number"
          type="number"
          onChange={onChange}
          className={classNames('form__input', {
            invalid: submitted && !number,
          })}
          placeholder={formatMessage({ id: 'app.dashboard.semesters.form.addsemester.number.example' })}
          value={number || ''}
          min="1"
        />
      </label>
    </div>

    <div className="form__group">
      <label className="form__label" htmlFor="start">
        {formatMessage({ id: 'app.dashboard.semesters.form.addsemester.start' })}
        <DatePicker
          className={classNames('form__input', {
            invalid: submitted && !start,
          })}
          selected={start || ''}
          dateFormat="DD MMMM"
          onChange={date => onDateChange(date, 'start')}
          locale={lang}
          isClearable
        />
      </label>
    </div>

    <div className="form__group">
      <label className="form__label" htmlFor="end">
        {formatMessage({ id: 'app.dashboard.semesters.form.addsemester.end' })}
        <DatePicker
          className={classNames('form__input', {
            invalid: submitted && !end,
          })}
          dateFormat="DD MMMM"
          selected={end || ''}
          onChange={date => onDateChange(date, 'end')}
          locale={lang}
          isClearable
        />
      </label>
    </div>

    <div className="form__group">
      <label className="form__label" htmlFor="firstWeekType">
        {formatMessage({ id: 'app.dashboard.semesters.form.addsemester.firstWeekType' })}
        <select
          id="firstWeekType"
          name="firstWeekType"
          className="form__select"
          onChange={onChange}
          value={firstWeekType}
        >
          <option className="form__select-option" value="0">
            {formatMessage({ id: 'app.week.even' })}
          </option>
          <option className="form__select-option" value="1">
            {formatMessage({ id: 'app.week.odd' })}
          </option>
        </select>
      </label>
    </div>

    <button className="form__btn btn">
      <ActivityLoader
        fetching={fetching}
        size={18}
        color="#fff"
      />
      {!fetching && formatMessage({ id: 'app.button.add' })}
    </button>
  </form>
);

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  submitted: PropTypes.bool.isRequired,
  lang: PropTypes.string.isRequired,
  fetching: PropTypes.bool,
  intl: intlShape.isRequired,
  number: PropTypes.number,
  start: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  end: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  firstWeekType: PropTypes.number.isRequired,
};

Form.defaultProps = {
  fetching: false,
  number: undefined,
  start: '',
  end: '',
};

export default injectIntl(Form);
