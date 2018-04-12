import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import parsers from '../../../helpers/parsers';

const { parseSubjectTypes } = parsers;

/**
 * TODO:
 * - handle error if no data
 * - translations
 * - prop-types
 * - add keys in loops
 */

const ScheduleForm = ({
  intl,
  onChange,
  onSubmit,
  teachers,
  semesters,
  semester,
  subjects,
}) => {
  const { formatMessage } = intl;

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="row">
        <div className="col-xs-12">
          <input className="form__input" placeholder="IT-14-1" />
        </div>

        <div className="col-xs-12">
          <label className="form__label" htmlFor="semester">
            Выберите семестр:
            <select
              id="semester"
              name="semester"
              value={semester || ''}
              className="form__select"
              onChange={onChange}
            >
              {semesters.list && semesters.list.map((semester) => (
                <option value={semester.id}>
                  {semester.number}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="col-xs-12 col-sm-6">
          <h3 className="form__title">Нечетная неделя</h3>

          <div className="form__group">
            <fieldset className="form__fieldset">
              <legend>Понедельник</legend>

              <div className="">
                <h4>1 пара</h4>

                <label className="form__label" htmlFor="d1w1teachers">
                  Выберите преподавателя:
                  <select id="d1w1teachers" className="form__select">
                    {teachers.list && teachers.list.map((teacher) => (
                      <option value={teacher.id}>
                        {teacher.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="form__label" htmlFor="d1w1subjects">
                  Выберите предмет:
                  <select id="d1w1subjects" className="form__select">
                    {subjects.list && subjects.list.map((subject) => (
                      <option value={subject.id}>
                        {subject.name} {formatMessage({ id: parseSubjectTypes(subject.type) }).toLowerCase()}
                      </option>
                    ))}
                  </select>
                </label>
                <input className="form__input" placeholder="location" />
              </div>
              <div className="">
                2 пара
                <select className="form__select">
                  {teachers.list && teachers.list.map((teacher) => (
                    <option value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
                <input className="form__input" placeholder="location" />
              </div>
              <div className="">
                3 пара
                <select className="form__select">
                  {teachers.list && teachers.list.map((teacher) => (
                    <option value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
                <input className="form__input" placeholder="location" />
              </div>
              <div className="">
                4 пара
                <select className="form__select">
                  {teachers.list && teachers.list.map((teacher) => (
                    <option value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
                <input className="form__input" placeholder="location" />
              </div>
              <div className="">
                5 пара
                <select className="form__select">
                  {teachers.list && teachers.list.map((teacher) => (
                    <option value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
                <input className="form__input" placeholder="location" />
              </div>
            </fieldset>
          </div>

          <div className="form__group">
            <fieldset className="form__fieldset">
              <legend>Вторник</legend>
              <select className="form__select">
                {teachers.list && teachers.list.map((teacher) => (
                  <option value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
              <input className="form__input" placeholder="location" />
            </fieldset>
          </div>

          <div className="form__group">
            <fieldset className="form__fieldset">
              <legend>Среда</legend>
              <select className="form__select">
                {teachers.list && teachers.list.map((teacher) => (
                  <option value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
              <input className="form__input" placeholder="location" />
            </fieldset>
          </div>

          <div className="form__group">
            <fieldset className="form__fieldset">
              <legend>Четверг</legend>
              <select className="form__select">
                {teachers.list && teachers.list.map((teacher) => (
                  <option value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
              <input className="form__input" placeholder="location" />
            </fieldset>
          </div>

          <div className="form__group">
            <fieldset className="form__fieldset">
              <legend>Пятница</legend>
              <select className="form__select">
                {teachers.list && teachers.list.map((teacher) => (
                  <option value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
              <input className="form__input" placeholder="location" />
            </fieldset>
          </div>
        </div>

        <div className="col-xs-12 col-sm-6">
          <h3 className="form__title">Четная неделя</h3>

          <div className="form__group">
            <fieldset className="form__fieldset">
              <legend>Понедельник</legend>
              <select className="form__select">
                {teachers.list && teachers.list.map((teacher) => (
                  <option value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
              <input className="form__input" placeholder="location" />
            </fieldset>
          </div>

          <div className="form__group">
            <fieldset className="form__fieldset">
              <legend>Вторник</legend>
              <select className="form__select">
                {teachers.list && teachers.list.map((teacher) => (
                  <option value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
              <input className="form__input" placeholder="location" />
            </fieldset>
          </div>

          <div className="form__group">
            <fieldset className="form__fieldset">
              <legend>Среда</legend>
              <select className="form__select">
                {teachers.list && teachers.list.map((teacher) => (
                  <option value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
              <input className="form__input" placeholder="location" />
            </fieldset>
          </div>

          <div className="form__group">
            <fieldset className="form__fieldset">
              <legend>Четверг</legend>
              <select className="form__select">
                {teachers.list && teachers.list.map((teacher) => (
                  <option value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
              <input className="form__input" placeholder="location" />
            </fieldset>
          </div>

          <div className="form__group">
            <fieldset className="form__fieldset">
              <legend>Пятница</legend>
              <select className="form__select">
                {teachers.list && teachers.list.map((teacher) => (
                  <option value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
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
  // schedule: PropTypes.shape({
  //   fetching: PropTypes.bool,
  //   list: PropTypes.arrayOf(PropTypes.object),
  // }),
  // groups: PropTypes.shape({
  //   fetching: PropTypes.bool,
  //   list: PropTypes.arrayOf(PropTypes.object),
  // }),
  semesters: PropTypes.shape({
    fetching: PropTypes.bool,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
  teachers: PropTypes.shape({
    fetching: PropTypes.bool,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
  subjects: PropTypes.shape({
    fetching: PropTypes.bool,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
  semester: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

ScheduleForm.defaultProps = {
  // schedule: {},
  // groups: {},
  semesters: {},
  teachers: {},
  subjects: {},
  semester: '',
};

export default injectIntl(ScheduleForm);
