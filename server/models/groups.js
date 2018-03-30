const database = require('../config/database');

module.exports.getAll = (callback) => {
  database.pool.query('SELECT g.id, g.name FROM groups g', (err, rows) => {
    if (err) throw err;

    return callback(null, rows);
  });
};

module.exports.add = (name, callback) => {
  database.pool.query(
    'INSERT INTO groups (name) values (?)',
    [name],
    (err, rows) => {
      if (err) throw err;

      if (rows) {
        database.pool.query(
          `SELECT g.id, g.name FROM groups g WHERE g.name = "${name}"`,
          (err, groups) => {
            if (err) throw err;

            const [group] = groups;

            return callback(null, group);
          },
        );
      }
    },
  );
};

module.exports.remove = (id, callback) => {
  database.pool.query(
    `DELETE FROM groups WHERE groups.id = ${id}`,
    (err, rows) => {
      if (err) throw err;

      return callback(null, rows);
    },
  );
};
