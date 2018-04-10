const database = require('../config/database');

module.exports.getAll = (callback) => {
  database.pool.query('SELECT * FROM subjects', (err, rows) => {
    if (err) throw err;

    return callback(null, rows);
  });
};
