const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const config = require("../config/config");

var userHelper = require("./../helpers/user");
var security = require("./../services/security");
var randtoken = require("rand-token");
const { compareSync } = require("bcrypt");
const logger = require("../services/logger");
const { response } = require("express");

const tokenDuration = 30; /* days nb before token expiration */

// parse requests of content-type: application/json
router.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }));
router.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

//////////////////////////////////////////////////////// =>

router.get("/", (req, res) => {
  res.send("user");
});

router.get("/get_all", security.isAuth, (req, res) => {
  /*TODO add verif isUserAdmin ? */
  userHelper
    .getAllUser()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
});

router.get("/get_user?", (req, res) => {
  let params = {
    id: req.query.id,
  };
  userHelper
    .getUser(params)
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

router.post("/add_user", (req, res) => {
  let user = req.body;
  user.validation_code = randtoken.generate(16);
  user.is_email_verif = false;

  //TODO export in User helper as verif dataUser ( or else )
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
    .then((result) => {
      userHelper.sendValidationEmail(user.email, user.validation_code);
      res.header("Access-Control-Allow-Origin", "*");
      res.send(user);
    })
    .catch((err) => console.log(err));
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

router.get("/load?", security.isAuth, (req, res) => {
  let params = req.query;
  if (!params.filename) res.send(false);
  fs.readFile(
    "./rsc/" + params.filename + ".html",
    "utf8",
    function (err, data) {
      if (err) {
        return console.log(err);
      }
      res.send(data);
    }
  );
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

router.get("/get_userGold?", (req, res) => {
  let params = req.query,
    token;
  if (!params.token) res.send(false);
  else token = params.token;

  let reqUid = `SELECT player_id from player_token WHERE token ='${token}'`;

  let uid = new Promise((resolve, reject) => {
    connection.query(reqUid, function (error, results, fields) {
      if (error) throw error;

      if (results[0] === undefined) res.send(false);
      else resolve(results[0].player_id);
    });
  });

  uid.then((id) => {
    let goldReq = `SELECT gold FROM player WHERE id='${id}'`;
    connection.query(goldReq, function (error, results, fields) {
      if (error) throw error;
      res.json(results[0].gold);
    });
  });
});

router.post("/log_user", (req, res) => {
  let loginReq = req.body.loginReq;
  let reqSql = `SELECT p.id FROM player p WHERE p.user_name = '${loginReq.username}' AND p.PASSWORD = '${loginReq.pwd}'`;

  connection.query(reqSql, function (error, results, fields) {
    if (error) throw error;
    let uData = results[0];
    //si la req renvoie un obj.id
    if (uData) {
      //token creation
      var id = uData.id;
      var uid = require("rand-token").uid;
      var token = uid(16);

      //token expiration date creation
      let d = new Date();
      d.setDate(d.getDate() + tokenDuration);
      let tokenExpirationDate =
        d.toISOString().slice(0, 10) + " " + d.toISOString().slice(11, 19);

      //insert token in bdd with expiration date
      let reqVals = `'${id}','${token}','${tokenExpirationDate}'`;
      let reqSql =
        "INSERT INTO player_token (`player_id`, `token`, `expiration_date` ) VALUES (" +
        reqVals +
        ")";

      connection.query(reqSql, function (error, results, fields) {
        if (error) throw error;
        uData.token = token;
        res.json(uData);
      });
      //then return to angular token
      //then store in angular sessionStorage the relevant token
    } else res.json(uData);
  });
});

router.post("/unlog_user", (req, res) => {
  let token = req.body.token;
  let reqSel = `SELECT pt.id FROM player_token pt WHERE pt.token = '${token}'`;

  console.log(reqSel);

  const getTokenId = new Promise(function (resolve, reject) {
    connection.query(reqSel, function (error, results, fields) {
      if (error) {
        reject({ code: error.code, message: error.sqlMessage });
      } else {
        resolve(results);
      }
    });
  });

  getTokenId
    .then(function (value) {
      let reqDel = `DELETE FROM player_token WHERE id = '${value[0].id}';`;

      console.log("ask_tokenValidity Succes=> ", value);

      connection.query(reqDel, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
      });
    })
    .catch(function (value) {
      console.log(" delete token ERROR => ", value);
      res.json(value);
    });
});

router.post("/ask_tokenValidity", (req, res) => {
  let token = req.body.token;
  let reqSel = `SELECT pt.id FROM player_token pt WHERE pt.token = '${token}'`;

  const getTokenId = new Promise(function (resolve, reject) {
    connection.query(reqSel, function (error, results, fields) {
      if (error) {
        reject({ code: error.code, message: error.sqlMessage });
      } else {
        resolve(results);
      }
    });
  });

  getTokenId
    .then(function (value) {
      console.log("ask_tokenValidity Succes=> ", value);
      if (value[0]) res.json(true);
      else res.json(false);
    })
    .catch(function (value) {
      console.log("log de error => ", value);
      res.json(false);
    });
});

router.post("/upd_user", (req, res) => {
  let token = req.body.token,
    updTargLabel = req.body.fieldName,
    updTargValue = req.body.fieldValue;

  console.log("AT BEGIN UPD => ", req.body);

  if (token == undefined || updTargLabel == undefined) res.send(false);

  let reqSel = `SELECT pt.player_id FROM player_token pt WHERE pt.token = '${token}'`;

  const getTokenId = new Promise(function (resolve, reject) {
    connection.query(reqSel, function (error, results, fields) {
      if (error) {
        reject({ code: error.code, message: error.sqlMessage });
      } else {
        resolve(results[0].player_id);
      }
    });
  });

  getTokenId
    .then(function (id) {
      let reqUpd = `UPDATE player SET ${updTargLabel}='${updTargValue}' WHERE  id= '${id}'`;
      console.log(reqUpd);
      connection.query(reqUpd, function (error, results, fields) {
        if (error) {
          console.log({ code: error.code, message: error.sqlMessage });
          res.send(false);
        } else {
          res.send(true);
        }
      });
    })
    .catch(function (value) {
      console.log("ERROR => ", value);
      res.json(false);
    });
});

/* /////////////////////////// TEST //////////////////////////// */
router.get("/test_device", (req, res) => {
  const deviceDetector = new DeviceDetector();
  const userAgent = req.headers["user-agent"];
  const device = deviceDetector.parse(userAgent);

  console.log(device);
});

module.exports = router;
