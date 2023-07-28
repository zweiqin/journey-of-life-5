import { J_PAY_ORDER } from '../constant'
// import { mapState, mapGetters } from 'vuex'
import store from '../store'
import { payOrderGoodsApi, payOrderGoodsAPPApi } from '../api/goods'
import { getUserId } from './index'

// export const payH5Method = (res, type) => {
// 	uni.removeStorageSync(J_PAY_ORDER)
// 	uni.setStorageSync(J_PAY_ORDER, {
// 		type: type || 'DEFAULT',
// 		TL_ORDER_NO: res.orderNo
// 	})
// 	if (res.errno === -1) {
// 		uni.showToast({
// 			title: res.errmsg,
// 			duration: 2000,
// 			icon: 'error'
// 		})
// 	}
// 	if (res.data === '支付成功') { // 零元支付情况
// 		uni.redirectTo({
// 			url: '/user/otherServe/payment-completed/index'
// 		})
// 	} else {
// 		const payData = JSON.parse(res.data.h5PayUrl)
// 		const form = document.createElement('form')
// 		form.setAttribute('action', payData.url)
// 		form.setAttribute('method', 'POST')
// 		const data = JSON.parse(payData.data)
// 		let input
// 		for (const key in data) {
// 			input = document.createElement('input')
// 			input.name = key
// 			input.value = data[key]
// 			form.appendChild(input)
// 		}
// 		document.body.appendChild(form)
// 		form.submit()
// 		document.body.removeChild(form)
// 	}
// }

export const payFn = (data, payType, type) => {
	// console.log({ ...mapState('app', [ 'isInMiniProgram' ]) })
	// console.log(mapState('app', [ 'isInMiniProgram' ]).isInMiniProgram)
	// console.log({ ...mapState({ 'isInMiniProgram': (state) => state.isInMiniProgram }) })
	console.log(store.state.app.isInMiniProgram)
	if (store.state.app.isInMiniProgram) {  // || getApp().globalData.isInMiniprogram
		payOrderGoodsAPPApi({
			userId: getUserId(),
			orderNo: data.orderSn,
			payType
		}).then((res) => {
			if (res.errno === 0) {
				uni.removeStorageSync(J_PAY_ORDER)
				uni.setStorageSync(J_PAY_ORDER, {
					type: type || 'DEFAULT',
					TL_ORDER_NO: data.orderSn
				})
				if (res.data === '支付成功') { // 零元支付情况
					uni.redirectTo({
						url: '/user/otherServe/payment-completed/index'
					})
				} else {
					let query = ''
					for (const key in res.data) {
						query += key + '=' + res.data[key] + '&'
					}
					wx.miniProgram.navigateTo({
						url: '/pages/loading/loading?' + query + 'orderNo=' + data.orderSn + '&userId=' + getUserId(),
						fail: () => {
							uni.redirectTo({
								url: '/user/orderForm/order-form'
							})
						}
					})
				}
			}
		})
	} else {
		// #ifdef H5
		payOrderGoodsApi({
			orderNo: data.orderSn,
			userId: getUserId(),
			payType
		}).then((res) => {
			uni.removeStorageSync(J_PAY_ORDER)
			uni.setStorageSync(J_PAY_ORDER, {
				type: type || 'DEFAULT',
				TL_ORDER_NO: data.orderSn
			})
			if (res.data === '支付成功') { // 零元支付情况
				uni.redirectTo({
					url: '/user/otherServe/payment-completed/index'
				})
			} else {
				const payData = JSON.parse(res.data.h5PayUrl)
				const form = document.createElement('form')
				form.setAttribute('action', payData.url)
				form.setAttribute('method', 'POST')
				const data = JSON.parse(payData.data)
				let input
				for (const key in data) {
					input = document.createElement('input')
					input.name = key
					input.value = data[key]
					form.appendChild(input)
				}
				document.body.appendChild(form)
				form.submit()
				document.body.removeChild(form)
			}
		})
		// #endif
		// #ifdef APP
		payOrderGoodsAPPApi({
			userId: getUserId(),
			orderNo: data.orderSn,
			payType
		}).then((res) => {
			if (res.errno === 0) {
				uni.removeStorageSync(J_PAY_ORDER)
				uni.setStorageSync(J_PAY_ORDER, {
					type: type || 'DEFAULT',
					TL_ORDER_NO: data.orderSn
				})
				if (res.data === '支付成功') { // 零元支付情况
					uni.redirectTo({
						url: '/user/otherServe/payment-completed/index'
					})
				} else {
					let query = ''
					for (const key in res.data) {
						query += key + '=' + res.data[key] + '&'
					}
					plus.share.getServices(function (result) {
						let sweixin = null
						for (const i in result) {
							if (result[i].id == 'weixin') {
								sweixin = result[i]
							}
						}
						if (sweixin) {
							sweixin.launchMiniProgram({
								id: 'gh_e64a1a89a0ad', // 微信小程序的原始ID（"g_"开头的字符串）
								type: 0,
								path: 'pages/orderDetail/orderDetail?' + query
							})
						}
					}, function (e) {
						console.log('获取分享服务列表失败：' + e.message)
					})
				}
			}
		})
		// #endif
	}
}
