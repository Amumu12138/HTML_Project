<script setup lang="ts">
import { ref } from 'vue'
import ROUTER from "@/router/router-constants"
import { useRouter } from 'vue-router'
import { User, View } from '@element-plus/icons-vue'

import store from '@/store'
import storage from '@/utils/storage'
import utils from '@/utils/utils'
import { login, permissionList } from "@/api"

const router = useRouter()
const user = ref({
    userName: 'admin',
    userPwd: '123456'
})

const rules = {
    userName: [
        {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
        },
    ],
    userPwd: [
        {
            required: true,
            message: "请输入密码",
            trigger: "blur",
        },
    ],
}

const userFormRef = ref(null);
// 登录
const _login = () => {
    userFormRef.value.validate((valid) => {
        if (!valid) {
            return false
        }
        login(user.value).then(async (res) => {
            store.commit("saveUserInfo", res);
            await loadAsyncRoutes();
            goHome()
        })
    });
}

// 返回首页
const goHome = () => {
    router.push({ name: ROUTER.WELCOME })
}

// 异步加载路由
const loadAsyncRoutes = async () => {
    let userInfo = storage.getItem('userInfo') || {}
    if (userInfo.token) {
        try {
            const { menuList } = await permissionList()
            let routes = utils.generateRoute(menuList)
            const modules = import.meta.glob('../**/*.vue')
            routes.map(route => {
                let url = `./${route.component}.vue`
                route.component = modules[url]
                router.addRoute('home', route)
            })
        } catch (error) {

        }
    }
}
</script>

<template>
    <div class="login-wrapper">
        <div class="modal">
            <el-form ref="userFormRef" :model="user" status-icon :rules="rules">
                <div class="title">登录</div>
                <el-form-item prop="userName">
                    <el-input type="text" v-model="user.userName" :prefix-icon="User" />
                </el-form-item>
                <el-form-item prop="userPwd">
                    <el-input type="password" :prefix-icon="View" v-model="user.userPwd" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="btn-login" @click="_login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f9fcff;
    width: 100vw;
    height: 100vh;

    .modal {
        width: 500px;
        padding: 50px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0px 0px 10px 3px #c7c9cb4d;

        .title {
            font-size: 50px;
            line-height: 1.5;
            text-align: center;
            margin-bottom: 30px;
        }

        .btn-login {
            width: 100%;
        }
    }
}
</style>