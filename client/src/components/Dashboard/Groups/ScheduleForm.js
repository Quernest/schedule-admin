import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

const ScheduleForm = ({ intl, onChange, onSubmit }) => {
  const { formatMessage } = intl;

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="row">
        <div className="col-xs-12">
          <input className="form__input" placeholder="group name" />
        </div>

        <div className="col-xs-12 col-sm-6">
          <h3 className="form__title">Нечетная неделя</h3>

          <div className="form__group">
            <fieldset className="form__fieldset">
              <legend>Понедельник</legend>
              <input className="form__input" placeholder="location" />
            </fieldset>
          </div>

          <div className="form__group">
            <fieldset className="form__fieldset">
              <legend>Вторник</legend>
              <input className="form__input" placeholder="location" />
            </fieldset>
          </div>

          <div className="form__group">
            <fieldset className="form__fieldset">
              <legend>Среда</legend>
              <input className="form__input" placeholder="location" />
            </fieldset>
          </div>

          <div className="form__group">
            <fieldset className="form__fieldset">
              <legend>Четверг</legend>
              <input className="form__input" placeholder="location" />
            </fieldset>
          </div>

          <div className="form__group">
            <fieldset className="form__fieldset">
              <legend>Пятница</legend>
              <input className="form__input" placeholder="location" />
            </fieldset>
          </div>
        </div>

        <div className="col-xs-12 col-sm-6">
          <h3 className="form__title">Четная неделя</h3>

          <div className="form__group">
            <fieldset className="form__fieldset">
              <legend>Понедельник</legend>
              <input className="form__input" placeholder="location" />
            </fieldset>
          </div>

          <div className="form__group">
            <fieldset className="form__fieldset">
              <legend>Вторник</legend>
              <input className="form__input" placeholder="location" />
            </fieldset>
          </div>

          <div className="form__group">
            <fieldset className="form__fieldset">
              <legend>Среда</legend>
              <input className="form__input" placeholder="location" />
            </fieldset>
          </div>

          <div className="form__group">
            <fieldset className="form__fieldset">
              <legend>Четверг</legend>
              <input className="form__input" placeholder="location" />
            </fieldset>
          </div>

          <div className="form__group">
            <fieldset className="form__fieldset">
              <legend>Пятница</legend>
              <input className="form__input" placeholder="location" />
            </fieldset>
          </div>
        </div>
      </div>
    </form>
  );
};

ScheduleForm.propTypes = {
  intl: intlShape.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default injectIntl(ScheduleForm);
