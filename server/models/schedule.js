const database = require('../config/database');

module.exports.add = (body, cb) => {
  if (body && body.length) {
    const schedule = [];
    const idsOnDelete = [];

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

        const hasRequiredFields = teacherId && subjectId && locationId;

        if (isFreeTime) {
          schedule.push(Object.values({
            id: Number(id) || null,
            groupId: Number(groupId),
            subjectId: null,
            teacherId: null,
            semesterId: Number(semesterId),
            locationId: null,
            weekDay: Number(weekDay),
            weekType: Number(weekType),
            lesson: Number(lesson),
            isFreeTime: 1,
            isShortDay: Number(isShortDay),
          }));
        }

        if (!isFreeTime && hasRequiredFields) {
          schedule.push(Object.values({
            id: Number(id) || null,
            groupId: Number(groupId),
            subjectId: Number(subjectId),
            teacherId: Number(teacherId),
            semesterId: Number(semesterId),
            locationId: Number(locationId),
            weekDay: Number(weekDay),
            weekType: Number(weekType),
            lesson: Number(lesson),
            isFreeTime: 0,
            isShortDay: Number(isShortDay),
          }));
        }

        if (id && !isFreeTime && !hasRequiredFields) {
          idsOnDelete.push(id);
        }
      }
    }

    const getAllSchedule = () => {
      database.pool.query('SELECT * FROM schedule', (error, list) => {
        if (error) {
          return cb(error, {});
        }

        cb(null, list);
      });
    };

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

      if (idsOnDelete && idsOnDelete.length > 0) {
        const ids = idsOnDelete.join();

        database.pool.query(`DELETE FROM schedule WHERE id IN (${ids})`, (deleteError) => {
          if (deleteError) {
            return cb(deleteError, {});
          }

          getAllSchedule();
        });
      } else getAllSchedule();
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

