<template>
	<view class="orders-container">
		<view class="header">
			<JBack width="50" dark height="50" tabbar="/pages/user/user"></JBack>
			<h2>商家订单</h2>
		</view>

		<view style="text-align: right;">
			<tui-button
				type="danger" width="220rpx" height="60rpx" margin="0 30upx 0 0"
				style="display: inline-block;border-radius: 30rpx;" @click="isShowVerificationCodeDialog = true"
			>
				订单核销 →
			</tui-button>
		</view>

		<view class="navs">
			<view
				v-for="item in orderTypesStore" :key="item.value" class="nav-item"
				:class="{ 'nav-item-active': currentStatus === item.value }" @click="handleSwitchStatus(item.value)"
			>
				{{ item.label }}
			</view>
		</view>

		<view v-if="orderList && orderList.length" class="order-list-wrapper">
			<view v-for="item in orderList" :key="item.id" class="goods-pane">
				<view class="order-no-status" @click="go(`/user/merchant-orders/order-form-detail?id=${item.id}`)">
					<view class="order-no">订单号:{{ item.orderSn }}</view>
					<view class="order-status">{{ item.orderStatusText }}</view>
				</view>

				<view class="goods-list" @click="go(`/user/merchant-orders/order-form-detail?id=${item.id}`)">
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
						</view>
					</view>
				</view>

				<view class="goods-ops">
					<view class="actual-price">
						实付：<text class="number">￥{{ item.actualPrice }}</text>
					</view>
				</view>
			</view>

			<uni-load-more v-if="loadingStatus !== 'hidden'" style="background: #fff" :status="loadingStatus"></uni-load-more>
		</view>

		<JNoData v-if="loadingStatus === 'hidden' && !orderList.length" text="无购物记录" type="order-shop"></JNoData>

		<!-- 订单核销dialog -->
		<tui-dialog
			style="position: relative;z-index: 888;" :buttons="[{ text: '取消' }, { text: '确认核销', color: '#586c94' }]"
			:show="isShowVerificationCodeDialog" title="订单核销" @click="handleVerificationDialog"
		>
			<template #content>
				<view>
					<tui-input v-model="verificationCode" padding="26upx 0" label="核销码" placeholder="请填写核销码"></tui-input>
				</view>
			</template>
		</tui-dialog>
	</view>
</template>

<script>
import { orderTypesStore } from '../orderForm/config'
import { getSelectBrandOrderApi, updateSetHxCodeApi } from '../../api/user'
import { getBrandId, getUserId } from '../../utils'
export default {
	name: 'MerchantOrders',
	data() {
		return {
			orderTypesStore,
			currentStatus: 8,
			query: {
				page: 1,
				size: 10
			},
			totalPages: 0,
			orderList: [],
			loadingStatus: 'loading',
			isShowVerificationCodeDialog: false,
			verificationCode: ''
		}
	},

	onLoad(options) { },

	onShow() {
		this.getOrderList()
	},

	methods: {
		// 获取订单信息
		getOrderList(loadMore) {
			if (!getBrandId()) return
			uni.showLoading()
			this.loadingStatus = 'loading'
			getSelectBrandOrderApi({
				brandId: getBrandId(),
				showType: this.currentStatus,
				orderType: 1,
				...this.query
			}).then(({ data }) => {
				if (loadMore) {
					this.orderList.push(...data.orderList)
				} else {
					this.orderList = data.orderList
				}
				this.totalPages = data.totalPages
				this.loadingStatus = 'hidden'
				uni.hideLoading()
			})
		},

		// 切换状态
		handleSwitchStatus(status) {
			this.currentStatus = status
			this.query.page = 1
			this.query.size = 20
			this.getOrderList()
		},

		async handleVerificationDialog(e) {
			console.log(e)
			if (e.index === 0) {
			} else if (e.index === 1) {
				if (!getUserId()) return
				if (!this.verificationCode) return this.$showToast('请填写核销码')
				await updateSetHxCodeApi({ code: this.verificationCode, userId: getUserId() })
					.then((res) => {
						this.$showToast('核销成功', 'success')
					})
			}
			this.verificationCode = ''
			this.isShowVerificationCodeDialog = false
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
	font-size: 28upx;
	color: #3d3d3d;
	padding: 60upx 0;

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
