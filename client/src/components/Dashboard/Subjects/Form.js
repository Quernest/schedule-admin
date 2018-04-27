import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';

const Form = ({
  intl,
  submitted,
  onSubmit,
  onChange,
  subject,
}) => {
  const { formatMessage } = intl;
  const { type, name } = subject;

  return (
    <form className="form" onSubmit={onSubmit}>

      <div className="form__group">
        <label htmlFor="name" className="form__label">
          {formatMessage({ id: 'app.dashboard.subjects.form.addsubject.input.subjectName' })}
          <input
            id="name"
            name="name"
            type="text"
            className={classNames('form__input', {
              invalid: submitted && !name,
            })}
            onChange={onChange}
            value={name || ''}
            placeholder={formatMessage({
              id: 'app.dashboard.subjects.form.addsubject.input.subjectName.placeholder',
            })}
          />
        </label>
      </div>

      <div className="form__group">
        <label htmlFor="type" className="form__label">
          {formatMessage({ id: 'app.dashboard.subjects.form.addsubject.input.subjectType' })}
          <select
            id="type"
            className="form__select"
            name="type"
            value={type || ''}
            onChange={onChange}
          >
            <option value="1">{formatMessage({ id: 'app.words.lecture' })}</option>
            <option value="2">{formatMessage({ id: 'app.words.practice' })}</option>
          </select>
        </label>
      </div>

      <button className="btn form__btn">
        {formatMessage({ id: 'app.button.add' })}
      </button>
    </form>
  );
};

Form.propTypes = {
  intl: intlShape.isRequired,
  submitted: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  subject: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.number,
  }),
};

Form.defaultProps = {
  submitted: false,
  subject: {},
};

export default injectIntl(Form);
