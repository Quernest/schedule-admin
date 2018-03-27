const database = require('../config/database');

module.exports.getSchedule = (id, callback) => {
  database.pool.query(
    `SELECT
      s.id,
      l.name,
      tc.name AS teacher,
      t.start,
      t.end,
      s.day,
      s.weekType,
      s.location
    FROM
      schedule s
    INNER JOIN groups g ON s.groupId = g.id
    INNER JOIN times t ON s.lessonNumberId = t.id
    INNER JOIN lessons l ON s.lessonId = l.id
    INNER JOIN teachers tc ON s.teacherId = tc.id
    WHERE
      g.id = ${id}
    `,
    (err, rows) => {
      if (err) throw err;
      return callback(err, rows);
    },
  );
};

module.exports.getSemester = (id, callback) => {
  database.pool.query('SELECT * FROM semesters', (err, rows) => {
    if (err) throw err;

    return callback(err, rows);
  });
};

module.exports.getGroup = (id, callback) => {
  database.pool.query(`SELECT * FROM groups g WHERE g.id = ${id}`, (err, rows) => {
    if (err) throw err;

    return callback(err, rows);
  });
};
