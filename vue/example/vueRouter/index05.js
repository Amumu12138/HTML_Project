// Home 组件
const Home = {
    template: `
    <div>
        <h1> Home </h1>
        <router-link :to="{name:'user', params: {userId: 888}}"> user </router-link>
        <router-view></router-view>

        <button @click="goUser">前往User</button>
        <button @click="goUserReplace">goUserReplace</button>
        <router-link :to="{name:'user', params: {userId: 777}}" replace> userReplace </router-link>
    </div>
    `,
    methods: {
        goUser() {
            this.$router.push(
                {
                    name: 'user',
                    params: {
                        userId: '666'
                    }
                }
            )
        },
        goUserReplace() {
            this.$router.replace('user/999')
        }
    }
}

const User = {
    template: `
    <div>
    <h2>User</h2>
    <p>userId: {{ $route.params.userId}}</p>
    </div>
    `
}

const router = new VueRouter({
    routes: [
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/user/:userId',
            name: 'user',
            component: User
        }
    ]
})

const app = new Vue({
    el: '#app',
    router: router
})