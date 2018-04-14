import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import Week from '../Schedule/Week';
import Day from '../Schedule/Day';
import Event from '../Schedule/Event';

/**
 * TODO:
 * - handle error if no data
 * - translations
 * - prop-types
 * - add keys in loops
 * - submit button
 * - localSchedule
 */

const ScheduleForm = ({
  intl,
  lang,
  submitted,
  onChangeScheduleItem,
  onChangeGroupName,
  onChangeSemester,
  onSubmit,
  group,
  teachers,
  semesters,
  semester,
  subjects,
  scheduleList,
}) => (
  <form className="form" onSubmit={onSubmit}>
    <div className="row">
      <div className="col-xs-12">
        <input
          id="groupName"
          name="groupName"
          value={(group && group.name) || ''}
          className="form__input"
          onChange={onChangeGroupName}
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
            onChange={onChangeSemester}
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

      {/* n is week type */}
      {[...Array(2)].map((w, n) => (
        <Week
          className="form__week col-xs-12 col-md-6"
          type={n + 1}
        >
          {[...Array(5)].map((d, i) => (
            <Day
              index={i}
              lang={lang}
            >
              {[...Array(5)].map((p, j) => (
                <Event
                  index={j}
                  dayIndex={i}
                  weekType={n + 1}
                  teachersList={teachers && teachers.list}
                  subjectsList={subjects && subjects.list}
                  scheduleList={scheduleList}
                  semester={semester}
                  onChangeScheduleItem={onChangeScheduleItem}
                />
              ))}
            </Day>
          ))}
        </Week>
      ))}
    </div>
  </form>
);

ScheduleForm.propTypes = {
  intl: intlShape.isRequired,
  lang: PropTypes.string.isRequired,
  submitted: PropTypes.bool,
  onChangeScheduleItem: PropTypes.func.isRequired,
  onChangeSemester: PropTypes.func.isRequired,
  onChangeGroupName: PropTypes.func.isRequired,
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
};

ScheduleForm.defaultProps = {
  submitted: false,
  group: {},
  semesters: {},
  teachers: {},
  subjects: {},
  semester: '',
};

export default injectIntl(ScheduleForm);
