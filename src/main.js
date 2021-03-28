const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
require("dotenv").config();
const bodyParser = require("body-parser");
const logger = require("./services/logger");

var connection = require("./services/database");
const config = require("./config/config");

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

logger.info({ message: "server starting", config });
app.use("/", express.static("public"));

app.options("*", cors()); // include before other routes
// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(require("./routes"));
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

let db = connection.getDatabase(config);

db.connect((err) => {
  if (err) throw err;
  console.log('connected as id ' + db.threadId);
});
