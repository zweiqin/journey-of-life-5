<template>
	<view class="shop-cat-pay-container">
		<!-- 头部 -->
		<view class="header">
			<view style="display: flex;align-items: center;">
				<JBack width="50" dark height="50" style="margin-top: 8upx"></JBack>
				<h2 v-if="orderType === '0' || orderType === '1'">确认订单</h2>
				<h2 v-else-if="orderType === '2'">确认预约</h2>
			</view>
			<view style="text-align: right;">
				<tui-button
					type="danger" plain width="180rpx" height="54rpx"
					style="display: inline-block;" shape="circle"
					@click="handleShare"
				>
					一键分享
				</tui-button>
			</view>
		</view>

		<!-- 收货信息 -->
		<view v-if="orderType === '0' || orderType === '1'">
			<view v-if="defaultAddress" class="consignee-info">
				<view class="pane">
					<view class="name">
						<view>
							收货人：{{ defaultAddress.name }} {{ defaultAddress.mobile }}
						</view>
					</view>
					<view @click="handleChooseAddress">
						更换
						<JIcon width="32" height="32" type="right-arrow"></JIcon>
					</view>
				</view>
				<view class="address"> 地址：{{ defaultAddress.detailedAddress }} </view>
				<view class="no-data"> </view>
			</view>
			<view v-else class="address-null" @click="handleChooseAddress">
				<view>请选择收货地址</view>
				<JIcon width="32" height="32" type="right-arrow"></JIcon>
			</view>
		</view>

		<!-- 商品信息 -->
		<view class="goods-wrapper">
			<view v-for="(brand, index) in goodsList" :key="brand.brandId">
				<view class="shop-card-name">
					<JIcon class="icon" width="30" height="30" type="full-store"></JIcon>
					{{ brand.brandName }}
				</view>
				<GoodsPane
					v-for="item in brand.brandCartgoods" :key="item.id" :name="item.goodsName" :price="item.price"
					:img-url="common.seamingImgUrl(item.picUrl)" :desc="item.desc" show-num-only :number="item.number"
					:support-voucher="item.supportVoucher"
				></GoodsPane>

				<!-- <view v-if="brand.brandId === 1001079" class="line-pane"> -->
				<view class="line-pane">
					<view>是否使用代金劵</view>
					<view style="color: #999">
						<label style="display: flex; align-items: center" @click="handleUserVoucher(index)">
							<radio class="radio-use-voucher" disabled :checked="brand.useVoucher" />
							<text style="margin-left: 10px">
								持有：{{ voucherNumber }}
							</text>
						</label>
					</view>
				</view>
				<CouponUse :brand-id="brand.brandId" @choose="handleChooseCoupon($event, index)"></CouponUse>
			</view>
		</view>

		<!-- 汇总信息 -->
		<view class="line-pane">
			<view>商品总额</view>
			<view>￥{{ payOrderInfo.actualPrice }}</view>
		</view>

		<view class="footer">
			<view class="price-wrapper">
				待支付：<text class="price-pay">
					￥{{ payOrderInfo.actualPrice }}
				</text>
			</view>
			<button class="uni-btn pay-btn" @click="handleToPay">
				<text v-if="orderType === '0' || orderType === '1'">立即支付</text>
				<text v-else-if="type === '2'">确认预约</text>
			</button>
		</view>

		<!-- 分享订单商品海报 -->
		<OrderPoster ref="refOrderPoster"></OrderPoster>
	</view>
</template>

<script>
import { J_TWO_PAY_GOODS, J_SELECT_ADDRESS, J_USER_INFO } from '../../constant'
import { getAddressListApi } from '../../api/address'
import { getUserId, payFn } from '../../utils'
import { payAllShopCarApi, payAllGoodsSubmit } from '../../api/cart'
import { getVoucherNumberApi } from '../../api/user'

export default {
	name: 'PayShopCard',
	components: {},

	onLoad(options) {
		this.orderType = options.orderType
		this.getGoods()
		this.getAddress()
		getVoucherNumberApi({ userId: getUserId() })
			.then(({ data }) => {
				this.voucherNumber = data[0] ? data[0].number : 999
			})
	},

	onShow() {
		const address = uni.getStorageSync(J_SELECT_ADDRESS)
		if (address) {
			this.defaultAddress = address
		}
	},

	data() {
		return {
			orderType: '',
			goodsList: [],
			isNoAddress: false,
			defaultAddress: '',
			brandId: null,
			voucherNumber: 0,
			payOrderInfo: {}
		}
	},

	methods: {
		// 获取本地的购物车数据
		getGoods() {
			const payGoodsInfo = uni.getStorageSync(J_TWO_PAY_GOODS) || {}
			this.goodsList = payGoodsInfo.cardsInfo.filter((item) => item.brandCartgoods && item.brandCartgoods.length).map((item) => ({ ...item, couponId: -1 }))
			console.log(this.goodsList)
		},
		// 获取地址信息
		getAddress() {
			if (this.orderType === '0' || this.orderType === '1') {
				getAddressListApi({
					userId: getUserId()
				})
					.then(({ data }) => {
						if (!data.length) {
							this.isNoAddress = true
							return
						}
						const defaultAddress = data.find((item) => !!item.isDefault)
						this.defaultAddress = defaultAddress || data[0]
						if (this.defaultAddress) {
							this.handleBuildPayCount()
						}
					})
			} else if (this.orderType === '2') {
				this.defaultAddress = {
					isDefault: true,
					detailedAddress: '--',
					name: '--',
					mobile: '--',
					id: 146
				}
				this.handleBuildPayCount()
			}
		},

		// 去选择地址
		handleChooseAddress() {
			uni.navigateTo({
				url: '/user/site/site-manage?appoint=true'
			})
		},

		// 是否使用代金劵
		handleUserVoucher(index) {
			const currentBrand = this.goodsList[index]
			// this.$set(this.goodsList, index, {
			// 	...currentBrand,
			// 	useVoucher: !currentBrand.useVoucher
			// })
			if (this.orderType === '0' || this.orderType === '1') {
				if (this.goodsList[index].useVoucher) {
					this.$set(this.goodsList, index, { ...currentBrand, useVoucher: !currentBrand.useVoucher })
					this.handleBuildPayCount()
				} else if (this.goodsList[index].brandCartgoods.every((item) => !item.supportVoucher)) {
					return this.$showToast('商品不支持代金券')
				} else if (this.payOrderInfo && this.payOrderInfo.actualPrice) {
					if (Number(this.voucherNumber)) {
						if (!this.payOrderInfo.brandCartgoods || !this.payOrderInfo.brandCartgoods.length) {
							return this.$showToast('获取订单商品失败')
						}
						let usedVoucherNumber = 0
						this.goodsList.filter((item) => item.useVoucher).forEach((item) => {
							const tempPayObj = this.payOrderInfo.brandCartgoods.find((i) => i.brandId == item.brandId)
							// if (tempPayObj) usedVoucherNumber += Number(tempPayObj.brandGoodsTotalPrice)
							if (tempPayObj) usedVoucherNumber = tempPayObj.cartList.reduce((total, value, index, arr) => value.supportVoucher ? value.price * value.number : 0, usedVoucherNumber)
						})
						const remainVoucherNumber = Number(this.voucherNumber) - usedVoucherNumber
						if ((remainVoucherNumber <= 0) || (remainVoucherNumber < this.payOrderInfo.brandCartgoods.find((i) => i.brandId == this.goodsList[index].brandId).cartList.reduce((total, value, index, arr) => value.supportVoucher ? value.price * value.number : 0, 0))) return this.$showToast('代金券数量不足')
						this.$set(this.goodsList, index, { ...currentBrand, useVoucher: !currentBrand.useVoucher })
						this.handleBuildPayCount()
					} else {
						return this.$showToast('代金券数量不足')
					}
				} else {
					return this.$showToast('获取订单费用失败')
				}
			} else {
				this.$showToast('该场景不能使用代金券')
			}
		},

		handleChooseCoupon(item, index) {
			this.goodsList[index].couponId = item.id
			this.handleBuildPayCount()
		},

		// 获取数据
		getPostData() {
			const cartDtoList = []
			for (const item of this.goodsList) {
				// console.log(item)
				cartDtoList.push({
					couponId: item.couponId,
					brandId: item.brandId * 1,
					useVoucher: !!item.useVoucher,
					useBalance: false
				})
			}
			const subData = {
				userId: getUserId(),
				addressId: this.defaultAddress.id,
				cartDtoList,
				type: this.orderType
			}
			return subData
		},

		// 计算价格
		handleBuildPayCount() {
			uni.showLoading({
				title: '加载中'
			})
			payAllShopCarApi(this.getPostData()).then(({ data }) => {
				this.payOrderInfo = data
				uni.hideLoading()
			})
		},

		// 支付
		handleToPay() {
			if (!this.defaultAddress || !this.defaultAddress.id) {
				this.$showToast('请选择收货地址')
				return
			}
			if (this.orderType === '0' || this.orderType === '1') {
				payAllGoodsSubmit(this.getPostData()).then(({ data }) => {
					payFn({ ...data }, 1)
				})
			} else if (this.orderType === '2') {
				payAllGoodsSubmit(this.getPostData()).then(({ data }) => {
					// { "orderId": 566, "orderSn": "20230603506567" }
					this.$showToast('预约成功')
					setTimeout(() => {
						uni.redirectTo({
							url: '/user/orderForm/order-form-detail?id=' + data.orderId
						})
					}, 2000)
				})
			}
		},

		// 点击分享
		handleShare() {
			if (this.goodsList && this.goodsList.length) {
				const nickName = uni.getStorageSync(J_USER_INFO).nickName
				this.$refs.refOrderPoster.show({
					headerTitle: nickName ? nickName + '的订单商品' : '订单商品',
					brandList: this.goodsList.map((brand) => ({
						brandName: brand.brandName,
						goodsList: brand.brandCartgoods.map((item) => ({
							picUrl: item.picUrl,
							goodsName: item.goodsName,
							specifications: item.specifications.join('，'),
							price: item.price
						}))
					}))
				})
			} else {
				return this.$showToast('缺少商品数据')
			}
		}
	}
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";

.shop-cat-pay-container {
	padding: 60upx 60upx 134upx 52upx;
	box-sizing: border-box;
	color: #3d3d3d;
	font-size: 28upx;

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;

		h2 {
			font-size: 32upx;
			color: #000;
			margin-left: 32upx;
		}
	}

	.consignee-info {
		margin: 60upx 0 60upx 0;

		.pane {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-bottom: 34upx;
			border-bottom: 1upx solid #d8d8d8;

			.j-icon {
				vertical-align: bottom;
			}
		}

		.address {
			margin-top: 30upx;
		}
	}

	.address-null {
		font-size: 28upx;
		padding: 30upx 0;
		margin: 30upx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1upx solid #d8d8d8;
		color: red;
	}

	.goods-wrapper {
		margin-bottom: 30upx;

		.shop-card-name {
			font-size: 24upx;
			padding: 20upx 0;
			margin-top: 30upx;
			font-weight: bold;
			border-bottom: 1upx solid #cdcdcd;
			display: flex;
			align-items: center;
			margin-bottom: 20upx;

			.icon {
				margin-right: 10upx;
			}
		}

		.goods-pane {
			margin-bottom: 40upx;
		}

		.radio-use-voucher {
			/deep/ .uni-radio-input-disabled {
				background-color: #ffffff;
			}
		}
	}

	.line-pane {
		height: 100upx;
		width: 100%;
		.flex();
	}

	.marks {
		position: relative;
		width: 100%;
		margin-top: 80upx;

		textarea {
			margin: 20upx 0;
			width: 100%;
			height: 200upx;
			padding: 20upx;
			box-sizing: border-box;
			background-color: aqua;
		}
	}

	.footer {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: -1px;
		left: 0;
		width: 100%;
		height: 112upx;
		padding: 0 20upx;
		box-sizing: border-box;
		background: #fff;

		.price-pay {
			font-size: 36upx;
			color: #fa5151;
		}

		.pay-btn {
			background-color: #fff;
			border: none;
			height: 72upx;
			width: 248upx;
			border-radius: 100px;
			background-color: #07b9b9;
			color: #fff;
			font-size: 36upx;
			.flex(center, center);
			margin-left: 66upx;
		}
	}
}
</style>
