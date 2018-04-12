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
 * - submit button
 */

const ScheduleForm = ({
  intl,
  submitted,
  onChange,
  onSubmit,
  group,
  teachers,
  semesters,
  semester,
  subjects,
  schedule,
}) => {
  const { formatMessage } = intl;

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="row">
        <div className="col-xs-12">
          <input
            id="groupName"
            name="groupName"
            value={(group && group.name) || ''}
            className="form__input"
            onChange={onChange}
          />
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
              {semesters.list && semesters.list.map((_semester) => (
                <option
                  key={_semester.id}
                  value={_semester.id}
                >
                  {_semester.number}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="form__week col-xs-12 col-sm-6">
          <h3 className="form__week-title">Нечетная неделя</h3>

          <div className="form__group">
            <fieldset className="form__fieldset">
              <legend>Понедельник</legend>

              <div className="form__pair">
                <h3 className="form__pair-title">1 пара</h3>
                <label className="form__label" htmlFor="d1w1teachers">
                  Выберите преподавателя:
                  <select
                    id="d1w1teachers"
                    name="teacherId"
                    className="form__select"
                    onChange={(e) => onChange(e, 1, 1, 1)}
                  >
                    {teachers.list && teachers.list.map((teacher) => (
                      <option
                        key={teacher.id}
                        value={teacher.id}
                      >
                        {teacher.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="form__label" htmlFor="d1w1subjects">
                  Выберите предмет:
                  <select
                    id="d1w1subjects"
                    name="subjectId"
                    className="form__select"
                    onChange={(e) => onChange(e, 1, 1, 1)}
                  >
                    {subjects.list && subjects.list.map((subject) => (
                      <option
                        key={subject.id}
                        value={subject.id}
                      >
                        {subject.name} {formatMessage({ id: parseSubjectTypes(subject.type) }).toLowerCase()}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="form__label" htmlFor="d1w1location">
                  Введите № аудитории
                  <input
                    id="d1w1location"
                    name="location"
                    className="form__input"
                    onChange={(e) => onChange(e, 1, 1, 1)}
                    placeholder="Например: 2215"
                  />
                </label>
              </div>

              <div className="form__pair">
                <h3 className="form__pair-title">2 пара</h3>
                <label className="form__label" htmlFor="d1w1teachers">
                  Выберите преподавателя:
                  <select
                    id="d1w1teachers"
                    name="teacherId"
                    className="form__select"
                    onChange={(e) => onChange(e, 1, 1, 1)}
                  >
                    {teachers.list && teachers.list.map((teacher) => (
                      <option
                        key={teacher.id}
                        value={teacher.id}
                      >
                        {teacher.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="form__label" htmlFor="d1w1subjects">
                  Выберите предмет:
                  <select
                    id="d1w1subjects"
                    name="subjectId"
                    className="form__select"
                    onChange={(e) => onChange(e, 1, 1, 1)}
                  >
                    {subjects.list && subjects.list.map((subject) => (
                      <option
                        key={subject.id}
                        value={subject.id}
                      >
                        {subject.name} {formatMessage({ id: parseSubjectTypes(subject.type) }).toLowerCase()}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="form__label" htmlFor="d1w1location">
                  Введите № аудитории
                  <input
                    id="d1w1location"
                    name="location"
                    className="form__input"
                    onChange={(e) => onChange(e, 1, 1, 1)}
                    placeholder="Например: 2215"
                  />
                </label>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </form>
  );
};

ScheduleForm.propTypes = {
  intl: intlShape.isRequired,
  submitted: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  group: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  }),
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
  schedule: PropTypes.shape({
    fetching: PropTypes.bool,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
};

ScheduleForm.defaultProps = {
  submitted: false,
  group: {},
  semesters: {},
  schedule: {},
  teachers: {},
  subjects: {},
  semester: '',
};

export default injectIntl(ScheduleForm);
