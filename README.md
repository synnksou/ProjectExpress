# Project Express
## _The Last Markdown Editor, Ever_

Project Express is school project, is Single Page Application using CDN (required) based on Builder Pokemon

Link [TeamBuilder](http://toinouu.alwaysdata.net)

## Features

- Authentications, login and account creation with a JWT token
- Listing All team created by users
- Creation of yours team !
- Remove Team and create new !


## Tech

Builder Pokemon uses a number of open source projects to work properly:

- [VueJs] - HTML enhanced for single web apps!
- [Node.js] - evented I/O for the backend
- [Bcrypt] - Encrypt and Decrypt string with many protocols
- [ExpressJs] - Framework based for RestApi in Nodejs.
- [mysql] - Markdown parser done right. Fast and easy to extend.
- [JWT] - System token by JWT
- [SweetAlert] - Pretty Alert for Front-end

## Installation

TeamBuilder requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd ProjetcExpress
npm i
```

For production environments...
You need to create . env 

```sh
cd ProjetcExpress
touch .end
```
and add your configuration, i recommend of use this
* DB ist DataBase Mysql
* Allow is for acces in nodejs
* Jwt Token for secret acces
* Site Host is Host of web app
```
DB_HOST=localhost
DB_USER=me
DB_PASS=secret
DB_DATABASE=fsjs2021
# SERVICES
ALLOW_ORIGIN = "*"
ALLOW_HEADERS = "X-UserToken,X-PatientToken,X-DeviceId"

# JWT TOKENS
ACCESS_TOKEN_SECRET=b4bdf6a9119caa6c541052cd8b5ed33cc22541b0d21e166ea5f5b092da51de68f3250812ab1535b3a01e4f485fd15bbd44c9628af4de9202e7db310885bee605
REFRESH_TOKEN_SECRET=df38f8f0e2c73f7855de4a54e9793d726a482e790d36fd127ce2963210921e506eb47d185cb2521b205d7afd1d4d213df4d9a442684f1569699bd4c05efeebe0

#SITE HOST
SITE_HOST=localhost
```


#### Building for source

For Build:

```sh
npm run start
```


## License

No License

