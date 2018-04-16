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
          e.semester === semester
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
      <h3 className="form__event-title">{isoEventNumber}</h3>

      <label className="form__label">
        Свободное время
        <input
          type="checkbox"
          className="form__input"
          name="isFreeTime"
          value={(event.item && event.item.isFreeTime ? 1 : 0) || ''}
          checked={(event.item && event.item.isFreeTime) || false}
          onChange={(e) => onChangeScheduleItem(e, isoWeekDay, weekType, isoEventNumber, event)}
        />
      </label>

      <label
        className="form__label"
        htmlFor={`${isoEventNumber}-teachers`}
      >
        Выберите преподавателя:
        <select
          id={`${isoEventNumber}-teachers`}
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

      <label
        className="form__label"
        htmlFor={`${isoEventNumber}-subjects`}
      >
        Выберите предмет:
        <select
          id={`${isoEventNumber}-subjects`}
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

      <label
        className="form__label"
        htmlFor={`${isoEventNumber}-location`}
      >
        Введите № аудитории
        <input
          id={`${isoEventNumber}-location`}
          name="location"
          className="form__input"
          value={(event.item && event.item.location) || ''}
          disabled={(event.item && event.item.isFreeTime)}
          onChange={(e) => onChangeScheduleItem(e, isoWeekDay, weekType, isoEventNumber, event)}
          placeholder="Например: 2215"
        />
      </label>
    </div>
  );
};

Event.defaultProps = {
  index: 0,
  scheduleList: [],
  teachersList: [],
  subjectsList: [],
};

Event.propTypes = {
  intl: intlShape.isRequired,
  index: PropTypes.number,
  weekType: PropTypes.number.isRequired,
  dayIndex: PropTypes.number.isRequired,
  semester: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  scheduleList: PropTypes.arrayOf(PropTypes.object),
  onChangeScheduleItem: PropTypes.func.isRequired,
  teachersList: PropTypes.arrayOf(PropTypes.object),
  subjectsList: PropTypes.arrayOf(PropTypes.object),
};

export default injectIntl(Event);
