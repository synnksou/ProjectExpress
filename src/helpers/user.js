var database = require("../services/database");
var logger = require("./../services/logger");
var nodemailer = require("nodemailer");

const { ObjectId } = require("mongodb");
module.exports = {
  getAllUser,
  getUserById,
  getUser,
  getUserByEmail,
  insertUser,
  updUser,
  sendValidationEmail,
};

async function getAllUser() {
  return new Promise((resolve, reject) => {
    const query = "Select * From users";
    let connection = database.getDatabase();
    connection.connect((err) => {
      if (err) throw err;
      return connection.query(query, (err, results) => {
        if (results) {
          resolve(results);
        } else {
          reject("User not found, error : " + err);
        }
      });
    });
  });
}
async function getUserById(id) {
  return new Promise((resolve, reject) => {
    if (id && typeof id == "string") {
      database.injectDB((db) => {
        return db
          .collection("users")
          .find({ _id: ObjectId(id) })
          .limit(1)
          .next()
          .then((user) => {
            if (user) {
              resolve(user);
            } else {
              reject();
            }
          });
      });
    } else {
      reject("GetUserById: Bad id (" + typeof id + "): " + id);
    }
  });
}

async function getUserByEmail(params) {
  return new Promise((resolve, reject) => {
    if (params !== undefined) {
      const arrayParams = [params.email];
      const query = "Select * From users WHERE email=?";
      let connection = database.getDatabase();
      connection.connect((err) => {
        if (err) throw err;
        return connection.query(query, arrayParams, (err, results) => {
          if (results) {
            resolve(JSON.parse(JSON.stringify(results)));
          } else {
            reject("User not found, error : " + err);
          }
        });
      });
    } else {
      reject(
        "An error occured while trying to fetch user using undefined params"
      );
    }
  });
}

async function getUserById(id) {
  return new Promise((resolve, reject) => {
    if (id && typeof id == "string") {
      database.injectDB((db) => {
        return db
          .collection("users")
          .find({ _id: ObjectId(id) })
          .limit(1)
          .next()
          .then((user) => {
            if (user) {
              resolve(user);
            } else {
              reject();
            }
          });
      });
    } else {
      reject("GetUserById: Bad id (" + typeof id + "): " + id);
    }
  });
}

async function getUser(params) {
  return new Promise((resolve, reject) => {
    if (params !== undefined) {
      const arrayParams = [params.id];
      const query = "Select * From users WHERE id=?";
      let connection = database.getDatabase();
      connection.connect((err) => {
        if (err) throw err;
        return connection.query(query, arrayParams, (err, results) => {
          if (results) {
            resolve(results);
          } else {
            reject("User not found, error : " + err);
          }
        });
      });
    } else {
      reject(
        "An error occured while trying to fetch user using undefined params"
      );
    }
  });
}

async function insertUser(params) {
  return new Promise((resolve, reject) => {
    if (params !== undefined) {
      const arrayParams = [
        params.id,
        params.firstName,
        params.lastName,
        params.password,
        params.email,
        params.validation_code,
        params.is_email_verif,
      ];
      const query =
        "INSERT INTO users (id,firstName,lastName,password,email,validation_code, is_email_verif) VALUES (?,?,?,?,?,?,?)";
      let connection = database.getDatabase();
      connection.connect((err) => {
        if (err) throw err;
        return connection.query(query, arrayParams, (err, results) => {
          if (results) {
            resolve(results);
          } else {
            reject("User not inserted, error : " + err);
          }
        });
      });
    } else {
      reject(
        "An error occured while trying to fetch user using undefined params"
      );
    }
  });
}

async function updUser(id, params) {
  return new Promise((resolve, reject) => {
    if (id && params) {
      database.injectDB((db) => {
        return db
          .collection("users")
          .updateOne(
            { _id: id }, // Filter
            { $set: params } // Update
            // {upsert: true} // add document with req.body._id if not exists
          )
          .then((result) => {
            resolve(result);
          });
      });
    } else {
      reject("insertUser: Bad User");
    }
  });
}

function sendValidationEmail(email, confirmation_code) {
  // TODO use an verifier email ?  ex : https://verify-email.org /
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "projectexpresstoinou@gmail.com",
      pass: "Test0001",
    },
  });

  let mailOptions = {
    from: "",
    to: email,
    subject: "account validation",
    text:
      "<h3>Thank for subscribing! </h3><br>" +
      "Please follow de link below for your account validation\n\r\n http://NotreIpServer-urlName/user/account-validation?" +
      "confirmCode = " +
      confirmation_code,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
