import { createRouter, createWebHashHistory } from 'vue-router'
import ROUTER from './router-constants'

const routes = [
    {
        path: '/',
        name: ROUTER.HOME,
        meta: {
            title: '首页'
        },
        component: () => import('@/views/Home.vue'),
        redirect: '/welcome',
        children: [
            {
                path: '/welcome',
                name: ROUTER.WELCOME,
                meta: {
                    title: '欢迎页'
                },
                component: () => import('@/views/Welcome.vue')
            },

        ],
    },
    {
        path: '/login',
        name: ROUTER.LOGIN,
        meta: {
            title: '登录页'
        },
        component: () => import('@/views/Login.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;