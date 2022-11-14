import axios from "axios"
import qs from "qs"
import Store from "@/store/index"
import baseUrl from "utils/domain"
import { message } from "ant-design-vue"

// 创建axios实例
const instance = axios.create({
	baseURL: baseUrl.api,
	timeout: 10000,
	header: {
		get: {
			"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
		},
		post: {
			"Content-Type": "application/json;charset=utf-8",
		},
	},
	transformRequest: [
		(data) => {
			data = qs.stringify(data)
			return data
		},
	],
	transformResponse: [
		(data) => {
			if (typeof data === "string" && data.startsWith("{")) {
				data = JSON.parse(data)
			}
			return data
		},
	],
})

// 请求拦截器
instance.interceptors.request.use(
	(config) => {
		// 获取Token
		const token = Store.state.token

		if (token)
			config.data = {
				...{ token },
				...config.data,
			}
		return config
	},
	(error) => {
		return Promise.error(error)
	}
)

// 响应拦截器
instance.interceptors.response.use(
	async (response) => {
		const { status, data } = response
		if (status === 200) {
			return Promise.resolve(data)
		}
		return Promise.reject(response)
	},
	(error) => {
		const status = error.request?.status ?? error.response?.status
		switch (status) {
			case 400:
				message.error("请求错误", 1)
				break
			case 401:
				message.error("未授权，请登录!", 1)
				break
			case 403:
				message.error("服务器拒绝访问!", 1)
				break
			case 404:
				message.error("请求的资源不存在!", 1)
				break
			case 500:
				message.error("服务器异常，请稍后再试!", 1)
				break
			default:
				message.error("连接出错", 1)
		}
		return Promise.reject(error)
	}
)

export default instance
