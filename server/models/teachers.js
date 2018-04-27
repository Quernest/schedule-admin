const database = require('../config/database');

module.exports.getAll = (callback) => {
  database.pool.query('SELECT * FROM teachers', (err, rows) => {
    if (err) throw err;

    return callback(null, rows);
  });
};

module.exports.getById = (id, callback) => {
  database.pool.query(`SELECT * FROM teachers WHERE teachers.id = ${id}`, (err, rows) => {
    if (err) throw err;

    const [teacher] = rows;

    return callback(null, teacher);
  });
};

module.exports.edit = (body, callback) => {
  const { id } = body;

  database.pool.query(
    `UPDATE teachers SET ? WHERE teachers.id = ${id}`,
    body,
    (err, rows) => {
      if (err) throw err;

      return callback(null, rows);
    },
  );
};

module.exports.add = (name, callback) => {
  database.pool.query('INSERT INTO teachers SET ?', { name }, (err, rows) => {
    if (err) throw err;

    if (rows) {
      database.pool.query(
        `SELECT * FROM teachers WHERE teachers.name = "${name}"`,
        (err, teachers) => {
          if (err) throw err;

          const [teacher] = teachers;

          return callback(null, teacher);
        },
      );
    }
  });
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
