var mysql = require("mysql");
const config = require("../config/config");

const db = mysql.createConnection({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.db,
  connectionLimit: 99,
});

db.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to database.");
});

module.exports = db;
