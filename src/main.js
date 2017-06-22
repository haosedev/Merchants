// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import store from '@/vuex/store'

import { sync } from 'vuex-router-sync'

import './assets/font/iconfont.css'

FastClick.attach(document.body)
sync(store, router)

Vue.config.productionTip = false

//Vux Alert插件和Toast插件
import { AlertPlugin, ToastPlugin } from 'vux'
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)

/* eslint-disable no-new */
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')