<template>
	<view class="container flex-column">
		<view class="register" @click="$redirectTo('/pages/login/login')">
			登录
		</view>
		<view class="PhoneAuthentication">
			<text class="textRL">{{ pageInfo.title }}</text>
			<text class="textTips">{{ pageInfo.subTitle }}</text>
		</view>
		<view class="LoginForm">
			<view class="iphoneNum-box">
				<text class="labels">手机号</text>
				<input v-model="formData.mobile" type="text" placeholder="请输入手机号">
			</view>
			<view class="iphoneNum-box">
				<text class="labels">设置密码</text>
				<input v-model="formData.password" type="text" password placeholder="请设置密码">
			</view>
			<view class="iphoneNum-box">
				<text class="labels">再次输入密码</text>
				<input v-model="formData.validatePdw" type="text" password placeholder="请设置密码">
			</view>
			<view class="ReadingAgreement">
				<radio style="transform:scale(0.8)" color="#CE2601" :checked="agreement" @click="agreement = !agreement" />
				<view class="Agreement">
					我已阅读并同意<text class="redText">
						《巨蜂商城用户服务协议》
					</text>以及<text class="redText">
						《隐私政策》
					</text>
				</view>
			</view>
		</view>
		<tui-button
			:disabled="!agreement" type="danger" width="650rpx" margin="0 auto"
			height="82rpx"
			style="margin-top: 60rpx;" @click="handleSubmit"
		>
			{{ pageInfo.btnTxt }}
		</tui-button>
		<view class="problem">
			<text @click="$redirectTo('/pages/login/login')">
				已有账号<text class="redText">
					去登录
				</text>
			</text>
			<text>无法接收验证码？</text>
		</view>

	</view>
</template>

<script>
import { resetPasswodApi, userRegisterApi } from '../../api/auth'
const mapText = {
	register: {
		title: '手机号快捷注册',
		subTitle: '注册完后可用于登录',
		btnTxt: '立即注册'
	},
	forgetPwd: {
		title: '找回密码',
		subTitle: '找回密码后可用于登录',
		btnTxt: '重置密码'
	}
}

export default {
	name: 'Register',
	data() {
		return {
			registerFields: [
				{
					label: '手机号',
					field: 'mobile',
					type: 'text'
				},
				{
					label: '新密码',
					field: 'password',
					type: 'pwd'
				},
				{
					label: '确认密码',
					field: 'validatePdw',
					type: 'pwd'
				}
				// {
				//   label: "验证码",
				//   field: "code",
				//   type: "code",
				// },
			],
			type: '',
			formData: {
				mobile: '',
				code: '',
				password: '',
				validatePdw: ''
			},
			pageInfo: {},
			agreement: false
		}
	},

	onLoad(options) {
		this.type = options.type
		this.pageInfo = mapText[options.type]
		uni.setNavigationBarTitle({
			title: this.type === 'register' ? '注册' : '重置密码'
		})
	},

	methods: {
		async handleSubmit() {
			const { mobile, password, validatePdw } = this.formData
			if (!mobile || !password || !validatePdw) {
				uni.showToast({
					title: '请入完整信息',
					duration: 2000,
					icon: 'none'
				})
				return
			}

			if (
				!/^1[3456789]\d{9}$/.test(mobile)
			) {
				uni.showToast({
					title: '手机号格式不正确',
					duration: 2000,
					icon: 'none'
				})
				return
			}

			if (password.trim() !== validatePdw.trim()) {
				uni.showToast({
					title: '两次密码输入不一致',
					duration: 2000,
					icon: 'none'
				})
				return
			}

			if (password.trim().length < 6) {
				uni.showToast({
					title: '密码至少为6位',
					duration: 2000,
					icon: 'none'
				})
				return
			}

			const api = this.type === 'register' ? userRegisterApi : resetPasswodApi
			const data =
				this.type === 'register'
					? {
						username: mobile,
						password,
						mobile
					}
					: {
						mobile,
						password
					}
			await api(data)
			uni.showToast({
				title: this.type === 'register' ? '注册成功' : '密码重置成功',
				duration: 2000
			})
			this.$redirectTo(`/pages/login/login?type=${this.type === 'register' ? 'register' : 'forget'}&redirect=/pages/index/index&tabbar=1`)
		}
	}
}
</script>

<style lang="less" scoped>
.container {
	background-color: #FFFFFF;

	.redText {
		color: #CE2601;
	}

	.register {
		margin-top: 50rpx;
		position: relative;
		text-align: right;
		padding-right: 40rpx;
	}

	.PhoneAuthentication {
		margin-top: 15rpx;
		font-family: Source Han Sans CN;
		width: 466rpx;
		height: 100rpx;
		display: flex;
		flex-direction: column;
		padding: 0px 30rpx;
		gap: 8rpx;

		.textRL {
			font-size: 44rpx;
			font-weight: 600;
			line-height: 60rpx;
			color: #222229;
		}

		.textTips {
			font-size: 24rpx;
			font-weight: 350;
			line-height: 32rpx;
			color: #888889;
		}
	}

	.LoginForm {
		margin-top: 50rpx;
		width: 750rpx;

		.iphoneNum-box {
			/* 自动布局 */
			margin: 0 auto;
			height: 114rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 32rpx;
			border-bottom: 2rpx solid #E6E6E8;
			width: 690rpx;
			color: #222229;

			.labels {
				font-size: 32rpx;
				font-weight: normal;
				line-height: 48rpx;
			}
		}

		.ReadingAgreement {
			width: 710rpx;
			margin: 0 auto;
			margin-top: 33rpx;
			gap: 32rpx;
			display: flex;
			align-items: center;
			font-size: 24rpx;

			.Agreement {
				margin-left: -15rpx;
			}
		}
	}

	.problem {
		margin: 0 auto;
		margin-top: 30rpx;
		width: 654rpx;
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
		font-weight: 350;
		line-height: 32rpx;
		color: #878788;
	}

}
</style>
