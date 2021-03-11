document.addEventListener("DOMContentLoaded", () => {
  const vueApp = {
    data() {
      return {
        titleConnection: "Connectez vous",
        email: "Adresse Email",
        password: "Mot de passe",
        rememberMe: "Se souvenir de moi",
        login: "Se Connectez",
        inputEmail: "",
        inputPassword: "",
      };
    },
    methods: {
      async login() {
        const email = this.inputEmail;
        const password = this.inputPassword;
        await fetch("/auth:" + email + ":" + password, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
      },
    },
  };

  Vue.createApp(vueApp).mount("#loginApp");
});
