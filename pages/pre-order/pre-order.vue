<template>
	<view class="order-detail">
		<JHeader title="商品订单详情" width="50" height="50"></JHeader>
		<view class="address container" @click="go('/user/site/site-manage?appoint=true')">
			<JIcon width="26" height="34" type="locale"></JIcon>
			<view v-if="!startAddress" class="address-text">请选择收货地址</view>
			<view v-else class="address-detail">
				<view>收件人：{{ startAddress.name }} {{ startAddress.mobile }}</view>
				<view>{{ startAddress.detailedAddress }}</view>
			</view>

			<JIcon type="right-arrow" width="34" height="40"></JIcon>
		</view>

		<view v-if="orderInfo" class="order container">
			<view class="store-name">
				<text class="title">店铺名称</text>：{{ orderInfo.brand.name }}
			</view>
			<view class="goods">
				<image class="goods-img" :src="orderInfo.currentGoodsImg" mode="" />

				<view class="info">
					<view class="goods-name">{{ orderInfo.info.name }}</view>
					<view class="spa">{{ orderInfo.currentSpecification }}</view>
					<view class="dan-price">￥{{ orderInfo.selectedProduct.product.price }}</view>
				</view>
			</view>

			<view class="words">
				<view class="title">买家留言：</view>
				<textarea id="" v-model.trim="opForm.message" placeholder="50字以内（选填）" maxlength="50"></textarea>
			</view>

			<view class="line">
				<view class="title">商品金额：</view>
				<view class="value">￥{{ calcOrderMsg ? calcOrderMsg.goodsTotalPrice : '--' }}</view>
			</view>

			<view class="line">
				<view class="title">运费：</view>
				<view class="value">￥{{ calcOrderMsg ? calcOrderMsg.freightPrice : '--' }}</view>
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

		<view v-if="calcOrderMsg" class="prder-cost container">
			<view class="line">
				<view class="title">订单总金额：</view>
				<view class="value">￥{{ calcOrderMsg.actualPrice }}</view>
			</view>

			<view class="line">
				<view class="title">总运费：</view>
				<view class="value">￥0</view>
			</view>
		</view>

		<view v-if="calcOrderMsg" class="footer">
			合计：<text class="footer-text">￥{{ calcOrderMsg.actualPrice }}</text>
			<button class="uni-btn" @click="handleToPay">提交订单</button>
		</view>
	</view>
</template>

<script>
import { getAddressListApi } from '../../api/address'
import { getVoucherNumberApi } from '../../api/user'
import { firstAddCar, submitOrderApi, payOrderGoodsApi } from '../../api/goods'
import { getUserId, payFn } from '../../utils'
import { payShopCarApi } from '../../api/cart'
import { J_ONE_PAY_GOODS, J_SELECT_ADDRESS } from '../../constant'
export default {
	name: 'PreOrder',
	onLoad(options) {
		this.grouponRulesId = options.rulesId || ''
		this.grouponLinkId = options.linkId || ''
		this.getOrderInfo()
	},

	onShow() {
		this.getAddressList()
	},

	data() {
		return {
			startAddress: '', // 收货地址
			voucherNumber: '', // 代金券持有
			orderInfo: null, // 订单相关信息
			cartId: '', // 购物车id
			opForm: {
				message: '',
				useVoucher: false
			},
			calcOrderMsg: null, // 计算现在的费用
			couponId: 0,
			grouponRulesId: '',
			grouponLinkId: ''
		}
	},

	methods: {
		// 获取地址
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
				type: 0
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
				useVoucher: this.opForm.useVoucher
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
			// this.opForm.useVoucher = e.detail.value
			// this.calcOrderCost()
		},

		handleChooseCoupon(item) {
			this.couponId = item.id
			this.calcOrderCost()
		},

		// 提交订单支付
		handleToPay() {
			if (!this.startAddress || !this.startAddress.id) return this.$showToast('请选择地址')
			const submitData = {
				userId: getUserId(),
				cartId: this.cartId,
				addressId: this.startAddress.id,
				couponId: this.couponId,
				grouponRulesId: this.grouponRulesId,
				grouponLinkId: this.grouponLinkId,
				brandId: this.orderInfo.brandId,
				...this.opForm
			}
			submitOrderApi(submitData).then(({ data }) => {
				payOrderGoodsApi({
					orderNo: data.orderSn,
					userId: getUserId(),
					payType: 1
				}).then((res) => {
					payFn(res)
				})
			})
		}
	}
}
</script>

<style lang="less" scoped>
.order-detail {
	background-color: #f6f6f6;
	width: 100%;
	min-height: 100vh;
	height: auto;
	font-size: 28upx;
	color: #000;
	padding-bottom: 50px;

	.container {
		padding: 20upx 20upx;
		box-sizing: border-box;
		background-color: #fff;
	}

	/deep/ .j-header-container {
		padding: 30upx 40upx;
		box-sizing: border-box;
		background-color: #fff;
		border-bottom: 1upx solid #ccc;
	}

	.address {
		display: flex;
		align-items: center;
		background-color: #fff;

		.address-detail {
			flex: 1;
			line-height: 1.5;
		}

		/deep/ .j-icon {
			flex-shrink: 0;
			margin-right: 20upx;
		}

		.address-text {
			margin-left: 20upx;
		}
	}

	.order {
		margin-top: 20upx;

		.store-name {
			padding: 20upx 0;
			font-size: 24upx;
			border-bottom: 1upx solid #dadada;

			.title {
				color: #696969;
			}
		}

		.goods {
			display: flex;
			justify-content: space-around;
			align-items: flex-start;
			padding: 20upx 0;

			.goods-img {
				width: 200upx;
				height: 200upx;
				flex-shrink: 0;
				margin-right: 20upx;
			}

			.info {
				flex: 1;

				.goods-name {
					margin-bottom: 20upx;
				}

				.dan-price {
					color: #ef5452;
					margin-top: 10upx;
				}
			}
		}

		.words {
			display: flex;
			// min-height: 150upx;
			// overflow-y: auto;
			padding: 20upx;
			box-sizing: border-box;
			background-color: #f6f6f6;
			border-radius: 4px;

			.title {
				white-space: nowrap;
			}

			textarea {
				color: #696969;
				font-size: 28upx;
				height: fit-content;

				/deep/ .uni-textarea-wrapper {
					min-height: 120upx;
					overflow-y: auto;
				}
			}
		}
	}

	.line {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20upx 0;
		margin-top: 20upx;

		.value {
			color: #ef5452;
		}
	}

	.prder-cost {
		margin-top: 20upx;
	}

	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
		height: 50px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 30upx;

		&-text {
			color: #ef5452;
		}

		.uni-btn {
			font-size: 32upx;
			height: 50px;
			background-color: #ef5452;
			padding: 0 20upx;
			color: #fff;
			line-height: 50px;
			border-radius: 0;
			margin-left: 20px;
		}
	}
}
</style>
