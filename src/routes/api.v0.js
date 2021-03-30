const express = require("express");
const router = express.Router();

router.use("/user", require("./user.js"));

router.get("/", (req, res) => {
  res.sendStatus(200).send('its ok');
});

module.exports = router;
