<template>
	<view class="store-detail" style="padding-bottom: 100upx">
		<view class="search-bar">
			<JLocale></JLocale>
			<input type="text" />
			<img class="location" src="../../static/images/store/search.png" alt="" />
		</view>

		<view class="banner">
			<swiper
				ref="swipperRef" class="swiper" indicator-dots autoplay
				indicator-color="#fff"
				indicator-active-color="#fff"
			>
				<swiper-item>
					<img
						src="https://img0.baidu.com/it/u=3866459166,2693507635&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667"
						alt=""
					/>
				</swiper-item>
				<swiper-item>
					<img
						src="https://img2.baidu.com/it/u=2075742647,1178517082&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=428"
						alt=""
					/>
				</swiper-item>
				<swiper-item>
					<img
						src="https://img2.baidu.com/it/u=3592206539,1858276708&fm=253&fmt=auto&app=138&f=JPEG?w=600&h=354"
						alt=""
					/>
				</swiper-item>
			</swiper>
		</view>

		<scroll-view scroll-x="true">
			<view class="navs">
				<view
					v-for="(item, index) in storeLabelList" :key="item.id" class="item"
					:class="{ active: currentActive === index }" @click="handleChangeCurrentPane(index, id)"
				>
					{{ item.storeName }}
				</view>
			</view>
		</scroll-view>

		<view class="store-list">
			<view class="header">
				<ActivePane></ActivePane>
				<ActivePane type="recommend"></ActivePane>
			</view>

			<view v-if="data.length">
				<!-- <JStorePane
					:scrollTop="scrollTop"
					v-for="(item, index) in data"
					:storeInfo="item"
					:key="index"
					></JStorePane> -->
				<view class="storeBackground">
					<JStorePane v-for="item in data" :key="item.id" :store-info="item"></JStorePane>
				</view>
			</view>
			<JNoData v-else text="暂无门店信息" type="store"></JNoData>
		</view>
	</view>
</template>

<script>
import ActivePane from './components/active-pane.vue'

import { getStoreAndGoods } from '../../api/store'
import { delayedLoginStatus } from '../../utils'

export default {
	components: {
		ActivePane
	},

	onLoad() {
		this.getStoreList()
		delayedLoginStatus()
	},

	onShow() { },

	data() {
		return {
			storeLabelList: [
				{
					storeName: '综合',
					id: 0
				},
				{
					id: 14,
					storeName: '附近美食',
					addTime: '2022-10-31 11:41:35',
					updateTime: '2022-10-31 11:41:35',
					deleted: false
				},
				{
					id: 21,
					storeName: '美甲美睫',
					addTime: '2022-10-31 11:43:50',
					updateTime: '2022-10-31 11:43:50',
					deleted: false
				},
				{
					id: 20,
					storeName: '运动健身',
					addTime: '2022-10-31 11:43:38',
					updateTime: '2022-10-31 11:43:38',
					deleted: false
				},
				{
					id: 19,
					storeName: '亲子',
					addTime: '2022-10-31 11:43:26',
					updateTime: '2022-10-31 11:43:26',
					deleted: false
				},
				{
					id: 18,
					storeName: '住宿',
					addTime: '2022-10-31 11:43:16',
					updateTime: '2022-10-31 11:43:16',
					deleted: false
				},
				{
					id: 17,
					storeName: '丽人/美发',
					addTime: '2022-10-31 11:43:05',
					updateTime: '2022-10-31 11:43:05',
					deleted: false
				},
				{
					id: 16,
					storeName: '游玩',
					addTime: '2022-10-31 11:42:34',
					updateTime: '2022-10-31 11:42:34',
					deleted: false
				},
				{
					id: 15,
					storeName: '休闲娱乐',
					addTime: '2022-10-31 11:42:22',
					updateTime: '2022-10-31 11:42:22',
					deleted: false
				}
			],
			currentActive: 0,

			query: {
				brandgenreId: null,
				page: 1,
				size: 10
			},

			totalPage: 0,

			data: [],
			loadingStatus: 'hidden',
			scrollTop: 0
		}
	},

	computed: {
		homeStores() {
			if (this.data.length) {
				return this.data.filter((item) => item.goodsList && item.goodsList.length >= 1)
			}

			return []
		}
	},

	methods: {
		// 切换门店类型
		handleChangeCurrentPane(index) {
			this.currentActive = index
			const store = this.storeLabelList[index]
			if (store.id === 0) {
				this.query.brandgenreId = null
			} else {
				this.query.brandgenreId = store.id
			}
			this.query.page = 1
			this.getStoreList()
		},

		// 获取门店列表
		getStoreList(isMore) {
			const _this = this
			getStoreAndGoods(this.query).then(({ data }) => {
				_this.totalPage = data.totalPage
				if (isMore) {
					_this.data.push(data.brandList.filter((item) => item.goodsList && item.goodsList.length >= 1))
				} else {
					_this.data = data.brandList.filter((item) => item.goodsList && item.goodsList.length >= 1)
				}
				console.log(_this.data)
			})
		}
	},

	onReachBottom() {
		if (this.query.page >= this.totalPage) {
			this.loadingStatus = 'noMore'
			return
		}

		if (this.query.size > this.data.length) {
			return
		}

		this.page++
		this.getStoreList(true)
	},

	onPageScroll(scrollTop) {
		this.scrollTop = scrollTop.scrollTop
	}
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";

.search-bar {
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: absolute;
	width: 95%;
	height: 72upx;
	top: 54upx;
	left: 50%;
	padding: 16upx 24upx;
	transform: translateX(-50%);
	background-color: #fff;
	color: #000000;
	font-size: 24upx;
	border-radius: 50upx;
	z-index: 200;

	.local-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.locale {
			padding: 0 10upx;
			border-right: 1px solid #ccc;
		}
	}

	.location {
		width: 40upx;
	}

	input {
		flex: 1;
		padding: 0 30upx;
	}
}

.banner {
	width: 100%;
	height: 552upx;
	border-radius: 0 0 40upx 40upx;
	transition: all 350ms 100ms;
	overflow: hidden;

	.swiper {
		width: 100%;
		height: 552upx;
		transition: all 350ms;
		border-radius: 0 0 40upx 40upx;

		/deep/ .uni-swiper-dot-active {
			border-radius: 0;
			width: 40upx !important;
		}

		/deep/ .uni-swiper-dot {
			border-radius: 0px;
			height: 4upx;
			width: 4upx;
			margin-right: 6upx;
		}

		img {
			width: 100%;
			height: 552upx;
		}
	}
}

.navs {
	display: flex;
	padding: 0 16upx;
	box-sizing: border-box;
	font-size: 28upx;
	overflow-x: scroll;
	height: 100%;
	margin-bottom: -22upx;

	.item {
		white-space: nowrap;
		margin-right: 96upx;
		color: #3d3d3d;
		height: 40upx;
		line-height: 40upx;
		padding: 20upx 0;
		border-bottom: 2upx solid transparent;

		&.active {
			color: #fa5151;
			font-weight: bold;
		}
	}
}

.j-tabs {
	box-sizing: border-box;
	padding: 0 16upx;
	margin-bottom: -30upx;

	/deep/ .item {
		font-size: 24upx;
	}

	/deep/ .item-active {
		font-weight: bold;
	}
}

.list-wrapper {
	padding: 0 22upx 22upx 22upx;
	box-sizing: border-box;
}

/deep/ .scroll-wrapper-container {
	justify-content: space-between;
}

.active-pane {
	width: 100%;
	.flex();
	margin-bottom: 20upx;
}

.store-list {
	box-sizing: border-box;

	.header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20upx;
	}

	.storeBackground {
		background: #EFEFEF;
	}
}

.no-data {
	width: 100%;
	height: 200upx;
	text-align: center;
	line-height: 200upx;
	color: #b9b9b9;
}
</style>
