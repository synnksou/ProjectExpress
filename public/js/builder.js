var Builder = Vue.component("Builder", {
  template: `
  <transition name="fade">
  <div class="team-builder">
  <a> Pokemons sélectionner </a>
  <transition name="fade">
  <div  v-if="error" class="alert alert-danger w-25">
  <div v-if="picked.lenght > 0">
  <button>Ajouter cette equipe</button>
  </div>
  <a>{{error}}<a>
  </div>
  </transition>
      <div class="contenaire-picked">
      <ul class="picked" v-for="pokemon in picked" :key="pokemon">
      <li class="picked">
          <img class="img-pokemon picked" :src="pokemon.path"></img>
          <div class="info">
              <span class="name">{{pokemon.name}}</span>
              <div v-for="type in pokemon.type.type" :key="type">
              <span class="pkm-type" v-bind:class="[type]" >{{type}}</span>
              </div>
          </div>
          <div class="col-xs-3">
          <button class="btn btn-danger" v-on:click="depick(pokemon)">Supprimer</button>
          </div>
  </li></ul></div>
      <div>
      <ul class="picked" v-for="pokemon in pokemons" :key="pokemon">
              <li class="picked">
              <div class="card" style="width: 18rem;">
              <img class="card-img-top mx-auto" :src="pokemon.path" alt="Card image cap"></img>
              <div class="card-body">
                
              <div class="info">
                      <span class="name">{{pokemon.name}}</span>
                      <div v-for="type in pokemon.type.type" :key="type">
                      <span class="pkm-type" v-bind:class="[type]" >{{type}}</span>
                      </div>
                  </div>
                  <div class="col-xs-3">
                  <button class="btn btn-success" v-on:click="pick(pokemon)">Selectionner</button>
                  </div>

              </div>
            </div>

          </li></ul>
      </div>
  </div>
  </transition>`,

  data() {
    return {
      pokemons: [],
      picked: [],
      error: null,
    };
  },
  methods: {
    pick(pokemon) {
      if (this.picked.length < 6 ) {
        this.error = null;
        this.picked.push(pokemon);
        this.pokemons = this.pokemons.filter(function (value) {
          return value != pokemon;
        });
      } else {
        this.error = "Votre equipe est complète";
      }
    },
    depick(pokemon) {
      if (this.error) {
        this.error = null;
      }
      this.pokemons.push(pokemon);
      this.picked = this.picked.filter(function (value) {
        return value != pokemon;
      });
    },
    postTeam() {
      if (this.picked.length > 0 ) {
        this.error = null
      }
    },
  },
  mounted() {
    let url = "http://localhost:8000/api/pokemon/get_allPokemon?";
    axios
      .get(url)
      .then((response) => {
        this.pokemons = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {},
});
