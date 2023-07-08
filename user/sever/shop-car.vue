<template>
	<view class="shop-car-container">
		<view class="header">
			<JBack :tabbar="isBack === '1' ? '' : '/pages/user/user'" style="margin-top: 10upx" width="50" height="50" dark>
			</JBack>
			<h2>购物车</h2>
			<button class="edit" @click="handleSwitchShopCarStatus">
				{{ opStatus === 'EDIT' ? '编辑' : '完成' }}
			</button>
		</view>

		<view>
			<tui-tabs
				style="width: 686upx;padding: 0 0upx 0 0upx;overflow: hidden;" :slider-width="105" :padding="32"
				item-width="229rpx" selected-color="#000000" bold slider-bg-color="#ff0000"
				:tabs="[{ name: '巨蜂自营' }, { name: '本地生活' }, { name: '预约' }]" :current-tab="currentTab"
				@change="handleSwitchTab"
			></tui-tabs>
		</view>

		<view class="shop-list">
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
						<JIcon
							v-show="opStatus === 'CONFIRM'" class="icon" :type="opList.includes(item.productId)
								? 'active-choose'
								: 'active-default'
							" @click="handleOp(item)"
						></JIcon>

						<ShopCarGoods ref="refShopCarGoods" :goods="item" :store="store" @success="getShopList"></ShopCarGoods>

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

		<!-- 热销推荐 -->
		<view v-if="recommentList.length" class="all-look">
			<JLineTitle title="热销推荐"></JLineTitle>
			<Goods
				v-for="item in recommentList" :id="item.id" :key="item.id" :price="item.counterPrice"
				:name="item.name"
				:img-url="common.seamingImgUrl(item.picUrl)" read-only
			></Goods>
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
				<button v-if="currentTab === 0" class="uni-btn pay-btn" @click="handleToPay('mall')">结算</button>
				<button v-else-if="currentTab === 1" class="uni-btn pay-btn" @click="handleToPay('mall')">结算</button>
				<button v-else-if="currentTab === 2" class="uni-btn pay-btn" @click="handleToPay('reservation')">结算</button>
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
import Goods from '../../pages/store/goods-pane'
import {
	getShopCarListApi,
	changeShopCarStatusApi,
	addCollectionsApi
} from '../../api/cart'
import { everyLookApi } from '../../api/goods'
import { getUserId, fomartNumber } from '../../utils'
import { J_TWO_PAY_GOODS, J_SELECT_ADDRESS } from '../../constant'

const EDIT = 'EDIT'
const CONFIRM = 'CONFIRM'

export default {
	name: 'ShopCar',
	components: {
		Goods
	},

	onLoad(options) {
		this.currentTab = options.orderType * 1 || 0
		this.isBack = options.isBack || '0'
		uni.removeStorageSync(J_SELECT_ADDRESS)
		// this.getRecommentList();
	},

	onShow(options) {
		this.getShopList()
	},

	data() {
		return {
			opStatus: EDIT,
			opList: [],
			shopCarList: [],
			carTotalInfo: [],
			loadingStatus: 'noMore',
			recommentList: [],
			opGoodsList: [],
			isBack: '0',
			currentTab: 0
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
		handleSwitchTab(e) {
			this.currentTab = e.index
			this.shopCarList = []
			this.getShopList()
		},
		getRecommentList(id) {
			everyLookApi(id).then(({ data }) => {
				this.recommentList = data.goodsList.slice(0, 10)
			})
		},
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
			getShopCarListApi({
				userId: getUserId(),
				type: this.currentTab
			})
				.then(({ data }) => {
					this.shopCarList = data.brandCartgoods
					this.getRecommentList(data.brandCartgoods[0].cartList[0].goodsId)
					uni.hideLoading()
					this.loadingStatus = 'noMore'
				})
				.catch(() => {
					uni.hideLoading()
					this.loadingStatus = 'noMore'
				})
		},

		// 点击删除按钮
		removeShopCarGoods() {
			uni.showModal({
				title: '提示',
				content: '是否删除当前选中的商品？',
				success(res) {
					if (res.confirm) {
						this.$refs.refShopCarGoods.deleteGoods(this.opList)
					}
				}
			})
		},

		// 设置购物车的数据
		setShopCarList(data) {
			this.shopCarList = []
			this.carTotalInfo = data.cartTotal
			for (const item of data.brandCartgoods) {
				this.shopCarList = [...this.shopCarList, ...item.cartList]
			}
			this.loadingStatus = 'noMore'
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

.tui-tabs-view {
	/deep/ .tui-tabs-slider {
		margin-left: -32upx;
	}
}
</style>
