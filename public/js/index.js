document.addEventListener("DOMContentLoaded", () => {
  var Login = Vue.component("Login", {
    template: `
    <div class="container">
    <main class="form-signin" id="app">
    <link type="text/css" href="css/signin.css" rel="stylesheet"/>
      <form>
        <h1 class="h3 mb-3 fw-normal">{{ titleConnection }}</h1>
        <p>{{ error }}</p>
        <label for="inputEmail" class="visually-hidden">

          {{ email }}
        </label>
        <input
          type="email"
          v-model="inputEmail"
          id="inputEmail"
          class="form-control"
          placeholder="Adresse Email"
          required
          autofocus
        />
        <label for="inputPassword" class="visually-hidden">

          {{ password }}
        </label>
        <input
          type="password"
          v-model="inputPassword"
          id="inputPassword"
          class="form-control"
          placeholder="Mot de passe"
          required
        />
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> {{ rememberMe }}
          </label>
        </div>
        <button
          class="w-100 btn btn-lg btn-primary"
          v-on:click="loginM"
          type="button"
        >
          {{ login }}
        </button>
      </form>
      <div>{{ response }}</div>
    </main>
    </div>`,
    data() {
      return {
        titleConnection: "Connectez vous",
        email: "Adresse Email",
        password: "Mot de passe",
        rememberMe: "Se souvenir de moi",
        login: "Se Connecter",
        inputEmail: "",
        inputPassword: "",
        response: null,
        error: null,
      };
    },
    methods: {
      loginM() {
        let user = {
          email: this.inputEmail,
          password: this.inputPassword,
        };
        this.$store
          .dispatch("login", user)
          .then(() => {
            this.$router.push("/");
            this.$router.go(0)
          })
          .catch((err) => {
            console.log(err);
            this.error = err;
          });
      },
      async loginMethod() {
        const url = "http://localhost:8000/api/user/auth";
        axios
          .post(url, {
            email: this.inputEmail,
            password: this.inputPassword,
          })
          .then((response) => {
            console.log(response.data);
            if (
              response.data != "Invalid credits" &&
              response != {} &&
              response.data !== false
            ) {
              localStorage.setItem("user-token", response.data);
              this.error = "";
              router.push("/");
            } else {
              this.error = "Erreur de connexion";
              localStorage.removeItem("user-token");
            }
          })
          .catch((err) => {
            localStorage.removeItem("user-token");
          });
      },
    },
  });

  var Register = Vue.component("Register", {
    template: `
    <div class="signup-form">
    <link
      href="./../css/register.css"
      rel="stylesheet"
    />
    <form>
		<h2>S'inscrire</h2>
		<p class="hint-text">Créez votre compte. C'est gratuit et cela ne prend qu'une minute..</p>
        <div class="form-group">
			<div class="row">
				<div class="col"><input  v-model="inputFirstName" type="text" class="form-control" name="first_name" placeholder="Prénom" required="required"></div>
				<div class="col"><input  v-model="inputLastName" type="text" class="form-control" name="last_name" placeholder="Nom" required="required"></div>
			</div>        	
        </div>
        <div class="form-group">
        	<input v-model="inputEmail" type="email" class="form-control" name="email" placeholder="Email" required="required">
        </div>
		<div class="form-group">
            <input  v-model="inputPassword" type="password" class="form-control" name="password" placeholder="Mot de passe" required="required">
        </div>   
        <div class="form-group">
			<label class="form-check-label"><input type="checkbox" required="required"> J'accepte <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
		</div>
		<div class="form-group">
            <button v-on:click="register" type="submit" class="btn btn-success btn-lg btn-block">Register Now</button>
        </div>
    </form>
	<div class="text-center">Vous avez deja un compte? <a href="#">SConnectez vous</a></div>
</div>  `,
    data() {
      return {
        titleConnection: "Connectez vous",
        email: "Adresse Email",
        password: "Mot de passe",
        firstName: "Prenom",
        lastName: "Nom",
        rememberMe: "Se souvenir de moi",
        login: "Se Connectez",
        inputEmail: "",
        inputPassword: "",
        inputLastName: "",
        inputFirstName: "",
        response: null,
        error: null,
      };
    },
    methods: {
      register() {
        const url = "http://localhost:8000/api/user/add_user";
        axios
          .post(url, {
            firstName: this.inputFirstName,
            lastName: this.inputLastName,
            email: this.inputEmail,
            password: this.inputPassword,
          })
          .then((response) => {
            router.push("/login");
          })
          .catch((err) => console.log(err));
      },
    },
  });

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

  var Profil = Vue.component("Profil", {
    template: `<div class="signup-form">
    <link
      href="./../css/register.css"
      rel="stylesheet"
    />
    <form>
		<h3>Bonjour {{userFirstName}} {{userLastName}}</h3>
		<p class="hint-text"></p>
        <div class="form-group">
			<div class="row">
				<div class="col"><p class="form-control" name="first_name">Prénom : {{userFirstName}}</p></div>
				<div class="col"><p class="form-control" name="last_name">Nom : {{userLastName}}</p></div>
			</div>        	
        </div>
        <div class="form-group">
        	<p class="form-control" name="email">Email : {{userEmail}}</p>
        </div>   
        </form>
        <button class="btn btn-danger"  v-on:click="logout">Logout</button> 
</div>`,

    data() {
      return {
        firstName: this.$store.state.user.firstName,
        lastName: this.$store.state.user.lastName,
        email: this.$store.state.user.email,
      };
    },
    methods: {
      logout() {
        this.$store
          .dispatch("logout")
          .then(() => this.$router.push("/"))
          .catch((err) => {
            console.log(err);
            this.error = err;
          });
      },
    },
    computed: {
      userFirstName() {
        return this.$store.state.user.firstName;
      },
      userLastName() {
        return this.$store.state.user.lastName;
      },
      userEmail() {
        return this.$store.state.user.email;
      },
    },
  });

  var routes = [
    { path: "/", component: Home },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/profil", component: Profil },
  ];

  var router = new VueRouter({
    routes: routes,
    mode: "history",
    base: "/",
  });

  var store = new Vuex.Store({
    state: {
      status: "",
      token: localStorage.getItem("user-token") || "",
      user: JSON.parse(localStorage.getItem("user")) || {},
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
            url: "http://localhost:8000/api/user/auth",
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
    },
  });
});
