const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const saltRounds = 10;
const atob = require("atob");
const crypto = require("crypto");

module.exports = {
  testPassword,
  encryptPassword,
  isAuth,
  parseJwt,
  generateUid,
};

// PUBLIC
function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err === undefined) {
          resolve(hash);
        } else {
          reject(err);
        }
      });
    });
  });
}

function testPassword(password, encryptedPassword) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(password, encryptedPassword).then((res) => {
      console.log(res);
      res ? resolve(true) : reject(false);
    });
  });
}

function isAuth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, config.jwt.access, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

function generateUid() {
  return crypto.randomBytes(8).toString("hex");
}
