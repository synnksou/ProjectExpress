document.addEventListener("DOMContentLoaded", () => {
  new Vue ({
    el:"#app",
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
  })
});
