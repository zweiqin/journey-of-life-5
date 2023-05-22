<template>
	<view class="shop-cat-pay-container">
		<!-- 头部 -->
		<view class="header">
			<JBack width="50" dark height="50" style="margin-top: 8upx"></JBack>
			<h2 class="">确认订单</h2>
		</view>

		<!-- 收货信息 -->
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

		<!-- 商品信息 -->
		<view class="goods-wrapper">
			<view v-for="(brand, index) in goodsList" :key="brand.brandId">
				<view class="shop-card-name">
					<JIcon class="icon" width="30" height="30" type="full-store"></JIcon>
					{{ brand.brandName }}
				</view>
				<Goods
					v-for="item in brand.brandCartgoods" :key="item.id" :name="item.goodsName" :price="item.price"
					:img-url="item.picUrl" :desc="item.desc" read-only
				></Goods>

				<view v-if="brand.brandName === '巨蜂自营'" class="line-pane">
					<view class="title">是否使用代金劵</view>
					<view class="desc" style="color: #999">
						<label style="display: flex; align-items: center" @click="handleUserVoucher(index)">
							<radio :checked="brand.useVoucher" /><text style="margin-left: 10px">
								持有：{{ voucherNumber }}
							</text>
						</label>
					</view>
				</view>
			</view>
		</view>

		<!-- 汇总信息 -->
		<view class="line-pane">
			<view class="title">商品总额</view>
			<view class="desc">￥{{ payOrderInfo.actualPrice }}</view>
		</view>

		<view class="line-pane">
			<view class="title">优惠劵</view>
			<view class="desc" style="color: #999">暂无优惠劵可用</view>
		</view>

		<view class="footer">
			<view class="price-wrapper">
				待支付：<text class="price-pay">
					￥{{ payOrderInfo.actualPrice }}
				</text>
			</view>
			<button class="uni-btn pay-btn" @click="handleToPay">立即支付</button>
		</view>
	</view>
</template>

<script>
import Goods from '../../pages/store/goods-pane.vue'
import { J_TWO_PAY_GOODS, J_SELECT_ADDRESS } from '../../constant'
import { getAddressListApi } from '../../api/address'
import { getUserId } from '../../utils'
import { payAllShopCarApi, payAllGoodsSubmit } from '../../api/cart'
import { getVoucherNumberApi } from '../../api/user'
import { submitOrderApi, payOrderGoodsApi } from '../../api/goods'

export default {
	name: 'PayShopCard',
	components: {
		Goods
	},

	onLoad() {
		this.getGoods()
		this.getAddress()

		getVoucherNumberApi({ userId: getUserId() }).then(({ data }) => {
			this.voucherNumber = data[0].number
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
			this.goodsList = payGoodsInfo.cardsInfo
			this.totalPrice = payGoodsInfo.pay
		},
		// 获取地址信息
		getAddress() {
			const _this = this
			getAddressListApi({
				userId: getUserId()
			}).then(({ data }) => {
				if (!data.length) {
					_this.isNoAddress = true
					return
				}

				const defaultAddress = data.find((item) => !!item.isDefault)

				_this.defaultAddress = defaultAddress || data[0]

				if (_this.defaultAddress) {
					this.handleBuildPayCount()
				}
			})
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
			this.$set(this.goodsList, index, {
				...currentBrand,
				useVoucher: !currentBrand.useVoucher
			})

			this.handleBuildPayCount()
		},

		// 获取数据
		getPostData() {
			const cartDtoList = []

			for (const item of this.goodsList) {
				console.log(item)
				cartDtoList.push({
					couponId: -1,
					brandId: item.brandId * 1,
					useVoucher: !!item.useVoucher,
					useBalance: false
				})
			}

			const subData = {
				userId: getUserId(),
				addressId: this.defaultAddress.id,
				cartDtoList
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

			// return;

			payAllGoodsSubmit(this.getPostData()).then(({ data }) => {
				payOrderGoodsApi({
					orderNo: data.orderSn,
					userId: getUserId(),
					payType: 1
				}).then((res) => {
					const payData = JSON.parse(res.h5PayUrl)
					const form = document.createElement('form')
					form.setAttribute('action', payData.url)
					form.setAttribute('method', 'POST')
					const data = JSON.parse(payData.data)
					let input
					for (const key in data) {
						input = document.createElement('input')
						input.name = key
						input.value = data[key]
						form.appendChild(input)
					}
					document.body.appendChild(form)
					form.submit()
					document.body.removeChild(form)
				})
			})
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
