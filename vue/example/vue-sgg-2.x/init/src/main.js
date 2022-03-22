import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 创建应用实例对象-app(类似于之前Vuu2中的vm,但app比vm更‘轻’)
const app = createApp(App)
// 将应用实例app挂载在元素app上
app.use(router)
app.mount('#app')