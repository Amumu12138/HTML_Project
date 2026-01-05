
import Vue from 'vue'
import VueRouter from 'vue-router'

//导入视图
import Main from "../views/Main"
import Login from "../views/Login"
import HelloWorld from "../components/HelloWorld"
import NotFound from "../views/NotFound"

import UserProfile from "../views/user/Profile"
import UserList from "../views/user/List"


//声明使用VueRouter配置
Vue.use(VueRouter)
//默认导出路由
export default new VueRouter({
    //history模式：路径不带#符号
    mode: "history", 
    routes: [
        {
            path:'/main/:age',
            name: 'main',
            component: Main,
            props: true,
            children: [
                {
                    path: "/user/profile/:id",
                    name: 'UserProfile',
                    component: UserProfile,
                    props: {default: true, sidebar: false}
                },
                {
                    path: "/user/list",
                    name: "UserList",
                    component: UserList
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/helloworld',
            name: 'helloworld',
            component: HelloWorld
        },
        { 
            //重定向
            path: '/a', 
            redirect: '/main' 
        },
        {
            //404页面
            path: "*",
            component: NotFound
        }
    ]
})