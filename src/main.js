import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import i18n from "./i18n";
import axios from "axios";
import vuetify from "./plugins/vuetify";

Vue.prototype.axios = axios;

new Vue({
  router,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
