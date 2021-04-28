var allTeams = Vue.component("allTeams", {
  template: `
  <div class="teams">
  <div class="container">
     <div class="teamPlayer" v-for="team in teams" :key="team">
        <div class="row mt-3 team-user">
           <div class="col-sm-2">
              {{team.user.firstName}} {{team.user.lastName}}
           </div>
           <div class="col">
              <div class="contenair-picked">
                <a v-if="team.teamPokemons.length < 1 "> Pas encore d'équipe !</a>
                 <ul class="picked" v-if="team.teamPokemons.length > 0" v-for="pokemon in team.teamPokemons" :key="pokemon">
                    <li class="picked">
                       <img class="img-pokemon picked" :src="pokemon.path"></img>
                       <div class="info">
                          <span class="name">{{pokemon.name}}</span>
                          <div v-for="type in pokemon.type.type" :key="type">
                             <span class="pkm-type" v-bind:class="[type]" >{{type}}</span>
                          </div>
                       </div>
                    </li>
                 </ul>
              </div>
           </div>
        </div>
     </div>
  </div>
</div>`,

  data() {
    return {
      teams: [],
    };
  },
  methods: {},
  mounted() {
    const url = "api/teams/get_allTeam";
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
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
