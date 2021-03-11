document.addEventListener("DOMContentLoaded", () => {
  const vueApp = {
    data() {
      return {
        message: "wsh",
      };
    },
    methods: {},
  };

  Vue.createApp(vueApp).mount("#app");
});

async function testPassword() {
  await fetch("/auth", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(this),
  });
}
