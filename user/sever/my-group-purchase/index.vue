<template>
	<view class="my-group-purchase-container" :style="{ overflowY: isShowCommentOrder ? 'hidden' : 'auto' }">
		<JHeader tabbar="/pages/user/user" width="50" height="50" title="我的拼团"></JHeader>

		<view>
			<tui-tabs
				style="width: 702upx;padding: 0 0upx 0 0upx;overflow: hidden;" :slider-width="105" :padding="24"
				item-width="351rpx" selected-color="#000000" bold slider-bg-color="#ff0000"
				:tabs="[{ name: '开团' }, { name: '入团' }]" :current-tab="currentTab" @change="handleChangeTab"
			></tui-tabs>
		</view>

		<view v-if="myGrouponList && myGrouponList.length" class="order-list-wrapper">
			<view v-for="item in myGrouponList" :key="item.id" class="goods-pane">
				<view class="order-no-status" @click="go(`/user/sever/my-group-purchase/group-purchase-detail?id=${item.id}&isJoin=false`)">
					<view class="order-no">订单号:{{ item.orderSn }}</view>
					<view class="order-status">{{ item.orderStatusText }}</view>
				</view>

				<view
					style="padding: 16upx 24upx 26upx;font-size: 28upx;"
					@click="go(`/user/sever/my-group-purchase/group-purchase-detail?id=${item.id}&isJoin=false`)"
				>
					<view>
						<view style="display: flex;justify-content: space-between;">
							<view>
								<text>团购ID：</text>
								<text>{{ item.groupon.id || '--' }}</text>
							</view>
							<view>
								<text>{{ item.groupon.addTime || '--' }}</text>
							</view>
						</view>
						<view style="display: flex;justify-content: space-between;">
							<view>
								<text>创建者：</text>
								<text>{{ item.creator || '--' }}</text>
							</view>
							<view>
								<text>{{ item.isCreator ? '本人' : '非本人' }}开团</text>
							</view>
						</view>
						<view>
							<text>参与人数：</text>
							<text>{{ typeof item.joinerCount === 'number' ? item.joinerCount : '--' }}</text>
						</view>
						<view>
							<text>关联订单ID：</text>
							<text>{{ item.groupon.orderId || '--' }}</text>
						</view>
						<view style="display: flex;justify-content: space-between;">
							<view>
								<text>开团用户ID：</text>
								<text>{{ item.groupon.creatorUserId || '--' }}</text>
							</view>
							<view>
								<text>{{ item.groupon.payed ? '已支付' : '未支付' }}</text>
							</view>
						</view>
					</view>
				</view>

				<view class="goods-list" @click="go(`/user/sever/my-group-purchase/group-purchase-detail?id=${item.id}&isJoin=false`)">
					<view v-for="goods in item.goodsList" :key="goods.id" class="goods-item">
						<image class="goods-img" :src="common.seamingImgUrl(goods.picUrl)" mode="" />
						<view class="info">
							<view class="name">{{ goods.goodsName }}</view>
							<view class="good-sp-pr">
								<view class="sp">标准</view>
								<!-- <view class="pr">￥{{ goods.price }}</view> -->
								<view
									style="margin-top: 10upx;font-size: 28upx;color: #0000ff;"
									@click.stop="handleGrouponRules(goods.id)"
								>
									查看团购规则
								</view>
							</view>
						</view>
						<view>
							<view class="number" style="text-align: right">
								共 {{ goods.number }} 件商品
							</view>
						</view>
					</view>
				</view>

				<view class="goods-ops">
					<view class="actual-price">
						实付：<text class="number">￥{{ item.actualPrice }}</text>
					</view>
					<view class="btns">
						<view v-for="btn in orderOpButtons" :key="btn.label">
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
		</view>
		<LoadMore v-show="myGrouponList.length" :status="status"></LoadMore>
		<view v-if="myGrouponList && !myGrouponList.length && loadingStatus !== 'loading'" class="no-data">
			暂无拼团~
		</view>

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

		<tui-drawer mode="bottom" :visible="drawerVisible" @close="drawerVisible = false">
			<view style="padding: 20upx;">
				<GrouponRules title-inside :rules-data="grouponRules"></GrouponRules>
			</view>
		</tui-drawer>
	</view>
</template>

<script>
import { orderOpButtons } from '../../orderForm/config'
import { getGrouponMyApi, getGrouponQueryApi, getOrderRefundsReasonApi } from '../../../api/user'
import {
	orderCancelApi,
	orderDeleteApi,
	receiveGoodsApi,
	orderRefundApi
} from '../../../api/order'
import { getUserId, payFn } from '../../../utils'
import GrouponRules from '../../marketing-tools/group-buying/components/GrouponRules.vue'

export default {
	name: 'MyGroupPurchase',
	components: { GrouponRules },
	onLoad(options) { },
	data() {
		return {
			currentTab: 0,
			orderOpButtons,
			myGrouponList: [],
			grouponQuery: {
				userId: getUserId(),
				page: 1,
				size: 10
			},
			totalPages: 0,
			status: 'none',
			loadingStatus: 'noMore',
			isShowCommentOrder: false,
			isShowRefundDialog: false,
			refundRadioItems: [],
			tempRefund: {
				orderId: '',
				reasonId: '',
				refundRemark: ''
			},
			drawerVisible: false,
			grouponRules: {}
		}
	},
	onShow() {
		this.getGrouponMyList()
	},

	methods: {
		getGrouponMyList(isLoadmore) {
			if (!getUserId()) return
			this.status = 'loading'
			this.loadingStatus = 'loading'
			getGrouponMyApi({ ...this.grouponQuery, showType: this.currentTab })
				.then(({ data }) => {
					console.log(data)
					this.totalPages = data.totalPages
					if (isLoadmore) {
						this.myGrouponList.push(...data.data)
					} else {
						this.myGrouponList = data.data
					}
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
				.catch(() => {
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
		},
		handleChangeTab(e) {
			this.currentTab = e.index
			this.grouponQuery.page = 1
			this.myGrouponList = []
			this.getGrouponMyList()
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
									orderId: order.orderId
								})
								.then(() => {
									this.grouponQuery.page = 1
									this.getGrouponMyList()
								})
						}
					}
				})
			} else if (key === 'refund') {
				getOrderRefundsReasonApi({ type: 0 })
					.then((res) => {
						this.refundRadioItems = res.data
						this.tempRefund.orderId = order.orderId
						this.isShowRefundDialog = true
					})
			} else if (key === 'pay') {
				payFn({ ...order }, order.isAppoint ? 6 : 1)
			} else if (key === 'comment') {
				// this.go(`/user/sever/my-group-purchase/group-purchase-detail?id=${order.id}${currentGoods ? '&goodsId=' + currentGoods.id : ''}&isJoin=false`)
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
						this.getGrouponMyList()
					})
			}
			this.tempRefund = {
				orderId: '',
				reasonId: '',
				refundRemark: ''
			}
			this.isShowRefundDialog = false
		},

		handleGrouponRules(goodsId) {
			this.grouponRules = {}
			getGrouponQueryApi({ goodsId })
				.then(({ data }) => {
					console.log(data)
					this.grouponRules = data[0] || {}
					this.drawerVisible = true
				})
		}
	},
	onReachBottom() {
		if (this.grouponQuery.page >= this.totalPages) {
			this.status = 'no-more'
			return
		}
		if (this.grouponQuery.size > this.myGrouponList.length) {
			return
		}
		this.grouponQuery.page++
		this.getGrouponMyList(true)
	}
}
</script>

<style lang="less" scoped>
.my-group-purchase-container {
	height: 100vh;
	padding: 40upx 24upx 140upx;
	box-sizing: border-box;
	background-color: #f6f6f6;

	.no-data {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 180upx;
		color: #999999;
		font-size: 36upx;
		letter-spacing: 2px;
	}

	.tui-tabs-view {
		/deep/ .tui-tabs-slider {
			margin-left: -24upx;
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
