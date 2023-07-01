import { BASE_URL, RUAN_URL, LANG_FEE_URL, XZL, HUANG_LOCATION_URL } from '../config'
import { J_USER_TOKEN } from '../constant'

const request = (base_url) => function (url, data = {}, method = 'post', cb) {
	return new Promise((resolve, reject) => [
		uni.request({
			url: base_url + url,
			data,
			method,
			header: {
				token: uni.getStorageSync(J_USER_TOKEN)
			},
			success: (res) => {
				if (res.data.errno !== 0) {
					if (
						res.data.errno === 403 &&
              res.data.errmsg === 'Token 校验失败'
					) {
						uni.showToast({
							title: 'token 已过期， 请重新登录！即将跳转到登录页',
							icon: 'none'
						})

						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}, 1000)
					} else {
						uni.showToast({
							title: res.data.errmsg,
							duration: 2000,
							icon: 'none'
						})
					}

					reject(res.data.errmsg)
				} else if (res.data.errno == 501) {
					uni.showModal({
						title: '提示',
						content: 'token 已过期请重新登录',
						success(res) {
							uni.clearStorage()
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}
					})
				} else {
					resolve(res.data)
				}
			},
			fail: (error) => {
				reject(error)
			},

			complete: () => {
				cb && typeof cb === 'function' && cb()
			}
		})
	])
}

const requestLang = (base_url) => function (url, data = {}, method = 'post', cb) {
	return new Promise((resolve, reject) => [
		uni.request({
			url: base_url + url,
			data,
			method,
			success: (res) => {
				resolve(res.data)
			},
			fail: (error) => {
				reject(error)
			},

			complete: () => {
				cb && typeof cb === 'function' && cb()
			}
		})
	])
}

export const GyRequest = request(BASE_URL)
export const RuanRequest = request(RUAN_URL)
export const LTRequest = requestLang(LANG_FEE_URL)
export const HXRequest = request(HUANG_LOCATION_URL)
