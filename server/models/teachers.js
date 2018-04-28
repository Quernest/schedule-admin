const database = require('../config/database');

module.exports.getAll = (callback) => {
  database.pool.query('SELECT * FROM teachers', (error, rows) => {
    if (error) {
      return callback(error, {});
    }

    return callback(null, rows);
  });
};

module.exports.getById = (id, callback) => {
  database.pool.query(`SELECT * FROM teachers WHERE teachers.id = ${id}`, (error, rows) => {
    if (error) {
      return callback(error, {});
    }

    const [teacher] = rows;

    return callback(null, teacher);
  });
};

module.exports.edit = (body, callback) => {
  const { id } = body;

  database.pool.query(`UPDATE teachers SET ? WHERE teachers.id = ${id}`, body, (error, rows) => {
    if (error) {
      return callback(error, {});
    }

    return callback(null, rows);
  });
};

module.exports.add = (name, callback) => {
  database.pool.query('INSERT INTO teachers SET ?', { name }, (error, rows) => {
    if (error) {
      return callback(error, {});
    }

    if (rows) {
      database.pool.query(`SELECT * FROM teachers WHERE teachers.name = "${name}"`, (teachersError, teachers) => {
        if (teachersError) {
          return callback(teachersError, {});
        }

        const [teacher] = teachers;

        return callback(null, teacher);
      });
    }

    return callback('add teachers error', {});
  });
};

module.exports.remove = (id, callback) => {
  database.pool.query(`DELETE FROM teachers WHERE teachers.id = ${id}`, (error, rows) => {
    if (error) {
      return callback(error, {});
    }

    return callback(null, rows);
  });
};
