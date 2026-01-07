import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import request from '@/utils/request'

import "@/assets/style/index.scss";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App);

app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 全局注册request请求方啊
app.config.globalProperties.$request = request;
// login().then(res => {
//     console.log(res, 'res');
// })

// 返回登录接口login数据
// axios.get(`${config.mockApi}/login`).then(res => {
//     console.log(res, 'res');
// })
/**
    {
        "BASE_URL": "/",
        "DEV": true,
        "MODE": "development",
        "PROD": false,
        "SSR": false
    }
 */
console.log(import.meta.env, 'env');
console.log(import.meta.env.VITE_NAME, 'VITE_NAME'); // version
