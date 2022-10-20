import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";

// import "./assets/css/ayoflex.css";
import "ayoflex/dist/ayoflex.min.css";
import "./assets/css/example.css";

const app = createApp(App);
app.use(router);
// app.config.globalProperties.$eventBus = eventBus;

app.mount("#app");
