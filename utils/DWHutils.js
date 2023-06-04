import * as _ from 'lodash'

import { whoami } from '../api/auth'
import { J_USER_ID, J_USER_INFO, J_BRAND_ID, J_USER_TOKEN, J_TOKEN_EXPIRE } from '../constant'
import { jsonp } from 'vue-jsonp'
import html2canvas from 'html2canvas'
import QQMapWX from '../utils/qqmap-wx-jssdk.min.js'

/**
 * @description 解决小数计算精度问题（en，你应该使用big.js）
 * @param {Number, String} data 数字
 * @param {Number} accuracy 保留几位小数
 * @returns
 */

export const fomartNumber = (data, accuracy = 2) => {
	const temp = data + ''
	if (temp.includes('.')) {
		return (data * 1).toFixed(accuracy)
	}
	return data
}

/**
 * @description 批量清除缓存
 * @param {String[]} cacheArr 要清除的缓存string数组
 */

export const removeCache = (cacheArr) => {
	if (!Array.isArray(cacheArr)) {
		return
	}

	for (const item of cacheArr) {
		uni.removeStorageSync(item)
	}
}

/**
 * 检测登录是否有效
 */

export const checkWhoami = () => {
	// new Promise(async (resolve, reject) => {
	//   const userId = getUserId();
	//   const res = await whoami(userId);
	//   if (res.errno !== 0) {
	//     uni.navigateTo({
	//       url: "/pages/login/login",
	//     });
	//   }
	// });
}

/**
 * 更新token
 */

export const updateToken = async () => {
	const userId = uni.getStorageSync(J_USER_ID)
	// debugger
	if (userId) {
		const { data } = await whoami(userId)
		uni.setStorageSync(J_USER_TOKEN, data.token)
		uni.setStorageSync(J_TOKEN_EXPIRE, data.expireTime)
		uni.setStorageSync(J_BRAND_ID, data.brandId)
		uni.setStorageSync(J_USER_INFO, Object.assign(uni.getStorageSync(J_USER_INFO) || {}, {
			brandId: data.brandId || '',
			roleIds: data.roleIds || ''
		}))
	}
}

/**
 * 获取用户userid
 * @returns
 */

export const getUserId = () => {
	const userId = uni.getStorageSync(J_USER_ID)
	if (!userId) {
		// uni.showToast({
		//   title: "登录已失效，请重新登录",
		//   duration: 2000,
		//   icon: "none",
		// });
		uni.showModal({
			title: '提示',
			content: '您还未登录，是否去登录？',
			success(res) {
				if (res.confirm) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				} else if (res.cancel) {
					// uni.navigateBack();
				}
			}
		})
		return
	}
	return userId
}

/**
 * 获取商家brandId
 * @returns
 */

export const getBrandId = () => {
	const brandId = uni.getStorageSync(J_BRAND_ID)
	if (!brandId) {
		uni.showModal({
			title: '提示',
			content: '您还不是平台商家，是否去升级为商家？',
			success(res) {
				if (res.confirm) {
					uni.navigateTo({
						url: '/user/sever/userUp'
					})
				} else if (res.cancel) {
					// uni.navigateBack();
				}
			}
		})

		return
	}
	return brandId
}

/**
 * 点击复制
 * @param {*} text
 */

export const useCopy = (text) => {
	const input = document.createElement('input')
	input.value = text
	document.body.appendChild(input)
	input.select()
	document.execCommand('Copy')
	document.body.removeChild(input)
	uni.showToast({
		title: '单号复制成功'
	})
}

/**
 * @description 防抖函数
 * @param {*} func
 * @param {*} wait
 * @param {*} immediate
 * @returns
 */

export function handleDebounce(func, wait, immediate) {
	let timeout

	return function () {
		const context = this
		const args = arguments

		if (timeout) clearTimeout(timeout)
		if (immediate) {
			var callNow = !timeout
			timeout = setTimeout(() => {
				timeout = null
			}, wait)
			if (callNow) func.apply(context, args)
		} else {
			timeout = setTimeout(function () {
				func.apply(context, args)
			}, wait)
		}
	}
}

export function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min) + min)
}

/**
 * 根据地址获取经纬度
 * @param {*} address
 * @returns
 */

export const getAddressLongitudeAndLatitude = (address) => new Promise((resolve, reject) => {
	jsonp('https://apis.map.qq.com/ws/geocoder/v1/', {
		key: '3ODBZ-FVG3V-BPQPQ-UBZRP-ZXRVV-AUFGH',
		address,
		output: 'jsonp'
	})
		.then((res) => {
			resolve(res)
		})
		.catch((error) => {
			reject(error)
		})

	// uni.request({
	//   url: 'https://apis.map.qq.com/ws/geocoder/v1/',
	//   method: 'GET',
	//   data: {
	//     key: '3ODBZ-FVG3V-BPQPQ-UBZRP-ZXRVV-AUFGH',
	//     address: address,
	//     output: 'jsonp',
	//   },
	//   success: (res) => {
	//     console.log("成功了", res);
	//   },
	//   fail: () => { },
	//   complete: () => { }
	// })
})

/**
 * 根据经纬度逆解析地址
 */

export const getAdressDetailByLngLat = (lat, lng) => new Promise((resolve, reject) => {
	// #ifdef H5
	jsonp('https://restapi.amap.com/v3/geocode/regeo', {
		key: 'fcd4b7ee70f357abeffaef7b43d364b3',
		location: `${lng},${lat}`
	})
		.then((res) => {
			resolve(res)
		})
		.catch((err) => {
			reject(err)
		})
	// #endif

	// #ifdef APP-PLUS
	uni.request({
		url: 'https://restapi.amap.com/v3/geocode/regeo', // 仅为示例，并非真实接口地址。
		data: {
			key: 'fcd4b7ee70f357abeffaef7b43d364b3',
			location: `${lng},${lat}`
		},
		header: {},
		success: (res) => {
			resolve(res.data)
		},
		fail() {
			reject()
		}
	})
	// #endif

	// // #ifdef APP-PLUS
	// const TMap = new QQMapWX({
	//   key: '3ODBZ-FVG3V-BPQPQ-UBZRP-ZXRVV-AUFGH'
	// })

	// TMap.reverseGeocoder({
	//   location: {
	//     latitude: lat,
	//     longitude: lng
	//   },
	//   success: (res) => {
	//     resolve(res)
	//   },
	//   fail: () => {
	//     reject('定位失败')
	//   }
	// })
	// // #endif
})

/**
 * 延长登录
 */

export const delayedLoginStatus = () => {
	const userId = uni.getStorageSync(J_USER_ID)
	if (userId) {
		whoami(userId).then(({ data }) => {
			uni.setStorageSync(J_TOKEN_EXPIRE, data.expireTime)
			uni.setStorageSync(J_USER_TOKEN, data.token)
		})
	}
}

/**
 * 随即色
 * @returns
 */

export const randomRGB = () => {
	const r = Math.floor(Math.random() * 255)
	const g = Math.floor(Math.random() * 255)
	const b = Math.floor(Math.random() * 255)
	return `rgb(${r}, ${g}, ${b})`
}

/**
 * dom -> image
 */

export const domToImage = (el) => {
	html2canvas(el, {
		backgroundColor: '#fff'
	}).then((canvas) => {
		const image = canvas.toDataURL('image/png')
		console.log('来了', image)
	})
}

// 大数转换
export const transformNumber = (num) => {
	if (num >= 100000000) {
		num = (num / 100000000).toFixed(2) + '亿'
	} else if (num >= 10000) {
		num = (num / 10000).toFixed(2) + '万'
	} else {
		num = num.toFixed(2)
	}
	return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 判断当前是否处于微信环境
export const isInWx = () => {
	// #ifdef H5
	var ua = navigator.userAgent.toLowerCase()
	return ua.match(/MicroMessenger/i) == 'micromessenger'
	// #endif

	// #ifdef APP
	return false
	// #endif
}

export const getUrlCode = () => {
	var url = location.search
	var theRequest = new Object()
	if (url.indexOf('?') != -1) {
		var str = url.substr(1)
		var strs = str.split('&')
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
		}
	}

	console.log('code结果', theRequest)
	return theRequest
}

export const timestampToTime = (timestamp) => {
// 时间戳为10位需*1000，时间戳为13位不需乘1000
// var date = new Date(timestamp * 1000);
	var date = new Date(timestamp)
	var Y = date.getFullYear() + '-'
	var M =
(date.getMonth() + 1 < 10
	? '0' + (date.getMonth() + 1)
	: date.getMonth() + 1) + '-'
	var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
	var h = date.getHours() + ':'
	var m = date.getMinutes() + ':'
	var s = date.getSeconds()
	return Y + M + D + h + m + s
// console.log(timestampToTime(1670145353)); //2022-12-04 17:15:53
}

export const throttle = (fn, interval) => {
	let lastTime = 0
	const _throttle = function (...args) {
		const nowTime = new Date().getTime()
		const remainTime = interval - (nowTime - lastTime)
		if (remainTime <= 0) {
			fn.apply(this, args)
			lastTime = nowTime
		}
	}
	return _throttle
}
