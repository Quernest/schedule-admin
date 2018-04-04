const database = require('../config/database');

module.exports.getAll = (callback) => {
  database.pool.query('SELECT * FROM semesters', (err, rows) => {
    if (err) throw err;

    callback(null, rows);
  });
};
