<template>
	<view class="food-nearby-page-container">
		<view class="fixed-container">
			<view class="search-container">
				<view class="search-header">
					<BeeBack>
						<view class="header-title">
							<BeeIcon :size="24" color="#000" name="arrowleft"></BeeIcon>
							<h1>{{ title }}</h1>
						</view>
					</BeeBack>
					<SearchBar prevent background="#fff" @click="go('/pages/search-page/search-page')"></SearchBar>
					<view class="control">
						<view class="item">
							<BeeIcon
								:size="24" :src="require('../../../../static/brand/find-food/food-nearby/location.png')
								"
							></BeeIcon>
							<text>位置</text>
						</view>
					</view>
				</view>
			</view>

			<view v-if="list && list.length" class="menus-wrapper">
				<view
					v-for="item in list" :key="item.text" class="item" :class="{ active: queryParam.dressing === item.id }"
					@click="handleChooseMenu(item)"
				>
					<text>{{ item.storeName }}</text>
				</view>
			</view>

			<BeeStoreFilter
				:is-show-filter="false" style="margin: 0;padding: 24upx 28upx 20upx;"
				@select-distance="handleSelectDistance"
			></BeeStoreFilter>
		</view>

		<view class="brand-list">
			<BeeBrandPane v-for="item in $data._list" :key="item.id" :is-positioning="false" :brand-info="item"></BeeBrandPane>
			<LoadMore :status="$data._status"></LoadMore>
		</view>

		<view v-if="!$data._list.length && $data._status !== 'loading'" class="no-data">
			暂无商家~
		</view>
	</view>
</template>

<script>
import loadData from '../../../../mixin/loadData'
import { getSubMenuByPidApi, filterBrandByMenuIdApi } from '../../../../api/brand'
export default {
	name: 'FoodNearby',
	mixins: [
		loadData({
			api: filterBrandByMenuIdApi,
			mapKey: {
				list: 'tfBrandList',
				totalPages: 'total',
				size: 'size'
			},
			dataFn(data) {
				const ignoreBrandList = ['佛山市顺德区修江缘美食餐饮店', '测试门店呀']
				return data.filter((item) => !ignoreBrandList.includes(item.name))
			}
		})
	],
	data() {
		return {
			list: [],
			title: '',
			id: '',
			queryParam: {
				dressing: '',
				distance: ''
			}
		}
	},

	onLoad(options) {
		this.title = options.name
		this.id = options.id
		this.getMenus()
	},

	methods: {
		getBrandList() {
			this.$data._query = {
				...this.$data._query,
				...this.queryParam,
				areaId: this.$store.state.location.locationInfo.adcode,
				longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
				latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1]
			}
			this._loadData()
		},

		handleChooseMenu(item) {
			this.queryParam.dressing = item.id
			this.getBrandList()
		},

		// 获取当前页面的分类
		async getMenus() {
			const { data } = await getSubMenuByPidApi({
				dressing: this.id
			})
			this.list = data
			data && data.length ? this.queryParam.dressing = data[0].id : this.queryParam.dressing = this.id
			this.getBrandList()
		},

		handleSelectDistance(e) {
			this.queryParam.distance = e
			this.getBrandList()
		}
	}
}
</script>

<style lang="scss" scoped>
.food-nearby-page-container {
	width: 100vw;
	min-height: 100vh;
	background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, #f6f6f6 0%);

	.fixed-container {
		.search-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 44upx 22upx 0;
			box-sizing: border-box;

			.header-title {
				display: flex;
				align-items: center;
			}

			h1 {
				font-size: 28upx;
				color: #000;
				font-weight: normal;
				margin-right: 10upx;
			}

			/deep/ .search-bar-container {
				flex: 1;
				margin-right: 15upx;
			}

			.control {
				display: flex;
				align-items: center;

				.item {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					color: #000;
					font-size: 24upx;
					margin-left: 8upx;

					&:nth-child(1) {
						margin-left: 0;
					}
				}
			}
		}

		.menus-wrapper {
			white-space: nowrap;
			display: flex;
			align-items: center;
			overflow: scroll;
			padding: 20upx 20upx 0 20upx;

			.item {
				height: 48upx;
				position: relative;
				font-size: 24upx;
				box-sizing: border-box;
				margin-right: 48upx;
				border-radius: 10upx;
				flex-shrink: 0;

				&::after {
					content: '';
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					bottom: 0;
					width: 0;
					height: 4upx;
					border-radius: 10upx;
					background-color: #FB5D5D;
					transition: all 350ms ease-in;
				}

				&.active {
					font-size: 28upx;
					font-weight: 500;

					&::after {
						width: 48upx;
					}
				}

			}
		}
	}

	.brand-list {
		padding: 0 20upx;
		box-sizing: border-box;

	}

	.no-data {
		text-align: center;
		color: #747474;
		height: 200upx;
		line-height: 200upx;
	}
}
</style>
