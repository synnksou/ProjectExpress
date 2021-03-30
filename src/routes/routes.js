const express = require("express");
const app = express();
const router = express.Router();

router.use("/api", require("./api.v0.js"));

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname + "./../../public/html/login.html"));
});

module.exports = router;
