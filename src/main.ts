import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import $ from "jquery";
import axios from "axios";
import VueAxios from "vue-axios";
require("@/assets/css/bootstrap.css");
require("@/assets/css/main.css");
require("@/assets/css/style.css");
require("@/assets/css/style_suggest_search_v2.css");
require("@/assets/css/header_footer.css");
require("@/assets/css/header_footer_reset.css");
require("@/assets/css/list-area-style.css");
require("@/assets/js/bootstrap.min.js");

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
