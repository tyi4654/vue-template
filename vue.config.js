const CompressionPlugin = require("compression-webpack-plugin")

// 是否为生产环境
const isProduction = process.env.NODE_ENV === "production"

// 本地环境是否需要使用cdn
const devNeedCdn = false

// cdn链接
const cdn = {
	// cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
	externals: {
		vue: "Vue",
		vuex: "Vuex",
		"vue-router": "VueRouter",
		axios: "axios",
		moment: "moment",
		"../moment": "moment",
		"ant-design-vue": "antd",
		"core-js": "core-js",
	},

	// cdn的css链接
	css: ["https://static.menglvcheng.com/libs/css/ant-design-vue@1.7.8/antd.min.css"],

	// cdn的js链接
	js: [
		"https://static.menglvcheng.com/libs/js/vue@2.6.11/vue.min.js",
		"https://static.menglvcheng.com/libs/js/vuex@3.1.2/vuex.min.js",
		"https://static.menglvcheng.com/libs/js/vue-router@3.2.0/vue-router.min.js",
		"https://cdn.bootcdn.net/ajax/libs/core-js/3.22.8/minified.min.js",
		"https://static.menglvcheng.com/libs/js/axios@0.24.0/axios.min.js",
		"https://static.menglvcheng.com/libs/js/moment@2.29.1/moment.min.js",
		"https://static.menglvcheng.com/libs/js/moment@2.29.1/locale/zh-cn.js",
		"https://static.menglvcheng.com/libs/js/ant-design-vue@1.7.8/antd.min.js",
	],
}

module.exports = {
	publicPath: isProduction ? "/pc" : "/",
	productionSourceMap: false, // 去除Vue打包后js目录下生成的一些.map文件，用于加速生产环境构建
	chainWebpack: (config) => {
		config.plugin("html").tap((args) => {
			args[0].title = "vue2"
			// 生产环境或本地需要cdn时，才注入cdn
			if (isProduction || devNeedCdn) args[0].cdn = cdn
			return args
		})
	},
	configureWebpack: (config) => {
		// 用cdn方式引入，则构建时要忽略相关资源
		if (isProduction || devNeedCdn) {
			config.externals = cdn.externals
			return {
				plugins: [
					new CompressionPlugin({
						//filename: "[path].gz[query]",
						algorithm: "gzip",
						test: /\.(js|css|woff|woff2|ttf|eot|png|svg|jpg|jpeg)(\?.*)?$/i,
						threshold: 10240,
						minRatio: 0.8,
						deleteOriginalAssets: false,
					}),
				],
				resolve: {
					alias: {
						views: "@/views",
						style: "@/style",
						components: "@/components",
						utils: "@/utils",
						assets: "@/assets",
						"@ant-design/icons/lib/dist$": "utils/tmpicons.js",
						"core-js$": "utils/tmpicons.js",
						"core-js/internals$": "utils/tmpicons.js",
						"vue/dist/vue.runtime.esm.js": "utils/tmpicons.js",
					},
				},
			}
		}
		return {
			resolve: {
				alias: {
					views: "@/views",
					style: "@/style",
					components: "@/components",
					utils: "@/utils",
					assets: "@/assets",
				},
			},
		}
	},
	css: {
		loaderOptions: {
			sass: {
				data: `@import "style/common.scss";`,
			},
		},
	},
}
