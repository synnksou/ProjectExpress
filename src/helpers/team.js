var database = require("../services/database");
var logger = require("./../services/logger");

module.exports = {
  getAllTeams,
  getTeamsByUserId,
  buildTeams
};

async function getAllTeams() {
  return new Promise((resolve, reject) => {
    const query = "Select * From teams";
    let connection = database.getDatabase();
    connection.connect((err) => {
      if (err) throw err;
      return connection.query(query, (err, results) => {
        if (results) {
          resolve(results);
        } else {
          reject("User not found, error : " + err);
        }
      });
    });
  });
}
async function getTeamsByUserId(params) {
  return new Promise((resolve, reject) => {
    if (params !== undefined) {
      const arrayParams = [params.id];
      const query = "Select * From teams WHERE userId=?";
      let connection = database.getDatabase();
      connection.connect((err) => {
        if (err) throw err;
        return connection.query(query, arrayParams, (err, results) => {
          if (results) {
            resolve(JSON.parse(JSON.stringify(results)));
          } else {
            reject("User not found, error : " + err);
          }
        });
      });
    } else {
      reject(
        "An error occured while trying to fetch user using undefined params"
      );
    }
  });
}

function buildTeams(pokemons) {
  return new Promise((resolve, reject) => {
    const word = ["pokemonsOne", "pokemonsTwo", "pokemonsThree", "pokemonsFour", "pokemonsFive", "pokemonsSix"];
    let finalTeam = [];
    if (pokemons !== undefined) {
      for (let index = 0; index < pokemons.length; index++) {
        const element = pokemons[index];
        console.log(element)
        const elementToPush = {
                name : element[0].name,
                type : JSON.parse(element[0].type),
                path : "http://"+element[0].path
            
        };
        finalTeam.push(elementToPush);
      }
      console.log(finalTeam)
      resolve(finalTeam)
    }else{
        reject("void")
    }
  });
}
