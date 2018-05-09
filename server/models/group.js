const database = require('../config/database');

module.exports.getSchedule = (id, cb) => {
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
      lc.name AS location,
      s.isFreeTime,
      s.isShortDay
    FROM
      schedule s
    INNER JOIN groups g ON s.groupId = g.id
    INNER JOIN times t ON s.lesson = t.number AND s.isShortDay = t.isShortDay
    LEFT JOIN subjects sub ON s.subjectId = sub.id
    LEFT JOIN teachers tc ON s.teacherId = tc.id
    LEFT JOIN locations lc ON lc.locationId = lc.id
    INNER JOIN semesters sem ON s.semesterId = sem.id
    WHERE
      g.id = ${id} ORDER BY t.number ASC
    `,
    (error, schedule) => {
      if (error) {
        return cb(error, {});
      }

      return cb(null, schedule);
    },
  );
};

module.exports.getSemesters = (id, cb) => {
  database.pool.query('SELECT * FROM semesters', (error, semesters) => {
    if (error) {
      return cb(error, {});
    }

    return cb(null, semesters);
  });
};

module.exports.getGroup = (id, cb) => {
  database.pool.query(`SELECT * FROM groups g WHERE g.id = ${id}`, (error, group) => {
    if (error) {
      return cb(error, {});
    }

    return cb(null, group);
  });
};
