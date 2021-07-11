// Layout 组件
const Layout = {
    template: `
    <div>
        <h1> Layout </h1>
        <router-link to="/home"> Home </router-link>
        <router-link to="/shopCat"> ShopCat </router-link>
        <router-link to="/categray/123"> Categray </router-link>
        <router-link to="/setting"> Setting </router-link>
        <router-view></router-view>
        <button @click="goShopCat">购物车</button>
        <button @click="goCategray">前往分类</button>
        <button @click="goSettingReplace">设置页</button>
        <button @click="go(-1)">go(-1)</button>
        <button @click="go(1)">go(1)</button>
    </div>
    `,
    methods: {
        goShopCat() {
            this.$router.push('shopCat')
        },
        goCategray() {
            this.$router.push({
                name: 'categray',
                params: { userId: 123 }
            })
        },
        goSettingReplace() {
            this.$router.replace('setting')
        },
        go(count) {
            this.$router.go(count)
        }
    }
}

// Home组件
const Home = {
    template: `
    <div>
    <h1> Home </h1>
    </div>
     `
}

// 购物车
const ShopCat = {
    template: `
    <div>
        ShopCat
        <router-view></router-view>
    </div>
    `
}

// 分类
const Categray = {
    template: `
    <div>
        Categray
         </br / >
         userId: {{$route.params.userId}}           
        <router-view></router-view>
    </div>
    `
}

//设置
const Setting = {
    template: `
    <div>
        Setting
    </div>
    `
}

const router = new VueRouter({
    routes: [
        {
            path: '',
            component: Layout,
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: Home
                },
                {
                    path: '/shopCat',
                    name: 'shopCat',
                    // redirect: '/shopCat/aaa',
                    component: ShopCat
                },
                {
                    path: '/categray/:userId',
                    name: 'categray',
                    component: Categray
                },
                {
                    path: '/setting',
                    name: 'setting',
                    component: Setting
                }
            ]
        }
    ]
})


const app = new Vue({
    el: "#app",
    router: router
})