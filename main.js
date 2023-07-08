import Vue from 'vue'
import App from './App'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
// import 'animate.css'
import store from './store'
import globalMixin from './mixin/global'

Vue.mixin({
	data() {
		return {
			baseUrl: 'https://adminapi.jfcmei.com/admin/storage/fetch/',
			lazyLoadingMode: 'skeleton-2',
			common: {
				// 拼接展示图片url
				// splicingImgUrl() {
				// 	return 'https://adminapi.jfcmei.com/admin/storage/fetch/'
				// },
				seamingImgUrl(url) {
					if (!url) return ''
					return url.startsWith('https://') ? url : 'https://adminapi.jfcmei.com/admin/storage/fetch/' + url
				},
				explainMembership(roleIds) {
					let roleName
					switch (roleIds) {
						case 1:
							roleName = '超级管理员'
							break
						case 2:
							roleName = '分公司管理员'
							break
						case 3:
							roleName = '高级营销策划师'
							break
						case 4:
							roleName = '初级营销策划师'
							break
						case 5:
							roleName = '普通营销策划师'
							break
						case 6:
							roleName = '会员商户'
							break
						case 7:
							roleName = '普通商户'
							break
						case 8:
							roleName = '商户高级业务员'
							break
						case 9:
							roleName = '商户初级业务员'
							break
						case 10:
							roleName = '普通会员'
							break
						case 11:
							roleName = '游客'
							break
						case 12:
							roleName = '推广管理员'
							break
						case 13:
							roleName = '商场管理员'
							break
						default:
							roleName = '未知会员类型'
							break
					}
					return roleName
				}
			}
		}
	},
	methods: {
		setData(obj) {
			const that = this
			let keys = []
			let val, data
			Object.keys(obj).forEach(function (key) {
				keys = key.split('.')
				val = obj[key]
				data = that.$data
				keys.forEach(function (key2, index) {
					if (index + 1 == keys.length) {
						that.$set(data, key2, val)
					} else if (!data[key2]) {
						that.$set(data, key2, {})
					}
					data = data[key2]
				})
			})
		},

		$showToast(text, icon) {
			uni.showToast({
				title: text,
				duration: 2000,
				icon: icon || 'none'
			})
		},

		go(url) {
			if (!url) {
				return
			}

			uni.navigateTo({
				url
			})
		},

		$copy(text, title = '复制成功') {
			uni.setClipboardData({
				data: text,
				success: () => {
					uni.showToast({
						title
					})
				}
			})
		},

		switchTab(url) {
			if (!url) {
				return
			}
			uni.switchTab({
				url
			})
		},

		_getSize(selecter) {
			const _this = this
			return new Promise((resolve, reject) => {
				const query = uni.createSelectorQuery().in(_this)
				query
					.select(selecter)
					.boundingClientRect((data) => {
						resolve(data)
					})
					.exec()
			})
		}
	}
})

Vue.use(globalMixin)
App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
