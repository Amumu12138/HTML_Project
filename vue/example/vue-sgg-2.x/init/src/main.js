import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
// 关闭Vue的生产提示
Vue.config.productionTip = false;

// 创建app实例对象
new Vue({
    el: "#app",
    store,
    router,
    render: h => h(App)
})

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
    Vue.component(componentName,
        // 如果这个组件选项是通过 `export default` 导出的，
        // 那么就会优先使用 `.default`，
        // 否则回退到使用模块的根。
        componentConfig.default || componentConfig
    )
})
