const MainMenu = {
    template: `
    <div>
        <router-link to="/mainmenu/product">product</router-link>
        <router-link to="/mainmenu/home">home</router-link>
        <router-link to="/mainmenu/about">about</router-link>
        <router-view></router-view>
    </div>
    `
}

const Home = {
    template: `
    <div>
        <h1> Home </h1>
    </div>
    `
}

const Product = {
    template: `
    <div>
        <h1> Product </h1>
    </div>
    `
}

const About = {
    template: `
    <div>
        <h1> About </h1>
    </div>
    `
}

const NotFoundComponent = {
    template: `
    <div>
        <h1> Sorry, Not Found </h1>
    </div>
    `
}

// 创建路由
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/mainmenu',
            component: MainMenu,
            children: [
                {
                    path: 'home',
                    component: Home
                },
                {
                    path: 'product',
                    component: Product
                },
                {
                    path: 'about',
                    component: About
                }
            ]
        },
        {
            path: '*',
            component: NotFoundComponent
        }
    ]
})

const app = new Vue({
    el: "#app",
    router: router
})