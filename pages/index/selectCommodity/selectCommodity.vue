<template>
	<view class="selectCommodityView">
		<view class="search-header">
			<image
				src="../../../static/images/user/back.png"
				style="width: 30rpx;height: 60rpx;margin-left:20rpx;margin-right: 20rpx;" mode="" @click="goBack"
			></image>
			<BeeLocale style="margin-right: 30rpx;"></BeeLocale>
			<SearchBar prevent @click="go('/pages/search-page/search-page')"></SearchBar>
			<!-- <PhotoSearch></PhotoSearch> -->
		</view>
		<view class="selectScollView">
			<scroll-view scroll-y="true" class="superSelect">
				<view v-for="(item, index) in menus" :key="item.id" class="superSelectItem" @click="getSubItem(item, index)">
					<span :class="{ isactive: submenusActive == index }">{{ item.name }}</span>
				</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="subSelect">
				<view v-for="item in submenus" class="subSelectItem" @click="goToShopList(item)">
					<image :src="item.picUrl ? common.seamingImgUrl(item.picUrl) : require('@/static/index/menus/kongtupian.png')" mode=""></image>
					<text>{{ item.name }}</text>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import { getTypeDetailList } from '@/api/home'
export default {
	data() {
		return {
			menus: Object.freeze([
				{
					name: '日用百货',
					icon: require('@/static/index/shop/baihuo.png'),
					id: 1001009
				},
				{
					name: '巨蜂特惠',
					icon: require('@/static/index/shop/tehui.png'),
					id: 1001002
				},
				{
					name: '餐厅家具',
					icon: require('@/static/index/shop/cantingjiaju.png'),
					id: 100101595
				},
				{
					name: '卧室家具',
					icon: require('@/static/index/shop/woshijiaju.png'),
					id: 100101582
				},
				{
					name: '客厅家具',
					icon: require('@/static/index/shop/ketingjiaju.png'),
					id: 100101559
				},
				{
					name: '箱包首饰',
					icon: require('@/static/index/shop/xiangbao.png'),
					id: 1001013
				},
				{
					name: '家电',
					icon: require('@/static/index/shop/el.png'),
					id: 100101466
				},
				{
					name: '功能家具',
					icon: require('@/static/index/shop/gongnengjiaju.png'),
					id: 100101685
				},
				{
					name: '户外庭院',
					icon: require('@/static/index/shop/huwaitingyuan.png'),
					id: 100101676
				},
				{
					name: '全屋组合',
					icon: require('@/static/index/shop/quanwuzuhe.png'),
					id: 100101668
				},
				{
					name: '饰品专区',
					icon: require('@/static/index/shop/shipingzhuanqu.png'),
					id: 100101662
				},
				{
					name: '书房家具',
					icon: require('@/static/index/shop/shufangjiaju.png'),
					id: 100101651
				},
				{
					name: '壁画专区',
					icon: require('@/static/index/shop/bihuazhuanqu.png'),
					id: 100101643
				},
				{
					name: '红木家具',
					icon: require('@/static/index/shop/hongmujiaju.png'),
					id: 100101638
				},
				{
					name: '灯饰专区',
					icon: require('@/static/index/shop/dengshizhuanqu.png'),
					id: 100101627
				},
				{
					name: '办公家具',
					icon: require('@/static/index/shop/bangongjiaju.png'),
					id: 100101614
				},
				{
					name: '儿童专区',
					icon: require('@/static/index/shop/ertongzhuanqu.png'),
					id: 100101604
				}
			]),
			currentFilterMenuId: '',
			submenus: [],
			submenusActive: 0
		}
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
		getSubItem(item, index) {
			this.submenusActive = index
			this.currentFilterMenuId = item.id
			this.getSubMenus()
		},
		async getSubMenus() {
			const { data } = await getTypeDetailList({ id: this.currentFilterMenuId })
			// const { data } = await getTypeDetailList({ id: this.currentFilterMenuId })
			this.submenus = data.currentSubCategory || []
		},
		goToShopList(item) {
			// console.log(item)
			uni.navigateTo({
				url: `/pages/index/shop/shop?id=${item.id}&sub=${this.currentFilterMenuId}`
			})
		}
	},
	onLoad() {
		this.currentFilterMenuId = this.menus[0].id
		this.getSubMenus()
	}
}
</script>

<style lang="scss">
.selectCommodityView {
	.search-header {
		box-sizing: border-box;
		padding: 20rpx 10rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		// padding: 46upx 22upx 0 22upx;
		/deep/ .search-bar-container {
			flex: 1;
			margin-right: 15upx;
		}
	}

	// 商品类别筛选
	.selectScollView {
		width: 100vw;
		height: auto;
		display: flex;

		.superSelect {
			min-height: 94vh;
			max-height: 94vh;
			overflow: hidden;
			width: 22%;

			.superSelectItem {
				display: flex;
				justify-content: center;
				width: 100%;
				height: 100rpx;
				color: #3d3d3d;
				text-align: center;
				transition: all .1s;

				>span {
					border-radius: 15rpx;
					font-size: 28rpx;
					min-width: 120rpx;
					height: 30rpx;
					line-height: 30rpx;
					padding: 10rpx 11rpx;
					margin-top: 10rpx;
				}

				.isactive {
					background: linear-gradient(270deg, #e95d20, #faae63 99%);
					color: #fff;
				}
			}
		}
	}

	.subSelect {
		flex: 1;
		min-height: 94vh;
		max-height: 94vh;
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding-top: 10rpx;
		border-top-left-radius: 10rpx;
		border-top: 16rpx solid #f1f2f6;
		border-left: 12rpx solid #f1f2f6;

		.subSelectItem {
			display: inline-flex;
			align-items: center;
			flex-direction: column;
			width: 33.33333%;
			height: 200rpx;

			// background-color: aqua;
			>image {
				width: 110rpx;
				height: 110rpx;
			}

			>text {
				margin-top: 10rpx;
			}
		}
	}
}
</style>
