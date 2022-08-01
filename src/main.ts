import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
import router from "./router";

app.use(router);

import { createPinia } from "pinia";

app.use(createPinia());

import "@/assets/tailwind.css";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus, {
  locale: zhCn,
});

import Vant from "vant";
import "vant/lib/index.css";

app.use(Vant);

app.mount("#app");
