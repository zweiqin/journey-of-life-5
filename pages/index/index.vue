<template>
	<view class="index-container page">

		<view class="container">
			<view class="search-header">
				<BeeLocale></BeeLocale>
				<SearchBar prevent @click="go('/pages/search-page/search-page')"></SearchBar>
				<CategoryIcon></CategoryIcon>
			</view>

			<Menus :data="menusData" @handleNavigate="handleNavigate"></Menus>

		</view>
		<view class="goods-list">
			<view class="pane">
				<view class="menus-wrapper">
					<view
						v-for="(item, index) in menus" v-if="index < 7" :key="item.id" class="item"
						:class="{ active: currentFilterMenuId === item.id }" @click="handleChooseMenu(item)"
					>
						<BeeIcon :size="40" :src="item.icon"></BeeIcon>
						<text>{{ item.name }}</text>
					</view>
					<view class="item" @click="goToMore()">
						<BeeIcon :size="40" :src="require('../../static/index/menus/gengduo.png')"></BeeIcon>
						<text>更多</text>
					</view>
				</view>
				<!-- 	<scroll-view scroll-x="true">
					<view class="menus-wrapper">
					<view
					v-for="item in menus" :key="item.id" class="item" :class="{ active: currentFilterMenuId === item.id }"
					@click="handleChooseMenu(item)"
					>
					<BeeIcon :size="40" :src="item.icon"></BeeIcon>
					<text>{{ item.name }}</text>
					</view>
					</view>
					</scroll-view> -->
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

				<view
					style="display: flex;justify-content: space-between;align-items: flex-start;flex-wrap: nowrap;min-height: 360upx;padding: 92upx 34upx 0;background: url('../../static/images/index/bg-product-card.png') no-repeat center top/contain;"
				>
					<view
						v-for="item in goodsList.slice(0, 3)" :key="item.id"
						style="position: relative;width: 32%;background-color: #ffffff;"
						@click="go('/pages/prod/prod?goodsId=' + item.id)"
					>
						<tui-lazyload-img
							width="100%" height="216upx" mode="aspectFill" radius="2rpx 2rpx 2rpx 2rpx"
							:src="common.seamingImgUrl(item.picUrl)"
						>
						</tui-lazyload-img>
						<tui-lazyload-img
							width="62upx" height="auto" mode="widthFix" src="../../static/images/index/new-tag.png"
							background-color="transparent" style="position: absolute;top: 0;left: 0;"
						>
						</tui-lazyload-img>
						<view>
							<view
								style="padding: 6upx 10upx 4upx;font-size: 26upx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
							>
								{{ item.name }}
							</view>
							<view style="display: flex;justify-content: center;align-items: center;padding: 0 0 12upx;">
								<tui-lazyload-img
									width="64upx" height="auto" mode="widthFix"
									src="../../static/images/index/miaoshajia.png" background-color="transparent"
								>
								</tui-lazyload-img>
								<view style="padding-left: 12upx;font-size: 26upx;color: #c83732;">
									￥<text>{{ item.counterPrice }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>

				<view class="title">
					<!-- <text class="left-bar"></text>
						<text>商品推荐</text>
						<text class="right-bar"></text> -->
					<BeeIcon width="228upx" height="34upx" :src="require('../../static/images/index/goods-img-title.png')">
					</BeeIcon>
				</view>

				<!-- <view class="goods-wrapper">
					<NewGoods v-for="item in goodsList" :key="item.id" :data="item"></NewGoods>
					</view> -->
				<view class="goods-wrapper">
					<view
						v-for="item in goodsList.slice(3)" :key="item.id" style="width: 49%;padding-bottom: 28upx;"
						@click="go('/pages/prod/prod?goodsId=' + item.id)"
					>
						<tui-lazyload-img
							width="100%" height="354upx" mode="aspectFill" radius="2rpx 2rpx 2rpx 2rpx"
							:src="common.seamingImgUrl(item.picUrl)"
						>
						</tui-lazyload-img>
						<view>
							<view
								style="padding: 8upx 10upx 4upx;font-size: 26upx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
							>
								{{ item.name }}
							</view>
							<view style="display: flex;align-items: center;padding: 0 0 6upx;">
								<view
									style="display: flex;align-items: center;padding: 6upx;background-color: #333333;border-radius: 0 34upx 34upx 0;"
								>
									<text style="font-size: 26upx;color: #FFEBC4;">巨蜂自营</text>
									<BeeIcon
										:size="18" :src="require('../../static/user-center/ju-icon.png')"
										style="width: fit-content;margin-left: 8upx;background-color: #ffffff;border-radius: 50%;line-height: 0;"
									>
									</BeeIcon>
								</view>
								<view
									v-if="item.sales"
									style="margin-left: 8upx;padding: 4upx;color: #C5AA7B;font-size: 26upx;border: 1px solid #E4E5E6;"
								>
									已售{{ item.sales }}件
								</view>
							</view>
							<view style="font-size: 36upx;font-weight: bold;color: #c83732;">
								￥<text style="padding-left: 8upx;">{{ item.counterPrice }}</text>
							</view>
							<div
								style="width: fit-content;margin-top: -2upx;padding: 2upx 12upx 6upx 2upx;background-color: #f0f0f0;font-size: 28upx;color: #fa5151;border-radius: 0 22upx 22upx 0;vertical-align: middle;"
							>
								可使用{{ Math.ceil(Number(item.counterPrice || 0)) }}代金券抵扣
							</div>
						</view>
					</view>
				</view>
				<LoadMore v-show="goodsList.length" :status="status"></LoadMore>
				<GoodsSkeleton
					v-if="status === 'loading' && !goodsList.length"
					background="linear-gradient(180deg, #ffffff 0%, #f6f6f6 6%)" padding="20upx"
				></GoodsSkeleton>
			</view>
		</view>
	</view>
</template>

<script>
import { menusData, menus } from './data'
import Menus from './cpns/Menus'
// import Synthesize from './cpns/Synthesize.vue'
import { getTypeDetailList } from '../../api/home'
import { goodsListApi } from '../../api/goods'

export default {
	name: 'Index',
	components: { Menus },
	data() {
		return {
			menusData: Object.freeze(menusData),
			query: {
				page: 1,
				size: 20,
				// isNew: true,
				order: 'asc',
				categoryId: 100101312,
				sort: 'retail_price'
			},
			goodsList: [],
			totalPages: 2,
			status: 'none',
			currentFilterMenuId: 1001009,
			menus: Object.freeze(menus),
			currentMenu: null,
			submenus: []
		}
	},
	onLoad() { },
	mounted() {
		this.getSubMenus()
	},
	methods: {
		goToMore() {
			uni.navigateTo({
				url: '/pages/index/selectCommodity/selectCommodity'
			})
		},
		getGoodsList(isLoadMore) {
			uni.showLoading({
				title: '加载中'
			})
			goodsListApi(this.query).then(({ data }) => {
				this.status = 'loading'
				this.totalPages = data.totalPages
				if (isLoadMore) {
					this.goodsList.push(...data.goodsList)
				} else {
					this.goodsList = data.goodsList
				}
				this.status = 'none'
			})
			uni.hideLoading()
		},

		handleNavigate(item, cb) {
			console.log(item)
			if (item.type === 'external') {
				this.go('/user/view?target=' + item.url)
			} else {
				this.go(item.url)
			}
		},

		handleChooseMenu(item) {
			this.currentFilterMenuId = item.id
			this.goodsList = []
			this.getSubMenus()
		},

		async getSubMenus() {
			const { data } = await getTypeDetailList({ id: this.currentFilterMenuId })
			this.submenus = data.currentSubCategory
			this.query.categoryId = this.currentFilterMenuId === 1001009 ? data.currentSubCategory[2].id : data.currentSubCategory[0].id
			this.query.page = 1
			this.getGoodsList()
		},

		handleChangeSubMenu(itme) {
			this.query.categoryId = itme.id
			this.getGoodsList()
		}
	},
	onReachBottom() {
		if (this.query.page >= this.totalPages) {
			this.$showToast('没有更多了')
			return
		}
		if (this.query.size > this.goodsList.length) {
			return
		}
		this.query.page++
		this.getGoodsList(true)
	}
}
</script>

<style lang="less" scoped>
.index-container {
	width: 100%;
	min-height: 100vh;
	// background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 3%, #f6f6f6 8%);

	.search-header {
		display: flex;
		align-items: center;
		justify-content: space-between;

		// padding: 46upx 22upx 0 22upx;
		/deep/ .search-bar-container {
			flex: 1;
			margin-right: 15upx;
		}
	}

	.container {
		padding: 10upx 22.5upx 0 22.5upx;
		box-sizing: border-box;
		// background-color: #f6f6f6;

	}

	.goods-list {
		padding-bottom: 100upx;
		// margin: 20upx 0;
		padding: 20.4upx 22.5upx 0 22.5upx;
		box-sizing: border-box;
		background: linear-gradient(to bottom, #fff, #f6f6f6 3%);
		border-radius: 20upx 20upx 0 0;

		.pane {
			padding-bottom: 48upx;

			.title {
				display: flex;
				align-items: center;
				justify-content: center;
				text-align: center;
				font-weight: 500;
				margin-bottom: 20upx;
				margin-top: 20upx;

				.left-bar {
					margin-right: 10upx;
					display: block;
					width: 25upx;
					height: 6upx;
					background: linear-gradient(270deg,
							#07b9b9 0%,
							rgba(7, 185, 185, 0) 100%);
				}

				.right-bar {
					display: block;
					width: 25upx;
					height: 6upx;
					margin-left: 10upx;
					background: linear-gradient(to right,
							#07b9b9 0%,
							rgba(7, 185, 185, 0) 100%);
				}
			}

			.goods-wrapper {
				margin-top: 32upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-wrap: wrap;

				/deep/ .goods-container {
					margin-bottom: 14upx;
				}
			}
		}
	}

	.menus-wrapper {
		// white-space: nowrap;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		// overflow: scroll;
		// padding: 20upx 20upx 10upx 20upx;
		margin-bottom: 20rpx;
		border-radius: 20upx;
		background-color: #fff;

		.item {
			// margin-top: 10rpx;
			width: 160upx;
			height: 160upx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			font-size: 30rpx;
			color: #3d3d3d;
			padding: 16upx 12upx;
			box-sizing: border-box;
			// margin-right: 12upx;
			border-radius: 10upx;
			flex-shrink: 0;
			transition: all 350ms;

			&.active {
				// box-shadow: 0px 2px 5px 0px rgba(175, 175, 175, 0.6);
			}
		}
	}

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
</style>
