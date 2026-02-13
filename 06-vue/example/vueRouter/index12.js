// Foo 组件
const Foo = {
    template: `
    <div>
        <h1> Foo </h1>
        <router-view></router-view>
    </div>
    `
}

// bar组件
const Bar = {
    template: `
    <div>
        <h2> Bar </h2>
    </div>
    `
}

// Login组件
const Login = {
    template: `
    <div>
        <h1> Login </h1>
    </div>
    `
}

const router = new VueRouter({
    routes: [
        {
            path: '/foo',
            component: Foo,
            children: [
                {
                    path: 'bar',
                    component: Bar,
                    meta: {
                        requiresAuth: true
                    }
                }
            ]
        },
        {
            path: '/login',
            component: Login
        }
    ]
})

// 个人信息
const auth = {
    loggedIn() {
        return false;
    }
}

// 路由全局导航前置守卫
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!auth.loggedIn()) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next() // 确保一定要调用 next()
    }
})

new Vue({
    el: "#app",
    router
})