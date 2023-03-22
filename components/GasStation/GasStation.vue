<template>
	<view class="gasstation">
		<view class="left">
			<view class="first">力牌加油站</view>
			<view class="second">龙峰北路1号</view>
			<view class="third">
				<view class="reduce">直降价</view>
				<view class="price-number">￥<text>6.80</text>/L</view>
			</view>
		</view>
		<view class="right">
			<view class="location">
				<image src="../../static/index/map-pin.png" mode="" />
				<view class="distance-list">
					<view class="number">3.5/km</view>
					<image src="../../static/index/logo.png" mode="" />
				</view>
			</view>
			<view class="order">立即加油</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "GasStation",
	props: {

	},
	data() {
		return {}
	},
	methods: {
	},
	created() { }
}
</script>

<style lang="less" scoped>
.gasstation {
	background: #FFFFFF;
	width: 100%;
	height: 210upx;
	border-radius: 20upx;
	display: flex;
	justify-content: space-between;
	padding: 0 28upx 0 18upx;
	box-sizing: border-box;
	margin-bottom: 16upx;
	.left {
		.first {
			font-size: 34upx;
			font-weight: 500;
			color: #000000;
			padding-top: 22upx;
		}

		.second {
			line-height: 48upx;
			font-size: 24upx;
			color: #000000;
			padding-bottom: 16upx;
		}

		.third {
			display: flex;
			align-items: center;
			.reduce {
				width: 88upx;
				height: 34upx;
				border-radius: 4upx;
				background: #FCDBDB;
				font-size: 24upx;
				color: #FD6363;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.price-number {
				color: #FD6363;

				text {
					font-size: 36upx;
					font-weight: 500;

				}
			}
		}
	}

	.right {
		.location {
			width: 156upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-top: 76upx;
			padding-bottom: 24upx;
			image {
				width: 28upx;
				height: 28upx;
				// margin-right: 6upx;
			}

			.distance-list {
				display: flex;
				align-items: center;
				background: #EFEFEF;
				width: 120upx;
				height: 34upx;

				.number {}

				image {
					width: 28upx;
					height: 28upx;
				}
			}
		}

		.order {
			
			background: #EFEFEF;
			width: 156upx;
			height: 48upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
			font-weight: 500;
			color: #000000;
		}
	}
}
</style>
