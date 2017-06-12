// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import store from '@/vuex/store'

import { sync } from 'vuex-router-sync'

FastClick.attach(document.body)
sync(store, router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')