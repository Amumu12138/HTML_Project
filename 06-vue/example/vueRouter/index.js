// User 组件
const User = {
    // 计算
    computed: {
        getUserName() {
            console.log('Amumu getUserName route = ', this.$route)
            return this.$route.params.username
        },
        getUid() {
            return this.$route.params.uid
        }
    },
    // 监听
    watch: {
        '$route'(to, from) {
            console.log('Amumu watch $route to = ', to + ' from = ', from)
        }
    },
    // 路由跳转之前的钩子函数
    beforeRouteUpdate(to, from, next) {
        console.log('Amumu beforeRouteUpdate to = ', to, ' from = ', from, ' next = ', next)
        next()
    },
    template: `
    <div>
    <div>User username :{{ getUserName }} </div>
    <div> uid: {{getUid}}</div>
     </div>
    `
}

// 生成路由
const router = new VueRouter({
    history: 'history',
    routes: [
        { path: '/user/:username/:uid', component: User }
    ]
})

// 生成vue对象
var app = new Vue({
    el: "#app",
    router: router
})