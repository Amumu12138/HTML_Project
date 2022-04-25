export default {
    state: {
        sum: 0
    },
    getters: {
        bigSum: state => {
            return state.sum * 10;
        }
    },
    mutations: {
        INCREMENT(state, value) {
            console.log('sum INCREMENT called');
            state.sum += value;
        },
        DECREMENT(state, value) {
            console.log('sum DECREMENT called');
            state.sum -= value;
        }
    },
    actions: {
        incrementOdd({ state, commit }, value) {
            // 判断为奇数才进行计算
            if (state.sum % 2) {
                commit('INCREMENT', value);
            }
        },
        incrementAwait({ commit }, value) {
            // 延迟1s进行计算
            setTimeout(() => {
                commit('INCREMENT', value);
            }, 1000)
        },
    },
    namespaced: true
}