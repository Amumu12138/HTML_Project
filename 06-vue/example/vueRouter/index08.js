// Home 组件
const Home = {
    template: `
    <div>
        <h1> Home </h1>
        <router-link to="/user/321"> user </router-link>
        <router-link to="/user1/456"> user1 </router-link>
        <router-link to="/user2"> user2 </router-link>
        <router-link to="/user3?id=200&q=404"> user3 </router-link>
        <router-link to="/user4"> user4 </router-link>
        <router-view></router-view>
     
    </div>
    `
}

const User = {
    template: `
    <div>
        User id: {{$route.params.id}}
    </div>
    `
}

const User1 = {
    props: ["id", "query"],
    template: `
    <div>
        User1 id: {{ id }}
        <br />
        query: {{query}}
    </div>
    `
}

const SideBar = {
    template: `
    <div>
        Hello,this is sidebar
        </br>
        titel: {{ title }}
    </div>
    `,
    props: ["title"]
}

// 创建路由
const router = new VueRouter({
    routes: [
        {
            path: '/home',
            component: Home
        },
        {
            path: '/user/:id',
            component: User
        },
        // 布尔模式
        {
            path: '/user1/:id',
            component: User1,
            props: true
        },
        // 对象模式
        {
            path: '/user2',
            component: User1,
            props: { id: 321 }
        },
        // 函数模式
        {
            path: '/user3',
            component: User1,
            props: (route) => ({
                id: route.query.id
                , query: route.query.q
            })
        },
        {
            path: '/user4',
            components: {
                default: User1,
                sidebar: SideBar
            },
            props: {
                default: { id: 666 },
                sidebar: { title: "sidebar" }
            }
        }
    ]
})

const app = new Vue({
    el: "#app",
    router: router
})