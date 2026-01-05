import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);

app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')

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
