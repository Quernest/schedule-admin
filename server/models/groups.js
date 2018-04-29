const database = require('../config/database');

module.exports.getAll = (cb) => {
  database.pool.query('SELECT g.id, g.name FROM groups g ORDER BY g.name ASC', (error, rows) => {
    if (error) {
      return cb(error, {});
    }

    cb(null, rows);
  });
};

module.exports.getById = (id, cb) => {
  database.pool.query(`SELECT * FROM groups WHERE groups.id = ${id}`, (error, groups) => {
    if (error) {
      return cb(error, {});
    }

    const [group] = groups;

    cb(null, group);
  });
};

module.exports.add = (body, cb) => {
  database.pool.query('INSERT INTO groups SET ?', body, (error, result) => {
    if (error) {
      return cb(error, {});
    }

    const { insertId } = result;

    database.pool.query(`SELECT * FROM groups WHERE groups.id = ${insertId}`, (err, groups) => {
      if (err) {
        return cb(err, {});
      }

      const [group] = groups;

      cb(null, group);
    });
  });
};

module.exports.edit = (body, cb) => {
  const { id } = body;

  database.pool.query(`UPDATE groups SET ? WHERE groups.id = ${id}`, body, (error, groups) => {
    if (error) {
      return cb(error, {});
    }

    cb(null, groups);
  });
};

module.exports.remove = (id, cb) => {
  database.pool.query(`DELETE FROM groups WHERE groups.id = ${id}`, (error, groups) => {
    if (error) {
      return cb(error, {});
    }

    cb(null, groups);
  });
};

