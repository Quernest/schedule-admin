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
        } = row;

        const correctedRow = {
          id: id || new Date().getTime(),
          groupId: Number(groupId),
          subjectId: Number(subjectId),
          teacherId: Number(teacherId),
          weekDay: Number(weekDay),
          weekType: Number(weekType),
          location: String(location),
          semester: Number(semester),
          lesson: Number(lesson),
          isFreeTime: Number(isFreeTime),
        };

        fields.push(Object.values(correctedRow));
      }
    }

    database.pool.query(`
    REPLACE INTO
      schedule
    (id, groupId, subjectId, teacherId, weekDay, weekType, location, semester, lesson, isFreeTime)
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

