<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import store from '@/store';
import BreadBrumb from '@/components/BreadCrumb.vue'
import TreeMenu from '@/components/TreeMenu.vue';
import router from '@/router';
import ROUTER from '@/router/router-constants'
import { permissionList } from '@/api';

const isCollapse = ref(false);
const userInfo = store.state?.userInfo ?? {};
const userMenu = ref([])

const noticeCount = computed(() => store.state.noticeCount)

const handleLogout = (key: string) => {
    if (key === 'email') return;
    store.commit('');
    router.push({ name: ROUTER.LOGIN })
}

const toggle = () => {
    isCollapse.value = !isCollapse.value;
}

const getNoticeCount = async () => {
    await store.dispatch("noticeCountGet")
}
const getMenuList = async () => {
    const { menuList, actionList } = await permissionList();
    userMenu.value = menuList;
    store.commit("saveMenuList", menuList);
    store.commit("saveActionList", actionList);
}

onMounted(async () => {
    await Promise.all([getNoticeCount(), getMenuList()]);
})
</script>
<template>
    <div class="basic-layout">
        <div :class="['nav-side', isCollapse ? 'fold' : 'unfold']">
            <!-- 系统LOGO -->
            <div class="logo">
                <img src="@/assets/logo.png" />
                <span>后台管理系统</span>
            </div>
            <!-- 导航菜单 -->
            <el-menu default-active="" class="nav-menu" background-color="#001529" text-color="#fff"
                :collapse="isCollapse" router>
                <tree-menu :userMenu="userMenu" />
            </el-menu>
        </div>
        <div :class="['content-right', isCollapse ? 'fold' : 'unfold']">
            <div class="nav-top">
                <div class="nav-left">
                    <div class="menu-fold" @click="toggle">
                        <i class="el-icon-s-fold"></i>
                    </div>
                    <div class="bread">
                        <bread-brumb />
                    </div>
                </div>
                <div class="user-info">

                    <el-badge :is-dot="noticeCount > 0 ? true : false" class="notice" type="danger"
                        @click="noticeCount > 0 ? $router.push('/audit/approve') : ''">
                        <i class="el-icon-bell"></i>
                    </el-badge>

                    <el-dropdown @command="handleLogout">
                        <span class="user-link">
                            {{ userInfo?.userName ?? 'Admin' }}
                            <i class="el-icon--right"></i>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="email">邮箱：{{ userInfo?.userEmail }}</el-dropdown-item>
                                <el-dropdown-item command="logout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
            <div class="wrapper">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.basic-layout {
    position: relative;

    .nav-side {
        position: fixed;
        width: 200px;
        height: 100vh;
        background-color: #001529;
        color: #fff;
        // overflow-y: auto;
        transition: width 0.5s;

        .logo {
            display: flex;
            align-items: center;
            font-size: 18px;
            height: 50px;

            img {
                margin: 0 16px;
                width: 32px;
                height: 32px;
            }
        }

        .nav-menu {
            height: calc(100vh - 50px);
            border-right: none;
        }

        // 合并
        &.fold {
            width: 64px;
        }

        // 展开
        &.unfold {
            width: 200px;
        }
    }

    .content-right {
        margin-left: 200px;

        // 合并
        &.fold {
            margin-left: 64px;
        }

        // 展开
        &.unfold {
            margin-left: 200px;
        }

        .nav-top {
            height: 50px;
            line-height: 50px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #ddd;
            padding: 0 20px;

            .nav-left {
                display: flex;
                align-items: center;

                .menu-fold {
                    margin-right: 15px;
                    font-size: 18px;
                }

                z-index: 10;
            }

            .user-info {
                .notice {
                    line-height: 30px;
                    margin-right: 15px;
                }

                .user-link {
                    margin-top: 20px;
                    cursor: pointer;
                    color: #409eff;
                }
            }
        }

        .wrapper {
            background: #eef0f3;
            padding: 20px;
            height: calc(100vh - 50px);

            .main-page {
                background: #fff;
                height: 100%;
            }
        }
    }
}
</style>