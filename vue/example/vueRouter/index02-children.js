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

export default {
    path: 'user/Detail',
    component: UserProfile,
    children: [
        {
            path: 'profile',
            component: UserProfile
        },
        {
            path: 'posts',
            component: UserPosts
        }
    ]
}