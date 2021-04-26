document.addEventListener("DOMContentLoaded", () => {
  // Composant Home
  var Home = Vue.component("Home", {
    template: `
      <div>
        <h1>Home</h1>
        <p>This is home page</p>
        <button  class="w-100 btn btn-lg btn-primary"
        v-on:click="getAllUser"
        type="button">getAllUser</button>
        </div>`,
    methods: {
      getAllUser() {
        const url = "http://localhost:8000/api/user/get_all";
        axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user-token")}`,
            },
          })
          .then((response) => {
            console.log(response);
          })
          .catch((err) => console.log(err));
      },
    },
  });
//Initialisations des routes
  var routes = [
    { path: "/", component: Home },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/profil", component: Profil, meta: { requireAuth: true } },
    { path: "/teams", component: Teams, meta: { requireAuth: true } },
    { path: "/builder", component: Builder, meta: { requireAuth: true } },
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
