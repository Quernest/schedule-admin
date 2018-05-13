const database = require('../config/database');

module.exports.getAll = (cb) => {
  database.pool.query('SELECT * FROM locations ORDER BY locations.name ASC', (error, locations) => {
    if (error) {
      return cb(error, {});
    }

    cb(null, locations);
  });
};

module.exports.getById = (id, cb) => {
  database.pool.query(`SELECT * FROM locations WHERE locations.id = ${id}`, (error, locations) => {
    if (error) {
      return cb(error, {});
    }

    const [location] = locations;

    cb(null, location);
  });
};

module.exports.edit = (body, cb) => {
  const { id } = body;

  database.pool.query(`UPDATE locations SET ? WHERE locations.id = ${id}`, body, (error, locations) => {
    if (error) {
      return cb(error, {});
    }

    cb(null, locations);
  });
};

module.exports.add = (body, cb) => {
  database.pool.query('INSERT INTO locations SET ?', body, (error, result) => {
    if (error) {
      return cb(error, {});
    }

    const { insertId } = result;

    database.pool.query(`SELECT * FROM locations WHERE locations.id = ${insertId}`, (err, locations) => {
      if (err) {
        return cb(err, {});
      }

      const [location] = locations;

      cb(null, location);
    });
  });
};

module.exports.remove = (id, cb) => {
  database.pool.query(`DELETE FROM locations WHERE locations.id = ${id}`, (error, locations) => {
    if (error) {
      return cb(error, {});
    }

    cb(null, locations);
  });
};
