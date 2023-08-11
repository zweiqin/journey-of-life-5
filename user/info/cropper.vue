<template>
	<view class="cropper-container">
		<tui-cropper :is-round="true" :image-url="cropperUrl" @cropper="handleConfirm" @ready="handleReady"></tui-cropper>

		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
import { J_USER_INFO } from '../../constant'
import { updateUserInfoApi, refrshUserInfoApi } from '../../api/user'
export default {
	onLoad(params) {
		this.imgUrl = params.imgUrl
	},

	data() {
		return {
			imgUrl: '',
			cropperUrl: '',
			timer: null
		}
	},

	methods: {
		handleReady() {
			this.cropperUrl = this.imgUrl
		},

		handleConfirm(e) {
			const userInfo = uni.getStorageSync(J_USER_INFO)
			uni.showLoading({
				title: '图片上传中...'
			})
			uni.uploadFile({
				url: 'https://appapi.jfcmei.com/wx/storage/upload',
				filePath: e.url,
				name: 'file',
				success: async (uploadFileRes) => {
					const avatarUrl = JSON.parse(uploadFileRes.data).data.url
					const originData = {
						nickname: userInfo.nickName,
						avatar: userInfo.avatarUrl,
						password: userInfo.password,
						id: userInfo.userId,
						avatar: avatarUrl
					}

					updateUserInfoApi(originData)
						.then((data) => {
							uni.hideLoading()
							uni.showToast({
								title: '头像修改成功'
							})

							refrshUserInfoApi({
								userId: userInfo.userId,
								openId: ' '
							}).then(({ data }) => {
								uni.setStorageSync(J_USER_INFO, data)
								this.userInfo = data
								this.$forceUpdate()
							})
						})
						.catch(() => {
							uni.hideLoading()
						})

					uni.showToast({
						title: '头像上传成功'
					})
					setTimeout(() => {
						uni.redirectTo({ url: '/user/info/detail' })
					}, 1000)
				},
				complete: () => {
					uni.hideLoading()
				}
			})
		}
	}
}
</script>
