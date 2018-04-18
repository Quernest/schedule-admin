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
          semester,
          lesson,
          isFreeTime,
          isShortDay,
        } = row;

        const correctedRow = {
          id: id || null,
          groupId: Number(groupId),
          subjectId: subjectId ? Number(subjectId) : null,
          teacherId: teacherId ? Number(teacherId) : null,
          weekDay: Number(weekDay),
          weekType: Number(weekType),
          location: location ? String(location) : null,
          semester: Number(semester),
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
    (id, groupId, subjectId, teacherId, weekDay, weekType, location, semester, lesson, isFreeTime, isShortDay)
    VALUES ?`, [fields], (err) => {
      if (err) throw err;

      database.pool.query('SELECT * FROM schedule', (err, rows) => {
        if (err) throw err;

        return callback(null, rows);
      });
    });
  }
};

module.exports.getById = (id, callback) => {
  database.pool.query(`SELECT * FROM schedule WHERE schedule.groupId = ${id}`, (err, rows) => {
    if (err) throw err;

    return callback(null, rows);
  });
};

