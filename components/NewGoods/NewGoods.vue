<template>
	<view
		v-if="data" class="goods-container" :style="{ width: width * 2 + 'upx' }"
		@click="go('/pages/prod/prod?goodsId=' + data.id)"
	>
		<tui-lazyload-img
			width="100%" :height="height" mode="scaleToFill" radius="20rpx 20rpx 0 0"
			:src="common.seamingImgUrl(data.picUrl)"
		></tui-lazyload-img>

		<view class="goods-info">
			<view class="goods-name hiden-text">
				{{ data.name }}
			</view>

			<view v-if="showTags" class="tags">
				<view class="tag">七天无理由退货</view>
				<view class="tag">品牌正品</view>
			</view>

			<view v-if="showDetailBtn" class="item">
				<view class="price-text">
					￥<text>{{ data.counterPrice }}</text>
				</view>
				<button class="bee-btn">查看详情</button>
			</view>
			<view v-else>
				<view class="price-text">
					￥<text>{{ data.counterPrice }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		width: {
			type: Number,
			default: 174
		},
		height: {
			type: String,
			default: '300rpx'
		},

		data: {
			type: Object,
			required: true
		},

		showTags: {
			type: Boolean,
			default: true
		},

		showDetailBtn: {
			type: Boolean,
			default: true
		}
	}
}
</script>

<style lang="less" scoped>
.goods-container {
	// border-radius: 20upx;
	// overflow: hidden;
	background-color: #fff;

	.goods-info {
		padding: 14upx 22upx;
		box-sizing: border-box;
		background-color: #fff;

		.goods-name {
			color: #3d3d3d;
			font-size: 24upx;
		}
		.price-text {
			color: #fa5151;
			font-weight: bold;

			text {
				font-size: 36upx;
			}
		}
	}

	.tags {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		font-size: 20upx;
		color: #777;
		margin: 12upx 0 26upx 0;

		.tag {
			padding: 2upx 6upx;
			border: 1upx solid #777;
			white-space: nowrap;
			border-radius: 10upx;
			font-size: 20upx;

			&:nth-child(1) {
				margin-right: 20upx;
			}
		}
	}

	.item {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.bee-btn {
			color: #fff;
			font-size: 24upx;
			background-color: #fa5151;
			padding: 6upx 14upx;
			border-radius: 10upx;
		}
	}
}
</style>
