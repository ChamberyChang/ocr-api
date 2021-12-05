import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import i18n from "./i18n";
import MuseUI from "muse-ui";
import "muse-ui/dist/muse-ui.css";

Vue.config.productionTip = false;
Vue.use(MuseUI);

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
