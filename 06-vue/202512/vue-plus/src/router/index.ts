import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/views/Home.vue'

const routes = [
    {
        name: 'home',
        path: '/',
        meta: {
            title: '首页'
        },
        component: Home
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;