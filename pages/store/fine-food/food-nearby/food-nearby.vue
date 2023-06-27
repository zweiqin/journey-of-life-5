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
								:size="24" :src="
									require('../../../../static/brand/find-food/food-nearby/location.png')
								"
							></BeeIcon>
							<text>位置</text>
						</view>
					</view>
				</view>
			</view>

			<view class="menus-wrapper">
				<view
					v-for="item in list" :key="item.text" class="item"
					:class="{ active: currentMenu === item.id }" @click="handleChooseMenu(item)"
				>
					<text>{{ item.storeName }}</text>
				</view>
			</view>

			<FilterPane></FilterPane>
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
import { getSroreListApi } from '../../../../api/store'
import { getSubMenuByPidApi, filterBrandByMenuIdApi } from '../../../../api/brand'
import FilterPane from './cpns/FilterPane.vue'
import { menus, navs } from './data'
export default {
	components: {
		FilterPane
	},
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
			currentMenu: 1001002,
			menus: Object.freeze(menus),
			navs,
			list: [],
			title: '',
			id: ''
		}
	},

	onLoad(options) {
		// this.getNavsList()
		this.title = options.name
		this.id = options.id
		this.getMenus()
	},

	methods: {
		handleChooseMenu(item) {
			this.currentMenu = item.id
			this.$data._query.dressing = this.currentMenu
			this._loadData()
		},
		// 导航栏
		async getNavsList() {
			const data = navs
			console.log('数据', data)
			const nid = data[0].id
			console.log('类id', nid)
			this.nid = nid
			const list = data[0].list
			console.log('list', list)
			this.list = list
		},

		// 获取当前页面的分类
		async getMenus() {
			const { data } = await getSubMenuByPidApi({
				dressing: this.id
			})

			this.list = data
			this.currentMenu = data[0].id
			this.$data._query.dressing = this.currentMenu
			this.$data._query = {
				...this.$data._query,
				longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
				latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1]
			}
			this._loadData()
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
				// width: 120upx;
				// height: 160upx;
				// display: flex;
				// align-items: center;
				// justify-content: center;
				// flex-direction: column;
				font-size: 24upx;
				// padding: 16upx 12upx;
				box-sizing: border-box;
				margin-right: 48upx;
				border-radius: 10upx;
				flex-shrink: 0;
				// background-color: #fff;

				// &.active {
				//   border: 1upx solid #fa5151;

				//   &::after {
				//     content: '';
				//     bottom: 0;
				//     right: 0;
				//     width: 28upx;
				//     height: 22upx;
				//     position: absolute;
				//     display: block;
				//     background: url('../../../../static/brand/find-food/food-nearby/menus/active.png')
				//       no-repeat;
				//     background-size: cover;
				//   }
				// }

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

	.no-data{
		text-align: center;
		color: #747474;
		height: 200upx;
		line-height: 200upx;
	}
}
</style>
