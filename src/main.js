// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import store from '@/vuex/store'

import { sync } from 'vuex-router-sync'
import './assets/font/iconfont.css'
import axios from 'axios'
import qs from 'qs'
FastClick.attach(document.body)
sync(store, router)

Vue.config.productionTip = false

//Vux Alert插件和Toast插件
import { AlertPlugin, ToastPlugin, ConfirmPlugin } from 'vux'
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
/* eslint-disable no-new */
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')

//跨域使用同样的session
axios.defaults.withCredentials = true;
Vue.prototype.$http = axios
Vue.prototype.$qs = qs