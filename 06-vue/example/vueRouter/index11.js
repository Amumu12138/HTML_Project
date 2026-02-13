// Home 组件
const Home = {
    template: `
    <div>
        <h1> Home </h1>
        <router-link to="/product"> product </router-link>
    </div>
    `
}

// Product组件
const Product = {
    template: `
    <div>
        <h1> Product </h1>
        <router-link to="/about"> about </router-link>
        <button @click="goToHome"> 前往Home </button>
    </div>
    `,
    beforeRouteEnter(to, from, next) {
        console.log('Amumu Product beforeRouteEnter --> ', to, from)
        next()
    },
    beforeRouteUpdate(to, from, next) {
        console.log('Amumu Product beforeRouteUpdate --> ', to, from)
    },
    beforeRouteLeave(to, from, next) {
        console.log('Amumu Product beforeRouteLeave --> ', to, from)
        if (to.path === "/about") {
            next('/about/321')
        } else {
            next()
        }

    },
    methods: {
        goToHome() {
            this.$router.push('/')
        }
    }
}

// About组件
const About = {
    template: `
    <div>
        <h1> About </h1>
        id: {{this.$route.params.id}}
    </div>
    `
}

// Lgin组件
const Login = {
    template: `
    <div>
        <h1> Login </h1>
        <router-link to="/"> home </router-link>
    </div>
    `
}


const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/product',
            component: Product,
            // 路由独享的守卫
            beforeEnter: (to, from, next) => {
                console.log('Amumu beforeEnter product --> ', to, from)
                next()
            }
        },
        {
            path: '/about/:id',
            component: About
        },
        ,
        {
            path: '/login',
            component: Login
        }
    ]
})

// 注册一个全局前置守卫
router.beforeEach((to, from, next) => {
    console.log('Amumu beforeEach --> ', to, from, next)
    // if (to.path === '/product') {
    //     next('/login')
    // } else {
    //     next()
    // }
    next()
})

// 全局后置钩子
router.afterEach((to, from) => {
    console.log('Amumu afterEach to --> ', to, from)
})

new Vue({
    el: "#app",
    router
})