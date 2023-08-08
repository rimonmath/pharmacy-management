import { createApp, watch } from "vue";
import { createPinia } from "pinia";
import router from "./router";

import App from "./App.vue";

// import "./assets/css/ayoflex.css";
import "ayoflex/dist/ayoflex.min.css";

import "./assets/css/example.css";

const app = createApp(App);
app.use(router);

const pinia = createPinia();
app.use(pinia);
// app.config.globalProperties.$eventBus = eventBus;

app.mount("#app");

watch(
  () => pinia.state.value.cart,
  (state) => {
    // persist the whole state to the local storage whenever it changes
    localStorage.setItem("products", JSON.stringify(state.products));
    // console.log(state);
  },
  { deep: true }
);

watch(
  () => pinia.state.value.theme,
  (state) => {
    // persist the whole state to the local storage whenever it changes
    localStorage.setItem("brandColor", state.brandColor);
    // console.log(state);
  },
  { deep: true }
);
