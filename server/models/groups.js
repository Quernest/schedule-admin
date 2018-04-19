const database = require('../config/database');

module.exports.getAll = (callback) => {
  database.pool.query('SELECT g.id, g.name FROM groups g', (err, rows) => {
    if (err) throw err;

    return callback(null, rows);
  });
};

module.exports.getById = (id, callback) => {
  database.pool.query(`SELECT * FROM groups WHERE groups.id = ${id}`, (err, rows) => {
    if (err) throw err;

    const [group] = rows;

    return callback(null, group);
  });
};

module.exports.add = (name, callback) => {
  database.pool.query(
    'INSERT INTO groups SET ?',
    {
      id: null,
      name,
    },
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

module.exports.edit = (body, callback) => {
  const { id } = body;

  database.pool.query(
    `UPDATE groups SET ? WHERE groups.id = ${id}`,
    body,
    (err, rows) => {
      if (err) throw err;

      return callback(null, rows);
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
