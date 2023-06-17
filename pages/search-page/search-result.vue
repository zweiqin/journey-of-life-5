<template>
	<view class="search-result-container">
		<view class="search-top" :class="{ fixed: scrollTop > 200 }">
			<view class="search-container">
				<BeeBack>
					<BeeIcon :size="30" color="#1e1e1e" name="arrowleft"></BeeIcon>
				</BeeBack>
				<view class="search-wrapper">
					<tui-icon name="search" :size="24" class="search-icon"></tui-icon>
					<input
						v-model="searchValue" type="text" confirm-type="search" placeholder="请输入您要搜索的商品"
						@confirm="handelSearch()"
					/>
					<tui-icon v-show="searchValue" name="close" :size="20" class="close-icon" @click="searchValue = ''"></tui-icon>
				</view>
				<button class="uni-btn search-btn" @click="handelSearch()">
					搜索
				</button>
			</view>
		</view>

		<view class="goods-list">
			<BeeBrandPane v-for="(item, index) in brandGoodsList" :key="item.id" :brand-info="item">
				<scroll-view scroll-x="true">
					<view class="sub-menus">
						<NewGoods v-for="part in brandGoodsList[index].goodsVoList" :key="part.id" style="margin-right: 10rpx;" :width="80" height="170rpx" :data="part" :show-tags="false" :show-detail-btn="false"></NewGoods>
					</view>
				</scroll-view>
			</BeeBrandPane>
		</view>
		<view v-show="loading == 'none' && !brandGoodsList.length" class="no-data">
			暂无商品
		</view>
		<LoadMore :status="loading"></LoadMore>
	</view>
</template>

<script>
import { getDtsBrandGoods } from '../../api/home'
export default {
	name: 'SearchResult',
	data() {
		return {
			scrollTop: 0,
			searchValue: '',
			brandGoodsList: [],
			loading: 'loading'
		}
	},
	onLoad(options) {
		this.searchValue = options.keywords
		this.getBrandGoodsList()
	},
	methods: {
		handelSearch() {
			this.brandGoodsList = []
			this.getBrandGoodsList()
		},
		async getBrandGoodsList() {
			this.loading = 'loading'
			const { data } = await getDtsBrandGoods({
				longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
				latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1],
				keywords: this.searchValue
			})
			console.log(data)
			this.loading = 'none'
			this.brandGoodsList = data
		}
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop
	}
}
</script>

<style lang="less" scoped>
.hidden {
	width: 374upx;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.search-result-container {
	width: 100%;
	min-height: 100vh;
	background-color: #f6f6f5;

	.search-top {
		background-color: #fff;
		border-radius: 0 0 24upx 24upx;

		&.fixed {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 10000;
		}

		.search-container {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20upx 20upx 20upx 0;

			.search-wrapper {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: #f6f6f5;
				border-radius: 100px;
				height: 72upx;
				margin-right: 24upx;
				padding: 20upx 24upx;
				box-sizing: border-box;

				.search-icon {
					padding-right: 16upx;
					margin-right: 16upx !important;
					border-right: 1upx solid #ccc;
				}

				input {
					font-size: 28upx;
					color: #3a3629;
					flex: 1;
				}
			}

			.search-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 128upx;
				height: 72upx;
				border-radius: 100px;
				background-color: #ffc117;
				color: #fff;
				font-size: 26upx;
			}
		}
	}

	.goods-list {
		padding: 20upx;
		box-sizing: border-box;
		// display: flex;
		// justify-content: space-between;
		// flex-wrap: wrap;
		.sub-menus {
			display: flex;
			align-items: center;
			margin-top: 8upx;
			margin-left: 36upx;
		}
	}

	.no-data {
		height: 400upx;
		text-align: center;
		line-height: 400upx;
		text-align: center;
		color: #ccc;
	}
}
</style>
