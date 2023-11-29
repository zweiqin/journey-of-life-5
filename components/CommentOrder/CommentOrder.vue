<template>
	<tui-drawer mode="bottom" :visible="drawerVisible" @close="handleClose">
		<view style="height: 100vh;overflow-y: auto;box-sizing: border-box;">
			<view class="order-detail-container">
				<view class="page-head">
					<tui-icon name="arrowleft" color="#3d3d3d" @click="handleClose"></tui-icon>
					<view>订单评价</view>
					<view class="uni-btn-wrapper"><button class="uni-btn" @click="handleSubmit">提交</button></view>
				</view>

				<view class="rate-container">
					<view class="pane">
						<view class="pane-title-wrapper">
							<view class="title">物流服务评价</view>
							<view class="tip"></view>
						</view>

						<!-- 订单评论 -->
						<view class="pane-content">
							<view v-for="item in rateOrderWholeList" :key="item.key" class="rate-item">
								<view class="rate-item-title">{{ item.label }}</view>
								<tui-rate
									:current="rateForm[item.key]" :size="24" normal="#ccc" active="#ff7900"
									@change="handleSetRate($event, item.key)"
								></tui-rate>
								<text class="rate-text"> {{ rateForm[item.key] | filterRateNumberToStr }}</text>
							</view>
						</view>
					</view>

					<tui-alerts
						background-color="#ccc" style="margin-top: 40upx" type="success" title="温馨提示"
						desc="单个商品需要输入对商品的评价才算评论成功"
					></tui-alerts>

					<!-- 单个商品评论 -->
					<view v-if="orderDetail && orderDetail.orderGoods && orderDetail.orderGoods.length">
						<view v-for="(goods, index) in orderDetail.orderGoods" :key="goods.id" class="rate-goods">
							<view class="goods-info">
								<image class="goods-pic" :src="common.seamingImgUrl(goods.picUrl)"></image>
								<view class="detail-info">
									<view class="goods-name">
										{{ goods.goodsName }} <text class="goods-price">(￥{{ goods.price }})</text>
									</view>
									<view class="sps">
										<text v-if="goods.number"> {{ goods.number }} x </text>{{ goods.specifications.join(',') }}
									</view>
								</view>
							</view>

							<view class="rate-content">
								<view class="rate-item">
									<view class="rate-item-title">商品评价</view>
									<tui-rate
										:current="rateForm.commentGoods[index].rate3" :size="24" normal="#ccc" active="#ff7900"
										@change="handleSetRate($event, index)"
									></tui-rate>
									<text class="rate-text"> {{ rateForm.commentGoods[index].rate3 | filterRateNumberToStr }}</text>
									<tui-label>
										<tui-list-cell>
											<view class="thorui-align__center" @click="handleChooseAnonymousStatus(index)">
												<tui-icon
													:color="rateForm.commentGoods[index].isAnonymous ? '#ff7900' : ''" :size="16"
													:name="rateForm.commentGoods[index].isAnonymous ? 'circle-fill' : 'circle'"
												></tui-icon>
												<text class="tui-text">匿名评论</text>
											</view>
										</tui-list-cell>
									</tui-label>
								</view>

								<view class="evaluate">
									<tui-textarea
										v-model="rateForm.commentGoods[index].content" auto-height placeholder="请输入对该商品的评价"
										:border-top="false" :border-bottom="false" maxlength="150" is-counter
										padding="0"
									></tui-textarea>
								</view>

								<view class="pic-list">
									<view
										v-if="!rateForm.commentGoods[index].pic.length" class="placeholder"
										@click="handleUploadImg(index)"
									>
										<tui-icon name="camera"></tui-icon>
										<text>添加图片</text>
									</view>

									<view v-else class="img-list">
										<view v-for="(img, imgIndex) in rateForm.commentGoods[index].pic" :key="img" class="img-item">
											<image class="img" :src="common.seamingImgUrl(img)" @click="handlePreview(rateForm.commentGoods[index].pic, imgIndex)">
											</image>
											<view class="close-wrapper">
												<tui-icon
													size="12" class="close-icon" color="#fff" name="shut"
													@click="handelDeleteImg(img, index, imgIndex)"
												></tui-icon>
											</view>
										</view>

										<view class="img-item add-img" @click="handleUploadImg(index)">
											<tui-icon name="camera" color="#ccc" :size="34"></tui-icon>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>

				<tui-toast ref="toast"></tui-toast>
			</view>
		</view>
	</tui-drawer>
</template>

<script>
import { getUserId } from '../../utils'
import { getOrderDetailApi, postCommentApi } from '../../api/order'
import { J_USER_TOKEN } from '../../constant'
export default {
	name: 'CommentOrder',

	filters: {
		filterRateNumberToStr(value) {
			if (!value) return '待评价'
			return { 1: '不满意', 2: '还行', 3: '良好', 4: '好', 5: '非常好' }[value]
		}
	},
	data() {
		return {
			drawerVisible: false,
			rateOrderWholeList: [
				{
					label: '服务评分',
					key: 'rate1'
				},
				{
					label: '物流评分',
					key: 'rate2'
				},
				{
					label: '商品符合度',
					key: 'rate4'
				},
				{
					label: '商家服务',
					key: 'rate5'
				},
				{
					label: '快递包装',
					key: 'rate6'
				}
			],
			orderId: '',
			orderDetail: null,
			rateForm: { rate1: 5, rate2: 5, rate4: 5, rate5: 5, rate6: 5, oid: null, commentGoods: [] },
			scrollTop: 0
		}
	},

	methods: {
		showCommentOrder(id) {
			this.orderId = id
			this.rateForm = { rate1: 5, rate2: 5, rate4: 5, rate5: 5, rate6: 5, oid: null, commentGoods: [] }
			this.getOrderDetail()
		},
		handleClose() {
			this.drawerVisible = false
			this.$emit('close')
		},
		// 获取订单详情
		async getOrderDetail() {
			try {
				uni.showLoading()
				const systermInfo = this.$store.getters.systermInfo
				const res = await getOrderDetailApi({
					userId: getUserId(),
					orderId: this.orderId
				})
				this.orderDetail = res.data
				const commentGoodsList = this.orderDetail.orderGoods
				if (commentGoodsList && Array.isArray(commentGoodsList)) {
					this.orderDetail.orderGoods = commentGoodsList.filter((item) => !item.comment)
				}
				this.rateForm.oid = res.data.orderInfo.id
				const goods = res.data.orderGoods
				if (goods && Array.isArray(goods)) {
					goods.forEach((item) => {
						this.rateForm.commentGoods.push({
							rate3: 5,
							gid: item.goodsId,
							ip: '',
							device: (systermInfo && systermInfo.ua) || '',
							content: '',
							type: 1,
							pid: '',
							uid: getUserId(),
							pic: [],
							oid: res.data.orderInfo.id,
							isAnonymous: false
						})
					})
				}
				this.drawerVisible = true
				uni.hideLoading()
			} catch (err) {
				console.log(err)
				uni.hideLoading()
			}
		},

		// 设置评论
		handleSetRate(rateInfo, key) {
			const { index } = rateInfo
			if (typeof key === 'number') {
				this.rateForm.commentGoods[key].rate3 = index
			} else {
				this.rateForm[key] = index
			}
		},

		// 晒图
		handleUploadImg(index) {
			const _this = this
			uni.chooseImage({
				success: (chooseImageRes) => {
					for (const imgFile of chooseImageRes.tempFiles) {
						uni.showLoading()
						uni.uploadFile({
							url: 'https://appapi.jfcmei.com/wx/storage/upload',
							filePath: imgFile.path,
							name: 'file',
							formData: {
								token: uni.getStorageSync(J_USER_TOKEN),
								userId: getUserId()
							},
							success: (uploadFileRes) => {
								uni.hideLoading()
								console.log('上传成功', JSON.parse(uploadFileRes.data).data.url)
								// _this.orderForm.orderGoodsList.push(JSON.parse(uploadFileRes.data).data.url);
								_this.rateForm.commentGoods[index].pic.push(JSON.parse(uploadFileRes.data).data.url)
							},
							fail: (error) => {
								uni.hideLoading()
								_this.ttoast({
									type: 'fail',
									title: '图片上传失败',
									content: error
								})
							}
						})
					}
				},
				fail: (fail) => {
					console.log(fail)
				}
			})
		},

		// 点击删除图片
		handelDeleteImg(imgUrl, outerIndex, imgIndex) {
			this.rateForm.commentGoods[outerIndex].pic.splice(imgIndex, 1)
		},

		// 点击是否匿名评论
		handleChooseAnonymousStatus(index) {
			this.rateForm.commentGoods[index].isAnonymous = !this.rateForm.commentGoods[index].isAnonymous
		},

		// 点击提交评论
		async handleSubmit() {
			try {
				const submitData = JSON.parse(JSON.stringify(this.rateForm))
				submitData.commentGoods = submitData.commentGoods
					.filter((item) => !!item.content)
					.map((item) => {
						item.pic = item.pic.join(',')
						return item
					})
				const res = await postCommentApi(submitData)
				if (res.errno === 0) {
					this.ttoast('订单评价成功')

					setTimeout(() => {
						uni.redirectTo({
							url: '/user/orderForm/order-form?type=4'
						})
					}, 1000)
				} else {
					this.ttoast({
						type: 'fail',
						title: '评价失败',
						content: res.errmsg
					})
				}
			} catch (error) {
				this.ttoast({
					type: 'fail',
					title: '评价失败',
					content: error
				})
			}
		},

		// 预览图片
		handlePreview(imgList, index) {
			uni.previewImage({
				current: index,
				urls: imgList,
				indicator: 'number'
			})
		}
	},

	onPageScroll(e) {
		this.scrollTop = e.scrollTop
	}
}
</script>

<style lang="less" scoped>
.order-detail-container {
	min-height: 100vh;
	background-color: #f6f6f6;

	.page-head {
		display: flex;
		align-items: center;
		padding: 20upx 20upx 0;
		border-radius: 0 0 30upx 30upx;

		.uni-btn-wrapper {
			flex: 1;

			.uni-btn {
				float: right;
				width: fit-content;
				margin-right: 30upx;
				color: rgb(233, 93, 32);
				font-size: 32upx;
			}
		}
	}

	.rate-container {
		padding: 20upx;
		box-sizing: border-box;

		.pane {
			background-color: #fff;
			border-radius: 20upx;
			padding: 20upx;
			box-sizing: border-box;
			margin-top: 20upx;

			.pane-title-wrapper {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.title {
					font-weight: 500;
					font-size: 32upx;
				}
			}
		}

		.rate-goods {
			border-radius: 20upx;
			overflow: hidden;
			margin-top: 40upx;

			.goods-info {
				display: flex;
				align-items: flex-start;
				background: linear-gradient(165deg, #fc3538, #fe6e40);
				color: #fff;
				padding: 20upx 20upx;

				.goods-pic {
					width: 100upx;
					height: 100upx;
					flex-shrink: 0;
					margin-right: 20upx;
				}

				.detail-info {
					flex: 1;

					.goods-name {
						font-weight: 500;
						font-size: 32upx;
						margin-bottom: 16upx;

						.goods-price {
							font-size: 24upx;
							color: rgb(255, 255, 255);
						}
					}

					.sps {
						width: 550upx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						color: #fff;
						font-size: 24upx;
					}
				}
			}

			.rate-content {
				background-color: #fff;
				width: 100%;
				// height: 200upx;
				border-radius: 20upx 20upx 0 0;
				margin-top: -20upx;
				padding: 20upx;
				box-sizing: border-box;

				.rate-item {
					padding: 0 0 20upx 0;
					margin-top: 0;
					border-bottom: 1upx solid #f5f5f5;

					.rate-item-title {
						width: 146upx;
					}
				}

				.evaluate {
					font-size: 24upx;

					.textarea {
						width: 100%;
						height: 500upx;
					}
				}

				.pic-list {
					width: 100%;
					min-height: 200upx;
					background-color: #f7f7f7;
					margin-top: 20upx;
					border-radius: 20upx;

					.placeholder {
						width: 100%;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						flex-direction: column;
						font-size: 28upx;
						color: rgb(153, 153, 153);
						padding-top: 48upx;
					}

					.img-list {
						display: flex;
						align-items: center;
						flex-wrap: wrap;

						.img-item {
							position: relative;
							width: 26vw;
							height: 26vw;
							margin-right: 4.9vw;
							flex-shrink: 0;
							margin-bottom: 2vw;

							&:nth-of-type(3n) {
								margin-right: 0;
							}

							&.add-img {
								background-color: #e8eaed;
								display: flex;
								justify-content: center;
								flex-direction: column;
								align-items: center;
								border-radius: 10upx;
							}

							.img {
								width: 100%;
								height: 100%;
								border-radius: 10upx;
								overflow: hidden;
							}

							.close-wrapper {
								position: absolute;
								top: 0;
								right: 0;
								width: 36upx;
								height: 36upx;
								background-color: rgba(0, 0, 0, 0.7);
								border-radius: 0 12upx 0 48upx;

								.close-icon {
									position: absolute;
									top: 4upx;
									right: 4upx;
								}
							}
						}
					}
				}
			}
		}
	}
}

.rate-item {
	display: flex;
	align-items: center;
	margin: 20upx 0;

	.rate-item-title {
		font-size: 32upx;
		width: 180upx;
	}

	.rate-text {
		color: #ccc;
		font-size: 28upx;
		margin-left: 20upx;
		flex: 1;
	}

	/deep/ .tui-list-class {
		padding: 0 !important;
	}

	.thorui-align__center {
		display: flex;
		align-items: center;

		.tui-text {
			font-size: 24upx;
			color: #ccc;
			margin-left: 10upx;
		}
	}
}
</style>
