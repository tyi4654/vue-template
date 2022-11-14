/**
 * 域名管理
 * @description {String} baseURL 基础域名
 */

let baseURL = {
	api: "",
	member: "",
	qiniu: "https://hotel-static.stourweb.cn",
	ws: "",
}

const CONST_VUE_APP_ENV = process.env.VUE_APP_ENV

console.log(CONST_VUE_APP_ENV)

if (CONST_VUE_APP_ENV == "development") {
	baseURL.api = "http://hotel.stccs.test/api/admin/pc"
	baseURL.member = "http://tm.stourweb.cn/"
	baseURL.ws = "ws://hotel.stccs.test:9502/ws"
} else if (CONST_VUE_APP_ENV == "test") {
	baseURL.api = "http://dev-pms.stourweb.cn/api/admin/pc"
	baseURL.member = "https://member.stourweb.cn/"
	baseURL.ws = "ws://dev-pms.stourweb.cn:9502/ws"
} else if (CONST_VUE_APP_ENV == "debug") {
	baseURL.api = "http://dev-pms.stourweb.cn/api/admin/pc"
	baseURL.member = "https://member.stourweb.cn/"
	baseURL.ws = "ws://dev-pms.stourweb.cn:9502/ws"
} else if (CONST_VUE_APP_ENV == "production") {
	baseURL.api = "https://pms.menglvcheng.com/api/admin/pc"
	baseURL.member = "https://member.stourweb.cn/"
	baseURL.ws = "wss://pms.menglvcheng.com/ws"
}

export default baseURL
