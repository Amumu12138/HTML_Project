
import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import products from './modules/products'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
console.log('Amumu process.env.NODE_ENV -->', process.env.NODE_ENV)
export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        cart,
        products
    },
})