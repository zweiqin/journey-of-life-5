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
					<StoreGoodsList
						:brand-detail="brandDetail"
						@click-content="(e) => go(`/pages/store/goods-detail/goods-detail?orderType=1&goodsId=${e.id}`)"
						@add-car="(e) => $refs.refJSpecificationScreen.open(e.id)"
					></StoreGoodsList>
					<!-- <view v-if="brandDetail.goodsVoList && brandDetail.goodsVoList.length">
						<tui-waterfall :list-data="brandDetail.goodsVoList" :type="2">
						<template #left="{ entity }">
						<BrandGoods :goods-data="entity" @add=""></BrandGoods>
						</template>
						<template #right="{ entity }">
						<BrandGoods :goods-data="entity" @add=""></BrandGoods>
						</template>
						</tui-waterfall>
						</view> -->
				</view>
			</view>

			<view v-if="currentMenu === 1">
				<GrouponWrapper :brand-detail="brandDetail"></GrouponWrapper>
			</view>

			<CouponList v-show="currentMenu === 2" :brand-detail="brandDetail" :is-first-show-coupon="isFirstShowCoupon">
			</CouponList>

			<Reservation v-if="currentMenu === 3" :brand-detail="brandDetail"></Reservation>

			<Seckill v-if="currentMenu === 4" :brand-detail="brandDetail"></Seckill>

			<Raffle v-if="currentMenu === 5" :brand-detail="brandDetail"></Raffle>

		</view>

		<AppraisePane></AppraisePane>
		<!-- <RecommendList></RecommendList> -->

		<view class="shop-car-fixed">
			<BeeIcon
				:src="require('../../../static/brand/detail/shop-car.png')" :size="48"
				@click="go(`/user/sever/shop-car?isBack=1&orderType=1`)"
			>
			</BeeIcon>
		</view>

		<JSpecificationScreen
			ref="refJSpecificationScreen" order-type="1"
			@success="$refs.refStoreShopCart && $refs.refStoreShopCart.getShopList()"
		></JSpecificationScreen>

		<tui-modal
			:show="$data._isShowTuiModel" title="提示" content="您还未登录，是否先去登录？"
			@click="_handleClickTuiModel($event, 'login', '/pages/user/user')"
		></tui-modal>
		<tui-toast ref="toast"></tui-toast>

		<view v-if="currentMenu === 0 && brandDetail.id && brandDetail.name">
			<StoreShopCart ref="refStoreShopCart" :brand-id="brandDetail.id" :brand-name="brandDetail.name"></StoreShopCart>
		</view>
	</view>
</template>

<script>
import StoreShopCart from './cpns/StoreShopCart.vue'
import BrandInfo from './cpns/BrandInfo'
import { menusData } from './data'
import { getBrandDetailApi } from '../../../api/brand'
import { goodsListApi, collectionApi } from '../../../api/goods'
import loadData from '../../../mixin/loadData'
import AppraisePane from './cpns/AppraisePane.vue'
// import RecommendList from './cpns/RecommendList.vue'
import GrouponWrapper from './cpns/GrouponWrapper.vue'
import CouponList from './cpns/CouponList.vue'
import Reservation from './cpns/Reservation.vue'
import Seckill from './cpns/Seckill.vue'
import Raffle from './cpns/Raffle.vue'
import showModel from '../../../mixin/showModel'
import { getUserId, navigationAddress } from '../../../utils'

export default {
	name: 'Detail',
	components: {
		BrandInfo,
		StoreShopCart,
		AppraisePane,
		// RecommendList,
		GrouponWrapper,
		CouponList,
		Reservation,
		Seckill,
		Raffle
	},

	mixins: [loadData({ api: goodsListApi }), showModel()],

	data() {
		return {
			grouponList: [],

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

	watch: {},

	methods: {
		async getBrandDetail() {
			const { data } = await getBrandDetailApi({
				id: this.brandId,
				longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
				latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1],
				userId: getUserId()
			})
			this.brandDetail = data || {}
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

		// 收藏商家
		async handleFollowBrand() {
			const { data } = await collectionApi({
				userId: getUserId(),
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
					link: `https://h5.jfcmei.com/#/pages/store/detail/detail?brandId=${_this.brandDetail.id}`,
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

.no-data {
	min-height: 200upx;
	color: #ccc;
	padding: 20upx 0;
	flex-direction: column;
}
</style>
