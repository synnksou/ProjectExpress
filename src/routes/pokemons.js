const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const pokemonHelper = require("./../helpers/pokemons");
const logger = require("../services/logger");

router.use(bodyParser.json());
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

////////////////////////////////////////////////////////  security.isAuth, =>

router.get("/get_allPokemon", (req, res) => {
  pokemonHelper
    .getAllPokemon()
    .then((result) => {
      result.forEach((element) => {
        const type = JSON.parse(element.type);
        const path = "http://" + element.path;
        element.path = path;
        element.type = type;
      });
      res.send(result);
    })
    .catch((err) => {
      logger.error({ err });
      res.send(err);
    });
});

module.exports = router;
