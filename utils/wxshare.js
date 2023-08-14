const wx = require('weixin-js-sdk')

const wxShare = {
	/**
	 * [wxRegister 微信Api初始化]
	 * @param  {Function} callback [ready回调函数]
	 */

	wxRegister(data, option) {
		// data是微信配置信息，option是分享的配置内容
		wx.config({
			debug: false, // 开启调试模式
			appId: data.appId, // 必填，公众号的唯一标识
			timestamp: data.timestamp, // 必填，生成签名的时间戳
			nonceStr: data.nonceStr, // 必填，生成签名的随机串
			signature: data.signature, // 必填，签名，见附录1
			jsApiList: [
				'updateAppMessageShareData',
				'updateTimelineShareData',
				'onMenuShareAppMessage',
				'onMenuShareTimeline'
			], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			openTagList: [ 'wx-open-launch-weapp' ]
		})

		wx.ready(function () {
			wx.updateAppMessageShareData({
				title: option.title, // 分享标题
				desc: option.desc, // 分享描述
				link: option.link, // 分享链接
				imgUrl: option.imgUrl, // 分享图标
				success() {
					// 用户成功分享后执行的回调函数
					//  option.success()
					console.log('ok')
				},
				cancel() {
					// 用户取消分享后执行的回调函数
					// option.error()
					console.log('cancel')
				}
			})
			// updateTimelineShareData需要遵守一些规则：是微信公众号菜单上进入的页面或者是扫码进入的页面
			wx.updateTimelineShareData({
				title: option.title, // 分享标题
				link: option.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: option.imgUrl, // 分享图标
				success() {
					// 设置成功
				}
			})
			wx.onMenuShareTimeline({
				title: option.title, // 分享标题
				link: option.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: option.imgUrl, // 分享图标
				success() {
				// 用户点击了分享后执行的回调函数
				}
			})
		})

		wx.error(function (res) {
			// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
			// alert('error:'+JSON.stringify(res));
		})
	}
}
export default wxShare
