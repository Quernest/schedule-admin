import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Form = ({
  submitted,
  group,
  intl,
  onSubmit,
  onChange,
}) => {
  const { formatMessage } = intl;
  const { name } = group;

  return (
    <form className="form" onSubmit={onSubmit}>
      <input
        className={classNames('form__input', {
          invalid: submitted && !name,
        })}
        name="name"
        type="text"
        value={name || ''}
        onChange={onChange}
        placeholder={formatMessage({
          id: 'app.dashboard.groups.form.addgroup.input.placeholder',
        })}
      />
      {submitted &&
        !name && (
          <div className="form__feedback">
            {formatMessage({
              id: 'app.errors.dashboard.groups.form.addgroup.feedback',
            })}
          </div>
        )}
      <button className="btn form__btn">
        {formatMessage({ id: 'app.button.add' })}
      </button>
    </form>
  );
};

Form.defaultProps = {
  submitted: false,
  group: {
    name: '',
  },
};

Form.propTypes = {
  submitted: PropTypes.bool,
  intl: intlShape.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  group: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default injectIntl(Form);
