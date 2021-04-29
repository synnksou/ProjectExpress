var mysql = require("mysql");
const config = require("../config/config");
const logger = require("./logger");

module.exports = {
  injectDB,
  getDatabase,
};
/*
function injectDB(promiseCallback) {
  return getDatabase(config).then((con) =>
    promiseCallback(con)
      .then((result) => {
        return Promise.resolve(result);
      })
      .catch((err) => {
        return Promise.reject(err);
      })
  );
}
*/

function injectDB(promiseCallback) {
  return new Promise((reject, resolve) => {
    let con = getDatabase(config);
    promiseCallback()
      .then((result) => {
        return resolve(result);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

function getDatabase() {
  let con = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.db,
    connectionLimit: 99,
  });
  return con;
}
