const database = require('../config/database');

module.exports.getAllGroups = (callback) => {
  database.pool.query('SELECT grp.id, grp.name FROM groups grp', (err, rows) => {
    if (err) throw err;
    return callback(null, rows);
  });
};
