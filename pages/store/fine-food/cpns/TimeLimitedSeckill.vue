<template>
	<view class="time-limited-seckill-container">
		<view class="time-title-wrapper">
			<text class="time-title">限时秒杀</text>
			<view class="count-down">
				<text>距结束</text>
				<text>01:12:12</text>
			</view>
		</view>

		<view class="time-goods-list">
			<view class="item">
				<BeeAvatar :size="60" radius="10rpx" :src="common.seamingImgUrl('alo7i1qewcuj4305mrr3.png')"></BeeAvatar>

				<view class="info">
					<view class="name"> 蜜雪冰城 </view>
					<view class="op-desc"> 【2人份】蜜雪冰城 </view>
					<view class="price-wrapper">
						<text class="now-price">￥18</text>
						<text class="old-price">￥30</text>
					</view>
				</view>
			</view>

			<view class="item">
				<BeeAvatar :size="60" radius="10rpx" :src="common.seamingImgUrl('alo7i1qewcuj4305mrr3.png')"></BeeAvatar>

				<view class="info">
					<view class="name"> 麦当劳 </view>
					<view class="op-desc"> 【2人份】麦当劳 </view>
					<view class="price-wrapper">
						<text class="now-price">￥6</text>
						<text class="old-price">￥10</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.time-limited-seckill-container {
	padding: 32upx 26upx 20upx 26upx;
	box-sizing: border-box;
	background: linear-gradient(122deg,
			#fcdbdb 3%,
			rgba(255, 255, 255, 0.55),
			rgba(255, 255, 255, 0.55),
			rgba(255, 255, 255, 0.55),
		);
	border-radius: 20upx;

	.time-title-wrapper {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		height: 40upx;

		.time-title {
			font-size: 32upx;
			font-weight: 500;
			color: #000;
			margin-right: 8upx;
		}

		.count-down {
			border-radius: 6upx;
			overflow: hidden;
			border: 1upx solid #fa5151;
			box-sizing: border-box;
			height: 40upx;

			text {
				display: inline-block;
				line-height: 40upx;
				position: relative;
				top: -4upx;

				&:nth-child(1) {
					color: #fff;
					font-size: 24upx;
					padding: 0 22upx 0 15upx;
					border-radius: 0 0 20upx 0;
					border-right: none;
					background: linear-gradient(289deg, #fa5151 13%, #ff3484 99%);
				}

				&:nth-child(2) {
					color: #ff3484;
					font-size: 24upx;
					padding: 0 22upx 0 15upx;
					border-radius: 0 0 20upx 0;
					border-right: none;
				}
			}
		}
	}

	.time-goods-list {
		margin-top: 20upx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.item {
			display: flex;
			align-items: center;

			.info {
				margin-left: 8upx;
				font-size: 24upx;

				.name {
					color: #3d3d3d;
					font-weight: 500;
					width: 200upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.op-desc {
					color: #999999;
					width: 200upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.price-wrapper {
					.now-price {
						color: #fa5151;
					}

					.old-price {
						font-size: 24upx;
						color: #999;
						text-decoration: line-through;
						margin-left: 6upx;
					}
				}
			}
		}
	}
}
</style>
