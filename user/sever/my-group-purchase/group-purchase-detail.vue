<template>
	<view v-if="data" class="order-detail">
		<JHeader width="50" height="50" title="拼团详情"></JHeader>

		<!-- 订单信息 -->
		<view class="order-info">
			<view class="view-order-status" :style="{ 'color': bg }">
				<view style="display: flex;align-items: center;">
					<JIcon width="44" height="44" type="active"></JIcon>
					{{ data.orderInfo.orderStatusText }}
				</view>
				<view style="padding-right: 30upx;">
					<tui-button
						type="warning" width="220rpx" height="60rpx" style="border-radius: 50rpx;"
						@click="$copy(`https://h5.jfcmei.com/#/user/sever/my-group-purchase/group-purchase-detail?id=${data.groupon.id}&isJoin=true`, '复制链接成功，快发送给好友吧~')"
					>
						复制分享链接
					</tui-button>
				</view>
			</view>

			<view>
				<view style="margin-bottom: 16upx;font-size: 30upx;font-weight: bold;">{{ data.orderInfo.address }}</view>
				<view style="display: flex;flex-wrap: wrap;margin-bottom: 20upx;font-size: 28upx;color: #8D8D8D;">
					<view>收货人：</view>
					<view>{{ `${data.orderInfo.consignee} ${data.orderInfo.mobile}` }}</view>
				</view>
			</view>

			<view class="goods-info">
				<view style="font-weight: bold;">商品信息</view>
				<view
					v-for="item in data.orderGoods" :key="item.id"
					style="border-bottom: 1upx dotted #ccc; padding-bottom: 20upx"
				>
					<view class="goods-item">
						<image :src="common.seamingImgUrl(item.picUrl)" class="goods-img" mode="" />
						<view class="goods-info-content">
							<!-- <view class="goods-name">{{ item.goodsName }}</view>
								<view class="sp">{{ item.specifications | fomatSp }}</view> -->
							<view class="sp">{{ item.goodsSpecificationValues | fomatSp }}</view>
							<view class="goods-price"> ￥{{ item.retailPrice }}</view>
							<!-- <view class="goods-price">
								<text style="font-size: 24upx;">￥</text>
								<text>{{ item.price }}</text>
								</view> -->
						</view>
						<view class="goods-number">x{{ item.number }}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="detail-info pane">
			<view class="detail-info-title">团购信息</view>
			<view style="padding: 16upx 24upx 26upx;font-size: 28upx;">
				<view>
					<view style="display: flex;justify-content: space-between;">
						<view>
							<text>团购ID：</text>
							<text>{{ data.groupon.id || '--' }}</text>
						</view>
						<view>
							<text>{{ data.groupon.addTime || '--' }}</text>
						</view>
					</view>
					<view>
						<text>关联订单ID：</text>
						<text>{{ data.groupon.orderId || '--' }}</text>
					</view>
					<view style="display: flex;justify-content: space-between;">
						<view>
							<text>开团用户ID：</text>
							<text>{{ data.groupon.creatorUserId || '--' }}</text>
						</view>
						<view>
							<text>{{ data.groupon.payed ? '已支付' : '未支付' }}</text>
						</view>
					</view>
				</view>
			</view>
			<view style="display: flex;align-items: center;">
				<view>创建者：</view>
				<view style="margin-left: 20upx;">
					<JAvatar :src="common.seamingImgUrl(data.creator.avatar)" size="92" radius="50%" border="5upx solid #ffffff">
					</JAvatar>
				</view>
				<view style="margin-left: 20upx;">{{ data.creator.nickname }}</view>
			</view>
			<view>
				<view style="margin-bottom: 24upx;">参与者：</view>
				<view v-if="data.joiners && data.joiners.length">
					<view v-for="(item, index) in data.joiners" :key="index" style="display: flex;align-items: center;">
						<view>
							<JAvatar :src="common.seamingImgUrl(item.avatar)" size="92" radius="50%" border="5upx solid #ffffff">
							</JAvatar>
						</view>
						<view style="margin-left: 20upx;">{{ item.nickname }}</view>
					</view>
				</view>
				<view v-else>无</view>
			</view>
		</view>

		<view class="detail-info pane">
			<view class="detail-info-title">规则信息</view>
			<GrouponRules title-inside :rules-data="data.rules"></GrouponRules>
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

		<view v-if="data && isJoin === 'false'" class="order-detail-footer">
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
		<view v-if="data && isJoin === 'true'" class="order-detail-footer">
			<tui-button
				type="blue" width="180rpx" height="70rpx" margin="0 10rpx 0 0"
				style="border-radius: 50rpx;"
				@click="go(`/pages/store/goods-detail/goods-detail?orderType=1&goodsId=${data.rules.goodsId}&rulesId=${data.rules.id}&linkId=${data.linkGrouponId}`)"
			>
				加入团购
			</tui-button>
		</view>

		<CommentOrder ref="refCommentOrder"></CommentOrder>
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
	</view>
</template>

<script>
import {
	orderCancelApi,
	orderDeleteApi,
	orderRefundApi
} from '../../../api/order'
import { getOrderRefundsReasonApi, getGrouponDetailApi } from '../../../api/user'
import { getUserId, payFn } from '../../../utils'
import { orderOpButtons } from '../../orderForm/config'
import GrouponRules from '../../marketing-tools/group-buying/components/GrouponRules.vue'

export default {
	name: 'GroupPurchaseDetail',
	components: { GrouponRules },

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
			isShowRefundDialog: false,
			refundRadioItems: [],
			tempRefund: {
				orderId: '',
				reasonId: '',
				refundRemark: ''
			},
			isJoin: ''
		}
	},

	onLoad(options) {
		this.orderId = options.id
		this.isJoin = options.isJoin || 'true'
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
			getGrouponDetailApi({
				userId: getUserId(),
				grouponId: this.orderId
			}).then(({ data }) => {
				this.data = data
				uni.hideLoading()
				if (this.isJoin === 'false') { }
			})
		},

		// 点击操作按钮
		handleOpOrder(order, key) {
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
			}
			if (order.handleOption[key] && ['cancel', 'delete'].includes(key)) {
				uni.showModal({
					title: '提示',
					content: mapMethods[key].text,
					success: (res) => {
						if (res.confirm) {
							mapMethods[key]
								.api({
									userId: getUserId(),
									orderId: order.id
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
						this.tempRefund.orderId = order.id
						this.isShowRefundDialog = true
					})
			} else if (key === 'pay') {
				payFn({ ...order }, order.isAppoint ? 6 : 1)
			} else if (key === 'comment') {
				this.$refs.refCommentOrder.showCommentOrder(order.id)
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
			justify-content: space-between;
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

}
</style>
