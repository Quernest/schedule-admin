const database = require('../config/database');

module.exports.getAll = (callback) => {
  database.pool.query('SELECT t.id, t.name FROM teachers t', (err, rows) => {
    if (err) throw err;

    return callback(null, rows);
  });
};

module.exports.add = (name, callback) => {
  database.pool.query(
    'INSERT INTO teachers (name) values (?)',
    [name],
    (err, rows) => {
      if (err) throw err;

      if (rows) {
        database.pool.query(
          `SELECT t.id, t.name FROM teachers t WHERE t.name = "${name}"`,
          (err, teachers) => {
            if (err) throw err;

            const [teacher] = teachers;

            return callback(null, teacher);
          },
        );
      }
    },
  );
};

module.exports.remove = (id, callback) => {
  database.pool.query(
    `DELETE FROM teachers WHERE teachers.id = ${id}`,
    (err, rows) => {
      if (err) throw err;

      return callback(null, rows);
    },
  );
};
