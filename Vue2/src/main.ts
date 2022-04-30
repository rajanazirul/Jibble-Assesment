import Vue from "vue";
import App from "./App.vue";
import router from "./constant/routes";
import vuetify from "./plugins/vuetify";
import VueCompositionAPI from "@vue/composition-api";
import "./style/main.css";

Vue.use(VueCompositionAPI);

let app: Vue | null = null;

app = new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");


