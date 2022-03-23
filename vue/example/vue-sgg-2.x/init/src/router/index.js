import { createRouter, createWebHistory } from "vue-router";

const routerHistory = createWebHistory();
const router = createRouter({
    history: routerHistory,
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
        }
    ]
})

export default router;