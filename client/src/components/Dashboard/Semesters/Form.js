import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
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
    name,
    start,
    end,
    firstWeekType,
  } = semester;

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form__group">
        <label className="form__label" htmlFor="name">
          {formatMessage({ id: 'app.dashboard.semesters.form.addsemester.number' })}
          <input
            id="name"
            name="name"
            type="name"
            onChange={onChange}
            className={classNames('form__input', {
              invalid: submitted && !name,
            })}
            placeholder={formatMessage({ id: 'app.dashboard.semesters.form.addsemester.number.example' })}
            value={name || ''}
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
            dateFormat="DD/MM/YYYY"
            selected={start || null}
            onChange={date => onDateChange(date, 'start')}
            locale={lang}
            isClearable
            readOnly
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
            dateFormat="DD/MM/YYYY"
            selected={end || null}
            onChange={date => onDateChange(date, 'end')}
            locale={lang}
            isClearable
            readOnly
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
        {formatMessage({ id: 'app.button.save' })}
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
    name: PropTypes.string,
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
