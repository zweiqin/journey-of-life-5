import { isInWx } from './index'

export const saveImg = (url, cb) => {
	// #ifdef H5
	if (isInWx()) {
		uni.showToast({
			title: '请长按图片保存',
			duration: 2000,
			icon: 'none'
		})
	} else {
		const uniappA = document.createElement('a')
		uniappA.download = ''
		uniappA.href = url
		document.body.appendChild(uniappA)
		uniappA.click()
		uniappA.remove()
		cb && typeof cb === 'function' && cb()
	}
	// #endif

	// #ifdef APP || MP
	uni.saveImageToPhotosAlbum({
		filePath: url,
		success() {
			cb && typeof cb === 'function' && cb()
		}
	})
	// #endif
}
