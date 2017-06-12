import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//** 还没调整的数据 */
const state = {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward'
}

const mutations = { //改变
    updateDemoPosition(state, payload) {
        state.demoScrollTop = payload.top
    },
    updateLoadingStatus(state, payload) {
        state.isLoading = payload.isLoading
    },
    updateDirection(state, payload) {
        state.direction = payload.direction
    }
}

const getters = {
    //count: (state) => {
    //    return state.count += 100;
    //}
}

const actions = { //异步处理
        updateDemoPosition({ commit }, top) {
            commit({ type: 'updateDemoPosition', top: top })
        }
    }
    //**模块组，轻量级项目不推荐 */
    // const moduleA = {
    //     state,
    //     mutations,
    //     getters,
    //     actions
    // }
    // const moduleB = {
    //     state,
    //     mutations,
    //     getters,
    //     actions
    // }
export default new Vuex.Store({
    //modules: { a: moduleA, moduleB }
    state,
    mutations,
    getters,
    actions
})