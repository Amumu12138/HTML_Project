export default {
    state: {
        sum: 0
    },
    getters: {
        bigSum: state => {
            return state.sum * 10;
        }
    },
    mutations: {},
    actions: {},
    namespace: true
}