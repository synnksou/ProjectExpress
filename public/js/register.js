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
        const url = "api/user/add_user";
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
