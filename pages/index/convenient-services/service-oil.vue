<template>
	<view class="phone-bill">
		<view class="header">
			<tui-icon name="arrowleft" color="#000" @click="handleBack"></tui-icon>
			<BeeAddress>
				<view class="address-wrapper">
					<view class="current-addresss">位置：广东省佛山市</view>
					<BeeIcon :src="require('../../../static/index/bianmin/location.png')" :size="24"></BeeIcon>
				</view>
			</BeeAddress>
		</view>
		<SearchBar></SearchBar>
		<view class="banner-wrapper">
			<image src="../../../static/index/ban1.png" mode="" />
		</view>
		<view class="mid">
			<view class="bar-list">
				<view class="bar" v-for="test in tests" :key="test.id">
					<image :src="test.icon" mode="" />
					<view class="text">{{ test.name }}</view>
				</view>
			</view>
			<!-- <view class="coupon-list">
				<view class="coupon" v-for="item in coupons" :key="item.id">
					<image :src="item.icon" mode="" />
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
import { items, coupons ,tests } from './data'
export default {
	name: "Phone-bill",
	props: {

	},
	data() {
		return {
			items,
			coupons,
			tests,
		}
	},
	methods: {
		handleBack() {
			uni.navigateTo({ url: '/pages/index/convenient-services/convenient-services' })
		}
	},
	created() { }
}
</script>

<style lang="less" scoped>
.phone-bill {
	width: 100%;
	min-height: 100vh;
	padding: 20upx;
	box-sizing: border-box;
	background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 10%);

	.header {
		width: 100%;
		display: flex;
		align-items: center;

		/deep/ .bee-address-container {
			flex: 1;
		}

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
}
</style>
