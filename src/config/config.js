require("dotenv").config();
module.exports = {
	"security": {
		"allowOrigin": process.env.ALLOW_ORIGIN,
		"allowHeaders": process.env.ALLOW_HEADERS.split(','),
	},
	"database": {
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "name": process.env.DB_NAME,
		"user": process.env.DB_USER,
		"password": process.env.DB_PASS
	},
	"jwt":{
		"access" : process.env.ACCESS_TOKEN_SECRET,
		"refresh" : process.env.REFRESH_TOKEN_SECRET,
	}
}
