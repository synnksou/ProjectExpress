var Teams = Vue.component("Teams", {
  template: `<div class="team-builder">
    <div class="text"> Ici vous pouvez gerer votre gestion d'équipe, vous pouvez faire du team building pokemon</div>
    <button type="button" class="btn btn-primary">Ajouter une equipe</button>
    <div>
    <ul class="picked" v-for="pokemon in teams" :key="pokemon">
            <li class="picked">
                <figure class="unknown">
                    <img :src="pokemon.path" class="art">
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
    };
  },
  methods: {},
  mounted() {
    let url = "http://localhost:8000/api/teams/get_teams?";
    axios
      .get(url, {
          params : {
            id: this.$store.state.user.id,
          }
      })
      .then((response) => {
        this.teams = response.data;
        console.log(this.teams)
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {},
});
