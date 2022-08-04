import App from "./App.vue";
import router from "./router";
import piniaPersist from "pinia-plugin-persist";
import storeReset from "@/stores/plugins/storeReset";
import "@/assets/tailwind.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router);
app.use(createPinia().use(piniaPersist).use(storeReset));
app.mount("#app");
