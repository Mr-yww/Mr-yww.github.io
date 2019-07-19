import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

import app_store from './app_store';

export default new vuex.Store({
    modules: {
        app_store:app_store,
    }
})