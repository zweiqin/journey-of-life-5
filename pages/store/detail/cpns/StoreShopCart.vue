<template>
	<view>
		<view>
			<tui-drawer mode="bottom" :visible="visibleDrawer" :mask-z-index="1" :z-index="2" @close="visibleDrawer = false">
				<view class="shop-car-container" style="padding-top: 0;">

					<view class="shop-list" style="max-height: 60vh;overflow-y: auto;">
						<view v-for="store in shopCarList" :key="store.id" class="shop-car-list">
							<view class="shop-card-name">
								<JIcon class="icon" width="30" height="30" type="full-store"></JIcon>
								{{ store.brandName }}
							</view>

							<view class="shop-goods-list">
								<view v-for="(item, index) in store.cartList" :key="item.productId" class="goods-item">
									<JIcon
										v-show="opStatus === 'EDIT'" class="icon" :type="item.checked ? 'active-choose' : 'active-default'"
										@click="handleChangeGoodsStatus(item, index, store)"
									></JIcon>
									<JAvatar radius="10" :size="120" :src="common.seamingImgUrl(item.picUrl)"></JAvatar>

									<view class="goods-pane-right">
										<view class="goods-pane-name">{{ item.goodsName.trim() }} </view>
										<view class="goods-pane-desc-content">
											<text class="goods-pane-desc">
												{{
													item.specifications | getDesc
												}}
											</text>
										</view>
										<view class="goods-pane-footer">
											<text class="goods-pane-price">￥{{ item.price }}</text>

											<view class="ops">
												<text class="item" @click="handleChangeNumber(-1, item, index, store)">
													-
												</text>
												<text class="item">{{ item.number }}</text>
												<text class="item" @click="handleChangeNumber(+1, item, index, store)">
													+
												</text>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>

						<view v-if="shopCarList && !shopCarList.length && loadingStatus !== 'loading'" class="no-data">
							暂无商品，快去添加吧~
						</view>
					</view>

				</view>
			</tui-drawer>
		</view>
		<view style="position: fixed;bottom: 0;z-index: 3;width: 100%;padding: 20upx;background-color: #ffffff;box-sizing: border-box;">
			<view style="display: flex;justify-content: flex-end;align-items: center;font-size: 28upx;" @click="visibleDrawer = !visibleDrawer">
				<!-- <text style="color: #949494;padding-right: 20upx;">共件</text> -->
				<text>合计：</text>
				<text style="padding-right: 20upx;font-weight: bold;font-size: 46upx;color: #ff1111;">￥{{ totalPrice }}</text>
				<view>
					<tui-button
						type="danger" width="180rpx" height="68rpx" style="border-radius: 50rpx;"
						@click="handleToPay('mall')"
					>
						结算
					</tui-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {
	getShopCarListApi,
	changeShopCarStatusApi,
	updateShopCarCountApi,
	deleteShopCarGoodsApi,
	addCollectionsApi
} from '../../../../api/cart'
import { everyLookApi, getShopCarApi } from '../../../../api/goods'
import { getUserId, fomartNumber } from '../../../../utils'
import { J_TWO_PAY_GOODS, J_SELECT_ADDRESS } from '../../../../constant'

const EDIT = 'EDIT'

export default {
	name: 'StoreShopCart',
	components: { },

	filters: {
		getDesc(specifications) {
			if (!specifications || !specifications.length) {
				return ''
			}
			let str = ''
			for (const item of specifications) {
				str += item + ' '
			}
			return str
		}
	},

	props: {
		brandId: {
			type: [String, Number],
			required: true
		},
		brandName: {
			type: String,
			required: true
		}
	},

	data() {
		return {
			visibleDrawer: false,

			type: '',
			opStatus: EDIT,
			opList: [],
			shopCarList: [],
			carTotalInfo: [],
			loadingStatus: 'noMore',
			isChangeNumber: false,
			opGoodsList: [],
			isBack: '0',
			currentTab: 1
		}
	},

	computed: {
		totalPrice() {
			let price = 0
			for (const shop of this.shopCarList) {
				for (const item of shop.cartList) {
					if (item.checked) {
						price += item.number * item.price
					}
				}
			}
			return fomartNumber(price)
		}
	},

	created() {
		this.getShopList()
		// uni.removeStorageSync(J_SELECT_ADDRESS)
	},

	methods: {
		// 改变商品勾选状态
		handleChangeGoodsStatus(goods, index, store) {
			changeShopCarStatusApi({
				userId: getUserId(),
				productIds: [ goods.productId ],
				isChecked: goods.checked ? 0 : 1,
				brandId: store.brandId
			}).then(() => {
				store.cartList[index].checked = !store.cartList[index].checked
			})
		},

		// 获取购物车列表
		getShopList() {
			this.loadingStatus = 'loading'
			getShopCarApi({
				userId: getUserId(),
				brandId: this.brandId,
				type: 1
			})
				.then(({ data }) => {
					this.shopCarList = [ { brandId: this.brandId, brandName: this.brandName, cartList: data.cartList } ]
					uni.hideLoading()
					this.loadingStatus = 'noMore'
				})
				.catch(() => {
					uni.hideLoading()
					this.loadingStatus = 'noMore'
				})
		},

		// 购物车数量的添加
		handleChangeNumber(number, goods, index, store) {
			if (this.isChangeNumber) {
				this.$showToast('操作太快啦~')
				return
			}
			const _this = this
			this.isChangeNumber = true
			if (number === -1 && goods.number === 1) {
				uni.showModal({
					title: '提示',
					content: '是否将该商品移出购物车？',
					success(res) {
						if (res.confirm) {
							_this.deleteGoods([ goods.productId ], store)
						}
					}
				})
				_this.isChangeNumber = false
			} else {
				uni.showLoading()
				updateShopCarCountApi({
					userId: getUserId(),
					goodsId: goods.goodsId,
					productId: goods.productId,
					number: goods.number + number,
					id: goods.id
				})
					.then(() => {
						_this.getShopList()
						_this.isChangeNumber = false
						uni.hideLoading()
					})
					.catch(() => {
						this.$showToast('数量修改失败')
						_this.isChangeNumber = false
						uni.hideLoading()
					})
			}
		},

		// 删除购物车的商品
		deleteGoods(productIds) {
			deleteShopCarGoodsApi({
				productIds,
				userId: getUserId()
			}).then(() => {
				this.getShopList()
			})
		},

		// 去结算
		handleToPay(type) {
			uni.showLoading()
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
			// if (op.filter((item) => item.brandCartgoods && item.brandCartgoods.length).length > 1) {
			// 	return this.$showToast('只能选择一家店铺的商品')
			// }
			if (op.length < 1) {
				return this.$showToast('请先选择商品')
			}
			if (type === 'reservation') {
				if (op.find((item) => item.brandId === 1001079)) {
					return this.$showToast('无法预约巨蜂自营的商品')
				}
			}
			uni.setStorageSync(J_TWO_PAY_GOODS, {
				cardsInfo: op,
				pay: this.totalPrice
			})
			uni.hideLoading()
			uni.navigateTo({
				url: `/user/sever/pay-shop-card?orderType=${this.currentTab}&type=${type}`
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../../../user/sever/css/shop-car.less';
</style>
