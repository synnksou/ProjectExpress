var mysql = require("mysql");
const config = require("../config/config");
const logger = require("./logger");

module.exports = {
  injectDB,
  getDatabase
};

function injectDB(promiseCallback) {
  return getDatabase(config.database).then((query) =>
    promiseCallback(query)
      .then((result) => {
        return Promise.resolve(result);
      })
      .catch((err) => {
        return Promise.reject(err);
      })
  );
}

function getDatabase(database) {
  let con = mysql.createConnection({
    host: database.host,
    port: database.port,
    user: database.user,
    password: database.password,
  });
  return con
}
