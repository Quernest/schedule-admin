const database = require('../config/database');

module.exports.add = (body, callback) => {
  if (body && body.length) {
    const fields = [];
    const count = body.length;

    let i = 0;

    for (i; i < count; i += 1) {
      const row = body[i] || {};

      if (row && row !== 'undefined') {
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

        const newRow = {
          id,
          groupId,
          subjectId: Number(subjectId),
          teacherId: Number(teacherId),
          weekDay,
          weekType,
          location,
          semester: Number(semester),
          lesson,
          isFreeTime,
        };

        fields.push(Object.values(newRow));
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

        console.log(rows);

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

