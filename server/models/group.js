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
      sem.id as semesterId,
      s.location,
      s.isFreeTime,
      s.isShortDay
    FROM
      schedule s
    INNER JOIN groups g ON s.groupId = g.id
    INNER JOIN times t ON s.lesson = t.number AND s.isShortDay = t.isShortDay
    LEFT JOIN subjects sub ON s.subjectId = sub.id
    LEFT JOIN teachers tc ON s.teacherId = tc.id
    INNER JOIN semesters sem ON s.semesterId = sem.id
    WHERE
      g.id = ${Number(id)} ORDER BY t.number ASC
    `,
    (error, rows) => {
      if (error) {
        return callback(error, {});
      }

      return callback(error, rows);
    },
  );
};

module.exports.getSemesters = (id, callback) => {
  database.pool.query('SELECT * FROM semesters', (error, rows) => {
    if (error) {
      return callback(error, {});
    }

    return callback(error, rows);
  });
};

module.exports.getGroup = (id, callback) => {
  database.pool.query(`SELECT * FROM groups g WHERE g.id = ${id}`, (error, rows) => {
    if (error) {
      return callback(error, {});
    }

    return callback(error, rows);
  });
};
