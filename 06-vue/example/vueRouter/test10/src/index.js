import Vue from 'vue'
import VueRouter from 'vue-router'
import "./index.less"
import MainMenu from './MainMenu'
import Home from './Home'
import Product from './Product'
import About from './About'

// 使用VueRouter
Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            components: {
                default: Home,
                mainmenu: MainMenu
            }
        },
        {
            path: '/product',
            components: {
                default: Product,
                mainmenu: MainMenu
            }
        },
        {
            path: '/about',
            components: {
                default: About,
                mainmenu: MainMenu
            }
        }
    ]
})


new Vue({
    el: "#app",
    router
})