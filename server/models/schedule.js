const database = require('../config/database');

module.exports.add = (body, callback) => {
  database.pool.query('INSERT INTO schedule SET ?', body, (err, rows) => {
    if (err) throw err;

    return callback(null, body);
  });
};

module.exports.getById = (id, callback) => {
  database.pool.query(`SELECT * FROM schedule WHERE schedule.groupId = ${id}`, (err, rows) => {
    if (err) throw err;

    const [schedule] = rows;

    return callback(null, schedule || {});
  });
};

