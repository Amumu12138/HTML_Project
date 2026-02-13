// 组件Home
const Home = {
    template: `
    <div>
        <h1> Home </h1>
        <router-link to="/a"> 前往a </router-link>
        <router-link to="/b"> 前往b </router-link>
        <router-view></router-view>

        <input type="button" @click="jumpToC" value="前往C">
        <input type="button" @click="jumpToAlias" value="前往321">
    </div>
    `,
    methods: {
        jumpToC() {
            this.$router.push('/c')
        },
        jumpToAlias() {
            this.$router.push('/321')
        }
    }
}

// 组件A
const compB = {
    template: `
        <div>
        </h2>compB</h2>
        </div>
    `
}


// 创建路由
const router = new VueRouter({
    routes: [
        {
            path: '/home',
            component: Home
        },
        {
            path: '/b',
            component: compB,
            // 别名
            alias: '/321'
        },
        {
            path: '/a',
            redirect: '/b'
        },
        {
            path: '/c',
            redirect: function () { return '/b' }
        }
    ]
})

const app = new Vue({
    el: "#app",
    router: router
})