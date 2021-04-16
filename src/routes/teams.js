const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const teamsHelper = require("./../helpers/team");
const pokemonHelper = require("./../helpers/pokemons");

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

router.get("/get_team?", (req, res) => {
  let params = {
    id: req.query.id,
  };
  var pokemons = [];
  teamsHelper
    .getTeamsByUserId(params)
    .then((result) => {
      result.forEach((element) => {
        pokemonHelper
          .getPokemonById(element)
          .then((pokemon) => {
            console.log(res);
            pokemons.push(pokemon);
          })
          .catch((err) => {
            console.log(err);
          });

        res.send(pokemons);
      });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

router.get("/get_teams?", (req, res) => {
  let params = {
    id: req.query.id,
  };
  teamsHelper
    .getTeamsByUserId(params)
    .then((result) => {
      pokemonHelper
        .getManyPokemonById(result)
        .then((pokemons) => {
          teamsHelper.buildTeams(pokemons).then((team) => {
            res.send(team);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
