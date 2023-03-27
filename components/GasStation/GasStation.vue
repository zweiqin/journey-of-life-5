<template>
	<view class="gasstation">
		<view class="first">钢铁世界加油站</view>
		<view class="second">
			<view class="address">顺德区乐从镇钢铁世界大道38号</view>
			<view class="location">
				<image src="../../static/index/map-pin.png" mode="" />
				<view class="distance-list">
					<view class="number">6.2/km</view>
					<view class="image">
						<image src="../../static/index/logo.png" mode="" class="logo" />
					</view>
				</view>
			</view>
		</view>
		<view class="third">
			<view class="reduce-list">
				<view class="reduce">直降价</view>
				<view class="price-number">￥<text>7.08</text>/L</view>
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
	padding: 0 28upx 0 18upx;
	box-sizing: border-box;
	margin-bottom: 16upx;

	.first {
		font-size: 34upx;
		font-weight: 500;
		line-height: 48upx;
		color: #000000;
		padding-top: 22upx;
	}

	.second {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.address {
			line-height: 48upx;
			font-size: 24upx;
			color: #000000;
			// padding-bottom: 16upx;
		}

		.location {
			width: 156upx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			// padding-top: 76upx;
			// padding-bottom: 24upx;
			image {
				width: 28upx;
				height: 28upx;
				// margin-right: 6upx;
			}

			.distance-list {
				display: flex;
				align-items: center;
				justify-content: center;
				background: #EFEFEF;
				width: 120upx;
				height: 34upx;

				.number {
					font-size: 24upx;
					color: #000000;
					// line-height: 0;
				}

				.image {
					width: 28upx;
					height: 28upx;

					.logo {
						width: 28upx;
						height: 28upx;
					}
				}
			}
		}
	}

	.third {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 20upx;
		.reduce-list {
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
				font-size: 24upx;
				font-weight: 400;
				padding-left: 12upx;
				text {
					font-size: 36upx;
					font-weight: 500;

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
