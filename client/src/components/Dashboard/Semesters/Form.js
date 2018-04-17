import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { injectIntl, intlShape } from 'react-intl';

const Form = ({
  onSubmit,
  onChange,
  onDateChange,
  submitted,
  semester,
  lang,
  intl,
}) => {
  const { formatMessage } = intl;
  const {
    number,
    start,
    end,
    firstWeekType,
  } = semester;

  return (
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
            selected={moment(start) || ''}
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
            selected={moment(end) || ''}
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
            <option className="form__select-option" value="1">
              {formatMessage({ id: 'app.words.odd' })}
            </option>
            <option className="form__select-option" value="2">
              {formatMessage({ id: 'app.words.even' })}
            </option>
          </select>
        </label>
      </div>

      <button className="form__btn btn">
        {formatMessage({ id: 'app.button.add' })}
      </button>
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  submitted: PropTypes.bool.isRequired,
  lang: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
  semester: PropTypes.shape({
    id: PropTypes.number,
    number: PropTypes.number,
    start: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    end: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    firstWeekType: PropTypes.number,
  }),
};

Form.defaultProps = {
  semester: {
    firstWeekType: 1,
  },
};

export default injectIntl(Form);
