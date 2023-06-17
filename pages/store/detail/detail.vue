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
					<!-- <view v-if="brandDetail.goodsVoList && brandDetail.goodsVoList.length" class="f-s-b" style="flex-wrap: wrap;"> -->
					<view v-if="brandDetail.goodsVoList && brandDetail.goodsVoList.length">
						<tui-waterfall :list-data="brandDetail.goodsVoList" :type="2">
							<template #left="{ entity }">
								<BrandGoods :goods-data="entity" @add-car="addShopCar"></BrandGoods>
							</template>
							<template #right="{ entity }">
								<BrandGoods :goods-data="entity" @add-car="addShopCar"></BrandGoods>
							</template>
						</tui-waterfall>
					</view>

					<view v-else class="no-data f-center">
						暂无数据
					</view>
				</view>
				<!-- <LoadMore :status="$data._status"></LoadMore> -->

			</view>

			<view v-show="currentMenu === 1" class="no-data f-center">
				暂无团购
			</view>

			<!-- <view class="no-data f-center">
				暂无优惠劵
				</view> -->

			<CouponList v-show="currentMenu === 2" :brand-detail="brandDetail" :is-first-show-coupon="isFirstShowCoupon"></CouponList>

			<Reservation v-show="currentMenu === 3" :brand-detail="brandDetail"></Reservation>

			<view v-show="currentMenu === 4" class="no-data f-center">
				暂无会员
			</view>

			<view v-show="currentMenu === 5" class="no-data f-center">
				暂无抽奖
			</view>

			<!-- <view class="order-in-store">
				<view class="title"> 到店点餐 </view>
				<view class="goods-list">
				<BrandGoods v-for="goods in brandDetail.goodsVoList" :key="goods.id" :goodsData="goods"></BrandGoods>
				</view>
				</view> -->

		</view>

		<AppraisePane></AppraisePane>
		<RecommendList></RecommendList>

		<view class="shop-car-fixed">
			<BeeIcon :src="require('../../../static/brand/detail/shop-car.png')" :size="40" @click="go(`/user/sever/shop-car?isBack=1`)">
			</BeeIcon>
		</view>

		<tui-modal
			:show="$data._isShowTuiModel" title="提示" content="您还未登录，是否先去登录？"
			@click="_handleClickTuiModel($event, 'login', '/pages/user/user')"
		></tui-modal>
		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
import BrandGoods from './cpns/BrandGoods.vue'
import BrandInfo from './cpns/BrandInfo'
import { menusData } from './data'
import { getBrandDetailApi } from '../../../api/brand'
import { goodsListApi, getGoodsDetailApi, addShopCarApi, collectionApi } from '../../../api/goods'
import loadData from '../../../mixin/loadData'
import AppraisePane from './cpns/AppraisePane.vue'
import RecommendList from './cpns/RecommendList.vue'
import CouponList from './cpns/CouponList.vue'
import Reservation from './cpns/Reservation.vue'
import showModel from '../../../mixin/showModel'
import { getUserId, navigationAddress } from '../../../utils'

export default {
	name: 'Detail',
	components: {
		BrandInfo,
		BrandGoods,
		AppraisePane,
		RecommendList,
		CouponList,
		Reservation
	},

	mixins: [loadData({ api: goodsListApi }), showModel()],

	data() {
		return {
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

	methods: {
		async getBrandDetail() {
			const { data } = await getBrandDetailApi({
				id: this.brandId,
				longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
				latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1],
				userId: this.userId
			})
			this.brandDetail = data
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
					// console.log(goodsInfo)
					const { data } = await getGoodsDetailApi(
						goodsInfo.id,
						this.userId
					)
					// console.log(data)
					if (data.productList[0].goodsId) {
						await addShopCarApi({
							'userId': this.userId,
							'brandId': goodsInfo.brandId,
							'goodsId': goodsInfo.id,
							'checked': 1,
							'number': 1,
							'productId': data.productList[0].id
						})
						this.ttoast('购物车添加成功')
					} else {
						this.ttoast('商品参数出错，无法添加！')
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
	width: 100vw;
	min-height: 100vh;
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

	.order-in-store {
		.title {
			border-left: 6upx solid #000;
			line-height: 12px;
			padding-left: 10upx;
			color: #000;
			font-weight: 500;
		}
	}

	.shop-car-fixed {
		position: fixed;
		top: 50%;
		transform: translateY(-50%);
		right: 40upx;
		box-shadow: 0px 4px 10px 0px #D8D8D8;
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
