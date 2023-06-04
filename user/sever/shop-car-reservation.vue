<template>
	<view class="shop-car-container">
		<view class="header">
			<JBack :tabbar="isBack === '1' ? '' : '/pages/user/user'" style="margin-top: 10upx" width="50" height="50" dark></JBack>
			<h2>预约列表</h2>
			<button class="edit" @click="handleSwitchShopCarStatus">
				{{ opStatus === 'EDIT' ? '编辑' : '完成' }}
			</button>
		</view>

		<view class="shop-list">
			<view v-for="store in shopCarList" :key="store.id" class="shop-car-list">
				<view class="shop-card-name">
					<JIcon class="icon" width="30" height="30" type="full-store"></JIcon>
					{{ store.brandName }}
				</view>

				<view class="shop-goods-list">
					<view v-if="store.cartList && store.cartList.length">
						<view v-for="(item, index) in store.cartList" :key="item.productId" class="goods-item">
							<JIcon
								v-show="opStatus === 'EDIT'" class="icon" :type="item.checked ? 'active-choose' : 'active-default'"
								@click="handleChangeGoodsStatus(item, index, store)"
							></JIcon>
							<JIcon
								v-show="opStatus === 'CONFIRM'" class="icon" :type="opList.includes(item.productId)
									? 'active-choose'
									: 'active-default'
								" @click="handleOp(item)"
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
					<view v-else>
						<tui-no-data>您未在该商店选购商品</tui-no-data>
					</view>
				</view>
			</view>

			<!-- <uni-load-more
				style="margin-top: 60upx"
				type="snow"
				status="loading"
				v-if="loadingStatus === 'loading'"
				></uni-load-more> -->

			<view v-if="shopCarList && !shopCarList.length && loadingStatus !== 'loading'" class="no-data">
				暂无商品，快去添加吧~
			</view>
		</view>

		<view
			class="shop-car-footer" :class="{
				show: !shopCarList.length
			}"
		>
			<view class="choose-all" @click="handleChooseAll">
				<JIcon class="icon" :type="allCheckStatus ? 'active-choose' : 'active-default'"></JIcon>
				<text class="text">全选</text>
			</view>
			<!-- 编辑 -->
			<view v-show="opStatus === 'EDIT'" class="edit-op">
				<text class="text">合计</text>
				<view class="totoal-price">￥{{ totalPrice }}</view>
				<button class="uni-btn pay-btn" @click="handleToPay">去预约</button>
			</view>

			<!-- 完成 -->
			<view v-show="opStatus === 'CONFIRM'" class="confirm-op">
				<button class="uni-btn op-btn" @click="addCollections">移入收藏</button>
				<button class="uni-btn op-btn" @click="removeShopCarGoods">删除</button>
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
} from '../../api/cart'
import { everyLookApi, getShopCarApi } from '../../api/goods'
import { getUserId, fomartNumber } from '../../utils'
import { J_TWO_PAY_GOODS, J_SELECT_ADDRESS } from '../../constant'

const EDIT = 'EDIT'
const CONFIRM = 'CONFIRM'

export default {
	name: 'ShopCarReservation',
	components: {},

	onLoad(options) {
		this.brandId = options.brandId || '1001079'
		this.brandName = options.brandName || '巨蜂自营'
		this.isBack = options.isBack || '0'
		this.getShopList()
		uni.removeStorageSync(J_SELECT_ADDRESS)
	},

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

	data() {
		return {
			opStatus: EDIT,
			opList: [],
			shopCarList: [],
			carTotalInfo: [],
			loadingStatus: 'noMore',
			isChangeNumber: false,
			opGoodsList: [],
			brandId: '',
			brandName: '',
			isBack: '0'
		}
	},

	computed: {
		allCheckStatus() {
			if (!this.shopCarList.length) {
				return false
			}
			if (this.opStatus === EDIT) {
				let status = true
				for (const shop of this.shopCarList) {
					for (const item of shop.cartList) {
						if (!item.checked) {
							status = false
							break
						}
					}
				}
				return status
			}
			let status = true
			for (const shop of this.shopCarList) {
				for (const item of shop.cartList) {
					if (!this.opList.includes(item.productId)) {
						status = false
					}
				}
			}
			return status
		},

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

	methods: {
		// 操作按钮切换
		handleSwitchShopCarStatus() {
			if (!this.shopCarList.length && this.opStatus === EDIT) {
				this.$showToast('没有商品可以编辑')
				return
			}
			this.opStatus = this.opStatus === EDIT ? CONFIRM : EDIT
			if (this.opStatus === CONFIRM) {
				this.opList = []
			}

			this.$forceUpdate()
		},

		// 改变商品勾选状态
		handleChangeGoodsStatus(goods, index, store) {
			if (this.opStatus === CONFIRM) {
			} else {
				changeShopCarStatusApi({
					userId: getUserId(),
					productIds: [ goods.productId ],
					isChecked: goods.checked ? 0 : 1,
					brandId: store.brandId
				}).then(() => {
					store.cartList[index].checked = !store.cartList[index].checked
				})
			}
		},

		// 编辑选中的列表
		handleOp(goods) {
			const index = this.opList.findIndex((item) => item === goods.productId)
			console.log(goods)
			if (index === -1) {
				this.opList.push(goods.productId)
				this.opGoodsList.push(goods.goodsId)
			} else {
				this.opList.splice(index, 1)
				this.opGoodsList.splice(index, 1)
			}
		},

		// 获取购物车列表
		getShopList() {
			this.loadingStatus = 'loading'
			const _this = this
			// getShopCarListApi({
			getShopCarApi({
				userId: getUserId(),
				brandId: this.brandId
			})
				.then(({ data }) => {
					console.log(data)
					// _this.shopCarList = data.brandCartgoods
					// (data.brandCartgoods[0].cartList[0].goodsId)
					_this.shopCarList = [ { brandId: this.brandId, brandName: this.brandName, cartList: data.cartList } ]
					uni.hideLoading()
					_this.loadingStatus = 'noMore'
				})
				.catch(() => {
					uni.hideLoading()
					_this.loadingStatus = 'noMore'
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

		// 点击删除按钮
		removeShopCarGoods() {
			const _this = this
			uni.showModal({
				title: '提示',
				content: '是否删除当前选中的商品？',
				success(res) {
					if (res.confirm) {
						_this.deleteGoods(_this.opList)
					}
				}
			})
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

		// 设置购物车的数据
		setShopCarList(data) {
			this.shopCarList = []
			this.carTotalInfo = data.cartTotal
			for (const item of data.brandCartgoods) {
				this.shopCarList = [...this.shopCarList, ...item.cartList]
			}
			this.loadingStatus = 'no-more'
		},

		// 是否全选
		handleChooseAll() {
			const _this = this
			if (this.opStatus === EDIT) {
				const needCheckedIds = []
				for (const shop of this.shopCarList) {
					shop.cartList.forEach((item) => {
						if (item.checked === _this.allCheckStatus) {
							needCheckedIds.push(item.productId)
						}
					})
				}
				uni.showLoading()
				changeShopCarStatusApi({
					userId: getUserId(),
					productIds: needCheckedIds,
					isChecked: this.allCheckStatus ? 0 : 1
				}).then((res) => {
					_this.getShopList()
				})
			} else {
				// this.opList = this.allCheckStatus
				//   ? []
				//   : this.shopCarList.map((item) => {});

				if (this.allCheckStatus) {
					this.opList = []
				} else {
					const tempOp = []
					this.shopCarList.forEach((shop) => {
						for (const item of shop.cartList) {
							tempOp.push(item.productId)
						}
					})
					this.opList = tempOp
				}
			}
		},

		// 去结算
		handleToPay() {
			uni.showLoading()
			const op = []
			for (const item of this.shopCarList) {
				op.push({
					brandId: item.brandId,
					brandName: item.brandName,
					brandCartgoods: item.cartList.filter((item) => item.checked)
				})
			}
			uni.setStorageSync(J_TWO_PAY_GOODS, {
				cardsInfo: op,
				pay: this.totalPrice
			})
			uni.hideLoading()
			uni.navigateTo({
				url: '/user/sever/pay-shop-card?type=reservation'
			})
		},

		// 移入收藏
		addCollections() {
			const _this = this
			if (!this.opGoodsList.length) {
				this.$showToast('请选择要添加收藏的商品')
				return
			}
			addCollectionsApi({
				userId: getUserId(),
				type: 0,
				valueIds: this.opGoodsList
			}).then(() => {
				uni.showToast({
					title: '移入收藏成功',
					duration: 2000
				})
				_this.opList = []
				_this.opGoodsList = []
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import './css/shop-car.less';
</style>
