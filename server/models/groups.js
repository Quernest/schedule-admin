const database = require('../config/database');

module.exports.getAllGroups = (callback) => {
  database.pool.query('SELECT g.id, g.name FROM groups g', (err, rows) => {
    if (err) throw err;
    return callback(null, rows);
  });
};
