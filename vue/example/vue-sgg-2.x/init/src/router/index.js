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
        }
    ]
})

export default router;