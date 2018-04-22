const database = require('../config/database');

module.exports.getSchedule = (id, callback) => {
  database.pool.query(
    `SELECT
      s.id,
      sub.name,
      tc.name AS teacher,
      t.start,
      t.end,
      s.weekDay,
      s.weekType,
      sub.type,
      sem.number as semester,
      s.location,
      s.isFreeTime,
      s.isShortDay
    FROM
      schedule s
    INNER JOIN groups g ON s.groupId = g.id
    INNER JOIN times t ON s.lesson = t.number AND s.isShortDay = t.isShortDay
    LEFT JOIN subjects sub ON s.subjectId = sub.id
    LEFT JOIN teachers tc ON s.teacherId = tc.id
    INNER JOIN semesters sem ON s.semester = sem.number
    WHERE
      g.id = ${id}
    `,
    (err, rows) => {
      if (err) throw err;
      return callback(err, rows);
    },
  );
};

module.exports.getSemesters = (id, callback) => {
  database.pool.query('SELECT * FROM semesters', (err, rows) => {
    if (err) throw err;

    return callback(err, rows);
  });
};

module.exports.getGroup = (id, callback) => {
  database.pool.query(
    `SELECT * FROM groups g WHERE g.id = ${id}`,
    (err, rows) => {
      if (err) throw err;

      return callback(err, rows);
    },
  );
};
