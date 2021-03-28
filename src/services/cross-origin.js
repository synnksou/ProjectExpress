const config = require('../config/config');
module.exports = function(req, res, next) {
  res.set("Access-Control-Allow-Methods", "OPTIONS, HEAD, GET, POST, PUT, DELETE");
  res.set("Access-Control-Allow-Origin", "*");
  var headers = ["Origin", "X-Requested-With", "Content-Type", "Accept", "Cache-Control"];
  if(config.security && config.security.allowHeaders) {
    headers = headers.concat(config.security.allowHeaders);
  }
  res.set("Access-Control-Allow-Headers", headers.join(","));
  next();
}
