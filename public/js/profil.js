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