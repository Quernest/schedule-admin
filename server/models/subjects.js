const database = require('../config/database');

module.exports.getAll = (cb) => {
  database.pool.query('SELECT * FROM subjects ORDER BY subjects.name ASC', (error, subjects) => {
    if (error) {
      return cb(error, {});
    }

    cb(null, subjects);
  });
};

module.exports.getById = (id, cb) => {
  database.pool.query(`SELECT * FROM subjects WHERE subjects.id = ${id}`, (error, subjects) => {
    if (error) {
      return cb(error, {});
    }

    const [subject] = subjects;

    cb(null, subject);
  });
};

module.exports.edit = (body, cb) => {
  const { id } = body;

  database.pool.query(`UPDATE subjects SET ? WHERE subjects.id = ${id}`, body, (error, subjects) => {
    if (error) {
      return cb(error, {});
    }

    cb(null, subjects);
  });
};

module.exports.add = (body, cb) => {
  database.pool.query('INSERT INTO subjects SET ?', body, (error, result) => {
    if (error) {
      return cb(error, {});
    }

    const { insertId } = result;

    database.pool.query(`SELECT * FROM subjects WHERE subjects.id = ${insertId}`, (err, subjects) => {
      if (err) {
        return cb(err, {});
      }

      const [subject] = subjects;

      cb(null, subject);
    });
  });
};

module.exports.remove = (id, cb) => {
  database.pool.query(`DELETE FROM subjects WHERE subjects.id = ${id}`, (error, rows) => {
    if (error) {
      return cb(error, {});
    }

    cb(null, rows);
  });
};

