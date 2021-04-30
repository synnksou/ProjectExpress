const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const teamsHelper = require("./../helpers/team");
const pokemonHelper = require("./../helpers/pokemons");
const userHelper = require("./../helpers/user");
const logger = require("../services/logger");

const security = require("./../services/security");
const crossOrigin = require("./../services/cross-origin");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(crossOrigin);

router.get("/get_teams?", security.isAuth, (req, res) => {
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

router.delete("/delete_teams?", security.isAuth, (req, res) => {
  const params = {
    userId: req.query.userId,
  };
  teamsHelper
    .getTeamsByUserId(params)
    .then((data) => {
      console.log(data);
      teamsHelper.deleteTeamById(params).then(() => {
        logger.info({ message: "Team was removed", userId: params.id });
        res.send({ message: "Team was removed" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

router.post("/post_teams", (req, res) => {
  const { userId, pokemons } = req.body;
  const teamId = security.generateUid();
  let team = [];
  pokemons.forEach((pokemon) => {
    team.push({
      id: security.generateUid(),
      teamId: teamId,
      userId: userId,
      pokemonId: pokemon.id,
    });
  });

  teamsHelper
    .insertPokemonTeam(team)
    .then(() => {
      res.send("created");
    })
    .catch((err) => console.log(err));
});

router.get("/get_allTeam", security.isAuth, (req, res) => {
  userHelper
    .getAllUser()
    .then((users) => {
      teamsHelper
        .getAllTeamsWithPokemon(users)
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          res.send(err);
        });
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
