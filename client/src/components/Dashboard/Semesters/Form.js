import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import ActivityLoader from '../../ActivityLoader';

const Form = ({
  onSubmit,
  onChange,
  submitted,
  fetching,
  intl: {
    formatMessage,
  },
}) => (
  <form className="form" onSubmit={onSubmit}>

    <div className="form__group">
      <label className="form__label" htmlFor="number">
        Введите № семестра
        <input
          id="number"
          name="number"
          type="number"
          onChange={onChange}
          className="form__input"
          placeholder="Например: 4"
          min="1"
          max="10"
        />
      </label>
    </div>

    <div className="form__group">
      <label className="form__label" htmlFor="start">
        Введите дату начала семестра
        <input
          id="start"
          name="start"
          type="date"
          onChange={onChange}
          className="form__input"
          placeholder="start"
        />
      </label>
    </div>

    <div className="form__group">
      <label className="form__label" htmlFor="end">
        Введите дату конца семестра
        <input
          id="end"
          name="end"
          type="date"
          onChange={onChange}
          className="form__input"
          placeholder="end"
        />
      </label>
    </div>

    <div className="form__group">
      <label className="form__label" htmlFor="firstWeekType">
        Выберите неделю с которой начинается семестр
        <select
          id="firstWeekType"
          name="firstWeekType"
          className="form__select"
          onChange={onChange}
          defaultValue="0"
        >
          <option className="form__select-option" value="0">Четная</option>
          <option className="form__select-option" value="1">Нечетная</option>
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
  submitted: PropTypes.bool.isRequired,
  fetching: PropTypes.bool,
  intl: intlShape.isRequired,
};

Form.defaultProps = {
  fetching: false,
};

export default injectIntl(Form);
