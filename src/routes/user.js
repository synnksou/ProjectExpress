const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const logger = require("../services/logger");
const crossOrigin = require("./../services/cross-origin");
var userHelper = require("./../helpers/user");
var security = require("./../services/security");
var randtoken = require("rand-token");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(crossOrigin);

router.get("/", (req, res) => {
  res.send("user");
});

router.get("/get_all", security.isAuth, (req, res) => {
  userHelper
    .getAllUser()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
});

router.get("/get_user?", security.isAuth, (req, res) => {
  const { id } = req.params; // Destructering
  userHelper
    .getUser(id)
    .then((result) => res.json(result))
    .catch((err) => {
      logger.error({ err });
      res.sendStatus(400).send({
        message: "Error 400 Bad Request",
      });
    });
});

router.post("/add_user", (req, res) => {
  let user = req.body;
  user.validation_code = randtoken.generate(16);
  user.is_email_verif = false;

  if (user.password === undefined || user.password.length < 8) {
    res.send("Password undefined or too short ( min 8 len )");
  }

  if (user.email === undefined) {
    res.send("Make sure to provide an Email");
  }

  if (user.lastName === undefined) {
    res.send("Make sure to provide an lastName");
  }

  if (user.firstName === undefined) {
    res.send("Make sure to provide an firstName");
  }

  /*export dans security */
  security
    .encryptPassword(user.password)
    .then((result) => {
      user.id = security.generateUid();
      user.password = result;
      return userHelper.insertUser(user);
    })
    .then(() => {
      userHelper.sendValidationEmail(user.email, user.validation_code);
      res.header("Access-Control-Allow-Origin", "*");
      res.send(user);
    })
    .catch((err) => {
      logger.error({ err });
      res.sendStatus(400).send({
        message: "Error 400 Bad Request",
      });
    });
});

router.post("/auth", (req, res) => {
  const data = req.body; // {email // password}
  userHelper
    .getUserByEmail(data)
    .then((response) => {
      security
        .testPassword(data.password, response[0].password)
        .then(() => {
          let user = {
            email: response[0].email,
            pass: response[0].password,
          };
          let token = jwt.sign(user, config.jwt.access, { expiresIn: "3600s" });
          logger.info({ message: "logged", user: response[0], token: token });
          res.json({ user: response[0], token: token });
        })
        .catch((err) => {
          logger.error({ err });
          res.send(false);
        });
    })
    .catch((err) => {
      res.send(err);
      logger.error({ err });
    });
});

router.get("/account-validation?", (req, res) => {
  let params = req.query;
  if (!params.confirmCode) res.send(false);

  userHelper
    .getUser({ validation_code: params.confirmCode })
    .then((result) => {
      return userHelper.updUser(result._id, { is_email_verif: true });
    })
    .then((result) => {
      res.send(result);
    });

  // req upd is_email_verif  where confirmCode == code
});

router.get("/validation_user?", (req, res) => {
  let params = req.query;
  if (!params.token) res.send(false);

  let d = new Date();
  let DateNow =
    d.toISOString().slice(0, 10) + " " + d.toISOString().slice(11, 19);

  let reqUpd = `UPDATE player SET confirmation_date= '${DateNow}' WHERE  confirmation_code= '${params.token}'`;

  let updCallback = new Promise((resolve, reject) => {
    connection.query(reqUpd, function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      resolve(results);
    });
  });

  updCallback.then((info) => {
    let outputReq = `SELECT email FROM player WHERE confirmation_code='${params.token}'`;
    connection.query(outputReq, (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    });
  });
});

/* /////////////////////////// TEST //////////////////////////// */

module.exports = router;
