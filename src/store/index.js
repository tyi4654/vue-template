import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token: undefined,
	},
	getters: {},
	mutations: {
		// 登录
		login(state, data) {
			state.token = data.token
		},

		// 登出
		logout(state) {
			state.token = ""
			localStorage.clear()
		},
	},
	actions: {},
})
