<template>
	<view class="shop-container" :style="{ paddingBottom: status === 'loading' ? '100upx' : '' }">
		<view :class="{ fixed: scrollTop > 300 }">
			<view class="search-header">
				<tui-icon name="arrowleft" @click="handleBack"></tui-icon>
				<SearchBar></SearchBar>
				<PhotoSearch></PhotoSearch>
			</view>

			<view class="menus-wrapper">
				<view
					v-for="item in menus" :key="item.id" class="item" :class="{ active: currentMenu === item.id }"
					@click="handleChooseMenu(item)"
				>
					<BeeIcon :size="40" :src="item.icon"></BeeIcon>
					<text>{{ item.name }}</text>
				</view>
			</view>

			<view class="goods-wrapper">
				<!-- s暂时隐藏 -->
				<!-- <GoodsFilter :scrollTop="0"></GoodsFilter> -->
				<!-- e暂时隐藏 -->
				<scroll-view scroll-x="true">
					<view class="sub-menus">
						<view
							v-for="item in submenus" :key="item.id" class="item" :class="{ active: query.categoryId === item.id }"
							@click="handleChangeSubMenu(item)"
						>
							{{ item.name }}
						</view>
					</view>
				</scroll-view>
			</view>
		</view>

		<view>
			<view v-show="goodsList.length" class="goods-list-wrapper">
				<NewGoods v-for="item in goodsList" :key="item.id" :data="item" class="goods-pane"></NewGoods>
			</view>
			<LoadMore v-show="goodsList.length" :status="status"></LoadMore>

			<GoodsSkeleton
				v-if="status === 'loading' && !goodsList.length"
				background="linear-gradient(180deg, #ffffff 0%, #f6f6f6 6%)" padding="20upx"
			></GoodsSkeleton>
		</view>
	</view>
</template>

<script>
import { menus } from './data'
import { getTypeDetailList } from '../../../api/home'
import { goodsListApi } from '../../../api/goods'
export default {
	data() {
		return {
			menus: Object.freeze(menus),
			currentMenu: 1001002,
			submenus: [],
			query: {
				page: 1,
				size: 20,
				categoryId: ''
			},
			totalPages: 0,
			goodsList: [],
			scrollTop: 0,
			status: 'none'
		}
	},
	onLoad() {
		this.getSubMenus()
	},
	methods: {
		handleBack() {
			uni.switchTab({
				url: '/pages/index/index'
			})
		},

		// 选择一级
		handleChooseMenu(item) {
			this.currentMenu = item.id
			this.goodsList = []
			this.getSubMenus()
		},

		async getSubMenus() {
			const { data } = await getTypeDetailList({ id: this.currentMenu })
			this.submenus = data.currentSubCategory
			this.query.categoryId = data.currentSubCategory[0].id
			this.query.page = 1
			this.getGoods()
		},

		// 获取商品列表
		async getGoods(isLoadmore) {
			this.status = 'loading'
			const { data } = await goodsListApi(this.query)
			this.totalPages = data.totalPages
			if (isLoadmore) {
				this.goodsList.push(...data.goodsList)
			} else {
				this.goodsList = data.goodsList
			}
			this.status = 'none'
		},

		handleChangeSubMenu(item) {
			this.query.categoryId = item.id
			this.query.page = 1
			this.goodsList = []
			this.getGoods()
		}
	},

	onPageScroll(e) {
		this.scrollTop = e.scrollTop
	},

	onReachBottom() {
		if (this.query.page >= this.totalPages) {
			this.status = 'no-more'
			return
		}

		if (this.query.size > this.goodsList.length) {
			return
		}

		this.query.page++
		this.getGoods(true)
	}
}
</script>

<style lang="less" scoped>
.shop-container {
	background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 6%);
	width: 100%;
	min-height: 100vh;

	.search-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 40upx 20upx 0 0;
		box-sizing: border-box;

		/deep/ .search-bar-container {
			flex: 1;
			margin-right: 15upx;
		}
	}

	.fixed {
		position: fixed;
		transition: top 250ms;
		top: 0;
		left: 0;
		right: 0;
		background-color: #fff;
		z-index: 10000000;
		padding-bottom: 30upx;
	}

	.menus-wrapper {
		white-space: nowrap;
		display: flex;
		align-items: center;
		overflow: scroll;
		padding: 20upx 20upx 10upx 20upx;

		.item {
			width: 120upx;
			height: 160upx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			font-size: 24upx;
			padding: 16upx 12upx;
			box-sizing: border-box;
			margin-right: 12upx;
			border-radius: 10upx;
			flex-shrink: 0;
			transition: all 350ms;
			background-color: #fff;

			&.active {
				box-shadow: 0px 2px 5px 0px rgba(175, 175, 175, 0.6);
			}
		}
	}

	.goods-wrapper {
		padding: 28upx 20upx;
		padding-bottom: 0;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 20upx 20upx 0 0;

		.sub-menus {
			display: flex;
			align-items: center;
			margin-top: 24upx;

			.item {
				white-space: nowrap;
				padding: 0 16upx;
				border: 1upx solid #777;
				border-radius: 10upx;
				color: #777;
				margin-right: 34upx;
				font-size: 24upx;

				&.active {
					border-color: #fa5151;
					color: #fa5151;
				}
			}
		}
	}

	.goods-list-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 28upx 20upx 0;
		box-sizing: border-box;
		background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 6%);

		.goods-pane {
			margin-bottom: 20upx;
		}
	}
}
</style>
