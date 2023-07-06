import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import firebase from "@/helpers/firebase";
import firebaseConfig from "@/config/firebase";
import FontAwesome from "@/plugins/FontAwesome";

firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged((user) => {
  store.dispatch("unsubscribeAuthUserSnapshot");
  if (user) {
    store.dispatch("fetchAuthUser");
  }
});

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
app.mount("#app");
