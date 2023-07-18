<template>
	<view class="shop-car-container">
		<view class="header">
			<JBack :tabbar="isBack === '1' ? '' : '/pages/user/user'" style="margin-top: 10upx" width="20" height="30"></JBack>
			<view class="title-text">
				<text style="font-size: 34upx;font-weight: bold;">购物车</text>
				<text v-if="carTotalInfo.goodsCount" style="margin-left: 5upx;font-size: 26upx;">
					({{ carTotalInfo.goodsCount }})
				</text>
				<view v-if="$store.getters.detailAddress" style="flex: 1;margin-left: 8upx;">
					<BeeLocale :size="14" is-icon field="detailAddress"></BeeLocale>
				</view>
			</view>
			<button class="edit" @click="handleSwitchShopCarStatus">
				{{ opStatus === 'EDIT' ? '管理' : '完成' }}
			</button>
		</view>

		<view style="background-color: #e2403b;">
			<!-- item-width="229rpx"  [{ name: '巨蜂自营' }, { name: '本地生活' }, { name: '预约' }] -->
			<tui-tabs
				style="width: 750upx;padding: 0 0upx 0 0upx;overflow: hidden;border-radius: 42upx 42upx 0 0;"
				:slider-width="187.5" :padding="0" item-width="375rpx" selected-color="#ff3d3d"
				bold slider-bg-color="#ff0000"
				:is-slider="false" background-color="#f1f1f1"
				:tabs="[{ name: `巨蜂自营${carTotalInfo.tabMallNum ? `（${carTotalInfo.tabMallNum}）` : ''}` }, { name: `本地生活${carTotalInfo.tabStoreNum ? `（${carTotalInfo.tabStoreNum}）` : ''}` }]"
				:current-tab="currentTab" @change="handleSwitchTab"
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

						<ShopCarGoods ref="refShopCarGoods" :goods="item" :store="store" :img-size="152" @success="getShopList">
						</ShopCarGoods>

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
		<view v-if="recommentList.length" style="padding: 0 32upx;">
			<view style="display: flex;margin-bottom: 24upx;justify-content: center;align-items: center;">
				<BeeIcon src="../../static/images/icon/two-red-elliptic-l.png" :size="20"></BeeIcon>
				<text style="padding: 8upx;font-size: 30upx;font-weight: bold;">你可能还喜欢</text>
				<BeeIcon src="../../static/images/icon/two-red-elliptic-r.png" :size="20"></BeeIcon>
			</view>
			<view
				v-for="item in recommentList" :key="item.id"
				style="margin-bottom: 12upx;padding: 12upx 20upx;background-color: #ffffff;"
			>
				<Goods
					:id="item.id" :price="item.counterPrice" :name="item.name" :order-type="currentTab"
					:img-url="common.seamingImgUrl(item.picUrl)" read-only
				></Goods>
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
			<!-- 管理 -->
			<view v-show="opStatus === 'EDIT'" class="edit-op">
				<text class="text">合计：</text>
				<view class="totoal-price">￥{{ totalPrice }}</view>
				<button v-if="currentTab === 0" class="uni-btn pay-btn" @click="handleToPay('mall')">结算</button>
				<button v-else-if="currentTab === 1" class="uni-btn pay-btn" @click="handleToPay('mall')">结算</button>
				<button v-else-if="currentTab === 2" class="uni-btn pay-btn" @click="handleToPay('reservation')">结算</button>
			</view>

			<!-- 完成 -->
			<view v-show="opStatus === 'CONFIRM'" class="confirm-op">
				<button class="uni-btn op-btn" style="font-weight: bold;color: #fc4023;" @click="addCollections">移入收藏</button>
				<button
					class="uni-btn op-btn" style="color: #ffffff;background-color: #fc4023;"
					@click="removeShopCarGoods"
				>
					删除
				</button>
			</view>
		</view>
	</view>
</template>

<script>
import Goods from '../../pages/store/goods-pane'
import {
	getShopCarListApi,
	deleteShopCarGoodsApi,
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
			carTotalInfo: {
				checkedGoodsAmount: '',
				checkedGoodsCount: '',
				goodsAmount: '',
				goodsCount: '',
				tabMallNum: '',
				tabStoreNum: ''
			},
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
				this.$showToast('没有商品可以管理')
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

		// 管理选中的列表
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
					this.carTotalInfo.checkedGoodsAmount = data.cartTotal.checkedGoodsAmount
					this.carTotalInfo.checkedGoodsCount = data.cartTotal.checkedGoodsCount
					this.carTotalInfo.goodsAmount = data.cartTotal.goodsAmount
					this.carTotalInfo.goodsCount = data.cartTotal.goodsCount
					if (this.currentTab === 0) {
						this.carTotalInfo.tabMallNum = data.brandCartgoods.reduce((total, value, index, arr) => value.cartList ? total + value.cartList.length : total, 0)
					} else if (this.currentTab === 1) {
						this.carTotalInfo.tabStoreNum = data.brandCartgoods.reduce((total, value, index, arr) => value.cartList ? total + value.cartList.length : total, 0)
					}
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
				success: (res) => {
					if (res.confirm) {
						deleteShopCarGoodsApi({
							productIds: this.opList,
							userId: getUserId()
						}).then(() => {
							this.getShopList()
						})
					}
				}
			})
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
@import "../../style/mixin.less";
@import "../../style/var.less";

.shop-car-container {
	min-height: 100vh;
	padding: 0 0 72upx;
	padding-bottom: 130upx;
	box-sizing: border-box;
	background-color: #f1f1f1;

	.icon {
		width: 34upx;
		height: 34upx;
		flex-shrink: 0;
		margin-right: 24upx;
	}

	.header {
		.flex();
		padding: 36upx 32upx 36upx 48upx;
		background-color: #e2403b;

		.edit {
			color: #ffffff;
			font-size: 32upx;
			padding: 0;
			margin: 0;
			background-color: transparent;
			border: none;
			line-height: 1;
			font-weight: 500;
		}

		.title-text {
			flex: 1;
			display: flex;
			align-items: flex-end;
			width: 0;
			margin-left: 16upx;
			color: #ffffff;
		}

		.edit {
			padding: 0 4upx;
		}
	}

	.shop-list {
		padding: 0 10upx;

		.shop-car-list {
			padding: 8upx 32upx 28upx;
			margin-bottom: 20px;
			background-color: #ffffff;
			border-radius: 10upx;
		}

		.shop-card-name {
			font-size: 30upx;
			padding: 20upx 0;
			font-weight: bold;
			// border-bottom: 1upx solid #cdcdcd;
			display: flex;
			align-items: center;

			.icon {
				margin-right: 10upx
			}
		}

		.goods-item {
			display: flex;
			align-items: center;
			box-sizing: border-box;
			margin-top: 30upx;

		}

		.no-data {
			.flex(center, center);
			min-height: 180upx;
			color: #999999;
			font-size: 36upx;
			letter-spacing: 2px;
		}
	}

	// 底部固定
	.shop-car-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 112upx;
		background-color: #fff;
		padding: 0 40upx;
		box-sizing: border-box;
		.flex();
		transition: all 350ms;

		&.show {
			bottom: -112upx;
		}

		.text {
			font-size: 28upx;
			color: #3d3d3d;
		}

		.choose-all {
			display: flex;
			align-items: center;
		}

		.edit-op {
			display: flex;
			align-items: center;

			.totoal-price {
				color: #FA5151;
				font-size: 36upx;
				font-weight: bold;
			}

			.pay-btn {
				width: 200upx;
				height: 72upx;
				background: linear-gradient(270deg, rgba(250, 68, 35, 0.81) 0%, #FB8326 99%);
				border-radius: 100px;
				.flex(center, center);
				font-size: 36upx;
				color: #fff;
				margin-left: 34upx;
			}
		}

		.confirm-op {
			display: flex;
			align-items: center;

			.op-btn {
				width: 180upx;
				height: 68upx;
				border-radius: 32upx;
				border: 1px solid #FF0000;
				color: #3d3d3d;
				.flex(center, center);
				font-size: 30upx;

				&:nth-child(1) {
					margin-right: 56upx;
				}
			}
		}
	}
}

.tui-tabs-view {
	/deep/ .tui-tabs-slider {
		margin-left: -32upx;
	}
}
</style>
