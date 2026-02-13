export default {
    state: {
        personList: []
    },
    getters: {
        personList: state => {
            return state.personList;
        },
        personLen: state => {
            return state.personList.length || 0;
        }
    },
    mutations: {
        ADD_PERSON(state, value) {
            state.personList.unshift(value);
        }
    },
    actions: {
        addZhangPerson({ commit }, value) {
            // 判断用户名称中是否存在'张'
            if (value.indexOf('张') !== -1) {
                commit('ADD_PERSON', value);
            } else {
                alert('用户名字中不存在张!');
            }
        }
    },
    namespaced: true
}