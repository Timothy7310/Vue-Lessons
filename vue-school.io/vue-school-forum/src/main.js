import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import firebase from "@/helpers/firebase";
import firebaseConfig from "@/config/firebase";
import FontAwesome from "@/plugins/FontAwesome";
import ClickOutsideDirective from "@/plugins/ClickOutsideDirective";
import PageScrollDirective from "@/plugins/PageScrollDirective";
import VPagination from "@/plugins/Vue3Pagination";
import VeeValidatePlugin from "@/plugins/VeeValidatePlugin";

firebase.initializeApp(firebaseConfig);

const app = createApp(App);

const requireComponent = require.context(
  "./components",
  true,
  /App[A-Z]\w+\.(vue|js)$/
);
requireComponent.keys().forEach(function (fileName) {
  let baseComponentConfig = requireComponent(fileName);
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig;
  const baseComponentName =
    baseComponentConfig.name ||
    fileName.replace(/^.+\//, "").replace(/\.\w+$/, "");
  app.component(baseComponentName, baseComponentConfig);
});

app.use(router);
app.use(store);
app.use(FontAwesome);
app.use(ClickOutsideDirective);
app.use(PageScrollDirective);
app.use(VPagination);
app.use(VeeValidatePlugin);
app.mount("#app");
