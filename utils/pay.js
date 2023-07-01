import { J_PAY_ORDER } from '../constant'

export const payFn = (res, type, order) => {
	uni.removeStorageSync(J_PAY_ORDER)
	uni.setStorageSync(J_PAY_ORDER, {
		type: type || 'DEFAULT',
		JF_ORDER_NO: order,
		TL_ORDER_NO: res.orderNo
	})
	if (res.errno === -1) {
		uni.showToast({
			title: res.errmsg,
			duration: 2000,
			icon: 'error'
		})
	}
	if (res.errno === 0) {
		uni.redirectTo({
			url: '/user/otherServe/payment-completed/index'
		})
	} else {
		const payData = JSON.parse(res.h5PayUrl)
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
}
