import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import "./router/routerBefore";
import { createPinia } from 'pinia';
import "@/assets/less/index.less";
import "tailwindcss";

import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { useAllDataStore } from '@/store';
import "@/mock/mock.js";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
const store = useAllDataStore();
store.addMenu(router, "refresh");

app.use(ElementPlus, {
    locale: zhCn,
});

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.use(router).mount('#app');


