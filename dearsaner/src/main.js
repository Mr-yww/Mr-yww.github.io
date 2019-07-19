// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vuex from 'vuex'
import axios from 'axios'
import config from './common/config'
import store from './store'
import utils from './utils/utils'
import $ from 'jquery'

import './css/app.css'

Vue.config.productionTip = false

Vue.prototype.$ajax = axios

Vue.prototype.CONFIG = config

Vue.prototype.UTILS = utils

Vue.prototype.$ = $

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
})
