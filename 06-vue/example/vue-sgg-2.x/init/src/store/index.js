import Vue from 'vue';
import Vuex from 'vuex';
import num from './modules/num';
import person from './modules/person';

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        num,
        person
    }
})