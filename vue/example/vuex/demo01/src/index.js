import 'es6-promise/auto'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment(state) {
            state.count++
        }
    }
})

console.log('store -->', store.state.count) // --> 0
store.commit('increment')
console.log('store2 -->', store.state.count) // -> 1

const vm = new Vue({
    el: '#app',
    store: store
})

