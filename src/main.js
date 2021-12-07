import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import i18n from "./i18n";
import axios from "axios";
import VueAxios from "vue-axios";
import vuetify from "./plugins/vuetify";

Vue.use(VueAxios, axios);

new Vue({
  router,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
