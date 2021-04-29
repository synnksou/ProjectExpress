var Login = Vue.component("Login", {
  template: `
    <div class="signup-form">
    <link
      href="./../css/register.css"
      rel="stylesheet"
    />
    <form>
		<h2>{{titleConnection}}</h2>
        <div class="form-group">
			<div class="row">
      <label for="inputEmail" class="visually-hidden">{{ email }}</label>
				<div class="col"><input  v-model="inputEmail" type="text" class="form-control" placeholder="Email" required="required"></div>
			</div>        	
        </div>
		<div class="form-group">
    <label for="inputPassword" class="visually-hidden">
    {{ password }}
  </label>
  <input
    type="password"
    v-model="inputPassword"
    id="inputPassword"
    class="form-control"
    placeholder="Mot de passe"
    required/>
    </div>
    <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> {{ rememberMe }}
        </label>
      </div>
		<div class="form-group">
      <button v-on:click="Auth" type="button" class="btn btn-success btn-lg btn-block">{{login}}</button>
    </div>
    </form>
</div> `,
  data() {
    return {
      titleConnection: "Se Connecter",
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
    Auth() {
      let user = {
        email: this.inputEmail,
        password: this.inputPassword,
      };
      this.$store
        .dispatch("login", user)
        .then(() => {
          swal({
            title: "Bien joué !",
            text: "vous etes connecter ! ",
            icon: "success",
          }).then(() => {
            this.$router.push("/");
            this.$router.go(0);
          });
        })
        .catch((err) => {
          swal({
            title: "Arrgg erreur",
            text: "On dirait qu'une erreur s'est produite :  " + err,
            icon: "error",
          });
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
