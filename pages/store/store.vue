<template>
	<view class="brand-page-container">
		<view style="background: linear-gradient(180deg, #EF530E 23%, #FAC894 43%, #fcfbf9 103%);">
			<view class="top-container">
				<view style="padding: 28upx 28upx 24upx;color: #ffffff;">
					巨蜂本地生活
				</view>
				<view class="search-header">
					<BeeLocale event-name="sendChooseAddressSuccessMsg"></BeeLocale>
					<SearchBar prevent background="#fff" @click="go('/pages/search-page/search-page')"></SearchBar>
					<CategoryIcon></CategoryIcon>
				</view>
				<view class="menus-wrapper">
					<BeeMenus :data="menusData" @click="handleTo"></BeeMenus>
				</view>
				<view style="display: flex;justify-content: space-between;padding: 0 28upx;">
					<view
						style="width: 130upx;height: 168upx;background: url('../../static/images/index/tab-png1.png') no-repeat center/contain;"
						@click="go('/user/my-tools/daily-attendance/index')"
					>
						<view style="padding: 20upx 0 0;font-weight: bold;font-size: 28upx;text-align: center;">签到赚钱</view>
					</view>
					<view
						style="width: 130upx;height: 168upx;background: url('../../static/images/index/tab-png2.png') no-repeat center/contain;"
						@click="go('/pages/index/coupons/coupons?currentTab=2')"
					>
						<view style="padding: 20upx 0 0;font-weight: bold;font-size: 28upx;text-align: center;">我的卡券</view>
					</view>
					<view
						style="width: 130upx;height: 168upx;background: url('../../static/images/index/tab-png3.png') no-repeat center/contain;"
						@click="go('/user/sever/userUp')"
					>
						<view style="padding: 20upx 0 0;font-weight: bold;font-size: 28upx;text-align: center;">会员中心</view>
					</view>
					<view
						style="width: 130upx;height: 168upx;background: url('../../static/images/index/tab-png4.png') no-repeat center/contain;"
						@click="go('/user/my-tools/account-book/index')"
					>
						<view style="padding: 20upx 0 0;font-weight: bold;font-size: 28upx;text-align: center;">我的收益</view>
					</view>
					<view
						style="width: 130upx;height: 168upx;background: url('../../static/images/index/tab-png5.png') no-repeat center/contain;"
						@click="go('/user/sever/my-distribution/index')"
					>
						<view style="padding: 20upx 0 0;font-weight: bold;font-size: 28upx;text-align: center;">分销中心</view>
					</view>
				</view>
				<view class="banner-wrapper" @click="go('/user/sever/userUp')">
					<image src="../../static/images/index/banner2.png" mode="" />
				</view>
			</view>
		</view>
		<view style="width: 100%;">
			<view style="display: flex;justify-content: space-between;margin-top: 20upx;padding: 0 28upx;">
				<view style="width: 48%;position: relative;" @click="go('/pages/red-envelope/red-envelope')">
					<image style="width: 100%;" src="../../static/images/index/card-png1.png" mode="widthFix" />
					<view style="position: absolute;top: 5upx;left: 10upx;">
						<view style="font-size: 26upx;color: #ffffff;">地图红包</view>
						<view style="margin: 80upx 0 0 68upx;font-size: 38upx;color: #eb2006;font-weight: bold;">立抢红包 ></view>
					</view>
				</view>
				<view style="width: 48%;display: flex;flex-direction: column;justify-content: space-between;">
					<view @click="go('/pages/index/convenient-services/service-oil')">
						<image style="width: 100%;" src="../../static/images/index/card-png2.png" mode="widthFix" />
					</view>
					<view style="position: relative;" @click="go('/user/marketing-tools/red-envelope-distribution/index')">
						<image style="width: 100%;" src="../../static/images/index/card-png3.png" mode="widthFix" />
						<view style="position: absolute;top: 5upx;left: 26upx;">
							<view style="font-size: 26upx;color: #ffffff;">发红包</view>
							<view style="margin: 30upx 0 0 -12upx;font-size: 34upx;color: #0f0f0f;">红包推广宣传</view>
						</view>
					</view>
				</view>
			</view>
			<view
				style="position: relative;margin-top: 20upx;background-color: #ffedd9;"
				@click="go('/user/otherServe/chat/chat')"
			>
				<image style="width: 100%;height: 245upx;" src="../../static/images/index/banner3.png" mode="" />
				<view style="position: absolute;top: 45upx;left: 106upx;">
					<view style="font-size: 36upx;font-weight: bold;">消息中心 ></view>
					<view style="margin-top: 10upx;font-size: 26upx;color: #959392;">订单、商品等通知提示</view>
				</view>
			</view>
		</view>

		<view class="brand">
			<BeeStoreFilter @confirm="handleConfirmType" @select-distance="handleSelectDistance"></BeeStoreFilter>
			<view class="brand-list-wrapper">
				<view v-if="$data._list && $data._list.length">
					<BeeBrandPane v-for="item in $data._list" :key="item.id" :is-positioning="isPositioning" :brand-info="item">
					</BeeBrandPane>
				</view>
				<view v-else>
					<tui-no-data v-if="$data._status !== 'loading'" :fixed="false" style="margin-top: 50upx;">暂无数据</tui-no-data>
				</view>
				<!-- <view style="margin-top: 20upx;">
					<tui-waterfall :list-data="$data._list" :type="2">
					<template #left="{ entity }">
					<view style="width: 345upx;">
					<BeeBrandCard :brand="entity"></BeeBrandCard>
					</view>
					</template>
					<template #right="{ entity }">
					<view style="width: 345upx;">
					<BeeBrandCard :brand="entity"></BeeBrandCard>
					</view>
					</template>
					</tui-waterfall>
					</view> -->
				<LoadMore :status="$data._status"></LoadMore>
			</view>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex'
import loadData from '../../mixin/loadData'
import { menusData } from './data'
import { getHomeBrandListApi, getCategoryListApi } from '../../api/brand'
import { getAdressDetailByLngLat } from '@/utils'
import { CHANGE_IS_IN_MINIPROGRAM } from '../../store/modules/type'

export default {
	name: 'Store',
	data() {
		return {
			menusData: Object.freeze(menusData),
			isPositioning: true,
			// loopTimer: null,
			queryParam: {
				dressing: '',
				distance: ''
			}
		}
	},
	mixins: [
		loadData({
			api: getHomeBrandListApi,
			mapKey: {
				list: 'brandList',
				totalPages: 'totalPages',
				size: 'size'
			},
			callingcb: true,
			dataFn(data) {
				const ignoreBrandList = ['佛山市顺德区修江缘美食餐饮店', '测试门店呀', '巨蜂自营']
				return data.filter((item) => !ignoreBrandList.includes(item.name))
			}
		})
	],
	onLoad(options) {
		if (options.miniProgram) {
			// getApp().globalData.isInMiniprogram = true;
			this.$store.commit(`app/${CHANGE_IS_IN_MINIPROGRAM}`, !!(options.miniProgram * 1))
		}
		// // #ifdef H5
		// const script = document.createElement('script')
		// script.src = 'https://res.wx.qq.com/open/js/jweixin-1.4.0.js'
		// document.body.appendChild(script)
		// // #endif
		this.getBrandList()
		this.getCategoryList()
		uni.$on('sendStoreDetailMsg', (data) => {
			if (data.data.meaning === 'refreshCurrentData') {
				if (!this.isPositioning) {
					// uni.showLoading()
					getHomeBrandListApi({
						page: 1,
						size: this.$data._query.page * this.$data._query.size,
						...this.queryParam,
						areaId: this.$store.state.location.locationInfo.adcode,
						longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
						latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1]
					})
						.then(({ data }) => {
							console.log(data)
							this.$data._list = data.brandList || []
							// uni.hideLoading()
						})
						.catch(() => {
							// uni.hideLoading()
						})
				}
			}
		})
		uni.$on('sendChooseAddressSuccessMsg', (data) => {
			this.getBrandList()
		})
	},
	onUnload() {
		// this.loopTimer && clearInterval(this.loopTimer)
	},
	computed: {
		...mapGetters([ 'obtainLocationCount' ])
	},
	watch: {
		obtainLocationCount(val, oldVal) {
			const pages = getCurrentPages()
			if (pages[pages.length - 1].route === 'pages/store/store') this.getBrandList()
		}
	},
	methods: {
		getBrandList() {
			// let num = 0
			this.$data._status = 'loading'
			if (!this.$store.getters.obtainLocationCount) {
				const tempTime = Date.now()
				const queryLocation = { longitude: '', latitude: '' }
				uni.getLocation({
					type: 'gcj02',
					highAccuracyExpireTime: 1000,
					success: (result) => {
						queryLocation.longitude = result.longitude
						queryLocation.latitude = result.latitude
						console.log(result)
						getAdressDetailByLngLat(queryLocation.latitude, queryLocation.longitude)
							.then((res) => {
								if (res.status === '1') {
									this.$data._query = { ...this.$data._query, ...this.queryParam, ...queryLocation, areaId: typeof res.regeocode.addressComponent.adcode === 'object' ? '' : res.regeocode.addressComponent.adcode }
									if ((Date.now() - tempTime) >= 1000) {
										this._loadData(null, () => this.isPositioning = true)
									} else {
										this._loadData(null, () => this.isPositioning = false)
									}
								} else {
									this.$showToast('查询失败')
								}
							})
							.catch(() => {
								this.$showToast('查询失败')
							})
					},
					fail: () => {
						this.$data._query = {
							...this.$data._query,
							...this.queryParam,
							areaId: this.$store.state.location.locationInfo.adcode,
							longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
							latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1]
						}
						this._loadData()
					}
				})
			} else {
				this.$data._query = {
					...this.$data._query,
					...this.queryParam,
					areaId: this.$store.state.location.locationInfo.adcode,
					longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
					latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1]
				// areaId: 440606,
				// longitude: 113.293719,
				// latitude: 22.803751
				}
				this._loadData(null, () => this.isPositioning = false)
			}

			// this.loopTimer = setInterval(() => {
			// 	num++
			// 	if (num === 3) {
			// 		if (queryLocation.longitude) {
			// 			clearInterval(_this.loopTimer)
			// 			_this.loopTimer = null
			// 			_this.$data._query = { ..._this.$data._query, ...queryLocation }
			// 			_this._loadData()
			// 		} else {
			// 			clearInterval(_this.loopTimer)
			// 			_this.loopTimer = null
			// 			_this.$data._query = {
			// 				..._this.$data._query,
			// 				longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
			// 				latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1]
			// 			}
			// 			_this._loadData()
			// 		}
			// 	}
			// }, 100)
		},

		// 获取首页分类数据
		async getCategoryList() {
			const { data } = await getCategoryListApi({})
			// this.menusData = data.slice(0, 8)
			this.menusData = data
		},

		handleTo(item) {
			console.log(item)
			if (item.storeName === '美食饮品') {
				this.go(`/pages/store/fine-food/fine-food?name=${item.storeName}&id=${item.id}`)
			} else {
				this.go(`/pages/store/fine-food/food-nearby/food-nearby?name=${item.storeName}&id=${item.id}`)
			}
		},

		handleConfirmType(e) {
			this.queryParam.dressing = e.id
			this.getBrandList()
		},

		handleSelectDistance(e) {
			this.queryParam.distance = e
			this.getBrandList()
		}
	},
	onPullDownRefresh() {
		this.$data.page = 1
		this._loadData()
		uni.stopPullDownRefresh()
	}
}
</script>

<style lang="less" scoped>
.brand-page-container {
	width: 100vw;
	min-height: 100vh;
	background: #f5f5f7;
	// background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 3%, #f6f6f6 8%);
	box-sizing: border-box;

	.top-container {
		width: 100%;
		background: url('../../static/images/index/top-background.png') no-repeat center top/contain;
		// min-height: 826upx;
		// background: linear-gradient(
		//   0deg,
		//   rgba(246, 246, 246, 0.87) -3%,
		//   rgba(246, 246, 246, 0.87) 8%,
		//   rgba(246, 246, 246, 0.87) 14%,
		//   rgba(253, 164, 164, 0.87) 59%
		// );

		.search-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 44upx 28upx 10upx;

			/deep/ .search-bar-container {
				flex: 1;
				margin-right: 15upx;
			}
		}

		.menus-wrapper {
			padding: 0 28upx 20upx;
			box-sizing: border-box;

			/deep/ .menus-container {
				margin-top: 0;
			}
		}

		.banner-wrapper {
			margin-top: 20upx;
			padding: 0 28upx;
			box-sizing: border-box;

			image {
				width: 100%;
				height: 225upx;
				border-radius: 20upx;
			}
		}
	}

	.brand {
		position: relative;
		z-index: 1;
		margin-top: -40upx;

		.brand-list-wrapper {
			padding: 0 28upx;
			box-sizing: border-box;
			padding-bottom: 140upx;
		}
	}

}
</style>
