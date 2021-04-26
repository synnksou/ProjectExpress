var database = require("../services/database");

module.exports = {
  getAllPokemon,
  getPokemonById,
  getManyPokemonById,
};

async function getAllPokemon() {
  return new Promise((resolve, reject) => {
    const query = "Select * From pokemon";
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
async function getPokemonById(params) {
  return new Promise((resolve, reject) => {
    if (params !== undefined) {
      const arrayParams = [params.pokemonId];
      const query = "Select * From pokemon WHERE id=?";
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

async function getManyPokemonById(params) {
  return new Promise(async (resolve, reject) => {
    if (params !== undefined) {
      var pokemons = [];
      for (let index = 0; index < params.length; index++) {
        const element = params[index];
        pokemons.push(await getPokemonById(element));
      }
      resolve(pokemons);
    } else {
      reject(
        "An error occured while trying to fetch user using undefined params"
      );
    }
  });
}
