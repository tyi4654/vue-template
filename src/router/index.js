import Vue from "vue"
import qs from "qs"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const router = new VueRouter({
	mode: "history",
	base: "/pc",
	routes: [],
})

// 全局导航守卫
router.beforeEach(async (to, from, next) => {
	next()
})

// 导航统一错误捕获
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location) {
	return routerPush.call(this, location).catch((err) => err)
}

export default router
