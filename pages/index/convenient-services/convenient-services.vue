<template>
	<view class="convenient-services-container">
		<!-- 顶部位置 -->
		<view class="header">
			<tui-icon name="arrowleft" color="#000" @click="handleBack"></tui-icon>
			<BeeLocale style="flex: 1">
				<view class="address-wrapper">
					<view class="current-addresss">位置：{{ $store.getters.currentLocation }}</view>
					<BeeIcon :src="require('../../../static/index/bianmin/location.png')" :size="24"></BeeIcon>
				</view>
			</BeeLocale>
		</view>

		<!-- 搜索框 -->
		<SearchBar></SearchBar>

		<!-- 中间轮播图 -->
		<view class="banner-wrapper">
			<image src="../../../static/index/ban1.png" mode="" />
		</view>
		<view class="mid">
			<view class="bar-list">
				<view class="bar" v-for="item in items" :key="item.id">
					<image :src="item.icon" mode="" @click="go(item.url)" />
					<view class="text">{{ item.name }}</view>
				</view>

			</view>
			<view class="coupon-list">
				<view class="coupon" v-for="item in coupons" :key="item.id">
					<image :src="item.icon" mode="" />
				</view>
			</view>
		</view>
		<!-- <view class="text-list">
			<view class="left">精选</view>
			<view class="right">换一批</view>
		</view>
		<GasStation></GasStation>
		<GasStation></GasStation>
		<GasStation></GasStation>
		<GasStation></GasStation> -->
	</view>
</template>

<script>
import { items, coupons } from './data'
export default {
	data() {
		return {
			items,
			coupons
		}
	},
	methods: {
		handleBack() {
			uni.switchTab({
				url: '/pages/index/index',
			})
		}
	},
}
</script>

<style lang="less" scoped>
.convenient-services-container {
	width: 100%;
	min-height: 100vh;
	padding: 20upx;
	box-sizing: border-box;
	background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 10%);



	.header {
		width: 100%;
		display: flex;
		align-items: center;

		.address-wrapper {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.current-addresss {
				font-size: 32upx;
				font-weight: 500;
			}
		}
	}

	.banner-wrapper {
		padding: 28upx 0;

		image {
			width: 100%;
			height: 200upx;
			border-radius: 20upx;
		}
	}

	.mid {
		padding: 0upx 22upx;
		border-radius: 20upx 20upx 0upx 0upx;
		background: linear-gradient(180deg, #FFFFFF 0%, #FDFAFA 122%);

		.bar-list {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 44upx 0 68upx 0;

			.bar {
				width: 112upx;
				display: flex;
				flex-direction: column;
				align-items: center;

				image {
					width: 80upx;
					height: 80upx;
				}

				.text {
					font-size: 28upx;
					color: #000000;
				}
			}
		}

		.coupon-list {
			display: flex;
			justify-content: space-between;
			padding-bottom: 30upx;

			.coupon {
				image {
					width: 152upx;
					height: 192upx;
				}
			}
		}
	}

	.text-list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 28upx 20upx 30upx 20upx;

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
}
</style>
