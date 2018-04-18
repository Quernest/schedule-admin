const database = require('../config/database');
const moment = require('moment');

module.exports.getAll = (callback) => {
  database.pool.query('SELECT * FROM semesters', (err, rows) => {
    if (err) throw err;

    callback(null, rows);
  });
};

module.exports.add = (body, callback) => {
  database.pool.query(
    'INSERT INTO semesters SET ?',
    body,
    (err, rows) => {
      if (err) throw err;

      if (rows) {
        const { number } = body;

        database.pool.query(
          `SELECT * FROM semesters WHERE semesters.number = ${number}`,
          (err, semesters) => {
            if (err) throw err;

            const [semester] = semesters;

            return callback(null, semester);
          },
        );
      }
    },
  );
};

module.exports.remove = (id, callback) => {
  database.pool.query(
    `DELETE FROM semesters WHERE semesters.id = ${id}`,
    (err, rows) => {
      if (err) throw err;

      return callback(null, rows);
    },
  );
};

module.exports.edit = (body, callback) => {
  const {
    id,
    number,
    start,
    end,
  } = body;

  const newBody = Object.assign(body, {
    number: Number(number),
    start: moment(start).format('YYYY-MM-DD'),
    end: moment(end).format('YYYY-MM-DD'),
  });

  database.pool.query(
    `UPDATE semesters SET ? WHERE semesters.id = ${id}`,
    newBody,
    (err, rows) => {
      if (err) throw err;

      return callback(null, rows);
    },
  );
};

module.exports.getById = (id, callback) => {
  database.pool.query(`SELECT * FROM semesters s WHERE s.id = ${id}`, (err, rows) => {
    if (err) throw err;

    const [semester] = rows;

    return callback(null, semester);
  });
};
