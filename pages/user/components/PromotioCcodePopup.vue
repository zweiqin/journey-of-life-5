<template>
	<view
		class="code-mask" :style="{
			'opacity': extensionCodeUrl && userInfo && userInfo.nickName ? '1' : '0',
			'z-index':
				extensionCodeUrl && userInfo && userInfo.nickName ? '1' : '-1'
		}"
	>
		<view
			class="code-wrapper" :style="{
				transform: extensionCodeUrl ? 'scale(1)' : 'scale(0)'
			}"
		>
			<view class="header">
				<view style="display: flex;justify-content: center;align-items: center;">
					<image class="header-icon" src="/static/images/user/ju-icon.png" mode="" />
					<text>我的推广码</text>
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
					<image class="code" :src="extensionCodeUrl" alt="" />
					<view style="font-size: 26upx;color: #06a6f0;" @click="handleCopyData(`https://www.tuanfengkeji.cn/JFShop_Uni_H5/#/pages/jump/jump?userId=${userInfo.userId}&type=bindingStore&code=${code}`)">复制链接</view>
				</view>
			</view>

			<button class="uni-btn" @click="extensionCodeUrl = ''">取消</button>
		</view>
	</view>
</template>

<script>
// import jsQR from 'jsqr'
import { J_USER_INFO } from '../../../constant'
import { getExtensionCodeApi } from '../../../api/user'
import { getUserId } from '../../../utils'
export default {
	name: 'PromotioCcodePopup',
	data() {
		return {
			code: '',
			extensionCodeUrl: '',
			userInfo: {}
		}
	},

	methods: {
		getCode() {
			this.userInfo = uni.getStorageSync(J_USER_INFO)
			uni.showLoading({
				title: '加载中'
			})
			let tempUrl
			if (this.userInfo.roleIds === 2) {
				tempUrl = `https://www.tuanfengkeji.cn/JFShop_Uni_H5/#/pages/jump/jump?userId=${getUserId()}&type=bindingBranchOffice&code=`
			} else if (this.userInfo.roleIds === 6) {
				tempUrl = `https://www.tuanfengkeji.cn/JFShop_Uni_H5/#/pages/jump/jump?userId=${getUserId()}&type=bindingPlanner&code=`
			} else if (this.userInfo.roleIds === 4 || this.userInfo.roleIds === 3) {
				tempUrl = `https://www.tuanfengkeji.cn/JFShop_Uni_H5/#/pages/jump/jump?userId=${getUserId()}&type=bindingStore&code=`
			} else if (this.userInfo.roleIds === 11 || this.userInfo.roleIds === 10 || this.userInfo.roleIds === 7 || this.userInfo.roleIds === 5) {
				tempUrl = `https://www.tuanfengkeji.cn/JFShop_Uni_H5/#/pages/jump/jump?userId=${getUserId()}&type=nothing&code=`
			}
			getExtensionCodeApi({
				url: tempUrl
			}).then(({ data }) => {
				// { "code": "JFPTYEY3", "qrCode": "data:image/png;base64,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" }
				// https://www.tuanfengkeji.cn/JFShop_Uni_H5/#/pages/...=JFPTYEY3
				console.log(data)
				this.code = data.code
				this.extensionCodeUrl = data.qrcode
				// const array = new Uint8Array(this.extensionCodeUrl.length)
				// for (let i = 0; i < this.extensionCodeUrl.length; i++) {
				// 	array[i] = this.extensionCodeUrl.charCodeAt(i)
				// }
				// const byteArray = new Uint8Array(array)
				// const blob = new Blob([ byteArray ], { type: 'image/png' })
				// console.log(URL.createObjectURL(blob))
				// console.log(jsQR(array, 100, 100))
				// console.log(jsQR(uni.base64ToArrayBuffer(this.extensionCodeUrl), 100, 100))
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
			margin-top: 70upx;
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
