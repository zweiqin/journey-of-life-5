<template>
	<view v-if="data" class="order-detail">
		<JHeader width="50" height="50" title="订单详情"></JHeader>

		<!-- 订单信息 -->
		<view class="order-info">
			<view style="text-align: right;">
				<tui-button
					type="danger" plain width="180rpx" height="54rpx"
					style="display: inline-block;" shape="circle"
					@click="handleShare"
				>
					一键分享
				</tui-button>
			</view>
			<view class="view-order-status" :style="{ 'color': bg }">
				{{ data.orderInfo.orderStatusText }}
			</view>

			<!-- 有商城或本地的商品 -->
			<view v-if="(data.orderInfo.orderType === 0) || (data.orderInfo.orderType === 1)">
				<!-- <view v-if="data.orderGoods.find(item => item.brandId === 1001079)"> -->
				<view style="margin-bottom: 16upx;font-size: 30upx;font-weight: bold;">{{ data.orderInfo.address }}</view>
				<view style="display: flex;flex-wrap: wrap;margin-bottom: 20upx;font-size: 28upx;color: #8D8D8D;">
					<view>收货人：</view>
					<view>{{ `${data.orderInfo.consignee} ${data.orderInfo.mobile}` }}</view>
				</view>
			</view>
			<!-- 只有预约的商品 -->
			<view v-else-if="data.orderInfo.orderType === 2">
				<view style="margin-bottom: 20upx;font-size: 30upx;font-weight: bold;">提货地址：{{ data.orderInfo.brandName }}</view>
			</view>

			<view class="goods-info">
				<view style="font-weight: bold;">商品信息</view>
				<view
					v-for="item in data.orderGoods" :key="item.id"
					style="border-bottom: 1upx dotted #ccc; padding-bottom: 20upx"
				>
					<view v-if="commentGoodsId ? item.id == commentGoodsId : true" class="goods-item">
						<image :src="common.seamingImgUrl(item.picUrl)" class="goods-img" mode="" />
						<view class="goods-info-content">
							<view class="goods-name">{{ item.goodsName }}</view>
							<view class="sp">{{ item.specifications | fomatSp }}</view>
							<view class="goods-price">
								<text style="font-size: 24upx;">￥</text>
								<text>{{ item.price }}</text>
							</view>
						</view>
						<view class="goods-number">x{{ item.number }}</view>
					</view>
					<!-- 评论 -->
					<view v-if="data.orderInfo.handleOption.comment && item.id == commentGoodsId" class="evaluate-info pane">
						<view class="line">
							<view style="margin-right: 12upx;">满意</view>
							<uni-rate v-model="evForm.star"></uni-rate>
						</view>
						<view class="line">
							<view style="margin-right: 12upx;">评论</view>
							<textarea
								v-model="evForm.content" placeholder="请输入商品评论" class="evaluate-textarea"
								maxlength="200"
							></textarea>
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
				</view>
			</view>
		</view>

		<!-- 核销相关 -->
		<!-- <view v-if="data.userAppoint" class="apponit pane">
			<view class="tip">请到店向商家出示该核销码</view>
			<image class="qrcode" :src="common.seamingImgUrl(data.userAppoint.appointUrl)" mode="" />
			<view class="code">{{ data.userAppoint.appointCode }}</view>
			</view> -->
		<view v-if="verificationCodeUrl" style="padding: 0upx 40upx;font-weight: bold;">
			<view>使用凭证</view>
			<view style="text-align: center;">
				<image style="width: 420upx;" mode="widthFix" :src="verificationCodeUrl" />
			</view>
			<view style="display: flex;font-size: 30upx;">
				<view style="color: #3D3D3D;">核销码：{{ verificationCode || '--' }}</view>
				<view style="margin-left: 12upx;color: #0061C8;" @click="$copy(verificationCode)">复制</view>
			</view>
		</view>

		<!-- 详细信息 -->
		<view class="detail-info pane">
			<view class="detail-info-title">订单信息</view>
			<view class="line">
				<view class="title">商品总额</view>
				<view class="text" style="color: red">
					<text style="font-size: 24upx;">￥</text>
					<text>{{ data.orderInfo.goodsPrice }}</text>
				</view>
			</view>
			<view class="line">
				<view class="title">实付款</view>
				<view class="text" style="color: red">
					<text style="font-size: 24upx;">￥</text>
					<text>{{ data.orderInfo.actualPrice }}</text>
				</view>
			</view>
			<view class="line">
				<view class="title">下单时间</view>
				<view class="text">{{ data.orderInfo.addTime }}</view>
			</view>
			<view class="line">
				<view class="title">订单编号</view>
				<view class="text">
					<text>{{ data.orderInfo.orderSn }}</text>
					<text style="margin-left: 12upx;color: #0061C8;" @click="$copy(data.orderInfo.orderSn)">复制</text>
				</view>
			</view>
			<view class="line">
				<view class="title">备注</view>
				<view class="text">{{ data.orderInfo.message || '无备注' }}</view>
			</view>
			<view class="line">
				<view class="title">交易号</view>
				<view class="text">
					<text>{{ data.orderInfo.id || '--' }}</text>
					<text style="margin-left: 12upx;color: #0061C8;" @click="$copy(data.orderInfo.id)">复制</text>
				</view>
			</view>
			<view class="line">
				<view class="title">遇到问题</view>
				<view class="text" style="display: flex;" @click="go('/user/sever/customer-service/customer-service')">
					<BeeIcon src="../../static/images/icon/kefu.png" :size="20"></BeeIcon>
					<text style="margin-left: 16upx;">联系客服</text>
				</view>
			</view>
		</view>

		<view v-if="data" class="order-detail-footer">
			<view v-for="item in orderOpButtons" :key="item.label">
				<button
					v-if="data.orderInfo.handleOption[item.key]" :style="{
						background: item.label === '去评论' ? '#84c341' : '',
						color: item.label === '去评论' ? '#ffffff' : item.label === '去支付' ? '#FF0000' : '#3d3d3d',
						border: item.label === '去评论' ? 'none' : item.label === '去支付' ? '1upx solid #FF0000' : '1upx solid #3d3d3d'
					}" class="uni-btn" @click="handleOpOrder(data.orderInfo, item.key)"
				>
					{{ item.label === "去评论" ? "发布评论" : item.label }}
				</button>
			</view>
		</view>

		<!-- 申请退款dialog -->
		<tui-dialog
			style="position: relative;z-index: 888;" :buttons="[{ text: '取消' }, { text: '提交', color: '#586c94' }]"
			:show="isShowRefundDialog" title="退款原因" @click="handleClickRefundDialog"
		>
			<template #content>
				<view style="max-height: 50vh;overflow-y: auto;">
					<tui-radio-group v-model="tempRefund.reasonId" @change="(e) => { }">
						<tui-label v-for="(part, index) in refundRadioItems" :key="index">
							<tui-list-cell padding="16upx 26upx" style="text-align: left;">
								<view>
									<tui-radio :checked="false" :value="String(part.id)" color="#07c160" border-color="#999">
									</tui-radio>
									<text style="margin-left: 6upx;" class="tui-text">{{ part.refundOtherReason }}</text>
								</view>
							</tui-list-cell>
						</tui-label>
					</tui-radio-group>
				</view>
				<view>
					<tui-input
						v-model="tempRefund.refundRemark" padding="26upx 0" label="其它备注"
						placeholder="填写备注，说明退款详情"
					></tui-input>
				</view>
			</template>
		</tui-dialog>

		<!-- 分享订单商品海报 -->
		<OrderPoster ref="refOrderPoster"></OrderPoster>
	</view>
</template>

<script>
import {
	getOrderDetailApi,
	orderCancelApi,
	orderDeleteApi,
	addCommentPostApi,
	orderRefundApi
} from '../../api/order'
import { getVerificationCodeHxCodeApi, getOrderRefundsReasonApi } from '../../api/user'
import { getUserId, payFn } from '../../utils'
import { orderOpButtons } from './config'
import { J_USER_INFO } from '../../constant'

export default {
	name: 'OrderFormDetail',

	filters: {
		fomatSp(value) {
			let str = ''
			for (const item of value) {
				str += item + ', '
			}
			return str.substr(0, str.length - 2)
		}
	},
	data() {
		return {
			orderId: null,
			data: null,
			orderOpButtons,
			commentGoodsId: null,
			evForm: {
				userId: getUserId(),
				star: 5,
				content: '',
				hasPicture: true,
				picUrls: []
			},
			verificationCodeUrl: '',
			isShowRefundDialog: false,
			refundRadioItems: [],
			tempRefund: {
				orderId: '',
				reasonId: '',
				refundRemark: ''
			}
		}
	},

	onLoad(options) {
		this.orderId = options.id
		this.commentGoodsId = options.goodsId
		this.getOrderDetail()
	},

	computed: {
		bg() {
			const data = {
				'已取消(系统)': '#959595'
			}
			return data[this.data.orderInfo.orderStatusText]
		}
	},

	methods: {
		// 获取订单详情
		getOrderDetail() {
			uni.showLoading()
			getOrderDetailApi({
				userId: getUserId(),
				orderId: this.orderId
			}).then(({ data }) => {
				this.data = data
				uni.hideLoading()
				getVerificationCodeHxCodeApi({
					url: `https://h5.jfcmei.com/#/pages/jump/jump?userId=${getUserId()}&orderId=${data.orderInfo.id}&type=verification&code=${data.orderInfo.id}-`
				}).then((res) => {
					console.log(res)
					if (res.errno === -1) return
					// res.data.hxCode；res.data.code；res.data.orderType：0商城1本地
					this.verificationCode = res.data.code
					this.verificationCodeUrl = res.data.hxCode
				})
					.catch(() => {
						uni.hideToast()
					})
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
		},

		// 点击操作按钮
		handleOpOrder(goods, key) {
			const mapMethods = {
				cancel: {
					text: '确定要取消当前订单吗？',
					api: orderCancelApi,
					success: '取消成功'
				},
				delete: {
					text: '确定要删除当前订单吗？',
					api: orderDeleteApi,
					success: '删除成功'
				}
				// comment: {
				//   text: "确定提交评价吗？",
				//   api: addCommentPostApi,
				//   success: "评论成功",
				// },
			}
			if (goods.handleOption[key] && ['cancel', 'delete'].includes(key)) {
				uni.showModal({
					title: '提示',
					content: mapMethods[key].text,
					success: (res) => {
						if (res.confirm) {
							mapMethods[key]
								.api({
									userId: getUserId(),
									orderId: goods.id
								})
								.then(() => {
									this.$showToast(mapMethods[key].success, 'success')
									setTimeout(() => {
										if ([ 'delete' ].includes(key)) {
											uni.navigateBack()
										} else if ([ 'cancel' ].includes(key)) {
											this.getOrderDetail()
										}
									}, 2000)
								})
						}
					}
				})
			} else if (key === 'refund') {
				getOrderRefundsReasonApi({ type: 0 })
					.then((res) => {
						this.refundRadioItems = res.data
						this.tempRefund.orderId = goods.id
						this.isShowRefundDialog = true
					})
			} else if (key === 'pay') {
				payFn({ ...goods }, goods.isAppoint ? 6 : 1)
			} else if (key === 'comment') {
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
								setTimeout(() => {
									uni.navigateBack()
								}, 1000)
							})
							this.getOrderDetail()
						}
					}
				})
			}
		},

		// 申请退款确认
		async handleClickRefundDialog(e) {
			console.log(e)
			if (e.index === 0) {
			} else if (e.index === 1) {
				if (!getUserId()) return
				if (!this.tempRefund.reasonId) return this.$showToast('请选择退款原因')
				await orderRefundApi({ ...this.tempRefund, userId: getUserId() })
					.then((res) => {
						this.$showToast('提交成功')
						this.getOrderDetail()
					})
			}
			this.tempRefund = {
				orderId: '',
				reasonId: '',
				refundRemark: ''
			}
			this.isShowRefundDialog = false
		},

		// 点击分享
		handleShare() {
			if (this.data.orderGoods && this.data.orderGoods.length) {
				const nickName = uni.getStorageSync(J_USER_INFO).nickName
				this.$refs.refOrderPoster.show({
					headerTitle: nickName ? nickName + '的订单商品' : '订单商品',
					brandList: [ {
						brandName: this.data.orderInfo.brandName,
						goodsList: this.data.orderGoods.map((item) => ({
							picUrl: item.picUrl,
							goodsName: item.goodsName,
							specifications: item.specifications.join('，'),
							price: item.price
						}))
					} ]
				})
			} else {
				return this.$showToast('缺少商品数据')
			}
		}
	}
}
</script>

<style lang="less" scoped>
.order-detail {
	width: 100%;
	min-height: 100vh;
	background-color: #ffffff;
	padding-bottom: 110upx;
	// box-sizing: border-box;

	/deep/ .j-header-container {
		padding: 20upx;
		box-sizing: border-box;
	}

	.pane {
		padding: 40upx;
		box-sizing: border-box;
		background-color: #fff;
	}

	.order-info {
		padding: 20upx 40upx;

		.view-order-status {
			display: flex;
			align-items: center;
			margin-bottom: 20upx;
			box-sizing: border-box;
			// background-image: linear-gradient(to right, #fa5151, #fddbdb);
			color: #FF0000;
			font-size: 34upx;
			font-weight: bold;

			.j-icon {
				margin-right: 20upx;
			}
		}

		.goods-info {
			padding: 20upx 0;

			.goods-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 30upx;

				.goods-img {
					width: 126upx;
					height: 126upx;
					border-radius: 12upx;
					margin-right: 20upx;
				}

				.goods-info-content {
					flex: 1;
					font-size: 24upx;
					color: #3d3d3d;

					.goods-name {
						font-size: 28upx;
						font-weight: bold;
						width: 380upx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.sp {
						margin: 8upx 0 10upx;
					}

					.goods-price {
						font-size: 28upx;
						color: #FA5151;
					}
				}
			}
		}
	}

	.evaluate-info {
		margin-top: 20upx;
		padding: 0;

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

	.detail-info {
		margin-top: 20upx;

		.detail-info-title {
			font-weight: bold;
			margin-bottom: 10upx;
		}

		.line {
			display: flex;
			justify-content: space-between;
			font-size: 28upx;
			padding: 16upx 0 16upx 12upx;

			.title {
				min-width: 142upx;
				color: #3d3d3d;
				text-align: justify;
				text-align-last: justify;
			}

			.text {
				font-weight: bold;
			}
		}
	}

	.order-detail-footer {
		height: 100upx;
		width: 100%;
		position: fixed;
		bottom: -1px;
		left: 0;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 0 40upx;
		box-sizing: border-box;
		background-color: #fff;

		.uni-btn {
			margin-left: 30upx;
			padding: 18upx 28upx;
			font-size: 28upx;
			font-weight: bold;
			border-radius: 50upx;
		}
	}

	// .apponit {
	// 	display: flex;
	// 	justify-content: center;
	// 	align-items: center;
	// 	margin-top: 20upx;
	// 	flex-direction: column;
	// 	padding-bottom: 100upx;

	// 	.tip {
	// 		color: red;
	// 	}

	// 	.qrcode {
	// 		width: 700upx;
	// 		height: 700upx;
	// 		object-fit: cover;
	// 	}

	// 	.code {
	// 		font-size: 40upx;
	// 		font-weight: bold;
	// 		color: #ccc;
	// 	}
	// }
}
</style>
