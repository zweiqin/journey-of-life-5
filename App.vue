<script>
import PageAnimation from './components/BeePageAnimation'
import { whoami } from './api/auth'
import { J_USER_ID, J_USER_TOKEN, J_TOKEN_EXPIRE } from './constant'
export default {
	mixins: [PageAnimation],
	onShow: function () {
		// 判断浏览器环境
		var ua = navigator.userAgent.toLowerCase();
		if (ua.search(/MicroMessenger/i) > -1 && !uni.getStorageSync("appType")) {
			// 微信环境
			uni.setStorageSync("appType", 2);
			http.mpAuthLogin();
		}

		// #ifdef H5
		// 获取当前定位
		if (!this.$store.state.location.currentLocation) {
			this.$store.dispatch('location/getCurrentLocation')
		}
		// #endif 

		this.updateToken()
	},
	globalData: {},
	methods: {
		// 更新token
		async updateToken() {
			const userId = uni.getStorageSync(J_USER_ID);
			// debugger
			if (userId) {
				const { data } = await whoami(userId)

				uni.setStorageSync(J_USER_TOKEN, data.token);
				uni.setStorageSync(J_TOKEN_EXPIRE, data.expireTime)
			}

		}
	},
};
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