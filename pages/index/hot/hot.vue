<template>
	<view class="hot-container">
		<Banner></Banner>

		<view class="navs">
			<view v-for="item in navs" :key="item.value" class="item" :class="{ active: currentNav === item.value }">
				{{ item.name }}
			</view>
		</view>

		<view class="goods-wrapper">
			<GoodsFilter></GoodsFilter>
			<view class="goods-list">
				<HotGoods v-for="goods in $data._list" :key="goods.id" :data="goods"></HotGoods>

				<LoadMore :status="$data._status"></LoadMore>
			</view>
		</view>
	</view>
</template>

<script>
import Banner from './cpns/banner.vue'
import HotGoods from './cpns/HotGoods.vue'
import loadMore from '../../../mixin/loadData'
import { goodsListApi } from '../../../api/goods'

export default {
	name: 'Hot',
	components: {
		Banner,
		HotGoods
	},

	mixins: [ loadMore({ api: goodsListApi }) ],

	onLoad() {
		this._loadData()
	},

	data() {
		return {
			currentNav: 0,
			navs: Object.freeze([
				{
					name: '全部爆款',
					value: 0
				}
			])
		}
	}
}
</script>

<style lang="less" scoped>
.hot-container {
	width: 100vw;
	min-height: 100vh;

	.navs {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		width: 100%;
		height: 160upx;
		border-radius: 40upx 40upx 0 0;
		background: linear-gradient(180deg,#ffffff 0%,#ffe5cc 5%,#ffe5cc 1%,#fff);
		margin-top: 10upx;
		padding: 24upx 48upx;
		box-sizing: border-box;

		.item {
			position: relative;
			height: 34upx;
			font-size: 32upx;
			color: #3d3d3d;

			&::after {
				transition: all 350ms;
			}

			&.active {
				color: #fa5151;
				font-weight: bold;

				&::after {
					content: '';
					position: absolute;
					display: block;
					left: 50%;
					bottom: -26upx;
					background: url('../../../static/index/hot/active.png') no-repeat;
					background-size: cover;
					width: 40upx;
					height: 16upx;
					transform: translateX(-50%);
				}
			}
		}
	}

	.goods-wrapper {
		border-radius: 40upx 40upx 0 0;
		width: 100%;
		padding: 22upx 20upx;
		box-sizing: border-box;
		margin-top: -76upx;
		background: linear-gradient(180deg, #ffffff 4%, #f6f6f6 9%);
	}

	.goods-list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-top: 20upx;

		/deep/ .hot-goods-container {
			margin-bottom: 20upx;
		}
	}
}
</style>
