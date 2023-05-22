<script>
import { whoami } from './api/auth'
import { J_USER_ID, J_BRAND_ID, J_USER_INFO, J_USER_TOKEN, J_TOKEN_EXPIRE } from './constant'
import { updateToken } from './utils'
export default {
	name: 'App',
	// onShow() {
	onLaunch() {
		// 判断浏览器环境
		var ua = navigator.userAgent.toLowerCase()
		if (ua.search(/MicroMessenger/i) > -1 && !uni.getStorageSync('appType')) {
			// 微信环境
			uni.setStorageSync('appType', 2)
			http.mpAuthLogin()
		}

		// #ifdef H5
		// 获取当前定位
		if (!this.$store.state.location.currentLocation) {
			this.$store.dispatch('location/getCurrentLocation')
		}
		// #endif

		this.updateToken()
	},
	globalData: { },
	methods: {
		// 更新token
		updateToken
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
