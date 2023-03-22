<template>
	<view class="market">
		<view class="top">
			<view class="header">
				<tui-icon name="arrowleft" color="#000" @click="handleBack"></tui-icon>
				<SearchBar></SearchBar>
			</view>
			<view class="bar-list">
				<view class="bar" :class="{ active: currentbar === bar.id }" v-for="bar in bars" :key="bar.id"
					@click="handlePick(bar)">{{ bar.name }}
				</view>
			</view>
		</view>
		<view class="main">
			<view class="banner-wrapper">
				<image src="../../../static/index/ban.png" mode="" />
			</view>
			<view class="text-list">
				<view class="left">商家推荐</view>
				<view class="right">换一批</view>
			</view>
			<view class="brand-list-wrapper">
				<BeeBrandPane v-for="item in $data._list" :key="item.id" :brand-info="item"></BeeBrandPane>
				<LoadMore :status="$data._status"></LoadMore>
			</view>
		</view>
	</view>
</template>

<script>
import { bars } from './data'
import loadData from '../../../mixin/loadData'
import { getSroreListApi } from '../../../api/store'
export default {
	name: "Market",
	props: {

	},
	data() {
		return {
			bars,
			currentbar: 1,
		}
	},
	mixins: [
		loadData({
			api: getSroreListApi,
			mapKey: {
				list: 'brandList',
				totalPages: 'totalPages',
				size: 'size',
			},
			dataFn(data) {
				const ignoreBrandList = ['佛山市顺德区修江缘美食餐饮店', '测试门店呀']
				return data.filter(item => {
					return !ignoreBrandList.includes(item.name)
				})
			},
		}),
	],
	onLoad() {
		this._loadData()
	},
	onPullDownRefresh() {
		this.$data.page = 1
		this._loadData()
		uni.stopPullDownRefresh()
	},
	methods: {
		handlePick(bar) {
			this.currentbar = bar.id
		},
		handleBack() {
			uni.switchTab({
				url: '/pages/index/index',
			})
		},
	},
	created() { }
}
</script>

<style lang="less" scoped>
.market {
	width: 100%;
	min-height: 100vh;
	// padding: 0 22upx;
	box-sizing: border-box;
	background: linear-gradient(180deg, #FFFFFF 0%, #F6F6F6 10%);

	.top {
		width: 100%;
		height: 248upx;
		background: #FFFFFF;
		border-radius: 0upx 0upx 40upx 40upx;

		.header {
			display: flex;
			align-items: center;
			padding: 36upx 22upx;

			/deep/.tui-icon {
				font-size: 64upx !important;
			}

			/deep/.search-bar-container {
				flex: 1;
			}
		}

		.bar-list {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 44upx;

			.bar {
				position: relative;
				width: 120upx;
				height: 54upx;
				font-size: 24upx;
				color: #3D3D3D;
				transition: all 100ms;

				&::after {
					content: '';
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					bottom: 0;
					width: 0;
					height: 6upx;
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

	.main {
		padding: 0 22upx;

		.banner-wrapper {
			padding: 18upx 0;

			image {
				width: 100%;
				height: 200upx;
				border-radius: 20upx;
			}
		}

		.text-list {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-bottom: 22upx;

			.left {
				font-size: 32upx;
				font-weight: 500;
				color: #000000;
			}

			.right {
				width: 90upx;
				height: 34upx;
				border-radius: 10upx;
				border: 2upx solid #D8D8D8;
				font-size: 24upx;
				color: #999999;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.brand-list-wrapper {
			padding-bottom: 24upx;
		}
	}
}
</style>
