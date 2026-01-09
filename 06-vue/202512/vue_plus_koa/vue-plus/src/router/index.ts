import { createRouter, createWebHashHistory } from 'vue-router'
import ROUTER from './router-constants'
import storage from '@/utils/storage'
import { permissionList } from '@/api';
import utils from '@/utils/utils';

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
    },
    {
        name: '404页面',
        path: '/404',
        meta: {
            title: '404'
        },
        component: () => import('@/views/404.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

async function loadAsyncRoutes() {
    let userInfo = storage.getItem('userInfo') || {}
    if (userInfo.token) {
        try {
            const { menuList } = await permissionList()

            let routes = utils.generateRoute(menuList)
            const modules = import.meta.glob('../views/**/*.vue')
            routes.map(route => {
                let url = `../views/${route.component}.vue`

                route.component = modules[url]
                router.addRoute('home', route)
            })
        } catch (error) {

        }
    }

}
await loadAsyncRoutes()


function checkPermission(path) {
    let hasPermission = router.getRoutes().filter(route => route.path == path).length
    if (hasPermission) {
        return true
    } else {
        return false
    }
}

router.beforeEach((to, _, next) => {
    if (checkPermission(to.path)) {
        document.title = to.meta.title as string;
        next()
    } else {
        next('/404')
    }
})
export default router;