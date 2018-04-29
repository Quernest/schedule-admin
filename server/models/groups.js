const database = require('../config/database');

module.exports.getAll = (callback) => {
  database.pool.query('SELECT g.id, g.name FROM groups g ORDER BY g.name ASC', (error, rows) => {
    if (error) {
      return callback(error, {});
    }

    return callback(null, rows);
  });
};

module.exports.getById = (id, callback) => {
  database.pool.query(`SELECT * FROM groups WHERE groups.id = ${id}`, (error, rows) => {
    if (error) {
      return callback(error, {});
    }

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
    (error, rows) => {
      if (error) {
        return callback(error, {});
      }

      if (rows) {
        database.pool.query(`SELECT g.id, g.name FROM groups g WHERE g.name = "${name}"`, (groupsError, groups) => {
          if (groupsError) {
            return callback(groupsError, {});
          }

          const [group] = groups;

          return callback(null, group);
        });
      }

      return callback('add groups error', {});
    },
  );
};

module.exports.edit = (body, callback) => {
  const { id } = body;

  database.pool.query(`UPDATE groups SET ? WHERE groups.id = ${id}`, body, (error, rows) => {
    if (error) {
      return callback(error, {});
    }

    return callback(null, rows);
  });
};

module.exports.remove = (id, callback) => {
  database.pool.query(`DELETE FROM groups WHERE groups.id = ${id}`, (error, rows) => {
    if (error) {
      return callback(error, {});
    }

    return callback(null, rows);
  });
};
