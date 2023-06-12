<template>
	<view class="jump-container">
		<view v-if="viewType === 'verification'">
			<view style="margin-top: 20vh;"><tui-input v-model="code" label="核销码" placeholder="请输入核销码" disabled></tui-input></view>
			<view>
				<tui-button margin="20upx 0 0 auto" type="green" width="260rpx" shape="circle" @click="handleVerification()">确认核销</tui-button>
			</view>
		</view>
		<view v-else>
			<tui-skeleton :preload-data="preloadData" style="z-index: 888;"></tui-skeleton>
		</view>
	</view>
</template>

<script>
import { J_USER_INFO, J_NEW_BIND_TYPE, J_NEW_BIND_CODE, J_NEW_BIND_ID } from '../../constant'
// import { bindUserSaoMaApi, bindSaoMaBrandApi } from '../../api/user'
import { updateUserBindingUserApi, updateSetHxCodeApi } from '../../api/user'
import { getUserId } from '../../utils'

export default {
	name: 'Jump',
	components: {},
	props: {},
	data() {
		return {
			data: [],
			preloadData: [
				{
					'id': '',
					'dataset': {},
					'left': 164.84375,
					'right': 365,
					'top': 20,
					'bottom': 220,
					'width': 200.15625,
					'height': 19,
					'skeletonType': 'rect'
				}, {
					'id': '',
					'dataset': {},
					'left': 0,
					'right': 375,
					'top': 70,
					'bottom': 187,
					'width': 375,
					'height': 187,
					'skeletonType': 'fillet'
				}
			],
			viewType: '',
			type: '',
			code: '',
			otherSideUserId: '',
			userId: '',
			userInfo: {}
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */

	onLoad(options) {
		if (options.type) uni.setStorageSync(J_NEW_BIND_TYPE, options.type) || uni.setStorageSync(J_NEW_BIND_CODE, options.code || '') || uni.setStorageSync(J_NEW_BIND_ID, options.userId || '') // 有绑定id就进行存储，以防下面没登录跳到登录页
		this.userId = getUserId() || ''
		if (this.userId && !options.type && uni.getStorageSync(J_NEW_BIND_TYPE)) { // 如果原先有绑定id，例如注册/重新登陆了然后跳回来（options没携带绑定id），则是存储里的绑定id
			this.userInfo = uni.getStorageSync(J_USER_INFO)
			this.type = uni.getStorageSync(J_NEW_BIND_TYPE) || ''
			this.code = uni.getStorageSync(J_NEW_BIND_CODE) || ''
			this.otherSideUserId = uni.getStorageSync(J_NEW_BIND_ID) || ''
			this.handleBusiness(true)
		} else if (this.userId && options.type) { // 请求路径上面直接有绑定id参数
			this.userInfo = uni.getStorageSync(J_USER_INFO)
			this.type = options.type || ''
			this.code = options.code || ''
			this.otherSideUserId = options.userId || ''
			this.handleBusiness(false)
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */

	onReady() { },

	/**
	 * 生命周期函数--监听页面显示
	 */

	onShow() {
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */

	onHide() { },

	/**
	 * 生命周期函数--监听页面卸载
	 */

	onUnload() { },

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */

	onPullDownRefresh() { },

	/**
	 * 页面上拉触底事件的处理函数
	 */

	onReachBottom() { },

	/**
	 * 用户点击右上角分享
	 */

	onShareAppMessage() { },
	methods: {
		// 业务逻辑
		handleBusiness(isFromLogin) {
			console.log(isFromLogin)
			uni.removeStorageSync(J_NEW_BIND_TYPE)
			uni.removeStorageSync(J_NEW_BIND_CODE)
			uni.removeStorageSync(J_NEW_BIND_ID)
			if (this.type === 'nothing') {
				uni.switchTab({
					url: '/pages/store/store'
				})
			} else if (this.type === 'verification') {
				return this.viewType = 'verification'
				// updateSetHxCodeApi({ code: this.code })
				// 	.then((res) => {
				// 		this.$showToast('核销成功', 'success')
				// 	})
				// 	.finally((e) => {
				// 		setTimeout(() => {
				// 			uni.switchTab({
				// 				url: '/pages/user/user'
				// 			})
				// 		}, 2000)
				// 	})
			} else if (this.type === 'invitation') {
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/user/user'
					})
				}, 1000)
			} else if (this.type === 'bindingBranchOffice' || this.type === 'bindingStore' || this.type === 'bindingPlanner') {
				updateUserBindingUserApi({ userCode: this.code, userId: this.userId })
					.then((res) => {
						this.$showToast('绑定成功', 'success')
					})
					.finally((e) => {
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/user/user'
							})
						}, 2000)
					})
			}
			// else if (this.type === 'bindingPlanner') {
			// 	// http://localhost:8989/JFShop_Uni_H5/#/pages/jump/jump?userId=277&type=bindingPlanner&code=JFFPLXER
			// 	if (this.userInfo.roleIds === 10) {
			// 		// this.go(`/user/xxx?code=${this.code}`)
			// 		uni.redirectTo({
			// 			url: `/user/xxx?code=${this.code}`
			// 		})
			// 	} else if (this.userInfo.roleIds === 7 || this.userInfo.roleIds === 6) {
			// 		bindUserSaoMaApi({ marketingId: this.otherSideUserId, userId: this.userId })
			// 			.then((res) => {
			// 				this.$showToast('绑定策划师成功', 'success')
			// 			})
			// 			.finally((e) => {
			// 				setTimeout(() => {
			// 					uni.switchTab({
			// 						url: '/pages/user/user'
			// 					})
			// 				}, 2000)
			// 			})
			// 	}
			// } else if (this.type === 'bindingStore') {
			// 	if (this.userInfo.roleIds === 10) {
			// 		bindSaoMaBrandApi({ marketingId: this.otherSideUserId, userId: this.userId })
			// 			.then((res) => {
			// 				this.$showToast('绑定商户成功', 'success')
			// 				uni.switchTab({
			// 					url: '/pages/user/user'
			// 				})
			// 			})
			// 			.finally((e) => {
			// 				setTimeout(() => {
			// 					uni.switchTab({
			// 						url: '/pages/user/user'
			// 					})
			// 				}, 2000)
			// 			})
			// 	}
			// }
		},
		handleVerification() {
			updateSetHxCodeApi({ code: this.code, userId: getUserId() })
				.then((res) => {
					this.$showToast('核销成功', 'success')
				})
				.finally((e) => {
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/user/user'
						})
					}, 2000)
				})
		}
	}
}
</script>

<style lang="less" scoped>
.jump-container {
	min-height: 100vh;
	padding: 46upx;
	box-sizing: border-box;
}
</style>
