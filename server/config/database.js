const mysql = require('mysql');

const config = {
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

module.exports = {
  connection: mysql.createConnection(config),
  pool: mysql.createPool(
    Object.assign(config, {
      connectionLimit: 1000,
      connectTimeout: 60 * 60 * 1000,
      aquireTimeout: 60 * 60 * 1000,
      timeout: 60 * 60 * 1000
    })
  )
};
