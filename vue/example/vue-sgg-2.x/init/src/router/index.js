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
        }
    ]
})

export default router;