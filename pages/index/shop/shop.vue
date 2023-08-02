<template>
	<view class="shopContainer">
		<view class="search-header">
			<tui-icon name="arrowleft" @click="handleBack"></tui-icon>
			<SearchBar prevent @click="go('/pages/search-page/search-page')"></SearchBar>
			<PhotoSearch></PhotoSearch>
		</view>
		<scroll-view scroll-x="true" class="menus-wrapper" scroll-with-animation :scroll-into-view="menusItemId">
			<view
				v-for="(item, index) in menus" :id="'menusItem' + item.id" :key="item.id" class="item"
				:class="{ active: currentMenu == item.id }" @click="handleChooseMenu(item)"
			>
				<BeeIcon :size="40" :src="item.icon"></BeeIcon>
				<text>{{ item.name }}</text>
			</view>
		</scroll-view>

		<!-- header -->

		<!-- header 顶部下拉选择框 -->
		<view :class="{ 'stic-top': scrollTop > 158 }">
			<!-- header -->
			<view class="tui-header">
				<view class="tui-header-top">
					<view class="tui-top-item" @tap="btnDropChange(0)">
						排序 <image
							style="width: 20rpx;height: 16rpx;margin-left: 4rpx;" src="@/static/index/shop/down.png" mode=""
						></image>
					</view>
					<view class="tui-top-item" @tap="btnDropChange(1)">
						排序条件 <image
							style="width: 20rpx;height: 16rpx;margin-left: 4rpx;" src="@/static/index/shop/down.png" mode=""
						></image>
					</view>
					<view class="tui-top-item" @tap="btnDropChange(2)">
						<view>是否新品</view>
						<image style="width: 20rpx;height: 16rpx;margin-left: 4rpx;" src="@/static/index/shop/down.png" mode="">
						</image>
						<!-- 	<view class="tui-price-arrow">
							<view class="tui-icon-box tui-arrow-up">
							<tui-icon name="turningup" :size="12" color="#444"></tui-icon>
							</view>
							<view class="tui-icon-box tui-arrow-down">
							<tui-icon name="turningdown" :size="12" color="#444"></tui-icon>
							</view>
							</view> -->
					</view>
					<view class="tui-top-item tui-screen" @tap="screen">
						<text class="tui-bold">筛选</text>
						<tui-icon name="screen" :size="12" color="#5677fc" :bold="true"></tui-icon>
					</view>
				</view>
			</view>
			<tui-top-dropdown :show="dropShow" :height="0" :translatey="translatey" @close="btnCloseDrop">
				<scroll-view class="tui-scroll-box" scroll-y scroll-with-animation :scroll-top="scrollTop">
					<view
						v-for="(item, index) in proDropData.list" :key="index" class="tui-drop-item"
						:class="[ item.selected ? 'tui-bold' : '' ]" :data-index="index" @tap.stop="btnSelected($event, item)"
					>
						<text class="tui-ml tui-middle">{{ item.name }}</text>
						<tui-icon
							v-if="index == proDropData.listActiveIndex" name="check" :size="16" color="#5677fc"
							:bold="true"
						></tui-icon>
					</view>
				</scroll-view>
				<!-- <view class="tui-drop-btnbox">
					<view class="tui-drop-btn tui-button-white" hover-class="tui-button-white_hover" :hover-stay-time="150" @tap="reset">重置</view>
					<view class="tui-drop-btn tui-button-primary" hover-class="tui-button-hover" :hover-stay-time="150" @tap="btnCloseDrop">确定</view>
					</view> -->
			</tui-top-dropdown>
			<!-- header 顶部下拉选择框 -->
			<view class="goods-wrapper">
				<scroll-view scroll-x="true" class="goodsScoll">
					<view class="sub-menus">
						<view
							v-for="item in submenus" :key="item.id" class="item" :class="{ active: query.categoryId == item.id }"
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
import {
	menus
} from './data'
import {
	getTypeDetailList
} from '@/api/home'
import {
	goodsListApi
} from '@/api/goods'
export default {
	data() {
		return {
			menus: Object.freeze(menus),
			currentMenu: 1001002,
			// translatey: uni.upx2px(650),
			translatey: 358,
			menusItemId: '',
			submenus: [],
			proDropList: [{
				listName: '排序',
				paramsKey: 'order',
				paramsVallue: '',
				listActiveIndex: 0,
				list: [{
					name: '升序',
					params: 'asc'
				}, {
					name: '降序',
					params: 'desc'
				}]
			}, {
				name: '排序条件',
				paramsKey: 'sort',
				paramsVallue: 'retail_price',
				listActiveIndex: 0,
				list: [ {
					name: '价格',
					params: 'retail_price'
				} ]
			}, {
				name: '新品',
				paramsKey: 'isNew',
				paramsVallue: '',
				listActiveIndex: 0,
				list: [{
					name: '开启新品筛选',
					params: 'true'
				}, {
					name: '关闭新品筛选',
					params: 'false'
				}]
			}],
			proDropData: [],
			proDropIndex: -1,
			dropShow: false,
			scrollTop: 0,
			query: {
				page: 1,
				size: 20,
				categoryId: '',
				isNew: '',
				order: '',
				sort: ''
			},
			totalPages: 0,
			goodsList: [],
			status: 'none'
		}
	},
	onLoad(options) {
		if (options.sub) {
			this.currentMenu = options.sub
			this.menusItemId = 'menusItem' + options.sub
			console.log(this.menusItemId)
			this.query.categoryId = options.id
		}
		this.getSubMenus()
	},
	methods: {
		handleBack() {
			uni.navigateBack()
		},
		btnDropChange(index) {
			this.proDropData = this.proDropList[index]
			this.proDropIndex = index
			this.dropShow = true
			this.dropdownShow = false
		},
		btnSelected(e, item) {
			// isNew: "",
			// order: "",
			// sort: ""
			const index = e.currentTarget.dataset.index
			this.proDropData.listActiveIndex = index
			this.proDropData.paramsVallue = item.params
			this.query.isNew = this.proDropList[2].paramsVallue
			this.query.order = this.proDropList[0].paramsVallue
			this.query.sort = this.proDropList[1].paramsVallue
			// console.log(this.query)
			this.getGoods()
		},
		reset() {
			const arr = this.proDropData.list
			for (const item of arr) {
				item.selected = false
			}
			this.proDropData.list = arr
		},
		btnCloseDrop() {
			this.scrollTop = 1
			this.$nextTick(() => {
				this.scrollTop = 0
			})
			this.dropShow = false
			this.proDropIndex = -1
			this.reset()
		},
		screen() {
			// this.tui.xxx 等api 查看【快速上手】文档使用
			uni.showLoading({
				title: '该筛选功能暂时未开放',
				icon: 'none'
			})
		},
		// 选择一级??
		async handleChooseMenu(item) {
			this.currentMenu = item.id
			this.goodsList = []
			const {
				data
			} = await getTypeDetailList({
				id: this.currentMenu
			})
			this.submenus = data.currentSubCategory
			this.query.categoryId = data.currentSubCategory[0].id
			this.query.page = 1
			this.getGoods()
		},
		async getSubMenus() {
			const {
				data
			} = await getTypeDetailList({
				id: this.currentMenu
			})
			this.submenus = data.currentSubCategory
			// this.query.categoryId = data.currentSubCategory[0].id
			// this.query.page = 1
			this.getGoods()
		},
		// 获取商品列表
		async getGoods(isLoadmore) {
			this.status = 'loading'
			const {
				data
			} = await goodsListApi(this.query)
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
		// console.log(e)
		this.scrollTop = e.scrollTop
		if (e.scrollTop > 158) {
			this.translatey = 70
		} else {
			this.translatey = 358 - this.scrollTop * 2
		}
		// console.log(e.scrollTop)
		// console.log(this.translatey)
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
.stic-top {
	z-index: 1;
	width: 100vw;
	position: fixed;
	top: 0;
	left: 0;
}

.shopContainer {
	width: 100vw;
	min-height: 100vh;
	background-color: #f3f3f3;
}

/*  uni-app style */
.search-header {
	background-color: #fff;
	position: relative;
	z-index: 1001;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10rpx;
	box-sizing: border-box;

	/deep/ .search-bar-container {
		flex: 1;
		margin-right: 15upx;
	}
}

.menus-wrapper {
	::-webkit-scrollbar {
		width: 0;
		height: 0 !important;
		color: transparent;
	}

	position: relative;
	z-index: 1001;
	box-sizing: border-box;
	white-space: nowrap;
	display: flex;
	align-items: center;
	padding: 10upx 20upx;
	background-color: #f3f3f3;

	.item {
		margin: 10rpx 0rpx;
		width: 120upx;
		height: 160upx;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		font-size: 24upx;
		// padding: 16upx 12upx;
		box-sizing: border-box;
		margin-right: 12upx;
		border-radius: 10upx;
		flex-shrink: 0;
		transition: all 350ms;
		background-color: #fff;

		&.active {
			box-shadow: 0px 2px 5px 1px rgba(175, 175, 175, 0.6);
		}
	}
}

.goods-wrapper {

	/* 隐藏scroll-view滚动条*/
	::-webkit-scrollbar {
		width: 0;
		height: 0 !important;
		color: transparent;
	}

	// margin-top: 66rpx;
	// padding: 18upx 20upx;
	padding-bottom: 0;
	box-sizing: border-box;
	background-color: #fff;
	padding: 10rpx 20rpx;
	.goodsScoll {
		// white-space: nowrap;
	}

	.sub-menus {
		white-space: nowrap;
		display: flex;
		align-items: center;
		// margin-top: 24upx;

		.item {
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

.tui-scroll-box {
	max-height: 624rpx;
}

.tui-drop-btnbox {
	display: flex;

	.tui-drop-btn {
		background-color: #fff;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		flex: 1;
	}

	.tui-button-primary {
		background-color: #5677fc;
	}
}

/*header*/
.tui-header {
	position: relative;
	width: 100%;
	z-index: 1000;
	// padding-top: 34rpx;
	padding: 20rpx 0rpx;
	/* box-shadow: 0 15rpx 10rpx -15rpx #f2f2f2; */
	box-sizing: border-box;
	background-color: #fff;
	// position: fixed;
	z-index: 1000;
}

.tui-header-top,
.tui-header-bottom {
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 26rpx;
	color: #333;
}

.tui-top-item {
	height: 26rpx;
	line-height: 26rpx;
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
}

.tui-topitem-active {
	position: relative;
	font-weight: bold;
}

.tui-topitem-active::after {
	content: '';
	position: absolute;
	width: 44rpx;
	height: 6rpx;
	background: #5677fc;
	border-radius: 6rpx;
	bottom: -10rpx;
	left: 50%;
	-webkit-transform: translateX(-50%);
	transform: translateX(-50%);
}

.tui-price-arrow {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 20rpx;
}

.tui-bottom-item .tui-icon-class,
.tui-screen .tui-icon-class {
	margin-left: 6rpx;
}

.tui-icon-box {
	line-height: 12px !important;
	padding: 0 !important;
	display: block !important;
	position: relative;
}

.tui-arrow-up {
	top: 5px;
}

.tui-arrow-down {
	top: -3px;
}

.tui-header-bottom {
	margin-top: 56rpx;
	height: 108rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
	font-size: 24rpx;
	align-items: flex-start;
	overflow: hidden;
}

.tui-bottom-text {
	line-height: 24rpx;
}

.tui-bottom-item {
	flex: 1;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 18rpx 12rpx;
	border-radius: 40rpx;
	box-sizing: border-box;
	background: #f2f2f2;
	margin-right: 20rpx;
	white-space: nowrap;
}

// .tui-bottom-item:last-child {
// 	margin-right: 0;
// }

.tui-btmItem-active {
	padding-bottom: 60rpx;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
}

.tui-bold {
	font-weight: bold;
}

.tui-active {
	color: #5677fc;
}

.tui-ml {
	margin-left: 6rpx;
}

.tui-middle {
	vertical-align: middle;
}

.tui-drop-item {
	box-sizing: border-box;
	padding: 0rpx 20rpx;
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
}

.tui-drop-item:active {
	background-color: #f3f3f3;
}

.tui-drop-item .tui-icon-class {
	vertical-align: middle;
}

/*header*/
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

// .top-dropdown {
// 	margin-top: 360rpx;
// 	padding: 0 40rpx;
// 	box-sizing: border-box;
// }
</style>
