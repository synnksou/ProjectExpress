document.addEventListener("DOMContentLoaded", () => {
  var Login = Vue.component("Login", {
    template: `
    <div class="container">
    <main class="form-signin" id="app">
    <link type="text/css" href="css/signin.css" rel="stylesheet"/>
      <form>
        <h1 class="h3 mb-3 fw-normal">{{ titleConnection }}</h1>
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
          v-on:click="loginMethod"
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
        login: "Se Connectez",
        inputEmail: "",
        inputPassword: "",
        response : null
      };
    },
    methods: {
      loginMethod() {
        const url = 'http://localhost:8000/api/user/login'
        axios
      .post(url,{
        body : {
          email : this.inputEmail,
          password : this.inputPassword,
          id : 1
        }
      })
      .then(response => (this.response = response))
      },
    },
  });

  /*
  var Login = {
    template : "<div><h1>Login</h1><p>This is Login page</p></div>"
  }
  */
  var Home = {
    template: `
    <div>
      <h1>Home</h1>
      <p>This is home page</p>
    </div>`,
  };
  var routes = [
    { path: "/", component: Home },
    { path: "/login", component: Login },
  ];

  var router = new VueRouter({
    routes: routes,
    mode: "history",
    base: "/",
  });

  new Vue({
    el: "#app",
    router: router,
  });
});
