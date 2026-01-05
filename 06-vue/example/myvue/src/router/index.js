import Vue from 'vue'
import VueRouter from 'vue-router'

//导入组件
import Content from '../components/Content'
import Main from '../components/Main'
//显示声明使用VueRouter
Vue.use(VueRouter)
//默认到处路由
export default new VueRouter({
    routes:
    [
        {
            //路由路径
            path: '/content',
            //路由名称
            name: 'content',
            //路由组件
            component: Content
        },
        {
            path: "/main",
            name: 'main',
            component: Main
        }
    ]
})