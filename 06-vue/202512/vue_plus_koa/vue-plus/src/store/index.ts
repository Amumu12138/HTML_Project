// Vuex状态管理
import { createStore } from 'vuex';
import type { IState } from '@/types/common.type';
import type { IUserInfo } from '@/types/userInfo.type';
import storage from "@/utils/storage";
import { noticeCount } from '@/api'

// const user: TUser = 1;
const state = {
    noticeCount: 0,
    userInfo: storage.getItem("userInfo") || {}, // 获取用户信息
    menuList: storage.getItem("menuList") || [],
    actionList: storage.getItem("actionList") || [],
}

const mutations = {
    saveUserInfo(state: IState, userInfo: IUserInfo) {
        state.userInfo = userInfo;
        storage.setItem('userInfo', userInfo)
    },
    saveMenuList(state: IState, menuList) {
        state.menuList = menuList;
        storage.setItem('menuList', menuList)
    },
    saveActionList(state: IState, actionList) {
        state.actionList = actionList;
        storage.setItem('actionList', actionList)
    },
    noticeCountGet(state: IState, count) {
        state.noticeCount = count
    }
}

const actions = {
    async noticeCountGet({ commit }) {
        const res = await noticeCount()
        commit("noticeCountGet", res)
    }
}

const store = createStore({
    state,
    mutations,
    actions
})
export default store;