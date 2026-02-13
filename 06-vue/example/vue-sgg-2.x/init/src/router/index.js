import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const router = new VueRouter({
    history: 'hash',
    routes: [
        {
            path: '/',
            redirect: {
                name: 'home'
            }
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('@/views/home')
        },
        {
            path: '/event',
            name: 'event',
            component: () => import('@/views/event')
        },
        {
            path: '/computed',
            name: 'computed',
            component: () => import('@/views/computed')
        },
        {
            path: '/watch',
            name: 'watch',
            component: () => import('@/views/watch')
        },
        {
            path: '/bind-style',
            name: 'bindStyle',
            component: () => import('@/views/bindStyle')
        },
        {
            path: '/v-show-and-v-if',
            name: 'vShowAndvIf',
            component: () => import('@/views/vShowAndvIf')
        },
        {
            path: '/v-for',
            name: 'vFor',
            component: () => import('@/views/vFor')
        },
        {
            path: '/data-watch',
            name: 'dataWatch',
            component: () => import('@/views/dataWatch')
        },
        {
            path: '/form',
            name: 'form',
            component: () => import('@/views/form')
        },
        {
            path: '/custom-directives',
            name: 'customDirectives',
            component: () => import('@/views/customDirectives')
        },
        {
            path: '/life-cycle',
            name: 'lifeCycle',
            component: () => import('@/views/lifeCycle')
        },
        {
            path: '/ref',
            name: 'ref',
            component: () => import('@/views/ref')
        },
        {
            path: '/mixin',
            name: 'mixin',
            component: () => import('@/views/mixin')
        },
        {
            path: '/todo-list',
            name: 'TodoList',
            component: () => import('@/views/TodoList')
        },
        {
            path: '/animation',
            name: 'animation',
            component: () => import('@/views/animation')
        },
        {
            path: '/slot',
            name: 'slot',
            component: () => import('@/views/slot')
        },
        {
            path: '/vuex',
            name: 'vuex',
            component: () => import('@/views/vuex')
        },
        {
            path: '/vue-router',
            name: 'vueRouter',
            component: () => import('@/views/vueRouter'),
            children: [
                {
                    path: 'home',
                    name: 'vueRouterHome',
                    meta: {
                        title: '路由主页Home',
                        isFlag: true
                    },
                    component: () => import('@/views/vueRouter/childrens/Home')
                },
                {
                    path: 'about',
                    name: 'vueRouterAbout',
                    meta: {
                        title: '路由相关About',
                        isFlag: true
                    },
                    component: () => import('@/views/vueRouter/childrens/About')
                }
            ]
        }
    ]
})

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
    console.log('router beforeEach');
    next();
})

// 全局后置路由守卫
router.afterEach((to, from) => {
    console.log('router afterEach');
    document.title = to.name;
})

export default router;