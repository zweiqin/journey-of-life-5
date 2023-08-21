<template>
	<view class="evaluate-info">
		<view class="line">
			<view style="margin-right: 12upx;">满意</view>
			<uni-rate v-model="evForm.star"></uni-rate>
		</view>
		<view class="line">
			<view style="margin-right: 12upx;">评论</view>
			<textarea v-model="evForm.content" placeholder="请输入商品评论" class="evaluate-textarea" maxlength="200"></textarea>
		</view>
		<view class="line">
			<view>晒图/视频</view>
			<view class="images">
				<view v-for="item in evForm.picUrls" :key="item">
					<image class="user-upload-img" :src="common.seamingImgUrl(item)" mode="" />
				</view>
				<view class="upload-icon" @click="handleUploadImg">+</view>
			</view>
		</view>
	</view>
</template>

<script>
import { addCommentPostApi } from '../../api/order'
import { getUserId } from '../../utils'
export default {
	name: 'CommentGoods',
	props: {
		commentGoodsId: {
			type: Number,
			required: true
		}
	},
	data() {
		return {
			evForm: {
				userId: getUserId(),
				star: 5,
				content: '',
				hasPicture: true,
				picUrls: []
			}
		}
	},
	methods: {
		submitComment() {
			if (!this.commentGoodsId) return this.$showToast('获取商品信息失败')
			uni.showModal({
				title: '提示',
				content: '确定提交评价吗',
				success: (res) => {
					if (res.confirm) {
						if (!this.evForm.star) return this.$showToast('请选择评分')
						if (!this.evForm.content) return this.$showToast('请填写评价')
						this.evForm.hasPicture = !!this.evForm.picUrls.length
						this.evForm.picUrls = [ ...this.evForm.picUrls ]
						const data = {
							...this.evForm,
							// orderGoodsId: this.commentGoodsId * 1,
							type: 0,
							valueId: this.commentGoodsId
						}
						addCommentPostApi(data).then(() => {
							uni.showToast({
								title: '评论成功',
								duration: 2000
							})
							this.$emit('success')
							// setTimeout(() => {
							// 	uni.navigateBack()
							// }, 1000)
						})
					}
				}
			})
		},
		// 上传图片
		handleUploadImg() {
			const _this = this
			uni.chooseImage({
				success: (chooseImageRes) => {
					uni.uploadFile({
						url: 'https://appapi.jfcmei.com/wx/storage/upload',
						filePath: chooseImageRes.tempFiles[0].path,
						name: 'file',
						success: (uploadFileRes) => {
							_this.evForm.picUrls.push(JSON.parse(uploadFileRes.data).data.url)
						}
					})
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.evaluate-info {
	margin-top: 20upx;
	padding: 0 40upx;
	box-sizing: border-box;
	background-color: #fff;

	.line {
		padding: 16upx 0;
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;

		&:nth-child(3) {
			display: block !important;

			.title {
				margin-bottom: 20upx;
			}

			.images {
				display: flex;
				flex-wrap: wrap;
				margin-top: 16upx;

				.user-upload-img {
					width: 120upx;
					height: 120upx;
					border-radius: 6upx;
					object-fit: cover;
					margin-right: 10upx;
					margin-bottom: 10upx;
				}

				.upload-icon {
					width: 120upx;
					height: 120upx;
					border-radius: 6upx;
					background-color: #d8d8d8;
					color: #fff;
					font-size: 54upx;
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 0 6upx 6upx 0;
					box-sizing: border-box;
				}
			}
		}

		.title {
			margin-right: 30upx;
			white-space: nowrap;
			flex-shrink: 0;
		}

		.evaluate-textarea {
			flex: 1;
			height: 160upx;
		}

	}
}
</style>
