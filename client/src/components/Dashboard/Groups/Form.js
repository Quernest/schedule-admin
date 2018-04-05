import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ActivityLoader from '../../ActivityLoader';

const Form = ({
  fetching,
  submitted,
  groupName,
  intl: { formatMessage },
  onSubmit,
  onChange,
}) => (
  <form className="form" onSubmit={onSubmit}>
    <input
      className={classNames('form__input', {
        invalid: submitted && !groupName,
      })}
      name="groupName"
      type="text"
      onChange={onChange}
      placeholder={formatMessage({
        id: 'app.dashboard.groups.form.addgroup.input.placeholder',
      })}
    />
    {submitted &&
      !groupName && (
        <div className="form__feedback">
          {formatMessage({
            id: 'app.errors.dashboard.groups.form.addgroup.feedback',
          })}
        </div>
      )}
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

Form.defaultProps = {
  fetching: false,
  submitted: false,
  groupName: '',
};

Form.propTypes = {
  groupName: PropTypes.string,
  submitted: PropTypes.bool,
  fetching: PropTypes.bool,
  intl: intlShape.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default injectIntl(Form);
