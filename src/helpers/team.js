var database = require("../services/database");
const { getManyPokemonById } = require("./pokemons");

module.exports = {
  getAllTeams,
  getTeamsByUserId,
  deleteTeamById,
  insertPokemonTeam,
  buildTeams,
  getAllTeamsWithPokemon,
};

async function getAllTeams() {
  return new Promise((resolve, reject) => {
    const query = "Select * From teams";
    let connection = database;
    return connection.query(query, (err, results) => {
      if (results) {
        resolve(results);
      } else {
        reject("User not found, error : " + err);
      }
    });
  });
}

async function getTeamsByUserId(params) {
  return new Promise((resolve, reject) => {
    if (params !== undefined) {
      const arrayParams = [params.id];
      const query = "Select * From teams WHERE userId=?";
      let connection = database;
      return connection.query(query, arrayParams, (err, results) => {
        if (results) {
          resolve(JSON.parse(JSON.stringify(results)));
        } else {
          reject("User not found, error : " + err);
        }
      });
    } else {
      reject(
        "An error occured while trying to fetch user using undefined params"
      );
    }
  });
}

async function insertPokemonTeam(params) {
  return new Promise((resolve, reject) => {
    if (params !== undefined) {
      let arrayParams = [];
      params.forEach((element) => {
        console.log(element);
        arrayParams.push([
          element.id,
          element.teamId,
          element.userId,
          element.pokemonId,
        ]);
      });
      const query = "INSERT INTO teams (id,teamId,userId,pokemonId) VALUES ?";
      let connection = database;
      return connection.query(query, [arrayParams], (err, results) => {
        if (results) {
          resolve({ message: "Team was inserted" });
        } else {
          reject({ message: "Team was not inserted", err: err });
        }
      });
    } else {
      reject(
        "An error occured while trying to fetch user using undefined params"
      );
    }
  });
}
async function deleteTeamById(params) {
  return new Promise((resolve, reject) => {
    if (params !== undefined) {
      const arrayParams = [params.userId];
      const query = "DELETE FROM teams WHERE userId=?";
      let connection = database;
      return connection.query(query, arrayParams, (err, results) => {
        if (results) {
          resolve(JSON.parse(JSON.stringify(results)));
        } else {
          reject("Team not deleted : " + err);
        }
      });
    } else {
      reject(
        "An error occured while trying to fetch user using undefined params"
      );
    }
  });
}

async function buildTeams(pokemons) {
  return new Promise((resolve, reject) => {
    let finalTeam = [];
    if (pokemons !== undefined) {
      for (let index = 0; index < pokemons.length; index++) {
        const element = pokemons[index];
        const elementToPush = {
          name: element[0].name,
          type: JSON.parse(element[0].type),
          path: "http://" + element[0].path,
        };
        finalTeam.push(elementToPush);
      }
      resolve(finalTeam);
    } else {
      reject("void");
    }
  });
}

async function getAllTeamsWithPokemon(users) {
  let array = [];
  return new Promise(async (resolve, reject) => {
    for (let index = 0; index < users.length; index++) {
      const user = users[index];
      await getTeamsByUserId(user).then(async (team) => {
        await getManyPokemonById(team).then((pokemons) => {
          buildTeams(pokemons).then((teamPokemons) => {
            array.push({
              user: user,
              teamPokemons: teamPokemons,
            });
          });
        });
      });
    }
    if (array.length > 0) {
      resolve(array);
    } else {
      reject("err");
    }
  });
}
