const database = require('../config/database');

module.exports.getAll = (cb) => {
  database.pool.query('SELECT * FROM teachers', (error, teachers) => {
    if (error) {
      return cb(error, {});
    }

    cb(null, teachers);
  });
};

module.exports.getById = (id, cb) => {
  database.pool.query(`SELECT * FROM teachers WHERE teachers.id = ${id}`, (error, teachers) => {
    if (error) {
      return cb(error, {});
    }

    const [teacher] = teachers;

    cb(null, teacher);
  });
};

module.exports.edit = (body, cb) => {
  const { id } = body;

  database.pool.query(`UPDATE teachers SET ? WHERE teachers.id = ${id}`, body, (error, teachers) => {
    if (error) {
      return cb(error, {});
    }

    cb(null, teachers);
  });
};

module.exports.add = (body, cb) => {
  database.pool.query('INSERT INTO teachers SET ?', body, (error, result) => {
    if (error) {
      return cb(error, {});
    }

    const { insertId } = result;

    database.pool.query(`SELECT * FROM teachers WHERE teachers.id = ${insertId}`, (err, teachers) => {
      if (err) {
        return cb(err, {});
      }

      const [teacher] = teachers;

      cb(null, teacher);
    });
  });
};

module.exports.remove = (id, cb) => {
  database.pool.query(`DELETE FROM teachers WHERE teachers.id = ${id}`, (error, teachers) => {
    if (error) {
      return cb(error, {});
    }

    cb(null, teachers);
  });
};
