const database = require('../config/database');

module.exports.getAll = (callback) => {
  database.pool.query('SELECT * FROM subjects', (err, rows) => {
    if (err) throw err;

    return callback(null, rows);
  });
};

module.exports.add = (body, callback) => {
  const { name, type } = body;

  database.pool.query(
    'INSERT INTO subjects SET ?',
    body,
    (err, rows) => {
      if (err) throw err;

      if (rows) {
        database.pool.query(
          `SELECT s.id, s.name FROM subjects s WHERE s.name = "${name}" AND s.type = "${type}"`,
          (err, subjects) => {
            if (err) throw err;

            const [subject] = subjects;

            return callback(null, subject);
          },
        );
      }
    },
  );
};

module.exports.remove = (id, callback) => {
  database.pool.query(`DELETE FROM subjects WHERE subjects.id = ${id}`, (err, rows) => {
    if (err) throw err;

    return callback(null, rows);
  });
};

