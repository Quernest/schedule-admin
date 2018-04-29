const bcrypt = require('bcrypt');
const database = require('../config/database');

module.exports.login = (req, username, password, cb) => {
  database.pool.query('SELECT * FROM users WHERE username = ?', [username], (error, users) => {
    if (error) {
      cb(error, {});
    } else if (!users.length) {
      cb('app.errors.login.user.notfound', {});
    } else if (!bcrypt.compareSync(password, users[0].password)) {
      cb('app.errors.login.password.doesntmatch', {});
    } else {
      cb(null, Object.assign({}, users[0]));
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
