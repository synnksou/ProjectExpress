document.addEventListener("DOMContentLoaded", () => {
  // Composant Home
  var Home = Vue.component("Home", {
    template: `
      <div>
        <h1>Bienvenu sur PokemonBuilder !</h1>
          <img src="https://stock.wikimini.org/w/images/2/2c/Pokémon.gif"></img>
          <h2> PokemonBuilder c'est quoi ?   </h2>
          <p>Pokemon Builder permet de crée une equipe de pokemon par rapport au pokmeon dans la base de donnée.</p>
          <p>Vous devez vous crée un compte, vous connectez et ensuite la création d'equipe est possible.</p>
          <p>Vous pouvez aussi voir tout les equipes crée par les autres utilisateurs!</p>
          
        </div>`,
  });
//Initialisations des routes
  var routes = [
    { path: "/", component: Home },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/profil", component: Profil, meta: { requireAuth: true } },
    { path: "/teams", component: Teams, meta: { requireAuth: true } },
    { path: "/builder", component: Builder, meta: { requireAuth: true } },
    { path: "/allTeams", component: allTeams, meta: { requireAuth: true } },
    { path: "*", component: PageNotFound },
  ];
//Création du ROuter
  var router = new VueRouter({
    routes: routes,
    mode: "history",
    base: "/",
  });
//Création du Store
  var store = new Vuex.Store({
    state: {
      status: "",
      token: localStorage.getItem("user-token") || "",
      user:
        localStorage.getItem("user") === null
          ? {}
          : JSON.parse(localStorage.getItem("user")),
    },
    mutations: {
      auth_request(state) {
        state.status = "loading";
      },
      auth_success(state, token, user) {
        state.status = "success";
        state.token = token;
        state.user = user;
        console.log(state.user, state.token);
      },
      auth_error(state) {
        state.status = "error";
      },
      logout(state) {
        state.status = "";
        state.token = "";
        state.user = "";
      },
    },
    actions: {
      async login({ commit }, user) {
        return new Promise((resolve, reject) => {
          commit("auth_request");
          axios({
            url: "api/user/auth",
            data: user,
            method: "POST",
          })
            .then((resp) => {
              const token = resp.data.token;
              const user = resp.data.user;
              if (token != false && token !== undefined) {
                localStorage.setItem("user-token", token);
                localStorage.setItem("user", JSON.stringify(user));
                axios.defaults.headers.common["Authorization"] = token;
                console.log("user " + JSON.stringify(user));
                commit("auth_success", token, JSON.stringify(user));
                resolve(resp);
              } else {
                reject("Password doesn't match");
              }
            })
            .catch((err) => {
              commit("auth_error");
              localStorage.removeItem("user-token");
              reject(err);
            });
        });
      },
      async logout({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
          commit("logout");
          localStorage.removeItem("user-token");
          localStorage.removeItem("user");
          delete axios.defaults.headers.common["Authorization"];
          resolve();
        });
      },
    },
    getters: {
      isAuthenticated: (state) => !!state.token,
      authStatus: (state) => state.status,
      getUser: (state) => state.user,
    },
  });
//Redirection si la route need d'etre auth
  router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requireAuth)) {
      if (!store.state.token) {
        next({
          path: "Login",
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });
//Création de la vue
  new Vue({
    el: "#app",
    router: router,
    store: store,
    computed: {
      loggedIn() {
        return this.$store.state.token;
      },
      mounted() {
        if (this.loggedIn) {
          this.$router.push("/profil");
        }
      },
      components: {
        //    Modal,
      },
    },
  });
});
