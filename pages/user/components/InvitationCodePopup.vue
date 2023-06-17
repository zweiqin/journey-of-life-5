<template>
	<view
		class="code-mask" :style="{
			'opacity': invitationCodeUrl && userInfo && userInfo.nickName ? '1' : '0',
			'z-index':
				invitationCodeUrl && userInfo && userInfo.nickName ? '1' : '-1'
		}"
	>
		<view
			class="code-wrapper" :style="{
				transform: invitationCodeUrl ? 'scale(1)' : 'scale(0)'
			}"
		>
			<view class="header">
				<view style="display: flex;justify-content: center;align-items: center;">
					<image class="header-icon" src="/static/images/user/ju-icon.png" mode="" />
					<text>我的邀请码</text>
				</view>
				<view style="display: flex;justify-content: center;align-items: center;">
					<text>{{ code }}</text>
					<tui-button margin="0 0 0 20upx" type="warning" width="120rpx" height="50rpx" style="border-radius: 50rpx;" @click="handleCopyData(code)">复制</tui-button>
				</view>
				<view>
					昵称：{{ userInfo.nickName }}&nbsp;&nbsp;&nbsp;&nbsp;用户ID：{{ userInfo.userId }}
				</view>
			</view>

			<view class="big-wrapper">
				<image src="/static/images/user/ju-icon-p.png" class="big-icon" />
			</view>

			<view v-if="code" class="images">
				<view class="zhiwen">
					<image src="/static/images/user/zhi.png" alt="" />
					<text>长按扫码</text>
				</view>
				<view style="text-align: center;">
					<image class="code" :src="invitationCodeUrl" alt="" />
					<view style="font-size: 26upx;color: #06a6f0;" @click="handleCopyData(`https://www.tuanfengkeji.cn/JFShop_Uni_H5/#/pages/jump/jump?userId=${userInfo.userId}&type=invitation&code=${code}`)">复制链接</view>
				</view>
			</view>

			<button class="uni-btn" @click="invitationCodeUrl = ''">取消</button>
		</view>
	</view>
</template>

<script>
import { J_USER_INFO } from '../../../constant'
import { getQrCodeByH5Api } from '../../../api/user'
import { getUserId } from '../../../utils'
export default {
	name: 'InvitationCodePopup',
	data() {
		return {
			code: '',
			invitationCodeUrl: '',
			userInfo: {}
		}
	},

	methods: {
		getCode() {
			this.userInfo = uni.getStorageSync(J_USER_INFO)
			uni.showLoading({
				title: '加载中'
			})
			const tempUrl = `https://www.tuanfengkeji.cn/JFShop_Uni_H5/#/pages/jump/jump?userId=${getUserId()}&type=invitation&code=`
			getQrCodeByH5Api({
				url: tempUrl
			}).then(({ data }) => {
				this.code = data.code
				this.invitationCodeUrl = data.qrCode
				uni.hideLoading()
			})
		},

		handleCopyData(text) {
			uni.setClipboardData({
				data: text,
				success: () => {
					uni.showToast({
						title: '复制成功'
					})
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.code-mask {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.5);
	transition: all 350ms;
	opacity: 0;

	.code-wrapper {
		width: 600upx;
		padding: 30upx;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 20upx;
		transform: scale(0);
		transition: all 350ms;

		.images {
			display: flex;
			margin: 30upx 0;
			justify-content: space-around;

			.zhiwen {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				color: #999999;

				image {
					width: 120upx;
					height: 120upx;
					margin-bottom: 10upx;
				}
			}

			image {
				width: 200upx;
				height: 200upx;
				object-fit: cover;
			}
		}

		.header {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.header-icon {
				width: 60upx;
				height: 60upx;
				margin-right: 10px;
			}
		}

		.big-wrapper {
			width: 100%;
			margin-top: 24upx;
			justify-content: center;
			display: flex;

			.big-icon {
				width: 280upx;
				height: 280upx;
				object-fit: cover;
			}
		}

		.code-title {
			text-align: center;
			font-size: 36upx;
			font-weight: bold;
			margin-top: 20upx;
		}

		.code {
			width: 540upx;
			height: 540upx;
			object-fit: cover;
			// border-radius: 54upx;
		}

		.uni-btn {
			padding-top: 20upx;
			border-top: 1upx solid #ccc;
			font-size: 32upx;
			letter-spacing: 1em;
			color: #ccc;
		}
	}
}
</style>
