import App from "./App.vue";
import router from "./router";
import piniaPersist from "pinia-plugin-persist";
import storeReset from "@/stores/plugins/storeReset";
import "@/assets/tailwind.css";
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
// import zhCn from "element-plus/es/locale/lang/zh-cn";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// import Vant from "vant";
// import "vant/lib/index.css";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// app.use(ElementPlus, {
//   locale: zhCn,
// });
// app.use(Vant);
app.use(router);
app.use(createPinia().use(piniaPersist).use(storeReset));
app.mount("#app");
