const database = require('../config/database');

module.exports.getLessonsById = (id, callback) => {
  database.pool.query(
    `SELECT
    lsn.id,
    lsn.day,
    lsn.name,
    lsn.type,
    lsn.location,
    lsn.weekType,
    tch.name AS teacher,
    tim.start,
    tim.end
  FROM
    groups grp,
    lessons lsn,
    teachers tch,
    times tim
  WHERE
      grp.id = ${id}
  AND grp.id = lsn.group_id
  AND lsn.number = tim.number
  AND tch.id = lsn.teacher_id`,
    (err, rows) => {
      if (err) throw err;
      return callback(err, rows);
    },
  );
};
