import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Form = ({
  submitted,
  intl: { formatMessage },
  onSubmit,
  onChange,
  teacher,
}) => {
  const { name } = teacher;

  return (
    <form className="form" onSubmit={onSubmit}>
      <input
        className={classNames('form__input', {
          invalid: submitted && !name,
        })}
        name="name"
        type="text"
        onChange={onChange}
        value={name || ''}
        placeholder={formatMessage({
          id: 'app.dashboard.teachers.form.addteacher.input.placeholder',
        })}
      />
      {submitted &&
        !name && (
          <div className="form__feedback">
            {formatMessage({
              id: 'app.errors.dashboard.teachers.form.addteacher.feedback',
            })}
          </div>
        )}
      <button className="btn form__btn">
        {formatMessage({ id: 'app.button.add' })}
      </button>
    </form>
  );
};

Form.propTypes = {
  submitted: PropTypes.bool,
  intl: intlShape.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  teacher: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};

Form.defaultProps = {
  submitted: false,
  teacher: {},
};

export default injectIntl(Form);
