const database = require('../config/database');

module.exports.add = (body, cb) => {
  if (body && body.length) {
    const schedule = [];

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
          semesterId,
          locationId,
          weekDay,
          weekType,
          lesson,
          isFreeTime,
          isShortDay,
        } = row;

        schedule.push(Object.values({
          id: id || null,
          groupId: Number(groupId),
          subjectId: subjectId ? Number(subjectId) : null,
          teacherId: teacherId ? Number(teacherId) : null,
          semesterId: semesterId ? Number(semesterId) : null,
          locationId: locationId ? Number(locationId) : null,
          weekDay: Number(weekDay),
          weekType: Number(weekType),
          lesson: Number(lesson),
          isFreeTime: Number(isFreeTime),
          isShortDay: Number(isShortDay),
        }));
      }
    }

    database.pool.query(`
    REPLACE INTO
      schedule
    (
      id,
      groupId,
      subjectId,
      teacherId,
      semesterId,
      locationId,
      weekDay,
      weekType,
      lesson,
      isFreeTime,
      isShortDay
    )
    VALUES ?`, [schedule], (error, result) => {
      if (error) {
        return cb(error, {});
      }

      database.pool.query('SELECT * FROM schedule', (scheduleError, list) => {
        if (scheduleError) {
          return cb(scheduleError, {});
        }

        cb(null, list);
      });
    });
  }
};

module.exports.getById = (id, cb) => {
  database.pool.query(`SELECT * FROM schedule WHERE schedule.groupId = ${id}`, (error, schedule) => {
    if (error) {
      return cb(error, {});
    }

    cb(null, schedule);
  });
};

