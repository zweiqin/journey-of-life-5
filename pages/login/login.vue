<template>
	<view class="login-container">
		<view class="register" @click="go('/pages/register/register?type=register')">注册</view>
		<image
			class="logo" src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/8lgf13vjcr9stft2tvt5.png"
			mode=""
		/>

		<view class="form-content">
			<view class="item">
				<label for="mobile">手机号</label>
				<view class="input">
					<input id="mobile" v-model="loginForm.username" type="text" placeholder="请输入手机号码" />
				</view>
			</view>

			<view class="item">
				<label for="password">密码</label>
				<view class="input">
					<input id="password" v-model="loginForm.password" :type="isShowPwd ? 'text' : 'password'" placeholder="请输入密码" />
				</view>
				<image
					class="hidden-passwod" :src="isShowPwd
						? 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/1035vvc88rxf5768exul.png'
						: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/ivr6snx5152prfpssx3j.png'
					" mode="" @click="isShowPwd = !isShowPwd"
				/>
				<view class="forget-password" @click="go('/pages/register/register?type=forgetPwd')">（找回密码）</view>
			</view>
		</view>

		<JAuthButton text="登录" class="btn" type="error" @click="handleLogin"></JAuthButton>
		<!-- <view class="remember-password">免密码登录</view> -->

		<view class="footer">
			<image
				v-for="(item, index) in moreLogins" :key="item.icon" class="icon" :class="{
					more: index === 3
				}"
				:src="item.icon" mode="" @click="handleWXLogin"
			/>
		</view>
	</view>
</template>

<script>
import { userLoginApi, wxLoginApi } from '../../api/auth'
import { moreLogins } from './config'
import {
	J_USER_INFO,
	J_USER_TOKEN,
	J_TOKEN_EXPIRE,
	J_USER_ID,
	J_BRAND_ID,
	J_NEW_BIND_TYPE
} from '../../constant'
import { getUserId, getUrlCode } from '../../utils'
export default {
	name: 'Login',
	data() {
		return {
			type: '',
			moreLogins,
			redirect: '',
			loginForm: {
				username: '',
				password: ''
			},
			isShowPwd: false,
			isTabbar: false
		}
	},
	methods: {
		go(url) {
			uni.navigateTo({
				url
			})
		},

		handleLogin() {
			const { username, password } = this.loginForm
			if (!username || !password) {
				this.$showToast('手机号或密码不能为空')
				return
			}
			if (
				!/^1[3456789]\d{9}$/.test(username)
			) {
				uni.showToast({
					title: '手机号格式不正确',
					duration: 2000,
					icon: 'none'
				})
				return
			}
			if (password.length < 6) {
				this.$showToast('密码不能小于六位')
				return
			}
			userLoginApi({
				...this.loginForm
			}).then((res) => {
				uni.setStorageSync(J_USER_INFO, res.data.userInfo)
				uni.setStorageSync(J_USER_TOKEN, res.data.token)
				uni.setStorageSync(J_USER_ID, res.data.userInfo.userId)
				uni.setStorageSync(J_BRAND_ID, res.data.userInfo.brandId)
				uni.setStorageSync(J_TOKEN_EXPIRE, new Date(res.data.tokenExpire).getTime())
				this.$showToast('登录成功', 'success')
				setTimeout(() => {
					if (uni.getStorageSync(J_NEW_BIND_TYPE)) {
						uni.redirectTo({ url: '/pages/jump/jump' })
					} else if (this.isTabbar) {
						uni.switchTab({
							url: this.redirect || '/pages/index/index'
						})
					} else if (this.redirect) {
						uni.redirectTo({
							url: this.redirect
						})
					} else {
						uni.switchTab({
							url: '/pages/index/index'
						})
					}
				}, 2000)
			})
		},

		// 点击微信登录
		async handleWXLogin() {
			// #ifdef H5
			const appid = 'wx603b04a561e4683e'
			const local = 'https://www.tuanfengkeji.cn/JFShop_Uni_H5/#/pages/login/login'
			const code = getUrlCode().code
			// console.log('获取code', code)
			// alert('获取code', code)
			if (code === null || code === undefined || code === '') {
				window.location.href =
					'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
					appid +
					'&redirect_uri=' +
					encodeURIComponent(local) +
					'&response_type=code&scope=snsapi_userinfo#wechat_redirect'
			} else {
				const { data } = await wxLoginApi({
					code
				})
				uni.setStorageSync(J_USER_ID, data.userInfo.userId)
				uni.setStorageSync(J_USER_INFO, data.userInfo)
				uni.setStorageSync(J_USER_TOKEN, data.token)
				// ofxYi6eg9rdj8qZx3rwSecysgePo
				if (!data.status) {
					uni.navigateTo({
						url: '/pages/login/bind-phone?openId=' + data.userInfo.openId
					})
				} else {
					this.$showToast('登录成功', 'success')
					setTimeout(() => {
						if (uni.getStorageSync(J_NEW_BIND_TYPE)) {
							uni.redirectTo({ url: '/pages/jump/jump' })
						} else if (this.isTabbar) {
							uni.switchTab({
								url: this.redirect || '/pages/index/index'
							})
						} else if (this.redirect) {
							uni.redirectTo({
								url: this.redirect
							})
						} else {
							uni.switchTab({
								url: '/pages/index/index'
							})
						}
					}, 2000)
				}
			}
			// #endif
		}
	},

	onLoad(options) {
		this.type = options.type
		this.redirect = options.redirect
		this.isTabbar = !!options.tabbar
		if (this.type === 'register') {
			this.$showToast('注册成功', 'success')
		} else if (uni.getStorageSync(J_NEW_BIND_TYPE)) {
			if (uni.getStorageSync(J_USER_ID) && uni.getStorageSync(J_USER_INFO)) {
				uni.redirectTo({ url: '/pages/jump/jump' })
			}
		} else if (this.type === 'forget') {
			this.$showToast('密码重置成功', 'success')
		}
	},

	onShow() {
		// #ifdef H5
		const code = getUrlCode().code
		if (code) {
			this.handleWXLogin()
		}
		// #endif
	}
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";

.login-container {
  .flex(center, center);
  flex-direction: column;
  padding: 100upx 54upx 116upx 54upx;

  .register {
    width: 100%;
    text-align: right;
    font-size: 24upx;
  }

  .logo {
    width: 164upx;
    height: 150upx;
    margin: 100upx 0;
  }

  .form-content {
    flex: 1;
    text-align: left;
    width: 100%;
    color: #3d3d3d;
    font-size: 28upx;

    .item {
      position: relative;
      display: flex;
			align-items: center;
      margin-bottom: 54upx;

      label {
        width: 90upx;
        text-align-last: justify;
        margin-right: 26upx;
      }

      .input {
        font-size: 28upx;
        flex: 1;
        padding-bottom: 10upx;
        border-bottom: 1upx solid #ccc;

        input {
          font-size: 28upx;
        }
      }

      #password {
        border: none;
        outline: none;
      }

      .hidden-passwod {
        position: absolute;
        width: 32.48upx;
        height: 18upx;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
      }

      .forget-password {
        position: absolute;
        color: #07b9b9;
        font-size: 24upx;
        bottom: -100%;
        right: 0;
      }
    }
  }

  .btn {
    margin: 120upx 0 28upx 0;
  }

  .remember-password {
    font-size: 28upx;
    color: #3d3d3d;
  }

  .footer {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 200upx;

    .icon {
      width: 50upx;
      height: 40upx;
      object-fit: cover;

      &.more {
        width: 36upx;
        height: 8upx;
      }
    }
  }
}
</style>
