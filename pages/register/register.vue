<template>
	<view class="register-container">
		<view style="padding: 30upx 20upx;color: #000000;">
			<JHeader width="50" height="50" title="返回"></JHeader>
		</view>
		<view class="register-wrapper">
			<h2>{{ pageInfo.title }}</h2>
			<JField
				v-for="item in registerFields" :key="item.label" v-model="formData[item.field]" :label="item.label"
				:type="item.type" :placeholder="item.placeholder"
			></JField>

			<JAuthButton :text="pageInfo.btnTxt" @click="handleSubmit"></JAuthButton>
		</view>
	</view>
</template>

<script>
import { registerFields, mapText } from './config'
import { resetPasswodApi, userRegisterApi } from '../../api/auth'

export default {
	name: 'Register',
	data() {
		return {
			registerFields,
			type: '',
			formData: {
				mobile: '',
				code: '',
				password: '',
				validatePdw: ''
			},
			pageInfo: {}
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

			try {
				await api(data)

				uni.showToast({
					title: this.type === 'register' ? '注册成功' : '密码重置成功',
					duration: 2000
				})

				uni.navigateTo({
					url: `/pages/login/login?type=${this.type === 'register' ? 'register' : 'forget'}&redirect=/pages/index/index&tabbar=1`
				})
			} catch (error) { }
		}
	}
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.register-container{
	/deep/ .j-header-container{
		.title {
			margin-left: 0;
			text-align: left;
		}
	}

.register-wrapper {
	position: relative;
	color: #3d3d3d;
	.flex(center, center);
	flex-direction: column;
	padding: 192upx 60upx 0 60upx;
	overflow: hidden;

	&::after {
		content: "";
		display: block;
		background: url("https://adminapi.jfcmei.com/admin/storage/fetch/720ysa3uh3ynjg10htcv.png") no-repeat;
		background-size: cover;
		width: 172%;
		height: 200upx;
		margin-top: 100upx;
	}

	h2 {
		font-size: 36upx;
		font-weight: normal;
		margin-bottom: 100upx;
	}

	.j-auth-button {
		border-radius: 20upx;
		margin-top: 120upx;
	}
}
}
</style>
