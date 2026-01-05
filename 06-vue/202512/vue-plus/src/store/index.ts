// Vuex状态管理
import { createStore } from 'vuex';
import type { IUserInfo, TUser } from '@/types/userInfo.type';

const user: TUser = 1;
const state = {
    count: 0
}

const mutations = {
    saveUserInfo(state: unknown, userInfo: IUserInfo) {
        state.userInfo = userInfo;
        storage.setItem('userInfo', userInfo)
    },
    saveMenuList(state, menuList) {
        state.menuList = menuList;
        storage.setItem('menuList', menuList)
    },
    saveActionList(state, actionList) {
        state.actionList = actionList;
        storage.setItem('actionList', actionList)
    },
    noticeCountGet(state, count) {
        state.noticeCount = count
    }
}

const actions = {}

const store = createStore({
    state,
    mutations,
    actions
})
export default store;