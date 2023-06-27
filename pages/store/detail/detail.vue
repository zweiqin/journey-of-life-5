<template>
	<view v-if="brandDetail" class="brand-detail-container">
		<view class="bg">
			<BeeBack>
				<BeeIcon name="arrowleft" :size="24" color="#fff"></BeeIcon>
			</BeeBack>
			<BeeWxShare ref="tuanWxShareRef" @click="handleShareServe">
				<view class="share-wrapper">
					<text>分享</text>
					<BeeIcon :src="require('../../../static/brand/detail/share.png')" :size="24"></BeeIcon>
				</view>
			</BeeWxShare>
		</view>
		<view class="main-area">
			<BrandInfo :brand-detail="brandDetail" @follow="handleFollowBrand" @navgation="handleNavigate"></BrandInfo>
		</view>

		<view class="main-area brand-pane">
			<view class="brand-detail-menus">
				<view
					v-for="item in menusData" :key="item.value" class="item" :class="{ active: currentMenu === item.value }"
					@click="handleChangeNavs(item.value)"
				>
					{{ item.name }}
				</view>
			</view>

			<view class="goods-list" style="width: 100%">
				<view v-show="currentMenu === 0" class="goods" style="width: 100%">
					<view v-if="brandDetail.categoryList && brandDetail.categoryList.length" style="display: flex;box-sizing: border-box;">
						<view style="background-color: #f3f3f3;">
							<view
								v-for="item in brandDetail.categoryList" :key="item.serverNameOne"
								style="padding: 22upx 38upx;white-space: nowrap;"
								:style="{ backgroundColor: item.id === currentTab ? '#ffffff' : 'transparent' }"
								@click="(currentTab = item.id) && (currentGoods = brandDetail.categoryList.find(part => part.id === item.id).goodsList || [])"
							>
								{{ item.name }}
							</view>
						</view>
						<view style="flex: 1;padding: 20upx;">
							<view v-for="item in currentGoods" :key="item.id">
								<StoreGoods :goods-data="item" @add-car="addShopCar"></StoreGoods>
							</view>
						</view>
					</view>
					<!-- <view v-if="brandDetail.goodsVoList && brandDetail.goodsVoList.length">
						<tui-waterfall :list-data="brandDetail.goodsVoList" :type="2">
						<template #left="{ entity }">
						<BrandGoods :goods-data="entity" @add="addShopCar"></BrandGoods>
						</template>
						<template #right="{ entity }">
						<BrandGoods :goods-data="entity" @add="addShopCar"></BrandGoods>
						</template>
						</tui-waterfall>
						</view> -->

					<view v-else class="no-data f-center">
						暂无数据
					</view>
				</view>
				<!-- <LoadMore :status="$data._status"></LoadMore> -->
			</view>

			<view v-if="currentMenu === 1">
				<GrouponWrapper :brand-detail="brandDetail"></GrouponWrapper>
			</view>

			<!-- <view class="no-data f-center">
				暂无优惠劵
				</view> -->

			<CouponList v-show="currentMenu === 2" :brand-detail="brandDetail" :is-first-show-coupon="isFirstShowCoupon">
			</CouponList>

			<Reservation v-show="currentMenu === 3" :brand-detail="brandDetail"></Reservation>

			<view v-show="currentMenu === 4" class="no-data f-center">
				暂无会员
			</view>

			<view v-show="currentMenu === 5" class="no-data f-center">
				暂无抽奖
			</view>

		</view>

		<AppraisePane></AppraisePane>
		<!-- <RecommendList></RecommendList> -->

		<view class="shop-car-fixed">
			<BeeIcon
				:src="require('../../../static/brand/detail/shop-car.png')" :size="48"
				@click="go(`/user/sever/shop-car?isBack=1&type=mallAndReservation`)"
			>
			</BeeIcon>
		</view>

		<tui-landscape
			:show="showSpecification" :position="1" :mask-closable="true" icon-left="50rpx"
			icon-right="50rpx"
			@close="showSpecification = false"
		>
			<view
				style="position: relative;width: 600upx;max-height: 75vh;padding: 46upx 46upx 0;box-sizing: border-box;overflow-y: auto;background-color: #ffffff;border-radius: 40upx;"
			>
				<view v-if="product" style="display: flex;align-items: center;">
					<image
						style="width: 180upx;height: 180upx;"
						:src="common.seamingImgUrl((product && product.url) || goodsDetail.info.picUrl)" mode=""
					/>
					<view
						style="flex: 1;margin-left: 40upx;word-break: break-all;display: -webkit-box;overflow: hidden;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
					>
						<text style="font-size: 34upx;font-weight: bold;">{{ goodsDetail.info.name }}</text>
					</view>
				</view>
				<view v-if="goodsDetail.specificationList">
					<view v-for="item in goodsDetail.specificationList" :key="item.name" style="margin-top: 20upx;">
						<view style="font-size: 26upx;color: #a5a4a4;">{{ item.name }}</view>
						<view style="display: flex;flex-wrap: wrap;margin-top: 10upx;font-size: 28upx;">
							<view
								v-for="tag in item.valueList" :key="tag.id"
								style="width: fit-content;padding: 6upx 28upx;margin-right: 20upx;border-radius: 20upx;" :style="{
									border: sps[item.name] == tag.value ? '1upx solid #ffbd87' : '1upx solid #c2c2c2',
									backgroundColor: sps[item.name] == tag.value ? '#fffce3' : 'transparent'
								}" @click="handleChoose(item.name, tag)"
							>
								{{ tag.value }}
							</view>
						</view>
					</view>
				</view>
				<view style="display: flex;justify-content: space-between;align-items: center;margin-top: 20upx;">
					<view>数量</view>
					<view>
						<uni-number-box v-model="number" :min="1"></uni-number-box>
					</view>
				</view>
				<view style="position: sticky;bottom: 0;margin-top: 40upx;padding-bottom: 20upx;background-color: #ffffff;">
					<view style="padding: 12upx 46upx;margin: 0 -46upx;font-size: 28upx;color: #868686;background-color: #efefef;">
						<text>已选规格：</text>
						<text>{{ spStr }}</text>
					</view>
					<view style="display: flex;justify-content: space-between;align-items: center;margin-top: 20upx;">
						<view>
							<view v-if="product">
								<text style="font-size: 28upx;">总计</text>
								<text style="margin-left: 10upx;font-size: 38upx;color: #ff0505;">￥{{ product.price * number }}</text>
							</view>
						</view>
						<view>
							<tui-button
								type="danger" width="240rpx" height="64rpx" margin="0 10rpx 0 0"
								style="border-radius: 14rpx;"
								@click="addShopCar"
							>
								+ 加入购物车
							</tui-button>
						</view>
					</view>
				</view>
			</view>
		</tui-landscape>
		<tui-modal
			:show="$data._isShowTuiModel" title="提示" content="您还未登录，是否先去登录？"
			@click="_handleClickTuiModel($event, 'login', '/pages/user/user')"
		></tui-modal>
		<tui-toast ref="toast"></tui-toast>

		<view v-if="brandDetail.id && brandDetail.name">
			<StoreShopCart ref="refStoreShopCart" :brand-id="brandDetail.id" :brand-name="brandDetail.name"></StoreShopCart>
		</view>
	</view>
</template>

<script>
import StoreGoods from './cpns/StoreGoods.vue'
import StoreShopCart from './cpns/StoreShopCart.vue'
import BrandInfo from './cpns/BrandInfo'
import { menusData } from './data'
import { getBrandDetailApi } from '../../../api/brand'
import { goodsListApi, getGoodsDetailApi, addShopCarApi, collectionApi } from '../../../api/goods'
import loadData from '../../../mixin/loadData'
import AppraisePane from './cpns/AppraisePane.vue'
// import RecommendList from './cpns/RecommendList.vue'
import GrouponWrapper from './cpns/GrouponWrapper.vue'
import CouponList from './cpns/CouponList.vue'
import Reservation from './cpns/Reservation.vue'
import showModel from '../../../mixin/showModel'
import { getUserId, navigationAddress } from '../../../utils'

export default {
	name: 'Detail',
	components: {
		BrandInfo,
		StoreGoods,
		StoreShopCart,
		AppraisePane,
		// RecommendList,
		GrouponWrapper,
		CouponList,
		Reservation
	},

	mixins: [loadData({ api: goodsListApi }), showModel()],

	data() {
		return {
			currentTab: '',
			currentGoods: [],

			grouponList: [],

			showSpecification: false,
			goodsDetail: {},
			number: 1,
			sps: {},
			spStr: '请选择商品规格',
			product: null,

			menusData: Object.freeze(menusData),
			currentMenu: 0,
			brandId: null,
			brandDetail: {},
			isFirstShowCoupon: false
		}
	},

	onLoad(options) {
		this.brandId = options.brandId
		this.getBrandDetail()
		this.$data._query.brandId = this.brandId
		// this._loadData()
	},

	watch: {
		number() {
			this.getSpStr()
		}
	},

	methods: {
		async getBrandDetail() {
			const { data } = await getBrandDetailApi({
				id: this.brandId,
				longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
				latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1],
				userId: this.userId
			})
			this.brandDetail = data
			if (this.brandDetail.categoryList && this.brandDetail.categoryList.length) {
				(this.currentTab = this.brandDetail.categoryList[0].id) && (this.currentGoods = this.brandDetail.categoryList[0].goodsList || [])
			}
			this.handleShareServe(true)
		},

		// 切换 nav
		handleChangeNavs(value) {
			this.currentMenu = value
			switch (value) {
				case 2:
					if (!this.isFirstShowCoupon) {
						this.isFirstShowCoupon = true
					}
					break
			}
		},

		// 添加购物车
		async addShopCar(goodsInfo) {
			if (this.isLogin()) {
				try {
					if (this.showSpecification) {
						const tempGoodsInfo = {
							number: this.number,
							product: this.product,
							spStr: this.spStr
						}
						if (tempGoodsInfo.number > tempGoodsInfo.product.number) {
							this.$showToast('该货品库存为' + tempGoodsInfo.product.number)
							return
						}
						if (tempGoodsInfo.product.goodsId) {
							await addShopCarApi({
								'userId': this.userId,
								'brandId': this.goodsDetail.info.brandId,
								'goodsId': this.goodsDetail.info.id, // tempGoodsInfo.product.goodsId一样的
								'checked': 1,
								'number': tempGoodsInfo.number,
								'productId': tempGoodsInfo.product.id
							})
							this.ttoast('购物车添加成功')
							this.showSpecification = false
							this.$refs.refStoreShopCart && this.$refs.refStoreShopCart.getShopList()
						} else {
							this.ttoast('商品参数出错，无法添加！')
						}
					} else {
						// console.log(goodsInfo)
						this.goodsDetail = {}
						this.number = 1
						this.sps = {}
						this.spStr = '请选择商品规格'
						this.product = null
						const { data } = await getGoodsDetailApi(
							goodsInfo.id,
							this.userId
						)
						this.goodsDetail = data
						console.log(data)
						for (const sp of data.specificationList) {
							this.sps[sp.name] = sp.valueList[0].value
						}
						this.getSpStr()
						this.product = this.getProduct()
						this.showSpecification = true
						// if (data.productList[0].goodsId) {
						// 	await addShopCarApi({
						// 		'userId': this.userId,
						// 		'brandId': goodsInfo.brandId,
						// 		'goodsId': goodsInfo.id,
						// 		'checked': 1,
						// 		'number': 1,
						// 		'productId': data.productList[0].id
						// 	})
						// 	this.ttoast('购物车添加成功')
						// } else {
						// 	this.ttoast('商品参数出错，无法添加！')
						// }
					}
				} catch (error) {
					console.log(error)
					// this.ttoast({
					// 	type: 'fail',
					// 	title: '添加失败'
					// })
				}
			} else {
				this.$data._isShowTuiModel = true
			}
		},

		// 获取规格字符串
		getSpStr() {
			let str = ''
			for (const sp in this.sps) {
				str += this.sps[sp] + '，'
			}
			this.spStr = str + this.number + this.goodsDetail.info.unit
		},

		// 获取product
		getProduct() {
			let currentProduct = null
			this.goodsDetail.productList.forEach((item) => {
				let tag = true
				for (const sp in this.sps) {
					if (!item.specifications.includes(this.sps[sp])) {
						tag = false
						break
					}
				}
				if (tag) {
					currentProduct = item
				}
			})
			return currentProduct || this.goodsDetail.productList[0]
		},

		// 点击选择
		handleChoose(name, tag) {
			this.sps[name] = tag.value
			this.getSpStr()
			this.product = this.getProduct()
			this.$forceUpdate()
		},

		// 收藏商家
		async handleFollowBrand() {
			const { data } = await collectionApi({
				userId: this.userId,
				// brandId: this.brandDetail.id,
				// is: !this.brandDetail.is,
				valueId: this.brandDetail.id,
				type: 2
			})
			this.ttoast(`${this.brandDetail.is ? '取消收藏' : '收藏'}成功`)
			this.brandDetail.is = !this.brandDetail.is
			console.log(data)
		},

		// 分享
		handleShareServe(isQuit) {
			if (!this.isLogin()) {
				return
			}
			const _this = this
			const data = {
				data: {
					title: _this.brandDetail.name,
					desc: _this.brandDetail.businessSlogan,
					link: `https://www.tuanfengkeji.cn/JFShop_Uni_H5/#/pages/store/detail/detail?brandId=${_this.brandDetail.id}`,
					imageUrl: _this.brandDetail.picUrl
				},
				successCb: () => { },
				failCb: () => { }
			}
			this.$refs.tuanWxShareRef.share(data, isQuit)
		},

		// 导航
		handleNavigate() {
			if (!this.brandDetail.address) {
				uni.showToast({
					title: '商家地址有误，导航失败',
					icon: 'none'
				})
				return
			}
			navigationAddress(`${this.brandDetail.longitude},${this.brandDetail.latitude}`)
		}
	}
}
</script>

<style lang="scss" scoped>
.brand-detail-container {
	position: relative;
	width: 100vw;
	min-height: 100vh;
	padding-bottom: 120upx;
	background-color: #f6f6f6;

	.bg {
		width: 100%;
		height: 480upx;
		background-color: #fa5151;
		padding: 60upx 20upx 0 20upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;

		.share-wrapper {
			display: flex;
			align-items: center;
			color: #fff;
		}
	}

	.main-area {
		padding: 24upx;
		box-sizing: border-box;
		margin-top: -356upx;
	}

	.brand-pane {
		background-color: #fff;
		padding: 34upx 20upx 0 20upx;
		box-sizing: border-box;
		margin-top: 0;

		.brand-detail-menus {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.item {
				color: #000;
				padding-bottom: 8upx;
				border-bottom: 4upx solid transparent;

				&.active {
					border-bottom-color: #fa5151;
				}
			}
		}

		.goods-list {
			margin-top: 20upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
		}
	}

	.shop-car-fixed {
		position: fixed;
		top: 45%;
		transform: translateY(-50%);
		right: 40upx;
		box-shadow: 0px 4px 10px 6px #D8D8D8;
		border-radius: 50%;
	}
}

.no-data,
/deep/ .c-no-data {
	min-height: 200upx;
	color: #ccc;
	padding: 20upx 0;
	flex-direction: column;
}
</style>
