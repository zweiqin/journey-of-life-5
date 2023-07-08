<template>
	<view class="index-container page">

		<view class="container">
			<view class="search-header">
				<BeeLocale></BeeLocale>
				<SearchBar prevent @click="go('/pages/search-page/search-page')"></SearchBar>
				<PhotoSearch></PhotoSearch>
			</view>

			<Menus :data="menusData" @handleNavigate="handleNavigate"></Menus>

			<!-- <view class="banner-wrapper">
				<image src="../../static/index/banner.png" mode="" />
				</view>

				<Synthesize></Synthesize> -->

			<view class="banner-wrapper" @click="go('/user/sever/userUp')">
				<image src="../../static/index/banner2.png" mode="" />
			</view>

			<view class="title">
				<text class="left-bar"></text>
				<text>好物推荐</text>
				<text class="right-bar"></text>
			</view>
		</view>
		<view class="goods-list">
			<view class="pane">
				<!-- <GoodsFilter :scrollTop="scrollTop"></GoodsFilter> -->
				<scroll-view scroll-x="true" >
					<view class="menus-wrapper">
						<view
							v-for="item in menus" :key="item.id" class="item"
							:class="{ active: currentFilterMenuId === item.id }" @click="handleChooseMenu(item)"
						>
							<BeeIcon :size="40" :src="item.icon"></BeeIcon>
							<text>{{ item.name }}</text>
						</view>
					</view>
				</scroll-view>

				<scroll-view scroll-x="true">
					<view class="sub-menus">
						<view
							v-for="item in submenus" :key="item.id" class="item"
							:class="{ active: query.categoryId === item.id }" @click="handleChangeSubMenu(item)"
						>
							{{ item.name }}
						</view>
					</view>
				</scroll-view>

				<view class="goods-wrapper">
					<NewGoods v-for="item in goodsList" :key="item.id" :data="item"></NewGoods>
				</view>

				<LoadMore v-show="goodsList.length" :status="status"></LoadMore>

				<GoodsSkeleton
					v-if="status === 'loading' && !goodsList.length" background="linear-gradient(180deg, #ffffff 0%, #f6f6f6 6%)"
					padding="20upx"
				></GoodsSkeleton>
			</view>
		</view>
	</view>
</template>

<script>
import { menusData } from './data'
import Menus from './cpns/Menus'
import Synthesize from './cpns/Synthesize.vue'
import { getGoodsById } from '../../api/home'
import { getTypeDetailList } from '../../api/home'

export default {
	name: 'Index',
	components: { Menus, Synthesize },
	data() {
		return {
			menusData: Object.freeze(menusData),
			scrollTop: 0,
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
			menus: Object.freeze([
				{
					name: '日用百货',
					icon: require('../../static/index/shop/baihuo.png'),
					id: 1001009
				},
				{
					name: '巨蜂特惠',
					icon: require('../../static/index/shop/tehui.png'),
					id: 1001002
				},
				{
					name: '家具用品',
					icon: require('../../static/index/shop/jiaju.png'),
					id: 1001011
				},
				{
					name: '箱包首饰',
					icon: require('../../static/index/shop/xiangbao.png'),
					id: 1001013
				},
				{
					name: '家电',
					icon: require('../../static/index/shop/el.png'),
					id: 100101466
				},
				{
					name: '功能家具',
					icon: require('../../static/index/shop/gongnengjiaju.png'),
					id: 100101685
				},
				{
					name: '户外庭院',
					icon: require('../../static/index/shop/huwaitingyuan.png'),
					id: 100101676
				},
				{
					name: '全屋组合',
					icon: require('../../static/index/shop/quanwuzuhe.png'),
					id: 100101668
				},
				{
					name: '饰品专区',
					icon: require('../../static/index/shop/shipingzhuanqu.png'),
					id: 100101662
				},
				{
					name: '书房家具',
					icon: require('../../static/index/shop/shufangjiaju.png'),
					id: 100101651
				},
				{
					name: '壁画专区',
					icon: require('../../static/index/shop/bihuazhuanqu.png'),
					id: 100101643
				},
				{
					name: '红木家具',
					icon: require('../../static/index/shop/hongmujiaju.png'),
					id: 100101638
				},
				{
					name: '灯饰专区',
					icon: require('../../static/index/shop/dengshizhuanqu.png'),
					id: 100101627
				},
				{
					name: '办公家具',
					icon: require('../../static/index/shop/bangongjiaju.png'),
					id: 100101614
				},
				{
					name: '儿童专区',
					icon: require('../../static/index/shop/ertongzhuanqu.png'),
					id: 100101604
				},
				{
					name: '餐厅家具',
					icon: require('../../static/index/shop/cantingjiaju.png'),
					id: 100101595
				},
				{
					name: '卧室家具',
					icon: require('../../static/index/shop/woshijiaju.png'),
					id: 100101582
				},
				{
					name: '客厅家具',
					icon: require('../../static/index/shop/ketingjiaju.png'),
					id: 100101559
				}
			]),
			currentMenu: null,
			submenus: []
		}
	},
	onLoad() {
		// #ifdef H5
		if (window.location.href.includes('?code')) {
			window.location.href =
				window.location.origin + window.location.pathname
		}
		// #endif
	},
	mounted() {
		this.getSubMenus()
	},
	methods: {
		getGoodsList(isLoadMore) {
			uni.showLoading({
				title: '加载中'
			})
			getGoodsById(this.query).then(({ data }) => {
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
				uni.navigateTo({
					url: item.url
				})
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
	onPageScroll(e) {
		this.scrollTop = e.scrollTop
	},
	onReachBottom() {
		if (this.query.page >= this.totalPages) {
			uni.showToast({
				title: '没有更多了',
				duration: 2000
			})
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
	background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 3%, #f6f6f6 8%);

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
		// background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 3%, #f6f6f6 8%);
		background-color: #f6f6f6;

		.banner-wrapper {
			margin-top: 20upx;

			image {
				width: 100%;
				height: 200upx;
				border-radius: 20upx;
			}
		}

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
	}

	.goods-list {
		padding-bottom: 100upx;
		// margin: 20upx 0;
		padding: 20.4upx 22.5upx 0 22.5upx;
		box-sizing: border-box;
		background: linear-gradient(to bottom, #fff, #f6f6f6 3%);
		border-radius: 20upx 20upx 0 0;

		.pane {
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
		white-space: nowrap;
		display: flex;
		align-items: center;
		justify-content: space-between;
		// overflow: scroll;
		// padding: 20upx 20upx 10upx 20upx;

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
