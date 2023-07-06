<script>
// import { whoami } from './api/auth'
// import { J_USER_ID, J_BRAND_ID, J_USER_INFO, J_USER_TOKEN, J_TOKEN_EXPIRE } from './constant'
// var http = require('./utils/http.js')
import { updateToken, getUserId } from './utils'
import {
	BASE_WS_API
} from './config'
export default {
	name: 'App',
	onShow() {
		// // 判断浏览器环境
		// var ua = navigator.userAgent.toLowerCase()
		// if (ua.search(/MicroMessenger/i) > -1 && !uni.getStorageSync('appType')) {
		// 	// 微信环境
		// 	uni.setStorageSync('appType', 2)
		// 	http.mpAuthLogin()
		// }
	},
	onLaunch() {
		console.log(this.$store.getters)
		this.$store.dispatch('customerService/joinCustomerServiceChat', {
			// ref: this,
			// wsHandle: uni.connectSocket({
			// 	url: `${BASE_WS_API}/${getUserId()}`,
			// 	complete: () => { }
			// })
		})
	},
	globalData: { },
	data() {
		return {
			scene: '',
			timer: ''
		}
	},
	mounted() {
		// #ifdef H5
		this.$store.dispatch('location/getCurrentLocation', (res) => {})
		// #endif
		// #ifdef APP
		// #endif
		updateToken()
		const launchOptions = uni.getLaunchOptionsSync()
		this.scene = launchOptions.scene
	},

	methods: {
		onOpen() {
			console.log('onOpen连接成功')
		},
		onMessage(evt) {
			console.log('onMessage收到消息', evt)
			// const data = JSON.parse(evt.data)
			// console.log(data)
			// if (data.status == 10400) {
			// 	uni.showToast({
			// 		title: '网络不给力，请检查网络连接',
			// 		icon: 'none'
			// 	}) // 弹出提示框
			// } else if (data.status == 13140) {
			// 	this.$store.dispatch('customerService/getChatList')
			// }
		},
		onError(errMsg) {
			console.log('onError出错了')
			// uni.showLoading({
			// 	title: '断线了，正在重新连接......',
			// 	mask: true
			// })
			uni.showToast({
				title: 'Error出错了' + errMsg,
				icon: 'none',
				duration: 2000
			})
		},
		onClose() {
			console.log('onClose关闭了')
			this.timer && clearTimeout(this.timer)
			this.timer = setTimeout(() => {
				this.$store.dispatch('customerService/joinCustomerServiceChat', {
					ref: '',
					wsHandle: uni.connectSocket({
						url: `${BASE_WS_API}/${getUserId()}`,
						complete: () => { }
					})
				})
			}, 2000)
		}

	}
}
</script>

<style>
@import "./app.css";
/* 隐藏头部 */
uni-page-head {
	display: none;
}

/* uni-page-body {
  overflow: scroll;
} */

uni-page-wrapper {
	height: 100%;
}

/* 轮播图指示点 */
uni-swiper .uni-swiper-dots-horizontal {
	bottom: 20px !important;
}
</style>
