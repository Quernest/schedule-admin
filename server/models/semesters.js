const database = require('../config/database');
const moment = require('moment');

module.exports.getAll = (callback) => {
  database.pool.query('SELECT * FROM semesters', (error, rows) => {
    if (error) {
      return callback(error, {});
    }

    return callback(null, rows);
  });
};

module.exports.add = (body, callback) => {
  database.pool.query('INSERT INTO semesters SET ?', body, (error, rows) => {
    if (error) {
      return callback(error, {});
    }

    if (rows) {
      const { number } = body;

      database.pool.query(`SELECT * FROM semesters WHERE semesters.number = ${number}`, (semestersError, semesters) => {
        if (semestersError) {
          return callback(semestersError, {});
        }

        const [semester] = semesters;

        return callback(null, semester);
      });
    }

    return callback('add semesters error', {});
  });
};

module.exports.remove = (id, callback) => {
  database.pool.query(`DELETE FROM semesters WHERE semesters.id = ${id}`, (error, rows) => {
    if (error) {
      return callback(error, {});
    }

    return callback(null, rows);
  });
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

  database.pool.query(`UPDATE semesters SET ? WHERE semesters.id = ${id}`, newBody, (error, rows) => {
    if (error) {
      return callback(error, {});
    }

    return callback(null, rows);
  });
};

module.exports.getById = (id, callback) => {
  database.pool.query(`SELECT * FROM semesters s WHERE s.id = ${id}`, (error, rows) => {
    if (error) {
      return callback(error, {});
    }

    const [semester] = rows;

    return callback(null, semester);
  });
};
