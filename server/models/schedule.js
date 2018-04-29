const database = require('../config/database');

module.exports.add = (body, callback) => {
  if (body && body.length) {
    const fields = [];

    let i = 0;
    const count = body.length;

    for (i; i < count; i += 1) {
      const row = body[i] || {};

      if (row) {
        const {
          id,
          groupId,
          subjectId,
          teacherId,
          weekDay,
          weekType,
          location,
          semesterId,
          lesson,
          isFreeTime,
          isShortDay,
        } = row;

        const correctedRow = {
          id: id || null,
          groupId: Number(groupId),
          subjectId: subjectId ? Number(subjectId) : null,
          teacherId: teacherId ? Number(teacherId) : null,
          semesterId: semesterId ? Number(semesterId) : null,
          weekDay: Number(weekDay),
          weekType: Number(weekType),
          location: location ? String(location) : null,
          lesson: Number(lesson),
          isFreeTime: Number(isFreeTime),
          isShortDay: Number(isShortDay),
        };

        fields.push(Object.values(correctedRow));
      }
    }

    database.pool.query(`
    REPLACE INTO
      schedule
    (id, groupId, subjectId, teacherId, semesterId, weekDay, weekType, location, lesson, isFreeTime, isShortDay)
    VALUES ?`, [fields], (error) => {
      if (error) {
        return callback(error, {});
      }

      database.pool.query('SELECT * FROM schedule', (scheduleError, rows) => {
        if (scheduleError) {
          return callback(scheduleError, {});
        }

        return callback(null, rows);
      });

      return callback('add schedule error', {});
    });
  }
};

module.exports.getById = (id, callback) => {
  database.pool.query(`SELECT * FROM schedule WHERE schedule.groupId = ${id}`, (error, rows) => {
    if (error) {
      return callback(error, {});
    }

    return callback(null, rows);
  });
};

