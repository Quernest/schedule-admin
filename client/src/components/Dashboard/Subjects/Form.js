import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import ActivityLoader from '../../ActivityLoader';

const Form = ({
  intl,
  submitted,
  fetching,
  onSubmit,
  onChange,
  subjectName,
  subjectType,
}) => {
  const { formatMessage } = intl;

  return (
    <form className="form" onSubmit={onSubmit}>

      <div className="form__group">
        <label htmlFor="subjectName" className="form__label">
          {formatMessage({ id: 'app.dashboard.subjects.form.addsubject.input.subjectName' })}
          <input
            id="subjectName"
            name="subjectName"
            type="text"
            className={classNames('form__input', {
              invalid: submitted && !subjectName,
            })}
            onChange={onChange}
            placeholder={formatMessage({
              id: 'app.dashboard.subjects.form.addsubject.input.subjectName.placeholder',
            })}
          />
        </label>
      </div>

      <div className="form__group">
        <label htmlFor="subjectType" className="form__label">
          {formatMessage({ id: 'app.dashboard.subjects.form.addsubject.input.subjectType' })}
          <select
            id="subjectType"
            className="form__select"
            name="subjectType"
            value={subjectType}
            onChange={onChange}
          >
            <option value="1">{formatMessage({ id: 'app.words.lecture' })}</option>
            <option value="2">{formatMessage({ id: 'app.words.practice' })}</option>
          </select>
        </label>
      </div>

      <button className="btn form__btn">
        <ActivityLoader
          fetching={fetching}
          size={18}
          color="#fff"
        />
        {!fetching && formatMessage({ id: 'app.button.add' })}
      </button>
    </form>
  );
};

Form.propTypes = {
  intl: intlShape.isRequired,
  submitted: PropTypes.bool,
  fetching: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  subjectName: PropTypes.string,
  subjectType: PropTypes.string,
};

Form.defaultProps = {
  submitted: false,
  fetching: false,
  subjectName: '',
  subjectType: '',
};

export default injectIntl(Form);
