  var Teams = Vue.component("Teams", {
  template: `<div class="team-builder">
    <div class="text"> Ici vous pouvez gerer votre gestion d'équipe, vous pouvez faire du team building pokemon, vous ne pouvez n'ajouter une seule equipe</div>
    <button type="button"  v-if="!teams.lenght" class="btn btn-primary">Ajouter une equipe  <router-link class="nav-link" to="/builder"></router-link></button>
    <div>
    <div class="container-lg">
      <div class="text" v-if="!teams.lenght">
      <a>{{messageEmptyTeam}}</a>
      </div>
      <div v-if="teams.lenght">
      <button :click="removeTeam">Supprimer votre equipe</button>
      </div>
    </div>
    <ul class="picked" v-for="pokemon in teams" :key="pokemon">
            <li class="picked">
                <figure class="unknown">
                <img class="img-pokemon picked" :src="pokemon.path"></img>
                </figure>
                <div class="info">
                    <span class="name">{{pokemon.name}}</span>
                    <div v-for="type in pokemon.type.type" :key="type">
                    <span class="pkm-type" v-bind:class="[type]" >{{type}}</span>
                    </div>
                </div>
        </li></ul>
    </div>
</div>`,

  data() {
    return {
      teams: [],
      messageEmptyTeam: " Vous n'avez pas d'équipe, let's go en crée une ! :)",
      messageSucces : null
    };
  },
  methods: {
    removeTeam() {
      const url = "http://localhost:8000/api/teams/delete_teams?" + this.$store.state.user.id;
      axios
        .delete(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          }
        })
        .then(() => {
          alert("Team was removed")
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    const url = "http://localhost:8000/api/teams/get_teams?";
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
        params: {
          id: this.$store.state.user.id,
        },
      })
      .then((response) => {
        this.teams = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {},
});
