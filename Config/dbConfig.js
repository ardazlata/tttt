const mysql = require("mysql2");
const connection=mysql.createPool({
  host: process.env.HOST_NAME,
  user: process.env.USER_NAME,
  password: process.env.PW,
  database: process.env.DB_NAME,
}).promise();

module.exports = connection;

