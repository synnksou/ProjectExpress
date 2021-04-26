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
      const url = "api/user/auth";
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
