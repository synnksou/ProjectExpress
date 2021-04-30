var Builder = Vue.component("Builder", {
  template: `
   <div class="team-builder">
      <a>Pokemon(s) sélectionner : </a>
      <button v-if="this.picked.length === 6" class="btn btn-success" v-on:click="postTeam">Add Team</button>
      <transition name="fade">
         <div v-if="error" class="alert alert-danger w-25">
            <a>{{error}}<a>
         </div>
      </transition>
      <div class="contenair-picked">
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
            </li>
         </ul>
      </div>
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
            </li>
         </ul>
      </div>
   </div>
`,

  data() {
    return {
      pokemons: [],
      picked: [],
      error: null,
      pickedIsEmpty: true,
    };
  },
  methods: {
    pick(pokemon) {
      if (this.picked.length < 6) {
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
      const url = "api/teams/post_teams";
      if (this.picked.length > 0) {
        this.error = null;
      }
      axios
        .post(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
          userId: this.$store.state.user.id,
          pokemons: this.picked,
        })
        .then(() => {
          swal({
            title: "Bien joué !",
            text: "votre équipe a été ajouter  ! ",
            icon: "success",
          }).then(() => {
            this.$router.push({ path: "/teams" });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    let url = "api/pokemon/get_allPokemon?";
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
