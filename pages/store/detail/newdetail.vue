<template>
	<view class="brand-detail-container">
		<view
			class="navgation_top" :style="{ backgroundColor: 'rgba(255, 255, 255, ' + navOpacity + ')' }"
			:class="isNavGaFixed ? 'isFixed' : 'isAbsolute'"
		>
			<view class="imgbg" @click="">
				<image src="./image/fanhui.png" mode=""></image>
			</view>
			<view class="fnButton">
				<view class="imgbg">
					<image src="./image/aixin.png" mode=""></image>
				</view>
				<view class="imgbg">
					<image src="./image/more.png" mode=""></image>
				</view>
				<view class="imgbg">
					<image src="./image/spCar.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 轮播图 -->
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<img class="bannerItem" src="./image/banner.png" alt="">
			</swiper-item>
			<swiper-item>
				<img class="bannerItem" src="./image/banner.png" alt="">
			</swiper-item>
		</swiper>
		<view class="main">
			<!-- 商品信息栏 -->
			<InformationBar></InformationBar>
			<!-- 优惠卷栏 -->
			<view class="favorable">
				<NavGationBar>
					<view class="favorableItem">
						<span>￥1</span><span>领</span>
					</view>
					<view class="favorableItem">
						<span>￥100</span><span>领</span>
					</view>
					<view class="favorableItem">
						<span>￥200</span><span>领</span>
					</view>
				</NavGationBar>
			</view>
			<tui-tabs
				class="tabNav" :class="{ 'sticky-fixed': isTabFixed }" color="#000" selected-color="#000"
				size="35"
				slider-bg-color="#FB5D5D" :tabs="tabs" bold :current-tab="currentTab"
				@change="change"
			></tui-tabs>
			<view class="selectBtn" :class="{ 'selectSticky-fixed': isSelectFixed }">
				<button class="isSelect">推荐</button>
				<button :class="{ isSelect: false }">限时折扣</button>
				<button :class="{ isSelect: false }">单人餐</button>
				<button :class="{ isSelect: false }">双人餐</button>
				<button :class="{ isSelect: false }">单人餐</button>
				<button :class="{ isSelect: false }">双人餐</button>
				<button :class="{ isSelect: false }">单人餐</button>
				<button :class="{ isSelect: false }">双人餐</button>
			</view>
			<TabBar :current-tab-index="currentTab"></TabBar>
		</view>
	</view>
</template>

<script>
// import uvSticky from "@/uni_modules/uv-sticky/components/uv-sticky/uv-sticky.vue" // 吸顶组件 由于屏幕兼容性问题 已弃用
import InformationBar from './components/InformationBar.vue'
import navGationBar from './components/NavigationBar.vue'
import TabBar from './components/TabBar.vue'
import { goodsListApi, collectionApi } from '@/api/goods'
import loadData from '@/mixin/loadData'
import showModel from '@/mixin/showModel'
import { getUserId, navigationAddress } from '@/utils'  // 获取USERID 地址信息
import { getBrandDetailApi } from '@/api/brand' // 获取商家详情信息
export default {
	name: 'Detail',
	data() {
		return {
			brandId: '', // brandId
			yuanH: uni.upx2px(750), // 用于tabNav判定初始位置的值
			seletyuanH: uni.upx2px(830), // 用于tabNav判定初始位置的值
			isNavGaFixed: false, // 是否定位顶部导航栏
			isTabFixed: false, // tab切换栏是否固定定位
			isSelectFixed: false,
			navOpacity: 0, // 控制导航栏透明度
			currentTab: 0,
			tabs: [{
				name: '商品'
			}, {
				name: '团购'
			}, {
				name: '预约'
			}, {
				name: '会员'
			}, {
				name: '抽奖'
			}]
		}
	},
	mixins: [loadData({ api: goodsListApi }), showModel()],
	onLoad(options) {
		this.brandId = options.brandId
		this.getBrandDetail()
		console.log(this.$data)
		// this.$data._query.brandId = this.brandId
	},
	methods: {
		async getBrandDetail() {
			const { data } = await getBrandDetailApi({
				id: this.brandId,
				longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
				latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1],
				userId: getUserId()
			})
			console.log(data)
			this.brandDetail = data || {}
			// this.handleShareServe(true)
		},
		change(e) {
			this.currentTab = e.index
		}
	},
	components: {
		// uvSticky,
		InformationBar,
		NavGationBar: navGationBar,
		TabBar
	},
	onPageScroll(obj) {
		// console.log(this.yuanH)
		if (obj.scrollTop >= 34) {
			this.navOpacity = obj.scrollTop / 200
			this.isNavGaFixed = true
		} else {
			this.isNavGaFixed = false
		}
		// //#ifdef H5
		// this.isTabFixed = true
		// // #endif
		if (this.yuanH > obj.scrollTop) {
			// console.log(false)
			this.isTabFixed = false
		} else {
			// console.log(true)
			this.isTabFixed = true
		}

		if (this.seletyuanH > obj.scrollTop) {
			// console.log(false)
			this.isSelectFixed = false
		} else {
			// console.log(true)
			this.isSelectFixed = true
		}
	}
}
</script>

<style lang="scss" scoped>
.tabNav {
	margin-top: 20rpx;
}

.movable {
	position: relative;
	width: 150rpx;
	height: 150rpx;
	background-color: aqua;
	z-index: 99999999;
}

.sticky-fixed {
	/* #ifdef H5 */
	position: sticky;
	top: 80rpx !important;
	/* #endif */
	/* #ifndef H5 */
	position: fixed;
	top: 80rpx !important;
	/* #endif */
	z-index: 999 !important;
}

.selectSticky-fixed {
	/* #ifdef H5 */
	position: sticky;
	top: 150rpx !important;
	/* #endif */
	/* #ifndef H5 */
	position: fixed;
	top: 150rpx !important;
	/* #endif */
	z-index: 999 !important;
}

.brand-detail-container {
	position: relative;
	width: 100vw;
	height: auto;
	margin: 0;
	padding: 0;

	.isFixed {
		position: fixed;
		top: 0;
		left: 0;
	}

	.isAbsolute {
		position: absolute;
		top: 70rpx;
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
		background: #F6F6F6;
		clear: both;
		position: relative;

		.favorable {
			box-sizing: border-box;
			padding: 0rpx 18rpx;
			margin-top: 25rpx;
			width: 100vw;
			background-color: white;
			border-radius: 10rpx;

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

		.selectBtn {
			background-color: #FFFFFF;
			box-sizing: border-box;
			width: 100vw;
			overflow: hidden;
			padding: 10rpx 20rpx;
			z-index: 999 !important;

			.isSelect {
				border: 1px solid red;
				color: red;
			}

			>button {
				float: left;
				margin-top: 10rpx;
				margin-right: 12rpx;
				min-width: 120rpx;
				font-size: 28rpx;
				height: 60rpx;
				line-height: 60rpx;
				padding: 0 20rpx !important;
				max-width: 150rpx;
			}
		}
	}

	.main::before {
		content: '';
		width: 100%;
		height: 356rpx;
		display: block;
		overflow: hidden;
		clear: both;
		visibility: hidden
	}
}
</style>
