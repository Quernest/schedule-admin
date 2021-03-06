import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import Week from '../Schedule/Week';
import Day from '../Schedule/Day';
import Event from '../Schedule/Event';

const Form = ({
  intl: {
    formatMessage,
  },
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
  locations,
  scheduleList,
  days,
  weeks,
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
        <label className="form__label" htmlFor="semesterId">
          {formatMessage({ id: 'app.dashboard.semesters.form.editgroup.semester' })}
          <select
            id="semesterId"
            name="semesterId"
            value={(semester && semester.id) || ''}
            className="form__select"
            onChange={onChangeSemester}
          >
            {semesters.list && semesters.list.map((s) => (
              <option
                key={s.id}
                value={s.id}
              >
                {s.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {[...Array(weeks)].map((w, n) => (
        <Week
          className="form__week col-xs-12 col-md-6"
          type={n + 1}
        >
          {[...Array(days)].map((d, i) => (
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
                  locationsList={locations && locations.list}
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

    {submitted &&
      !group.name && (
        <div className="form__feedback">
          {formatMessage({
            id: 'app.errors.dashboard.groups.form.addgroup.feedback',
          })}
        </div>
      )}

    <button className="form__btn btn">
      {formatMessage({ id: 'app.button.save' })}
    </button>
  </form>
);

Form.propTypes = {
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
  locations: PropTypes.shape({
    fetching: PropTypes.bool,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
  subjects: PropTypes.shape({
    fetching: PropTypes.bool,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
  scheduleList: PropTypes.arrayOf(PropTypes.object),
  semester: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    start: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    end: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    firstWeekType: PropTypes.number,
  }),
  days: PropTypes.number,
  weeks: PropTypes.number,
};

Form.defaultProps = {
  submitted: false,
  group: {},
  semesters: {},
  teachers: {},
  subjects: {},
  locations: {},
  scheduleList: [],
  semester: {},
  days: 5,
  weeks: 2, // odd and even week
};

export default injectIntl(Form);
