// Home组件
const UserSettings = {
    template: `
    <div>
        <h1>User Settings</h1>
        <router-link to="/settings/emails"> emails </router-link>
        <router-link to="/settings/profile"> profile </router-link>
        <router-view></router-view>
        <router-view name="helper"></router-view>
    </div>
    `
}

const NavBar = {
    template: `
    <div>
        <h2>NavBar</h2>
    </div>
    `
}

const UserEmailsSubscriptions = {
    template: `
    <div>
        <h2>UserEmailsSubscriptions</h2>
    </div>
    `
}

const UserProfile = {
    template: `
    <div>
        <h2>UserProfile</h2>
    </div>
    `
}

const UserProfilePreview = {
    template: `
    <div>
        <h2>UserProfilePreview</h2>
    </div>
    `
}


// 生成路由
const router = new VueRouter({
    routes: [
        {
            path: '/settings',
            name: 'settings',
            component: UserSettings,
            children: [
                {
                    path: 'emails',
                    component: UserEmailsSubscriptions
                },
                {
                    path: 'profile',
                    components: {
                        default: UserProfile,
                        helper: UserProfilePreview
                    }
                }
            ]
        }
    ]
})

const app = new Vue({
    el: "#app",
    router: router
})