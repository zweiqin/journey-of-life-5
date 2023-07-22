<template>
	<view v-if="brandDetail" class="brand-detail-container">
		<view
			class="navgation_top" :style="{ backgroundColor: 'rgba(255, 255, 255, ' + navOpacity + ')' }"
			:class="isNavGaFixed ? 'isFixed' : 'isAbsolute'"
		>
			<view class="imgbg">
				<BeeBack>
					<BeeIcon name="arrowleft" :size="24" color="#fff"></BeeIcon>
				</BeeBack>
			</view>
			<view class="fnButton">
				<view class="imgbg" @click="handleFollowBrand">
					<BeeIcon v-if="brandDetail.is" :size="26" :src="require('../../../static/brand/detail/collection.png')">
					</BeeIcon>
					<BeeIcon v-else :size="18" :src="require('../../../static/brand/detail/aixin.png')"></BeeIcon>
				</view>
				<view class="imgbg">
					<BeeWxShare ref="beeWxShareRef" @click="handleShareServe">
						<BeeIcon :src="require('../../../static/brand/detail/share.png')" :size="22"></BeeIcon>
					</BeeWxShare>
				</view>
				<view class="imgbg" @click="go(`/user/sever/shop-car?isBack=1&orderType=1`)">
					<BeeIcon :src="require('../../../static/brand/detail/spCar.png')" :size="18"></BeeIcon>
				</view>
			</view>
		</view>
		<!-- 轮播图 -->
		<swiper
			v-if="brandDetail.bgUrl && JSON.parse(brandDetail.bgUrl).length" class="swiper" :indicator-dots="true"
			:autoplay="true" :interval="3000" :duration=                                                            "1000"
		>
			<swiper-item v-for="(img, index) in JSON.parse(brandDetail.bgUrl)" :key="index">
				<tui-lazyload-img
					mode="scaleToFill" width="100vw" height="400rpx" class="bannerItem"
					:src="common.seamingImgUrl(img)"
				></tui-lazyload-img>
			</swiper-item>
		</swiper>
		<view class="main">
			<!-- 商品信息栏 -->
			<view style="margin-top: -26upx;border-radius: 30upx 30upx 0 0;overflow: hidden;">
				<BrandInfo :brand-detail="brandDetail" @follow="handleFollowBrand" @navgation="handleNavigate"></BrandInfo>
			</view>
			<!-- 优惠卷栏 -->
			<view style="background: #F6F6F6;">
				<view class="favorable" @click="handleOpenCoupon">
					<view class="navGationBar">
						<view class="favorableItem"><span>优惠券</span><span>领</span></view>
						<view>
							<tui-icon name="arrowright" color="#151515" size="60" unit="upx"></tui-icon>
						</view>
					</view>
				</view>
				<tui-tabs
					class="tabNav" :class="{ 'sticky-fixed': isTabFixed }" color="#000" selected-color="#000"
					size="35" :is-fixed="isTabFixed" z-index="2"
					slider-bg-color="#FB5D5D" bold
					:tabs="[{ name: '商品' }, { name: '团购' }, { name: '预约' }, { name: '秒杀' }, { name: '抽奖' }]"
					:current-tab="currentMenu" @change="handleChangeNavs"
				></tui-tabs>
			</view>
		</view>

		<view class="main-area brand-pane">
			<view v-show="currentMenu === 0" class="goods-list" style="width: 100%">
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

			<GrouponWrapper v-if="currentMenu === 1" :brand-detail="brandDetail"></GrouponWrapper>

			<Reservation v-if="currentMenu === 2" :brand-detail="brandDetail"></Reservation>

			<Seckill v-if="currentMenu === 3" :brand-detail="brandDetail"></Seckill>

			<Raffle v-if="currentMenu === 4" :brand-detail="brandDetail"></Raffle>
		</view>

		<AppraisePane></AppraisePane>
		<!-- <RecommendList></RecommendList> -->

		<tui-bottom-popup :show="isShowCouponListPopup" @close="isShowCouponListPopup = false">
			<view style="padding: 20upx;">
				<CouponList :brand-detail="brandDetail" :is-first-show-coupon="isFirstShowCoupon"></CouponList>
			</view>
		</tui-bottom-popup>

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
			yuanH: uni.upx2px(800), // 用于tabNav判定初始位置的值
			isNavGaFixed: false, // 是否定位顶部导航栏
			isTabFixed: false, // tab切换栏是否固定定位
			navOpacity: 0, // 控制导航栏透明度
			isShowCouponListPopup: false,

			menusData: [{
				name: '商品',
				value: 0
			}, {
				name: '团购',
				value: 1
			}, {
				name: '优惠劵',
				value: 2
			}, {
				name: '预约',
				value: 3
			}, {
				name: '秒杀',
				value: 4
			}, {
				name: '抽奖',
				value: 5
			}],
			currentMenu: 0,
			brandId: null,
			brandDetail: {},
			isFirstShowCoupon: false
		}
	},

	onLoad(options) {
		this.brandId = options.brandId
		this.getBrandDetail()
		console.log(this.$data)
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

		// 打开优惠券
		handleOpenCoupon() {
			if (!this.isFirstShowCoupon) this.isFirstShowCoupon = true
			this.isShowCouponListPopup = true
		},

		// 切换 nav
		handleChangeNavs(e) {
			this.currentMenu = e.index
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
					link: `https://www.tuanfengkeji.cn/JFShop_Uni_H5/#/pages/store/detail/detail?brandId=${_this.brandDetail.id}`,
					imageUrl: _this.brandDetail.picUrl
				},
				successCb: () => { },
				failCb: () => { }
			}
			this.$refs.beeWxShareRef.share(data, isQuit)
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
	},
	onPageScroll(obj) {
		if (obj.scrollTop >= 34) {
			this.navOpacity = obj.scrollTop / 200
			this.isNavGaFixed = true
		} else {
			this.navOpacity = 0
			this.isNavGaFixed = false
		}
		// //#ifdef H5
		// this.isTabFixed = true
		// // #endif
		if (this.yuanH > obj.scrollTop) {
			this.isTabFixed = false
		} else {
			this.isTabFixed = true
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

	.isFixed {
		position: fixed;
		top: 0;
		left: 0;
	}

	.isAbsolute {
		position: absolute;
		top: 70rpx;
	}

	.sticky-fixed {
		// position: fixed;
		top: 80rpx !important;
	}

	.navgation_top {
		box-sizing: border-box;
		// margin-top: 72rpx;
		padding: 15rpx 40rpx;
		width: 100vw;
		z-index: 3;
		display: flex;
		justify-content: space-between;

		image {
			width: 38rpx;
			height: 38rpx;
		}

		.imgbg {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 66rpx;
			height: 66rpx;
			border-radius: 50%;
			background: rgba(0, 0, 0, 0.61);
		}

		.fnButton {
			display: flex;

			.imgbg {
				margin-left: 10rpx;
			}
		}
	}

	.swiper {
		z-index: 2;
		width: 100vw;
		height: 400rpx;

		.bannerItem {
			width: 100vw;
			height: 400rpx;
		}
	}

	.main {
		clear: both;
		position: relative;

		.favorable {
			box-sizing: border-box;
			padding: 0rpx 18rpx;
			margin-bottom: 25rpx;
			width: 100vw;
			background-color: white;
			border-radius: 10rpx;

			.navGationBar {
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				// background-color: white;
				position: relative;
				width: 100%;
				min-height: 74rpx;
				padding: 8rpx 36rpx 14rpx 24upx;
			}

			.favorableItem {
				margin-right: 30rpx;
				border-radius: 5rpx;
				display: inline-block;
				background-color: #FF5353;
				font-size: 24rpx;
				font-weight: normal;
				color: #FFFFFF;

				>span {
					font-size: 28rpx;
					box-sizing: border-box;
				}

				>span:nth-of-type(1) {
					padding: 5rpx 10rpx;
					border-right: 1px dashed white;
				}

				>span:nth-of-type(2) {
					padding: 5rpx 8rpx;
				}
			}
		}
	}

	/deep/ .tui-popup-class.tui-bottom-popup {
		height: 85vh !important;
	}

	.brand-pane {
		background-color: #fff;
		padding: 4upx 20upx 0 20upx;
		box-sizing: border-box;
		margin-top: 0;

		.goods-list {
			margin-top: 20upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
		}
	}
}

</style>
