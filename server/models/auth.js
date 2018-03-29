const bcrypt = require("bcrypt");
const database = require("../config/database");

module.exports.login = (req, username, password, callback) => {
  database.pool.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, rows) => {
      if (err) {
        callback(err);
      } else if (!rows.length) {
        callback("app.errors.login.user.notfound", false);
      } else if (!bcrypt.compareSync(password, rows[0].password)) {
        callback("app.errors.login.password.doesntmatch", false);
      } else {
        callback(null, Object.assign({}, rows[0]));
      }
    }
  );
};

module.exports.registration = (req, username, password, callback) => {
  const register = () => {
    const user = {
      username,
      password: bcrypt.hashSync(password, 8),
    };

    database.pool.query(
      "INSERT INTO users (username, password) values (?,?)",
      [user.username, user.password],
      (err, rows) => {
        if (err) {
          callback(err);
        }
        const { id } = rows;

        callback(null, Object.assign({}, user, id));
      },
    );
  };

  database.pool.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, rows) => {
      if (err) {
        callback(err);
      } else if (rows.length) {
        callback("app.errors.register.username.taken", false);
      } else {
        register();
      }
    },
  );
};
