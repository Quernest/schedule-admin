const bcrypt = require('bcrypt');
const database = require('../config/database');

module.exports.login = (req, username, password, callback) => {
  database.pool.query('SELECT * FROM users WHERE username = ?', [username], (error, rows) => {
    if (error) {
      callback(error, {});
    } else if (!rows.length) {
      callback('app.errors.login.user.notfound', {});
    } else if (!bcrypt.compareSync(password, rows[0].password)) {
      callback('app.errors.login.password.doesntmatch', {});
    } else {
      callback(null, Object.assign({}, rows[0]));
    }
  });
};

// module.exports.registration = (req, username, password, callback) => {
//   const register = () => {
//     const user = {
//       username,
//       password: bcrypt.hashSync(password, 8),
//     };

//     database.pool.query('INSERT INTO users (username, password) values (?,?)', [user.username, user.password], (error, rows) => {
//       if (error) {
//         return callback(error, {});
//       }
//       const { id } = rows;

//       return callback(null, Object.assign({}, user, id));
//     });
//   };

//   database.pool.query('SELECT * FROM users WHERE username = ?', [username], (error, rows) => {
//     if (error) {
//       callback(error);
//     } else if (rows.length) {
//       callback('app.errors.register.username.taken', false);
//     } else {
//       register();
//     }
//   });
// };
