import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

// 创建应用实例对象-app(类似于之前Vuu2中的vm,但app比vm更‘轻’)
const app = createApp(App)
// 将应用实例app挂载在元素app上
const requireComponent = require.context('./components', false, /[A-Z]\w+\.(vue|js)$/)
requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)

    // 获取组件的 PascalCase 命名
    const componentName = upperFirst(camelCase(
        // 获取和目录深度无关的文件名
        fileName
            .split('/')
            .pop()
            .replace(/\.\w+$/, '')))

    // 全局注册组件
    app.component(componentName,
        // 如果这个组件选项是通过 `export default` 导出的，
        // 那么就会优先使用 `.default`，
        // 否则回退到使用模块的根。
        componentConfig.default || componentConfig
    )
})

app.use(store).use(router).mount('#app')