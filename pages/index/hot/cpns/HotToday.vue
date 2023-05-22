<template>
	<view class="hot-today-container">
		<!-- s暂时隐藏 -->
		<!-- <view class="item">
			<view class="title-wrapper">
			<view class="left">
			<image class="title" src="../../../../static/index/hot/today.png" mode="" />
			<view class="tag">巨蜂特惠</view>
			</view>
			</view>

			<view class="goods-list">
			<image src="../../../../static/index/hot/image.png" mode="" />
			<image src="../../../../static/index/hot/image (2).png" mode="" />
			</view>
			</view>
			<view class="item">
			<view class="title-wrapper">
			<view class="left">
			<image class="title" src="../../../../static/index/hot/guan.png" mode="" />
			<view class="tag">巨蜂特惠</view>
			</view>

			<view class="more">
			更多<image class="more-icon" src="../../../../static/index/hot/arrow.png"></image>
			</view>
			</view>

			<view class="goods-list">
			<image src="../../../../static/index/hot/image (3).png" mode="" />
			<image src="../../../../static/index/hot/image (4).png" mode="" />
			</view>
			</view> -->
		<!-- e暂时隐藏 -->
	</view>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.hot-today-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20upx 20upx 60upx 20upx;
	box-sizing: border-box;
	width: 100%;
	// <!-- s暂时隐藏 -->
	// height: 440upx;
	// <!-- e暂时隐藏 -->
	background: radial-gradient(102% 98% at 71% 44%, #ffb773 0%, #ff2c0f 100%);

	.item {
		width: 344upx;
		height: 288upx;
		background-color: #fff;
		border-radius: 20upx;
		padding: 18upx 14upx;
		box-sizing: border-box;

		.title-wrapper {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;
				justify-content: flex-start;

				.title {
					width: 90upx;
					height: 34upx;
					flex-shrink: 0;
				}

				.tag {
					font-size: 20upx;
					color: #fff;
					padding: 0 10upx;
					border-radius: 4upx;
					background: linear-gradient(270deg, #eb2f96 0%, #fa5151 100%);
					margin-left: 8upx;
				}
			}

			.more {
				display: flex;
				align-items: center;
				color: #777;

				.more-icon {
					width: 28upx;
					height: 28upx;
				}
			}
		}

		.goods-list {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 20upx;

			image {
				width: 160upx;
				height: 200upx;
			}
		}
	}
}
</style>
