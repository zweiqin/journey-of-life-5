<template>
	<view class="shop-cat-pay-container">
		<!-- 头部 -->
		<view class="header">
			<JBack width="50" dark height="50" style="margin-top: 8upx"></JBack>
			<h2 v-if="type === 'mall'">确认订单</h2>
			<h2 v-else-if="type === 'reservation'">确认预约</h2>
		</view>

		<!-- 收货信息 -->
		<view v-if="type === 'mall'">
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
				<Goods
					v-for="item in brand.brandCartgoods" :key="item.id" :name="item.goodsName" :price="item.price"
					:img-url="common.seamingImgUrl(item.picUrl)" :desc="item.desc" show-num-only :number="item.number"
				></Goods>

				<view v-if="brand.brandId === 1001079" class="line-pane">
					<view class="title">是否使用代金劵</view>
					<view class="desc" style="color: #999">
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
			<view class="title">商品总额</view>
			<view class="desc">￥{{ payOrderInfo.actualPrice }}</view>
		</view>

		<!-- <view class="line-pane">
			<view class="title">优惠劵</view>
			<view class="desc" style="color: #999">暂无优惠劵可用</view>
			</view> -->

		<view class="footer">
			<view class="price-wrapper">
				待支付：<text class="price-pay">
					￥{{ payOrderInfo.actualPrice }}
				</text>
			</view>
			<button class="uni-btn pay-btn" @click="handleToPay">
				<text v-if="type === 'mall'">立即支付</text>
				<text v-else-if="type === 'reservation'">确认预约</text>
			</button>
		</view>
	</view>
</template>

<script>
import Goods from '../../pages/store/goods-pane.vue'
import { J_TWO_PAY_GOODS, J_SELECT_ADDRESS } from '../../constant'
import { getAddressListApi } from '../../api/address'
import { getUserId, payFn } from '../../utils'
import { payAllShopCarApi, payAllGoodsSubmit } from '../../api/cart'
import { getVoucherNumberApi } from '../../api/user'
import { payOrderGoodsApi } from '../../api/goods'

export default {
	name: 'PayShopCard',
	components: {
		Goods
	},

	onLoad(options) {
		this.type = options.type || 'mall' // mall商城和本地生活、reservation预约
		this.orderType = options.orderType
		this.getGoods()
		this.getAddress()
		getVoucherNumberApi({ userId: getUserId() })
			.then(({ data }) => {
				this.voucherNumber = data[0] ? data[0].number : ''
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
			type: '',
			orderType: '',
			goodsList: [],
			totalPrice: 0,
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
			this.totalPrice = payGoodsInfo.pay
		},
		// 获取地址信息
		getAddress() {
			if (this.type === 'mall') {
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
			} else if (this.type === 'reservation') {
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
			if (this.orderType === '0') {
				if (this.goodsList[index].useVoucher) {
					this.$set(this.goodsList, index, { ...currentBrand, useVoucher: !currentBrand.useVoucher })
					this.handleBuildPayCount()
				} else if (this.payOrderInfo && this.payOrderInfo.actualPrice) {
					if (Number(this.payOrderInfo.actualPrice) < Number(this.voucherNumber)) {
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
			const _this = this
			payAllShopCarApi(this.getPostData()).then(({ data }) => {
				_this.payOrderInfo = data
				uni.hideLoading()
			})
		},

		// 支付
		handleToPay() {
			if (!this.defaultAddress || !this.defaultAddress.id) {
				this.$showToast('请选择收货地址')
				return
			}
			if (this.type === 'mall') {
				payAllGoodsSubmit(this.getPostData()).then(({ data }) => {
					payOrderGoodsApi({
						orderNo: data.orderSn,
						userId: getUserId(),
						payType: 1
					}).then((res) => {
						payFn(res)
					})
				})
			} else if (this.type === 'reservation') {
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
			/deep/ .uni-radio-input-disabled{
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
		position: fixed;
		bottom: -1px;
		left: 0;
		width: 100%;
		height: 112upx;
		.flex(center, flex-end);
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
