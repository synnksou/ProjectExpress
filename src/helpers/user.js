var database = require("../services/database");
var logger = require("./../services/logger");
var nodemailer = require("nodemailer");

module.exports = {
  getAllUser,
  getUser,
  getUserByEmail,
  insertUser,
  sendValidationEmail,
};

async function getAllUser() {
  return new Promise((resolve, reject) => {
    const query = "Select id, firstName, LastName From users";
    let connection = database;
    return connection.query(query, (err, results) => {
      if (results) {
        resolve(JSON.parse(JSON.stringify(results)));
      } else {
        reject("User not found, error : " + err);
      }
    });
  });
}

async function getUserByEmail(params) {
  return new Promise((resolve, reject) => {
    if (params !== undefined) {
      const arrayParams = [params.email];
      const query = "Select * From users WHERE email=?";
      let connection = database;
      return connection.query(query, arrayParams, (err, results) => {
        if (results) {
          resolve(JSON.parse(JSON.stringify(results)));
        } else {
          reject("User not found, error : " + err);
        }
      });
    } else {
      reject(
        "An error occured while trying to fetch user using undefined params"
      );
    }
  });
}

async function getUser(id) {
  return new Promise((resolve, reject) => {
    if (params !== undefined) {
      const arrayParams = [id];
      const query = "Select * From users WHERE id=?";
      let connection = database;
      if (err) throw err;
      return connection.query(query, arrayParams, (err, results) => {
        if (results) {
          resolve(results);
        } else {
          reject("User not found, error : " + err);
        }
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
      let connection = database;
      return connection.query(query, arrayParams, (err, results) => {
        if (results) {
          resolve(results);
        } else {
          reject("User not inserted, error : " + err);
        }
      });
    } else {
      reject(
        "An error occured while trying to fetch user using undefined params"
      );
    }
  });
}

function sendValidationEmail(email, confirmation_code) {
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
    subject: "account validation POKEMON BUILDER",
    text:
      "<h3>Thank for subscribing!</h3>  " +
      "Your registration has been successful " +
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
