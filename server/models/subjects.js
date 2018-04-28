const database = require('../config/database');

module.exports.getAll = (callback) => {
  database.pool.query('SELECT * FROM subjects ORDER BY subjects.name ASC', (error, rows) => {
    if (error) {
      return callback(error, {});
    }

    return callback(null, rows);
  });
};

module.exports.getById = (id, callback) => {
  database.pool.query(`SELECT * FROM subjects WHERE subjects.id = ${id}`, (error, rows) => {
    if (error) {
      return callback(error, {});
    }

    const [subject] = rows;

    return callback(null, subject);
  });
};

module.exports.edit = (body, callback) => {
  const { id } = body;

  database.pool.query(`UPDATE subjects SET ? WHERE subjects.id = ${id}`, body, (error, rows) => {
    if (error) {
      return callback(error, {});
    }

    return callback(null, rows);
  });
};

module.exports.add = (body, callback) => {
  const { name, type } = body;

  database.pool.query('INSERT INTO subjects SET ?', body, (error, rows) => {
    if (error) {
      return callback(error, {});
    }

    if (rows) {
      database.pool.query(
        `SELECT * FROM subjects s WHERE s.name = "${name}" AND s.type = "${type}"`,
        (subjectsError, subjects) => {
          if (subjectsError) {
            return callback(subjectsError, {});
          }

          const [subject] = subjects;

          return callback(null, subject);
        },
      );
    }
  });
};

module.exports.remove = (id, callback) => {
  database.pool.query(`DELETE FROM subjects WHERE subjects.id = ${id}`, (error, rows) => {
    if (error) {
      return callback(error, {});
    }

    return callback(null, rows);
  });
};

