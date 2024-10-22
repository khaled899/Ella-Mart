import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "vue3-toastify/dist/index.css";
// Pinia
import { createPinia } from "pinia";
// Swiper Config
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// Sweet Alert
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// emitter config
import mitt from "mitt";
const Emitter = mitt();
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(vuetify)
  .use(createPinia())
  .use(VueSweetalert2)
  .provide("Emitter", Emitter)
  .use(router)
  .mount("#app");
