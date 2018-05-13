import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import parsers from '../../../helpers/parsers';

const { parseSubjectTypes } = parsers;

const Event = ({
  intl,
  index,
  weekType,
  dayIndex,
  semester,
  teachersList,
  subjectsList,
  scheduleList,
  locationsList,
  onChangeScheduleItem,
}) => {
  const { formatMessage } = intl;

  const isoWeekDay = dayIndex + 1;
  const isoEventNumber = index + 1;

  const event = {
    item: {},
    index: undefined,
  };

  if (scheduleList && scheduleList.length) {
    scheduleList.map((e, i) => {
      if (e.weekType === weekType &&
          e.weekDay === isoWeekDay &&
          e.lesson === isoEventNumber &&
          e.semesterId === semester.id
      ) {
        event.index = i;
        event.item = e;

        return e;
      }

      return undefined;
    });
  }

  return (
    <div className="form__event" key={index}>
      <h3 className="form__event-title">
        {isoEventNumber} {formatMessage({ id: 'app.dashboard.semesters.form.editgroup.schedule.event' })}
      </h3>

      <label className="form__label checkbox">
        {formatMessage({ id: 'app.dashboard.semesters.form.editgroup.schedule.event.freetime' })}
        <input
          type="checkbox"
          name="isFreeTime"
          value={(event.item && event.item.isFreeTime ? 1 : 0) || ''}
          checked={(event.item && event.item.isFreeTime) || false}
          onChange={(e) => onChangeScheduleItem(e, isoWeekDay, weekType, isoEventNumber, event)}
        />
        <span className="checkbox__checkmark" />
      </label>

      <label className="form__label">
        {formatMessage({ id: 'app.dashboard.semesters.form.editgroup.schedule.event.subject' })}
        <select
          name="subjectId"
          className="form__select"
          value={(event.item && event.item.subjectId) || ''}
          disabled={(event.item && event.item.isFreeTime)}
          onChange={(e) => onChangeScheduleItem(e, isoWeekDay, weekType, isoEventNumber, event)}
        >
          <option value="" />
          {subjectsList.length && subjectsList.map((subject) => (
            <option
              key={subject.id}
              value={subject.id}
            >
              {subject.name} {formatMessage({ id: parseSubjectTypes(subject.type) }).toLowerCase()}
            </option>
          ))}
        </select>
      </label>

      <label className="form__label">
        {formatMessage({ id: 'app.dashboard.semesters.form.editgroup.schedule.event.teacher' })}
        <select
          name="teacherId"
          className="form__select"
          value={(event.item && event.item.teacherId) || ''}
          disabled={(event.item && event.item.isFreeTime)}
          onChange={(e) => onChangeScheduleItem(e, isoWeekDay, weekType, isoEventNumber, event)}
        >
          <option value="" />
          {teachersList.length && teachersList.map((teacher) => (
            <option
              key={teacher.id}
              value={teacher.id}
            >
              {teacher.name}
            </option>
          ))}
        </select>
      </label>

      <label className="form__label">
        {formatMessage({ id: 'app.dashboard.semesters.form.editgroup.schedule.event.location' })}
        <select
          name="locationId"
          className="form__input"
          value={(event.item && event.item.locationId) || ''}
          disabled={(event.item && event.item.isFreeTime)}
          onChange={(e) => onChangeScheduleItem(e, isoWeekDay, weekType, isoEventNumber, event)}
          placeholder={formatMessage({ id: 'app.dashboard.semesters.form.editgroup.schedule.event.location.placeholder' })}
        >
          <option value="" />
          {locationsList.length && locationsList.map((location) => (
            <option
              key={location.id}
              value={location.id}
            >
              {location.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

Event.defaultProps = {
  index: 0,
  scheduleList: [],
  teachersList: [],
  subjectsList: [],
  locationsList: [],
  semester: {},
};

Event.propTypes = {
  intl: intlShape.isRequired,
  index: PropTypes.number,
  weekType: PropTypes.number.isRequired,
  dayIndex: PropTypes.number.isRequired,
  semester: PropTypes.shape({
    id: PropTypes.number,
    number: PropTypes.number,
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
  scheduleList: PropTypes.arrayOf(PropTypes.object),
  onChangeScheduleItem: PropTypes.func.isRequired,
  teachersList: PropTypes.arrayOf(PropTypes.object),
  locationsList: PropTypes.arrayOf(PropTypes.object),
  subjectsList: PropTypes.arrayOf(PropTypes.object),
};

export default injectIntl(Event);
