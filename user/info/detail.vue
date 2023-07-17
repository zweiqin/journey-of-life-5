<template>
	<view class="info-detail-container">
		<view class="op">
			<img src="../../static/images/store/chevron-states.png" alt="" class="back" @click="handleBack" />
			<view class="title">个人信息</view>
		</view>

		<view class="avatar-container">
			<img
				:src="common.seamingImgUrl(userInfo.avatarUrl)" alt="" class="avatar"
			/>
			<view class="change-btn font-14" @click="handleChangeAvatar">更换头像</view>
		</view>

		<view class="detail-container">
			<view class="item" @click="showEditDialog">
				<view class="title font-14 f-c-3d">昵称</view>
				<view class="value font-14 f-c-3d">{{ userInfo.nickName }}</view>
				<img src="../../static/images/common/chevron-states.png" class="icon" alt="" />
			</view>

			<view class="item">
				<view class="title font-14 f-c-3d">用户ID</view>
				<view class="value font-14 f-c-3d">{{ userInfo.userId }}</view>
				<img src="../../static/images/common/chevron-states.png" class="icon" alt="" />
			</view>

			<view class="item">
				<view class="title font-14 f-c-3d">账号密码</view>
				<view class="value font-14 f-c-3d">**********</view>
				<img src="../../static/images/common/chevron-states.png" class="icon" alt="" />
			</view>

			<view class="item" @click="hanldeBindPhone">
				<view class="title font-14 f-c-3d">手机号</view>
				<view class="value font-14 f-c-3d">{{ userInfo.phone || '未绑定' }}</view>
				<img src="../../static/images/common/chevron-states.png" class="icon" alt="" />
			</view>

			<view class="item">
				<view class="title font-14 f-c-3d">微信账号</view>
				<!-- <view class="unbound font-14 f-c-9" @click="handleUnboundWX">解绑</view> -->
				<view class="unbound font-14 f-c-9">{{ userInfo.openId ? '已绑定' : '未绑定' }}</view>
			</view>

			<!-- <view class="item" @click="$refs.WithdrawalPwdDialogRef.open()">
				<view class="title font-14 f-c-3d">提现密码</view>
				<view class="value font-14 f-c-3d">**********</view>
				<img src="../../static/images/common/chevron-states.png" class="icon" alt="" />
				</view> -->

			<!-- <view class="item">
				<view class="title font-14 f-c-3d">解绑账号</view>
				<img
				src="../../static/images/common/chevron-states.png"
				class="icon"
				alt=""
				/>
				</view> -->
		</view>

		<view class="logout">
			<button class="font-12 btn" @click="handleClickLogout">
				退出当前帐号
			</button>
		</view>

		<view v-show="showLogout" class="picker">
			<view class="mask" @click="showLogout = false"></view>
			<view class="items font-14 f-c-14">
				<!-- <view class="item">更换账号</view> -->
				<view class="item" @click="handleLagout">确定退出</view>
				<view class="item">取消</view>
			</view>
		</view>

		<uni-popup ref="inputDialog" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="base" type="info" title="解绑微信" @confirm="handleUnboundWXConfirm">
				确定解除与微信账号的绑定吗？
			</uni-popup-dialog>
		</uni-popup>

		<uni-popup ref="editNicknameDialogRef" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="base" type="info" title="修改昵称" @confirm="handleConfirmEditNickname">
				<view class="edit-input">
					<view class="input-wrapper">
						<view class="title">（修改昵称）</view>
						<input v-model="nickname" type="text" />
					</view>
					<view class="error">请输入昵称</view>
				</view>
			</uni-popup-dialog>
		</uni-popup>

		<uni-popup ref="WithdrawalPwdDialogRef" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="base" type="info" title="修改提现密码" @confirm="handleConfirmWithdrawalPwd">
				<view class="edit-input">
					<view class="input-wrapper">
						<view class="title">原密码：</view>
						<input v-model="WithdrawalPwdForm.oldPassword" type="text" />
					</view>
					<view class="input-wrapper" style="margin-top: 20rpx;">
						<view class="title">新密码：</view>
						<input v-model="WithdrawalPwdForm.newPassword" type="text" />
					</view>
				</view>
			</uni-popup-dialog>
		</uni-popup>

		<!-- <JUploadAvatar
			@close="handleCloseUpload"
			ref="jUploadAvatarRef"
			@success="handleUpDateAvatar"
			></JUploadAvatar> -->
	</view>
</template>

<script>
import { updateUserInfoApi, refrshUserInfoApi, updateWithdrawalPwdApi } from '../../api/user'
import { getUserId } from '../../utils'
import { J_USER_INFO } from '../../constant'

export default {
	name: 'Detail',
	data() {
		return {
			showLogout: false,
			nickname: '',
			userInfo: {},
			WithdrawalPwdForm: {
				oldPassword: '',
				newPassword: '',
				userId: getUserId()
			}
		}
	},

	onLoad() {
		this.userInfo = uni.getStorageSync(J_USER_INFO)
		this.nickName = this.userInfo.nickName
	},
	methods: {
		handleClickLogout() {
			this.showLogout = true
		},

		handleBack() {
			uni.switchTab({
				url: '/pages/user/user'
			})
		},

		/**
		 * @description 点击解绑微信
		 */

		handleUnboundWX() {
			this.$refs.inputDialog.open()
		},

		/**
		 * @description 点击修改昵称
		 */

		showEditDialog() {
			this.$refs.editNicknameDialogRef.open()
		},

		/**
		 * @description 确认解绑微信号
		 */

		handleUnboundWXConfirm() {
			console.log('解绑')
		},

		/**
		 * @description 点击确定修改昵称
		 */

		handleConfirmEditNickname() {
			this.updateUserInfo('nickname', this.nickname)
		},

		/**
		 * @description 点击确定修改提现密码
		 */

		handleConfirmWithdrawalPwd() {
			if (!this.WithdrawalPwdForm.oldPassword || !this.WithdrawalPwdForm.newPassword) return this.$showToast('请填写完整信息')
			uni.showLoading()
			updateWithdrawalPwdApi(this.WithdrawalPwdForm).then(({ data }) => {
				uni.hideLoading()
				this.$showToast('修改成功')
			})
		},

		/**
		 * 点击退出
		 */

		handleLagout() {
			// uni.clearStorageSync()
			uni.removeStorage({ key: 'J_USER_INFO' })
			uni.removeStorage({ key: 'J_USER_TOKEN' })
			uni.removeStorage({ key: 'J_TOKEN_EXPIRE' })
			uni.removeStorage({ key: 'J_USER_ID' })
			uni.removeStorage({ key: 'J_BRAND_ID' })
			uni.removeStorage({ key: 'J_ARTICLE_SEARCH_HISTORY' })
			uni.removeStorage({ key: 'J_GOODS_SEARCH_HISTORY' })
			uni.removeStorage({ key: 'J_STORE_SEARCH_HISTORY' })
			uni.removeStorage({ key: 'J_ONE_PAY_GOODS' })
			uni.removeStorage({ key: 'J_SELECT_ADDRESS' })
			uni.removeStorage({ key: 'J_TWO_PAY_GOODS' })
			uni.removeStorage({ key: 'J_RESERVATION_PAY_GOODS' })
			uni.removeStorage({ key: 'J_NEW_BIND_TYPE' })
			uni.removeStorage({ key: 'J_NEW_BIND_CODE' })
			uni.removeStorage({ key: 'J_NEW_BIND_ID' })
			uni.removeStorage({ key: 'J_SELECT_WORDS' })
			uni.removeStorage({ key: 'J_PAY_ORDER' })
			uni.removeStorage({ key: 'J_PAY_TYPE' })
			uni.removeStorage({ key: 'J_CURRENT_ADDRESS' })
			uni.showToast({
				title: '退出成功',
				duration: 2000
			})

			setTimeout(() => {
				uni.redirectTo({
					url: '/pages/login/login'
				})
			}, 2000)
		},

		// 点击更换头像
		handleChangeAvatar() {
			// this.$refs.jUploadAvatarRef.$el.style.left = '0'
			const _this = this
			uni.chooseImage({
				count: 1,
				success: (res) => {
					uni.navigateTo({
						url: '/user/info/cropper?imgUrl=' + res.tempFilePaths[0]
					})
				},
				fail: () => {
					_this.$showToast('图片上传失败')
				}
			})
		},

		// 点击关闭
		handleCloseUpload() {
			this.$refs.jUploadAvatarRef.$el.style.left = '-100%'
		},

		// 更换头像
		handleUpDateAvatar(res) {
			const url = JSON.parse(res.data).data.url
			this.updateUserInfo('avatar', url)
		},

		// 更新用户信息
		updateUserInfo(key, value) {
			uni.showLoading()
			const _this = this
			const originData = {
				nickname: this.userInfo.nickName,
				avatar: this.userInfo.avatarUrl,
				password: this.userInfo.password,
				id: getUserId()
			}

			originData[key] = value

			updateUserInfoApi(originData).then(() => {
				refrshUserInfoApi({
					userId: getUserId(),
					openId: ' '
				}).then(({ data }) => {
					uni.hideLoading()
					_this.handleCloseUpload()
					_this.$showToast('修改成功', 'success')
					uni.setStorageSync(J_USER_INFO, data)
					_this.userInfo = uni.getStorageSync(J_USER_INFO)
				})
			})
		},

		// 绑定手机号
		hanldeBindPhone() {
			const userInfo = uni.getStorageSync(J_USER_INFO)
			if (userInfo.openId && !userInfo.phone) {
				uni.navigateTo({
					url: '/pages/login/bind-phone?openId=' + userInfo.openId
				})
			} else {
				this.$showToast('您已绑定手机号')
			}
		}
	}
}
</script>

<style lang="less" scoped>
.info-detail-container {
	padding: 72upx 32upx;
	box-sizing: border-box;
	overflow: hidden;

	.op {
		display: flex;
		align-items: center;
		font-size: 32upx;
		color: #000;

		.back {
			width: 48upx;
			margin-right: 32upx;
		}
	}

	.avatar-container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin: 30upx 0 60upx 0;

		.avatar {
			width: 188upx;
			height: 188upx;
			border-radius: 50%;
			margin-bottom: 18upx;
		}

		.change-btn {
			color: #ff8f1f;
		}
	}

	.detail-container {
		padding: 8upx;

		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 40upx 0 6upx 0;
			border-bottom: 1upx solid #d8d8d8;

			.title {
				flex: 2;
				font-weight: bold;
			}

			.value {
				flex: 4;
			}
		}
	}

	.logout {
		margin-top: 280upx;

		.btn {
			color: #ff8f1f;
			border: none;
			background: transparent;

			&::after {
				border: none;
			}
		}
	}

	.picker {
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;

		.mask {
			width: 100vw;
			height: 100vh;
			background-color: rgba(216, 216, 216, 0.5);
		}

		.items {
			width: 100%;
			position: absolute;
			bottom: 0;
			left: 0;
			background-color: #fff;

			.item {
				text-align: center;
				padding: 32upx 0;
				overflow: hidden;
				border-bottom: 1upx solid #d8d8d8;
				color: #ff8f1f;

				&:last-child {
					border: none;
					color: #999;
				}
			}
		}
	}

	.edit-input {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		flex-direction: column;
		width: 100%;
		color: #3d3d3d;
		font-size: 28upx;
		margin: 14upx 0;
		border-bottom: 1upx solid #d8d8d8;

		.input-wrapper {
			display: flex;
			align-items: center;
		}

		.title {
			white-space: nowrap;
		}

		.error {
			height: 0;
			overflow: hidden;
			margin-left: 10px;
			color: #f40;
			transition: all 350ms linear;
		}
	}
}
</style>
