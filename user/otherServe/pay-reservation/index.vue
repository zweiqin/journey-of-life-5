<template>
	<view class="pay-reservation-container">

		<!-- 头部 -->
		<view class="header">
			<JBack width="50" dark height="50" style="margin-top: 8upx"></JBack>
			<h2>预约信息</h2>
		</view>

		<view style="margin-top: 20upx;padding: 28upx 38upx;background-color: #ffffff;border-radius: 28upx;">
			<view style="display: flex;align-items: center;">
				<view>
					<BeeAvatar :size="40" radius="10upx" :src="common.seamingImgUrl(brandInfo.picUrl)"></BeeAvatar>
				</view>
				<view style="flex: 1;width: 0;margin-left: 18upx;">
					<view style="font-size: 34upx;font-weight: bold;">{{ brandInfo.name }}</view>
					<view style="font-size: 26upx;color: #767676;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
						{{ brandInfo.address }}
					</view>
				</view>
			</view>
			<view
				style="height: 3upx;margin-top: 8upx;;background: linear-gradient(270deg, #FFFFFF 0%, #D8D8D8 52%, #FFFFFF 100%);"
			>
			</view>
			<view style="margin-top: 20upx;">
				<view v-for="(store, index) in shopCarList" :key="store.brandId">
					<view>
						<view
							v-for="(item, i) in store.cartList" :key="item.productId"
							style="display: flex;justify-content: space-between;align-items: center;padding-bottom: 10upx;margin-bottom: 10upx;border-bottom: 2upx solid #d6d4d4;"
						>
							<ShopCarGoods ref="refShopCarGoods" :goods="item" :store="store" @success="getShopList"></ShopCarGoods>
							<view style="margin-left: 30upx;" @click="removeShopCarGoods(item)">
								<tui-icon name="close-fill" color="#f14c4c" :size="48" unit="rpx"></tui-icon>
							</view>
						</view>
					</view>
					<CouponUse
						v-if="goodsList && goodsList.length" :brand-id="store.brandId"
						@choose="handleChooseCoupon($event, index)"
					></CouponUse>
				</view>
			</view>
			<view style="margin-top: 40upx;">
				<tui-button
					type="warning" width="310rpx" height="90rpx" margin="0 10rpx 0 0"
					plain shape="circle"
					style="margin: 0 auto;" @click="$refs.refJSpecificationScreen.open(goodsId)"
				>
					+ 新增预约产品
				</tui-button>
			</view>
			<view style="display: flex;justify-content: flex-end;margin-top: 20upx;">
				<view>商品总额：</view>
				<view>￥{{ typeof payOrderInfo.actualPrice === 'number' ? payOrderInfo.actualPrice : '--' }}</view>
			</view>
		</view>

		<view style="margin-top: 20upx;padding: 28upx 38upx;background-color: #ffffff;border-radius: 28upx;">
			<view style="padding-bottom: 20upx;;border-bottom: 1upx dashed #000000;font-size: 30upx;font-weight: bold;">预约信息填写</view>
			<view>
				<tui-input v-model="form.contacts" padding="26rpx 6rpx" label="联系人：" placeholder="请输入联系人姓名" clearable></tui-input>
				<tui-input
					v-model="form.phone" padding="26rpx 6rpx" label="联系电话：" placeholder="请输入联系电话"
					type="number"
					clearable
				></tui-input>

				<view style="padding: 26rpx 6rpx">
					<text>人数：</text>
					<tui-numberbox
						:value="form.quantity" :step="1" :min="1" :max="999"
						@change="handleInput('quantity', $event)"
					></tui-numberbox>
					<text>位</text>
				</view>

				<view>
					<tui-input
						padding="26rpx 6rpx" label="到店时间：" placeholder="请选择到店时间" disabled
						:value="form.arrivalTime"
						@click="$refs.dateTimeTradeS.show()"
					></tui-input>
					<tui-datetime
						ref="dateTimeTradeS" :type="7" radius
						@confirm="handleInput('arrivalTime', $event)"
					></tui-datetime>
				</view>

				<view>
					<tui-textarea
						v-model="form.remarks" :border-top="false" :border-bottom="false" background-color="#f6f6f6"
						padding="26rpx 20rpx" flex-start label="备注：" placeholder="请输入备注"
					></tui-textarea>
				</view>

			</view>
		</view>

		<view class="footer" style="margin-top: 26upx;padding: 0 20upx;">
			<tui-button type="warning" height="84upx" @click="handleToPay">提交预约</tui-button>
		</view>

		<JSpecificationScreen
			ref="refJSpecificationScreen" btn-text="添加" order-type="2" :show-success-toast="false"
			:data="goodsDetail" @success="getShopList"
		></JSpecificationScreen>
	</view>
</template>

<script>
import { J_RESERVATION_PAY_GOODS, J_TWO_PAY_GOODS } from '../../../constant'
import { getUserId } from '../../../utils'
import { getShopCarListApi, deleteShopCarGoodsApi, payAllShopCarApi } from '../../../api/cart'
import { deleteCleanUpCartApi, addSubmitAppointmentApi } from '../../../api/user'
import { addShopCarApi, getGoodsDetailApi } from '../../../api/goods'

export default {
	name: 'PayReservation',

	onLoad(options) {
		this.initGoods()
	},

	onShow() {
	},

	data() {
		return {
			brandInfo: {},
			goodsDetail: null,
			goodsId: null,
			shopCarList: [],

			form: {
				contacts: '',
				phone: '',
				quantity: 1,
				arrivalTime: '',
				coupon: '',
				remarks: ''
			},

			defaultAddress: {
				isDefault: true,
				detailedAddress: '--',
				name: '--',
				mobile: '--',
				id: 146
			},
			goodsList: [],
			payOrderInfo: {}
		}
	},

	methods: {
		// 获取商品数据
		initGoods() {
			const payReservationInfo = uni.getStorageSync(J_RESERVATION_PAY_GOODS)
			if (!payReservationInfo || !payReservationInfo.cardsInfo[0].brandCartgoods[0].productId) return this.$showToast('获取商品数据失败')
			// this.brandInfo.brandId = payReservationInfo.cardsInfo[0].brandId
			// this.brandInfo.brandName = payReservationInfo.cardsInfo[0].brandName
			this.goodsId = payReservationInfo.cardsInfo[0].brandCartgoods[0].goodsId
			uni.showLoading()
			deleteCleanUpCartApi({
				userId: getUserId(),
				brandId: payReservationInfo.cardsInfo[0].brandCartgoods[0].brandId
			})
				.then(async ({ data }) => {
					const res = await getGoodsDetailApi(
						// goodsInfo.id,
						payReservationInfo.cardsInfo[0].brandCartgoods[0].goodsId,
						getUserId()
					)
					this.goodsDetail = res.data
					this.brandInfo = res.data.brand || {}
					await addShopCarApi({
						'userId': getUserId(),
						'brandId': payReservationInfo.cardsInfo[0].brandCartgoods[0].brandId,
						'goodsId': payReservationInfo.cardsInfo[0].brandCartgoods[0].goodsId,
						'checked': 1,
						'number': payReservationInfo.cardsInfo[0].brandCartgoods[0].number,
						'productId': payReservationInfo.cardsInfo[0].brandCartgoods[0].productId,
						'type': 2
					})
					this.getShopList()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		// 获取购物车列表
		getShopList() {
			this.goodsList = []
			uni.showLoading()
			getShopCarListApi({
				userId: getUserId(),
				type: 2
			})
				.then(({ data }) => {
					this.shopCarList = data.brandCartgoods
					this.initOrder()
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		// 点击删除按钮
		removeShopCarGoods(item) {
			uni.showModal({
				title: '提示',
				content: '是否移除该预约商品？',
				success: (res) => {
					if (res.confirm) {
						deleteShopCarGoodsApi({
							productIds: [ item.productId ],
							userId: getUserId()
						}).then(() => {
							this.getShopList()
						})
					}
				}
			})
		},

		initOrder() {
			const op = []
			for (const item of this.shopCarList) {
				if (item.cartList.filter((item) => item.checked).length) {
					op.push({
						brandId: item.brandId,
						brandName: item.brandName,
						brandCartgoods: item.cartList.filter((item) => item.checked)
					})
				}
			}
			if (op.length < 1) return
			if (op.find((item) => item.brandId === 1001079)) {
				return this.$showToast('无法预约巨蜂自营的商品')
			}
			uni.setStorageSync(J_TWO_PAY_GOODS, {
				cardsInfo: op,
				pay: ''
			})
			this.getGoods()
			this.handleBuildPayCount()
		},

		// 获取本地的购物车数据
		getGoods() {
			const payGoodsInfo = uni.getStorageSync(J_TWO_PAY_GOODS) || {}
			this.goodsList = payGoodsInfo.cardsInfo.filter((item) => item.brandCartgoods && item.brandCartgoods.length).map((item) => ({ ...item, couponId: -1 }))
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
				type: 2
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
			if (!this.goodsList.length) return this.$showToast('请选择预约商品')
			if (!this.form.contacts) return this.$showToast('请输入联系人姓名')
			if (!this.form.phone) return this.$showToast('请输入联系电话')
			if (!this.form.quantity) return this.$showToast('请输入人数')
			if (!this.form.arrivalTime) return this.$showToast('请选择到店时间')
			if (!this.form.remarks) return this.$showToast('请输入备注')
			if (!this.brandInfo.id) return this.$showToast('缺少商家信息')
			if (!this.defaultAddress || !this.defaultAddress.id) {
				this.$showToast('缺少地址')
				return
			}
			const allOrderVo = this.getPostData()
			addSubmitAppointmentApi({
				appointmentVo: {
					brandId: this.brandInfo.id,
					userId: getUserId(),
					contacts: this.form.contacts,
					phone: this.form.phone,
					quantity: this.form.quantity,
					arrivalTime: this.form.arrivalTime,
					coupon: allOrderVo.cartDtoList && allOrderVo.cartDtoList.length ? allOrderVo.cartDtoList[0].couponId : -1,
					remarks: this.form.remarks
				},
				allOrderVo
			}).then(({ data }) => {
				this.$showToast('预约成功')
				setTimeout(() => {
					uni.redirectTo({
						url: '/user/orderForm/order-form-detail?id=' + data.orderId
					})
				}, 2000)
			})
		},

		handleInput(field, e) {
			console.log(field, e)
			if (field === 'quantity') {
				this.form[field] = e.value
			} else if (field === 'arrivalTime') {
				this.form[field] = e.result
			}
		}
	}
}
</script>

<style lang="less" scoped>
@import "../../../style/mixin.less";

.pay-reservation-container {
	min-height: 100vh;
	padding: 30upx 20upx 134upx 20upx;
	background-color: #f6f6f6;
	box-sizing: border-box;

	.header {
		display: flex;
		align-items: center;

		h2 {
			font-size: 32upx;
			color: #000;
			margin-left: 32upx;
		}
	}

}
</style>
