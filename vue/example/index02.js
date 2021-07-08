import userChildren from "./index02-children";
// User 组件
const User = {
    template: `
    <div>
        <h1> User </h1>
        <router-link to="/user/userDetail"> 1001 </router-link>
        <router-link to="/user/1002"> 1002 </router-link>
        <router-link to="/user/profile-01"> profile-01 </router-link>
        <router-view></router-view>
     </div>
    `
}

const UserDetail = {
    template: `
    <div>
        <h2> UserDetail {{$route.params.id}}</h2>
        <div>
        <router-link to="profile"> profile </router-link>
        <router-link to="posts"> posts </router-link>
        <router-view></router-view>
        </div>
    </div>
    `
}

const UserProfile = {
    template: `
    <div>
        <h3> UserProfile </h3>
        <router-view></router-view>
    </div>
    `
}

const UserPosts = {
    template: `
    <div>
        <h3> UserPosts </h3>
        <router-view></router-view>
    </div>
    `
}

// 生成路由
const router = new VueRouter({
    history: 'history',
    routes: [
        {
            path: '/user',
            component: User,
            children: [
                userChildren,
                {
                    path: 'profile-01',
                    component: UserProfile
                }
            ]
        }
    ]
})

// 生成vue对象
var app = new Vue({
    el: "#app",
    router: router
})