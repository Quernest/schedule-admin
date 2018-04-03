import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ActivityLoader from '../../ActivityLoader';

const Form = ({
  fetching,
  submitted,
  teacherName,
  intl: { formatMessage },
  onSubmit,
  onChange,
}) => (
  <form className="form" onSubmit={onSubmit}>
    <input
      className={classNames('form__input', {
        invalid: submitted && !teacherName,
      })}
      name="teacherName"
      type="text"
      onChange={onChange}
      placeholder={formatMessage({
        id: 'app.dashboard.teachers.form.addteacher.input.placeholder',
      })}
    />
    {submitted &&
      !teacherName && (
        <div className="form__feedback">
          {formatMessage({
            id: 'app.errors.dashboard.teachers.form.addteacher.feedback',
          })}
        </div>
      )}
    <button className="btn form__btn">
      <ActivityLoader
        fetching={fetching}
        size={18}
        color="#fff"
        onComplete={e => console.log(e)}
      />
      {!fetching && formatMessage({ id: 'app.button.add' })}
    </button>
  </form>
);

Form.defaultProps = {
  fetching: false,
  submitted: false,
  teacherName: '',
};

Form.propTypes = {
  teacherName: PropTypes.string,
  submitted: PropTypes.bool,
  fetching: PropTypes.bool,
  intl: intlShape.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default injectIntl(Form);
