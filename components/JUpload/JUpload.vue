<template>
	<view>
		<view v-if="title" class="title">{{ title }}</view>
		<view class="upload-pane">
			<view class="left">
				<view v-if="!imgUrl" class="upload" @click="chooseImg">+</view>
				<img v-else class="iamge-background" :src="common.seamingImgUrl(imgUrl)" mode="" />
			</view>
			<image
				v-show="imgUrl" class="delete-icon" :src="common.seamingImgUrl('ghggvke7uc134gbv71gh.png')"
				mode="" @click="removeBackground"
			/>
		</view>
	</view>
</template>

<script>
export default {
	name: 'JUpload',
	props: {
		imgUrl: String,
		title: String
	},
	methods: {
		removeBackground() {
			const _this = this
			uni.showModal({
				title: '提示',
				content: '确定删除当前图片吗？',
				success(res) {
					if (res.confirm) {
						_this.$emit('delete')
					}
				}
			})
		},

		chooseImg() {
			const _this = this
			uni.chooseImage({
				success: (chooseImageRes) => {
					uni.uploadFile({
						url: 'https://appapi.jfcmei.com/wx/storage/upload',
						filePath: chooseImageRes.tempFiles[0].path,
						name: 'file',
						success: (uploadFileRes) => {
							_this.$emit('upload', JSON.parse(uploadFileRes.data).data.url)
						}
					})
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.title {
	color: #3d3d3d;
	font-size: 24upx;
	margin: 48upx 0 20upx 0;
}

.upload-pane {
	border: 1upx solid #d8d8d8;
	padding: 32upx 24upx;
	box-sizing: border-box;
	border-radius: 20upx;

	display: flex;
	justify-content: space-between;
	align-items: flex-end;

	.delete-icon {
		width: 32upx;
		height: 36upx;
	}

	.left {
		display: flex;
		align-items: center;
	}

	.upload {
		margin: 0;
		width: 160upx;
		height: 160upx;
		background-color: #ececec;
		border-radius: 20upx;
		color: #767676;
		text-align: center;
		line-height: 160upx;
		font-size: 60upx;
	}

	.iamge-background {
		width: 160upx;
		height: 160upx;
		object-fit: cover;
	}
}
</style>
