<template>
	<view class="brand-page-container">
		<view class="top-container">
			<view class="search-header">
				<BeeLocale></BeeLocale>
				<SearchBar prevent background="#fff" @click="go('/pages/search-page/search-page')"></SearchBar>
				<PhotoSearch></PhotoSearch>
			</view>
			<!-- <image class="banner-img" src="../../static/brand/banner.png" mode="" /> -->
			<view class="menus-wrapper">
				<BeeMenus :data="menusData" @click="handleTo"></BeeMenus>
			</view>
			<view class="banner-wrapper" @click="go('/user/sever/userUp')">
				<image src="../../static/index/banner2.png" mode="" />
			</view>
		</view>

		<view class="brand">
			<BeeStoreFilter @confirm="handleConfirmType" @select-distance="handleSelectDistance"></BeeStoreFilter>
			<view class="brand-list-wrapper">
				<view v-if="$data._list && $data._list.length">
					<BeeBrandPane v-for="item in $data._list" :key="item.id" :is-positioning="isPositioning" :brand-info="item"></BeeBrandPane>
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
export default {
	name: 'Store',
	data() {
		return {
			menusData: Object.freeze(menusData),
			isPositioning: true
			// loopTimer: null
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
	onShow() { },
	onLoad() {
		this.getBrandList()
		this.getCategoryList()
	},
	onUnload() {
		// this.loopTimer && clearInterval(this.loopTimer)
	},
	computed: {
		...mapGetters([ 'obtainLocationCount' ])
	},
	watch: {
		obtainLocationCount(val, oldVal) {
			this.getBrandList()
		}
	},
	methods: {
		getBrandList(queryParam = {}) {
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
						console.log(queryLocation)
						this.$data._query = { ...this.$data._query, ...queryParam, ...queryLocation }
						if ((Date.now() - tempTime) >= 1000) {
							this._loadData(null, () => this.isPositioning = true)
						} else {
							this._loadData(null, () => this.isPositioning = false)
						}
					},
					fail: () => {
						this.$data._query = {
							...this.$data._query,
							...queryParam,
							longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
							latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1]
						}
						this._loadData()
					}
				})
			} else {
				this.$data._query = {
					...this.$data._query,
					...queryParam,
					longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
					latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1]
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
			this.getBrandList({ dressing: e.id })
		},

		handleSelectDistance(e) {
			this.getBrandList({ distance: e })
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
	background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 3%, #f6f6f6 8%);

	.top-container {
		width: 100%;
		background: #f6f6f6;
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
			padding: 44upx 22upx 10upx;
			box-sizing: border-box;

			/deep/ .search-bar-container {
				flex: 1;
				margin-right: 15upx;
			}
		}

		.banner-img {
			width: 100%;
			height: 244upx;
		}

		.menus-wrapper {
			padding: 0 22upx 20upx;
			box-sizing: border-box;

			/deep/ .menus-container {
				margin-top: 0;
			}
		}

		.banner-wrapper {
			margin-top: 20upx;
			padding: 0 20upx;
			box-sizing: border-box;

			image {
				width: 100%;
				height: 200upx;
				border-radius: 20upx;
			}
		}
	}

	.brand {
		margin-top: 20upx;

		.brand-list-wrapper {
			padding: 0 20upx;
			box-sizing: border-box;
			padding-bottom: 140upx;
		}
	}
}
</style>
