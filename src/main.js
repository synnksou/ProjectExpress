const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
const crossOrigin = require("./services/cross-origin");
require("dotenv").config();
const bodyParser = require("body-parser");
const logger = require("./services/logger");
const config = require("./config/config");
const path = require("path");
var history = require("connect-history-api-fallback");
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

logger.info({ message: "server starting", config });
app.use("/", express.static("./../public"));
app.use(
  history({
    verbose: true,
    htmlAcceptHeaders: ["text/html", "application/xhtml+xml"],
  })
);
app.use("/", express.static("./../public"));

app.options("*", cors());
app.use(bodyParser.json());
app.use(crossOrigin);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("./routes/routes"));
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//ROUTE HTML -----------------------------------------------------------------------------------------

app.get("/login", (req, res) => {
  //res.sendFile(path.join(__dirname +  "./../public/html/login.html"));
});

app.use(function (req, res, next) {
  res
    .status(404)
    .sendFile(path.join(__dirname + "./../public/html/error/404.html"));
});
