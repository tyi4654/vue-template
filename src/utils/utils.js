//手机号码验证
const checkPhone = function (val) {
	return /^1[3456789]\d{9}$/.test(val)
}

/**
 * 判断时间大小
 * */
const judgeTime = function (startTime, endTime) {
	startTime = new Date(startTime.replace("//-/g", "//")).getTime() / 60 / 60 / 24 / 1000
	endTime = new Date(endTime.replace("//-/g", "//")).getTime() / 60 / 60 / 24 / 1000
	return Math.abs(endTime - startTime) == 1
}

/**
 * 日期格式化
 */
const dateFormat = function (datestr = "", fmt = "yyyy-MM-dd") {
	if (datestr) {
		// 判断是否是时间戳
		if (/^(\d{10}|\d{13})$/.test(datestr)) {
			// 检查是多少位的时间戳 10位 13位
			let len = datestr.length
			datestr = len == 10 ? new Date(datestr * 1000) : new Date(datestr * 1)
		}
	} else {
		datestr = new Date()
	}
	let o = {
		"M+": datestr.getMonth() + 1, // 月份
		"d+": datestr.getDate(), // 日
		"h+": datestr.getHours(), // 小时
		"m+": datestr.getMinutes(), // 分
		"s+": datestr.getSeconds(), // 秒
		// "q+": datestr.floor((datestr.getMonth() + 3) / 3), // 季度
		S: datestr.getMilliseconds(),
		// 毫秒
	}
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (datestr.getFullYear() + "").substr(4 - RegExp.$1.length))
	for (let k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length))
	return fmt
}

/**
 * 节流函数
 * @param {Function} fn     回调函数
 * @param {Number}   wait   延时
 * */
const throttle = function (fn, wait) {
	let pre = 0
	return function (...args) {
		let _this = this
		let now = new Date().getTime()
		if (now - pre > wait) {
			pre = now
			fn.apply(_this, args)
		}
	}
}

/**
 * 防抖函数
 * @param {Function} fn     回调函数
 * @param {Number}   wait   延时
 */

const debounce = function (fn, wait) {
	let timer,
		delay = wait || 500
	return function (...args) {
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			timer = null
			fn.apply(this, args)
		}, delay)
	}
}

export { checkPhone, judgeTime, dateFormat, throttle, debounce }
