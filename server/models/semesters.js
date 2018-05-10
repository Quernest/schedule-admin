const database = require('../config/database');
const moment = require('moment');

module.exports.getAll = (cb) => {
  database.pool.query('SELECT * FROM semesters ORDER BY semesters.name ASC', (error, semesters) => {
    if (error) {
      return cb(error, {});
    }

    cb(null, semesters);
  });
};

module.exports.add = (body, cb) => {
  database.pool.query('INSERT INTO semesters SET ?', body, (error, result) => {
    if (error) {
      return cb(error, {});
    }

    const { insertId } = result;

    database.pool.query(`SELECT * FROM semesters WHERE semesters.id = ${insertId}`, (err, semesters) => {
      if (err) {
        return cb(err, {});
      }

      const [semester] = semesters;

      cb(null, semester);
    });
  });
};

module.exports.remove = (id, cb) => {
  database.pool.query(`DELETE FROM semesters WHERE semesters.id = ${id}`, (error, semesters) => {
    if (error) {
      return cb(error, {});
    }

    cb(null, semesters);
  });
};

module.exports.edit = (body, cb) => {
  const {
    id,
    name,
    start,
    end,
  } = body;

  const semester = Object.assign(body, {
    name,
    start: moment(start).format('YYYY-MM-DD'),
    end: moment(end).format('YYYY-MM-DD'),
  });

  database.pool.query(`UPDATE semesters SET ? WHERE semesters.id = ${id}`, semester, (error, semesters) => {
    if (error) {
      return cb(error, {});
    }

    cb(null, semesters);
  });
};

module.exports.getById = (id, cb) => {
  database.pool.query(`SELECT * FROM semesters s WHERE s.id = ${id}`, (error, semesters) => {
    if (error) {
      return cb(error, {});
    }

    const [semester] = semesters;

    cb(null, semester);
  });
};
