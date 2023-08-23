<template>
	<view class="orders-container" :style="{ overflowY: isShowCommentOrder ? 'hidden' : 'auto' }">
		<view class="header">
			<JBack width="50" dark height="50" tabbar="/pages/user/user"></JBack>
			<h2>我的订单</h2>
		</view>

		<view class="navs">
			<view style="font-weight: bold;">商城：</view>
			<view
				v-for="item in orderTypesMall" :key="item.value" class="nav-item"
				:class="{ 'nav-item-active': currentStatus === item.value && currentType === 0 }"
				@click="handleSwitchStatus(item.value, 0)"
			>
				{{ item.label }}
			</view>
		</view>

		<view class="navs">
			<view style="font-weight: bold;">本地生活：</view>
			<view
				v-for="item in orderTypesStore" :key="item.value" class="nav-item"
				:class="{ 'nav-item-active': currentStatus === item.value && currentType === 1 }"
				@click="handleSwitchStatus(item.value, 1)"
			>
				{{ item.label }}
			</view>
		</view>

		<view v-if="orderList && orderList.length" class="order-list-wrapper">
			<view v-for="item in orderList" :key="item.id" class="goods-pane">
				<view class="order-no-status" @click="go(`/user/orderForm/order-form-detail?id=${item.id}`)">
					<view class="order-no">订单号:{{ item.orderSn }}</view>
					<view class="order-status">{{ item.orderStatusText }}</view>
				</view>

				<view class="goods-list" @click="go(`/user/orderForm/order-form-detail?id=${item.id}`)">
					<view v-for="goods in item.goodsList" :key="goods.id" class="goods-item">
						<image class="goods-img" :src="common.seamingImgUrl(goods.picUrl)" mode="" />
						<view class="info">
							<view class="name">{{ goods.goodsName }}</view>
							<view class="good-sp-pr">
								<view class="sp">标准</view>
								<view class="pr">￥{{ goods.price }}</view>
							</view>
						</view>
						<view>
							<view class="number" style="text-align: right">
								共 {{ goods.number }} 件商品
							</view>
							<!-- <button
								v-if="item.handleOption.comment && !goods.comment" class="ev-btn uni-btn"
								@click.stop="handleOpOrder(item, 'comment', goods)"
								>
								去评论
								</button> -->
						</view>
					</view>
				</view>

				<view class="goods-ops">
					<view class="actual-price">
						实付：<text class="number">￥{{ item.actualPrice }}</text>
					</view>
					<view class="btns">
						<view v-for="btn in orderOpButtons" :key="btn.label">
							<!-- && btn.label !== '去评论' -->
							<button
								v-if="item.handleOption[btn.key]" :style="{
									background: btn.color
								}" class="uni-btn" @click="handleOpOrder(item, btn.key)"
							>
								{{ btn.label }}
							</button>
						</view>
					</view>
				</view>
			</view>

			<uni-load-more v-if="loadingStatus !== 'hidden'" style="background: #fff" :status="loadingStatus"></uni-load-more>
		</view>

		<JNoData v-if="loadingStatus === 'hidden' && !orderList.length" text="无购物记录" type="order-shop"></JNoData>

		<CommentOrder ref="refCommentOrder" @close="isShowCommentOrder = false"></CommentOrder>
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
		<DragButton
			text="客服" :icon-src="require('../../static/user-center/menus/lianxikefu.png')" is-dock exist-tab-bar
			@btnClick="go('/user/sever/service-center/service-center')"
		/>
	</view>
</template>

<script>
import { orderTypesMall, orderTypesStore, orderOpButtons } from './config'
import {
	getOrderListApi,
	orderCancelApi,
	orderDeleteApi,
	receiveGoodsApi,
	orderRefundApi
} from '../../api/order'
import { getOrderRefundsReasonApi } from '../../api/user'
import { getUserId, payFn } from '../../utils'
import { J_PAY_ORDER } from '../../constant'

export default {
	name: 'OrderForm',
	data() {
		return {
			orderTypesMall,
			orderTypesStore,
			currentStatus: '',
			currentType: '',
			query: {
				page: 1,
				size: 10
			},
			orderOpButtons,
			totalPages: 0,
			orderList: [],
			loadingStatus: 'loading',
			isShowCommentOrder: false,
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
		this.currentStatus = options.currentStatus * 1 || 0
		this.currentType = options.currentType * 1 || 0
		this.getOrderList()
	},

	onShow() {
		uni.removeStorageSync(J_PAY_ORDER)
	},

	methods: {
		// 获取订单信息
		getOrderList(loadMore) {
			uni.showLoading()
			this.loadingStatus = 'loading'
			getOrderListApi({
				userId: getUserId(),
				showType: this.currentStatus,
				orderType: this.currentType,
				...this.query
			}).then(({ data }) => {
				if (loadMore) {
					this.orderList.push(...data.data)
				} else {
					this.orderList = data.data
				}
				this.totalPages = data.totalPages
				this.loadingStatus = 'hidden'
				uni.hideLoading()
			})
		},

		// 切换状态
		handleSwitchStatus(status, type) {
			this.currentStatus = status
			this.currentType = type
			this.query.page = 1
			this.query.size = 20
			this.getOrderList()
		},

		// 点击操作按钮
		handleOpOrder(order, key, currentGoods) {
			const mapMethods = {
				cancel: {
					text: '确定要取消当前订单吗？',
					api: orderCancelApi
				},
				delete: {
					text: '确定要删除当前订单吗？',
					api: orderDeleteApi
				},
				confirm: {
					text: '确定要收货吗？',
					api: receiveGoodsApi
				}
			}
			if (
				order.handleOption[key] &&
				['cancel', 'delete', 'confirm'].includes(key)
			) {
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
									this.query.page = 1
									this.getOrderList()
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
				// this.go(`/user/orderForm/order-form-detail?id=${order.id}${currentGoods ? '&goodsId=' + currentGoods.id : ''}`)
				this.$refs.refCommentOrder.showCommentOrder(order.id)
				this.isShowCommentOrder = true
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
						this.getOrderList()
					})
			}
			this.tempRefund = {
				orderId: '',
				reasonId: '',
				refundRemark: ''
			}
			this.isShowRefundDialog = false
		}
	},

	onReachBottom() {
		if (this.orderList.length < this.query.size) {
			this.loadingStatus = 'noMore'
			return
		}
		if (this.query.page >= this.totalPages) {
			this.loadingStatus = 'noMore'
			return
		}
		this.query.page++
		this.getOrderList(true)
	}
}
</script>

<style lang="less" scoped>
.orders-container {
	height: 100vh;
	padding: 60upx 0;
	font-size: 28upx;
	color: #3d3d3d;
	box-sizing: border-box;

	.header {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		color: #000;
		padding: 0 32upx;
		box-sizing: border-box;

		h2 {
			font-weight: normal;
			font-size: 32upx;
			margin-top: -8upx;
		}
	}

	.navs {
		width: 100%;
		display: flex;
		margin: 34upx 0;
		padding: 0 28upx;
		box-sizing: border-box;
		white-space: nowrap;
		overflow-x: auto;

		.nav-item {
			width: fit-content;
			padding: 0 6upx;
			transition: all 350ms;

			&.nav-item-active {
				color: #ff8f1f;
			}
		}
	}

	.order-list-wrapper {
		background-color: #f6f6f6;
		padding-top: 10px;
		font-size: 24upx;

		.goods-pane {
			padding: 32upx;
			box-sizing: border-box;
			background-color: #fff;
			margin-bottom: 20upx;

			&:nth-of-type(:last-child) {
				margin-bottom: 0;
			}

			.order-no-status {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-bottom: 16upx;
				border-bottom: 1upx solid #dbdbdb;

				.order-status {
					color: #f40;
				}
			}

			.goods-list {
				padding: 20upx 0;

				.goods-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 30upx;

					.info {
						flex: 1;
						height: 100%;
						display: flex;
						justify-content: space-between;
						flex-direction: column;

						.name {
							font-size: 28upx;
							font-weight: 500;
							width: 300upx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.good-sp-pr {
							margin-top: 20upx;

							.sp {
								line-height: 1.5;
								color: #565656;
							}

							.pr {
								font-size: 28upx;
							}
						}
					}

					.goods-img {
						width: 140upx;
						height: 140upx;
						object-fit: cover;
						margin-right: 20upx;
					}
				}
			}

			.goods-ops {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 20upx;
				border-top: 1upx solid #dbdbdb;

				.actual-price {
					font-size: 28upx;
					font-weight: 500;

					.number {
						color: #f40;
					}
				}

				.btns {
					display: flex;
					align-items: center;

					.uni-btn {
						font-size: 24upx;
						color: #fff;
						padding: 18upx 28upx;
						background-color: #f40;
						white-space: nowrap;
						margin-left: 20upx;
						border-radius: 4upx;
					}
				}
			}
		}

		.ev-btn {
			font-size: 24upx;
			color: #fff;
			padding: 18upx 28upx;
			background-color: rgb(132, 195, 65);
			white-space: nowrap;
			margin-left: 20upx;
			border-radius: 4upx;
			margin-top: 20upx;
		}
	}
}
</style>
