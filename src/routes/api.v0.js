const express = require("express");
const router = express.Router();

router.use("/user", require("./user.js"));
router.use("/teams", require("./teams.js"));
router.use("/pokemon", require("./pokemons.js"));

router.get("/", (req, res) => {
  res.sendStatus(200).send({ msg: "Hello its Api :)" });
});
router.get("/test", (req, res) => {
  const body = "TESTAPI";
  res
    .writeHead(200, {
      "Content-Length": Buffer.byteLength(body),
      "Content-Type": "text/plain",
    })
    .end(body);
});

module.exports = router;
