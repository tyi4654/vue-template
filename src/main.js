import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import Antd from "ant-design-vue"
import http from "./api/index"
import axios from "axios"
import qs from "qs"

import "ant-design-vue/dist/antd.css"
import "normalize.css/normalize.css"

Vue.config.productionTip = false

Vue.use(Antd)

Vue.prototype.$axios = axios
Vue.prototype.$http = http
Vue.prototype.$qs = qs

Vue.prototype.$eventBus = new Vue()

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app")
