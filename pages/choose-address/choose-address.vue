<template>
	<view class="my-address">
		<!-- 定位区 -->
		<view class="search-box">
			<tui-icon name="arrowleft" :size="25" color="#00" @click="handleBack"></tui-icon>
			<view class="search-wrapper">
				<tui-icon class="search-icon" name="search" :size="20"></tui-icon>
				<input v-model="searchCity" type="text" placeholder="请输入所在城市" />
				<tui-icon v-if="searchCity" name="close" :size="20" @click="handleClearSearch"></tui-icon>
			</view>
			<button v-if="searchCity" class="uni-btn" @click="handleSearchCity">搜索</button>
		</view>
		<view class="current-address" @click="handleGetCurrentAddress">
			<text class="current-address-text">
				当前：{{ $store.getters.currentCity ? $store.getters.currentCity : '定位失败，重新定位' }}
			</text>
			<view>
				<tui-icon :size="16" color="#000" name="location"></tui-icon>
				<text>重新定位</text>
			</view>
		</view>

		<!-- 热门城市 -->
		<view class="hot-city">
			<view class="title">热门城市</view>
			<tui-grid unlined>
				<block v-for="(item, index) in hotCities" :key="index">
					<tui-grid-item :cell="3" @click="confirmChooseAddress(item, true)">
						<text class="tui-grid-label">
							{{ item.level === 4 ? item.town : item.level === 3 ? item.distinguish : item.city }}
						</text>
					</tui-grid-item>
				</block>
			</tui-grid>
		</view>

		<view v-if="currentTab === 1 && currentTownData" style="text-align: right;">
			<tui-button
				style="display: inline-block;" margin="0 10rpx 8upx 0" width="120rpx" height="50rpx"
				type="warning" shape="circle" @click="confirmChooseAddress({ name: '' })"
			>
				选择
			</tui-button>
		</view>

		<!-- tabs 标签页 -->
		<tui-tabs
			:tabs="tabs" selected-color="#e95d20" slider-bg-color="#e95d20" item-width="30%"
			:current-tab="currentTab"
			@change="handleChangeTab"
		></tui-tabs>

		<!-- 标签页 -->
		<view v-if="cityList.length" class="wrapper-container">
			<swiper disable-touch :current="currentTab" class="swiper" @change="handleChangeSwiper">
				<swiper-item class="" item-id="">
					<view class="address-list-wrapper">
						<tui-index-list
							active-key-color="#e95d20" active-color="#e95d20" active-key-background="#fff"
							:list-data="cityList"
						>
							<template #item="{ entity }">
								<tui-list-cell v-for="(item, index) in entity" :key="index" padding="16rpx 30rpx">
									<view class="tui-list__item" @click="handleChooseCity(item)">
										<view :id="'item' + item.name" class="tui-name">{{ item.name }}</view>
									</view>
								</tui-list-cell>
							</template>
						</tui-index-list>
					</view>
				</swiper-item>

				<swiper-item>
					<view class="choose-cities">
						<tui-grid unlined>
							<block v-for="(item, index) in currentDistinguishData" :key="index">
								<tui-grid-item
									class="grid-item" :class="{
										active: tabs[1].name === item.name.slice(0, 3) + '...'
									}" :cell="3" @click="handleChooseDistinguish(item)"
								>
									<text class="tui-grid-label">{{ item.name }}</text>
								</tui-grid-item>
							</block>
						</tui-grid>
					</view>
				</swiper-item>

				<swiper-item>
					<view class="choose-cities">
						<tui-grid unlined>
							<block v-for="(item, index) in currentTownData" :key="index">
								<tui-grid-item :cell="3" @click="confirmChooseAddress(item)">
									<text class="tui-grid-label">{{ item.name }}</text>
								</tui-grid-item>
							</block>
						</tui-grid>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view v-else class="no-data"> 暂无数据~ </view>

		<tui-popup
			:duration="500" :mode-class="[ 'fade-in' ]" :styles="styles" :show="showAuthPopupVisible"
			@click="showAuthPopupVisible = false"
		>
			<view class="address-text">
				<tui-icon name="gps" :size="30" color="#e95d20"></tui-icon>
				"团蜂"想访问您的地理位置，将根据你的地理位置提供准确的收货地址，社区服务地址，查看附近商家及门店等功能
			</view>
		</tui-popup>

		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
// import { hotCities } from './data';
const hotCities = [
	{
		city: '佛山市',
		town: '大良街道',
		distinguish: '顺德区',
		level: 4
	},
	{
		city: '佛山市',
		town: '龙江镇',
		distinguish: '顺德区',
		level: 4
	},
	{
		city: '佛山市',
		town: '容桂街道',
		distinguish: '顺德区',
		level: 4
	},
	{
		city: '佛山市',
		town: '乐从镇',
		distinguish: '顺德区',
		level: 4
	},
	{
		city: '贵港市',
		town: '',
		distinguish: '港北区',
		level: 3
	}
]
export default {
	name: 'ChooseAddress',
	data() {
		return {
			currentTab: 0,
			cityList: [],
			searchValue: '',
			isShowLoading: true,
			showAuthPopupVisible: false,
			styles: {
				'position': 'fixed',
				'bottom': 0,
				'top': 0,
				'left': 0,
				'right': 0,
				'display': 'flex',
				'justify-content': 'center',
				'align-items': 'flex-start',
				'background-color': 'rgba(0, 0, 0, 0.5)',
				'padding': '50rpx 0 0 0'
			},
			tabs: [
				{
					name: '所在城市'
				},
				{
					name: '区/县'
				},
				{
					name: '镇/街道'
				}
			],
			mainHeight: 0,
			currentDistinguishData: null,
			currentTownData: null,
			searchCity: '',
			allCityData: {},
			hotCities: Object.freeze(hotCities),
			backUrl: null,
			eventName: ''
		}
	},

	watch: {
		searchCity(val) {
			if (!val) {
				this.currentTab = 0
				this.currentDistinguishData = null
				this.currentTownData = null
				this.cityList = this.allCityData
			}
		}
	},

	mounted() {
		this.getData()
	},
	methods: {
		getData() {
			uni.showLoading()
			const _this = this
			import('./cities.json').then((res) => {
				for (const key in res) {
					_this.cityList.push(res[key])
				}
				_this.allCityData = Object.freeze(_this.cityList)
				_this.isShowLoading = false
				uni.hideLoading()
			})
		},

		changeTab(e) {
			this.currentTab = e.index
		},

		handleSearchCity() {
			this.currentTab = 0
			this.currentDistinguishData = null
			this.currentTownData = null
			let data = JSON.parse(JSON.stringify(this.allCityData))
			data = data.filter((item) => {
				item.data = item.data && item.data.filter((cities) => cities.name.includes(this.searchCity))
				return item.data && item.data.length
			})
			this.cityList = data
		},

		handleBack(mean) {
			if (this.backUrl) {
				this.$switchTab('/')
				return
			}
			uni.navigateBack({
				delta: 1,
				success: mean === 'success' && this.eventName ? uni.$emit(this.eventName) : () => { }
			})
		},

		handleClearSearch() {
			this.searchCity = ''
		},

		handleChooseCity(chooseAddressInfo) {
			this.currentDistinguishData = chooseAddressInfo.children
			this.currentTownData = null
			this.currentTab = 1
			this.tabs[0].name = chooseAddressInfo.name.slice(0, 3) + '...'
			this.tabs[0].select = chooseAddressInfo.name
			// this.$store.commit('location/CHANGE_CURRENT_CITY', cityName)
			// this.handleBack()
		},

		// 滑动swiper
		handleChangeSwiper(e) {
			const nextIndex = e.detail.current
			if (nextIndex === 1 && !this.currentDistinguishData) {
				this.currentTab = nextIndex - 1
				return
			}
			this.currentTab = nextIndex
		},

		// 开始定位
		handleGetCurrentAddress() {
			// #ifdef APP
			const appAuthorizeSetting = uni.getAppAuthorizeSetting()
			if (appAuthorizeSetting.locationAuthorized !== 'authorized') {
				this.showAuthPopupVisible = true
				this.$store.dispatch('location/getCurrentLocation')
			} else {
				this.$store.dispatch('location/getCurrentLocation')
			}
			// #endif
			// #ifdef H5
			this.$store.dispatch('location/getCurrentLocation')
			// #endif
		},

		// 切换tab
		handleChangeTab(info) {
			if (info.index === 1 && !this.currentDistinguishData) {
				this.ttoast({
					type: 'fail',
					title: '请选择所在城市'
				})
				return
			}
			if (info.index === 2 && !this.currentTownData) {
				this.ttoast({
					type: 'fail',
					title: '请选择所在区县'
				})
				return
			}
			this.currentTab = info.index
		},

		// 选择区县
		handleChooseDistinguish(data) {
			this.currentTownData = data.children
			// this.currentTab = 2
			this.tabs[1].name = data.name.slice(0, 3) + '...'
			this.tabs[1].select = data.name
		},

		// 选择定位
		async confirmChooseAddress(data, isHot) {
			uni.showLoading()
			if (isHot) {
				await this.$store.dispatch('location/getDetailAddress', data)
			} else {
				// console.log(this.tabs)
				await this.$store.dispatch('location/getDetailAddress', {
					city: this.tabs[0].select,
					distinguish: this.tabs[1].select,
					town: data.name
				})
			}
			uni.hideLoading()
			this.ttoast('修改成功')
			setTimeout(() => {
				if (this.backUrl) {
					uni.redirectTo({
						url: this.backUrl
					})
				} else {
					this.handleBack('success')
				}
			}, 1000)
		}
	},

	onLoad(params) {
		this.eventName = params.eventName || ''
		if (params.backUrl) {
			this.backUrl = params.backUrl.replaceAll('_', '?').replaceAll('|', '/')
		}
	}
}
</script>

<style lang="scss" scoped>
.my-address {
	width: 100vw;
	min-height: 100vh;
	background-color: #f3f3f3;

	.search-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 100upx;
		padding: 20upx;
		box-sizing: border-box;
		background-color: #fff;

		.search-wrapper {
			height: 100%;
			background-color: #f3f3f3;
			border-radius: 100px;
			display: flex;
			align-items: center;
			flex: 1;
			padding: 0 20upx;

			input {
				flex: 1;
				font-size: 24upx;
			}

			.search-icon {
				padding-right: 16upx;
				margin-right: 16upx !important;
				border-right: 1upx solid #d2d2d2;
			}
		}
	}

	.current-address {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20upx;
		box-sizing: border-box;
		background-color: #fff;
		background-color: #fff;
		font-size: 24upx;
		margin-bottom: 40upx;

		.current-address-text {
			display: flex;
			align-items: center;
			width: 300upx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		view {
			display: flex;
			align-items: center;

			text {
				margin-left: 10upx;
			}
		}
	}

	.hot-city {
		background-color: #fff;
		margin-bottom: 30upx;

		.title {
			width: 100%;
			position: relative;
			display: flex;
			align-items: center;
			background: #ffffff;
			color: rgb(102, 102, 102);
			font-size: 13px;
			height: 30px;
			padding: 0px 10px;
			font-weight: bold;
			font-size: 26upx;
		}

		.city-list {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			padding: 20upx;
			box-sizing: border-box;
			padding-left: 40upx;

			.hot-city-item {
				font-size: 24upx;
				color: #000;
				padding: 10upx 20upx;
				border: 1upx solid #adadad;
				margin-right: 30upx;
				margin-bottom: 20upx;
				border-radius: 10upx;
				transition: all 350ms;

				&:active {
					background-color: #e8e8e8;
				}
			}
		}
	}

	/deep/ .tui-title__item {
		background-color: #fff !important;
	}
}

.address-text {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 600upx;
	padding: 26upx;
	background-color: #fff;
	border-radius: 20upx;
	font-size: 32upx;
	line-height: 1.5;

	/deep/ .tui-icon {
		margin-right: 10upx !important;
	}
}

.uni-btn {
	font-size: 28upx;
	margin-left: 10upx;
	color: rgb(233, 93, 32);
}

.no-data {
	height: 300upx;
	text-align: center;
	line-height: 400upx;
	color: #ccc;
	font-size: 28upx;
}

.wrapper-container {
	width: 100%;
	height: calc(100vh - 292upx);
	// background-color: #f40;
	overflow: hidden;

	.swiper {
		height: calc(100vh - 292upx);
	}

	/deep/ .tui-scroll__view {
		height: calc(100vh - 292upx) !important;
	}
}

.choose-cities {
	width: 100%;
	height: 100%;
}

/deep/ .tui-tabs-item {
	width: 160rpx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

/deep/ .tui-grid {
	text-align: center;
}

.grid-item.active {
	background-color: #e95d20 !important;
	color: #fff;
}

.tui-grid-label {
	font-size: 28upx;
	width: 100px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	display: inline-block;
}
</style>
