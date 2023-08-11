<template>
	<view class="order-detail-container">
		<view class="order-detail-header">
			<BeeBack>
				<view class="title">
					<BeeIcon name="arrowleft" :size="24" color="#000000"></BeeIcon>
					<text class="title">订单详情</text>
				</view>
			</BeeBack>
		</view>

		<view class="pane f-s-b" @click="go('/user/site/site-manage?appoint=true')">
			<view v-if="startAddress.detailedAddress" class="address-text">{{ startAddress.detailedAddress }}</view>
			<view v-else class="address-text">请选择地址</view>
			<tui-icon :size="24" name="gps"></tui-icon>
		</view>

		<view v-if="orderInfo" class="order-main-area pane">
			<view class="goods-item">
				<BeeAvatar
					:size="68" radius="10upx"
					:src="common.seamingImgUrl(orderInfo.selectedProduct.product.url)"
				></BeeAvatar>
				<view class="good-detial">
					<view class="name">{{ orderInfo.info.name }}</view>
					<view class="font-12 f-c-77">已选：{{ orderInfo.currentSpecification }}</view>
					<view class="price-text">
						<view class="price-wrapper">
							<text class="current-price">￥{{ orderInfo.selectedProduct.product.price }}</text>
							<!-- <text class="old-price">￥987</text> -->
						</view>
						<view class="op">
							<BeeIcon
								:size="22" :src="require('../../../static/brand/order-detail/jian.png')"
								@click="handleOpNumber(-1)"
							></BeeIcon>
							<text class="number">{{ orderInfo.number }}</text>
							<BeeIcon
								:size="22" :src="require('../../../static/brand/order-detail/add.png')"
								@click="handleOpNumber(+1)"
							></BeeIcon>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view
			v-if="orderInfo.info.supportVoucher"
			style="display: flex;justify-content: space-between;align-items: center;padding: 20upx 18upx;margin-top: 20upx;background-color: #fff;"
		>
			<view style="color: #696969;">是否使用代金劵：</view>
			<view>
				<text>代金劵持有 {{ voucherNumber }}</text>
				<switch
					:checked="opForm.useVoucher" disabled style="transform: scale(0.7)"
					@click="handleChangeUseVoucherStatus"
				/>
			</view>
		</view>
		<CouponUse :brand-id="orderInfo.brandId" @choose="handleChooseCoupon"></CouponUse>

		<view class="footer-container f-s-b">
			<view class="finl-price">
				<text>
					实付
				</text>
				<text class="p-color">
					￥ <text style="font-size: 48upx;" class="f-w-500">
						{{ calcOrderMsg.actualPrice }}
					</text>
				</text>
			</view>
			<button class="bee-btn r-5 f-w-500 f-center" @click="handleToPay">
				<text v-if="orderType === '1'">
					{{ grouponRulesId && !grouponLinkId ? '发起团购' : grouponRulesId && grouponLinkId
						? '加入团购' : '提交订单' }}
				</text>
				<text v-else-if="orderType === '2'">立即预约</text>
			</button>
		</view>
		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
import { getVoucherNumberApi } from '../../../api/user'
import { payShopCarApi, updateShopCarCountApi } from '../../../api/cart'
import { submitOrderApi, firstAddCar } from '../../../api/goods'
import { getUserId, payFn } from '../../../utils'
import { getAddressListApi } from '../../../api/address'
import { J_ONE_PAY_GOODS, J_SELECT_ADDRESS } from '../../../constant'

export default {
	name: 'OrderDetail',
	data() {
		return {
			orderType: '', // 1本地2预约
			voucherNumber: '', // 代金券持有
			orderInfo: null, // 订单相关信息
			cartId: '', // 购物车id
			opForm: {
				message: '',
				useVoucher: false
			},
			calcOrderMsg: {},
			startAddress: {},
			couponId: 0,
			grouponRulesId: '',
			grouponLinkId: '',
			distributionId: ''
		}
	},
	onLoad(options) {
		this.grouponRulesId = options.rulesId || ''
		this.grouponLinkId = options.linkId || ''
		this.distributionId = options.distributionId || ''
		this.orderType = options.orderType
		this.getOrderInfo()
	},
	onShow() {
		this.getAddressList()
	},
	methods: {
		// 获取收货地址
		async getAddressList() {
			const address = uni.getStorageSync(J_SELECT_ADDRESS)
			if (address) {
				this.startAddress = address
				return
			}
			const { data } = await getAddressListApi({
				userId: getUserId()
			})
			data.forEach((address) => {
				if (address.isDefault) this.startAddress = address
			})
			if (!this.startAddress) this.startAddress = data[0]
			this.startAddress = data[0] || {}
		},

		// 获取订单信息
		getOrderInfo() {
			this.orderInfo = uni.getStorageSync(J_ONE_PAY_GOODS)
			if (this.orderInfo.info.supportVoucher) {
				this.getVoucherHold()
			}
			this.getCardId()
		},

		// 获取代金劵持有
		getVoucherHold() {
			getVoucherNumberApi({ userId: getUserId() })
				.then(({ data }) => {
					this.voucherNumber = (data && data.length && data[0].number) || 0
				})
		},

		getCardId() {
			const data = {
				userId: getUserId(),
				goodsId: this.orderInfo.info.id,
				productId: this.orderInfo.selectedProduct.product.id,
				number: this.orderInfo.number,
				useVoucher: this.opForm.useVoucher,
				type: this.orderType,
				distributionId: this.distributionId
			}
			firstAddCar(data)
				.then(({ data }) => {
					this.cartId = data
					this.calcOrderCost()
				})
		},

		// 计算订单费用
		calcOrderCost() {
			uni.showLoading()
			const data = {
				// addressId: this.startAddress.id,
				brandId: this.orderInfo.info.brandId,
				cartId: this.cartId,
				userId: getUserId(),
				couponId: this.couponId,
				grouponRulesId: this.grouponRulesId,
				useVoucher: this.opForm.useVoucher,
				number: this.orderInfo.number
			}
			payShopCarApi(data).then(({ data }) => {
				this.calcOrderMsg = data
				uni.hideLoading()
			})
		},

		// 是否使用代金劵
		handleChangeUseVoucherStatus(e) {
			if (this.opForm.useVoucher) {
				this.opForm.useVoucher = false
				this.calcOrderCost()
			} else if (this.calcOrderMsg && this.calcOrderMsg.actualPrice) {
				if (Number(this.calcOrderMsg.actualPrice) <= Number(this.voucherNumber)) {
					this.opForm.useVoucher = true
					this.calcOrderCost()
				} else {
					this.opForm.useVoucher = false
					return this.$showToast('代金券数量不足')
				}
			} else {
				this.opForm.useVoucher = false
				return this.$showToast('获取订单费用失败')
			}
		},

		// 修改数量
		async handleOpNumber(number) {
			if (number < 0 && this.orderInfo.number == 1) return
			this.orderInfo.number += number
			try {
				await updateShopCarCountApi({
					userId: getUserId(),
					goodsId: this.orderInfo.info.id,
					productId: this.orderInfo.selectedProduct.product.id,
					number: this.orderInfo.number,
					id: this.cartId
				})
				this.calcOrderCost()
			} catch (error) {
				this.ttoast({
					title: '修改失败',
					type: 'fail'
				})
				this.orderInfo.number += -number
			}
		},

		handleChooseCoupon(item) {
			this.couponId = item.id
			this.calcOrderCost()
		},

		// 提交订单支付
		handleToPay() {
			if (!this.startAddress.id) {
				this.ttoast({
					type: 'fail',
					title: '请选择地址'
				})
				return
			}
			const submitData = {
				userId: getUserId(),
				cartId: this.cartId,
				addressId: this.startAddress.id,
				couponId: this.couponId,
				grouponRulesId: this.grouponRulesId,
				grouponLinkId: this.grouponLinkId,
				brandId: this.orderInfo.brandId,
				useVoucher: false,
				...this.opForm
			}
			submitOrderApi(submitData).then(({ data }) => {
				payFn(data, 1)
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import '~@/style/mixin.less';

.order-detail-container {
	.pdd(27upx 22upx);
	min-height: 100vh;
	background-color: #F6F6F6;

	.order-detail-header {
		.flex();

		.title {
			.flex();
		}

		.share-container {
			.flex();

			text {
				margin-right: 8upx;
			}
		}
	}

	.pane {
		background-color: #fff;
		margin-top: 22upx;
		border-radius: 20upx;
		.pdd(32upx 26upx);
	}

	.order-main-area {
		.goods-item {
			.flex();
			margin-bottom: 40upx;

			.good-detial {
				flex: 1;
				margin-left: 18upx;

				.price-text {
					.flex();
				}

				.name {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					color: #3d3d3d;
					font-weight: 500;
					margin-left: 10upx;
				}

				.price-text {
					margin-top: 8upx;

					text {
						font-size: 28upx;
						color: #fa5151;

						&.old-price {
							text-decoration: line-through;
							color: #999;
						}
					}
				}

				.op {
					.flex();

					.number {
						width: 28upx;
						height: 28upx;
						text-align: center;
						line-height: 28upx;
						color: #000;
						margin: 0 8upx;
					}
				}
			}
		}
	}

	.footer-container {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 120upx;
		background-color: #fff;
		.pdd(16upx);

		.bee-btn {
			width: 432upx;
			height: 88upx;
			background-color: #FF973F;
			color: #fff;
			transition: all 500ms;

			&:active {
				opacity: 0.1;
			}
		}
	}
}
</style>
