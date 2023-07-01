<template>
	<view v-if="goodsData" class="store-goods-container">
		<view style="max-height: 440upx;min-height: 120upx;overflow: hidden;">
			<tui-lazyload-img
				class="goods-img" mode="widthFix"
				width="210rpx" height="auto" :src="common.seamingImgUrl(goodsData.picUrl)" @click="$emit('click-content', goodsData)"
			></tui-lazyload-img>
		</view>

		<view style="flex: 1;width: 0;padding: 0 20upx;font-size: 32upx;">
			<view class="store-goods-name" @click="$emit('click-content', goodsData)">
				{{ goodsData.name }}
			</view>

			<view @click="$emit('click-content', goodsData)">
				<view v-if="showMsg" style="display: flex;justify-content: space-between;padding: 14upx 0 0;font-size: 26upx;color: #777777;">
					<text>{{ goodsData.browse }}浏览量</text>
					<text>销量 {{ goodsData.sales }}</text>
				</view>
				<view v-if="showSn">商品编号：{{ goodsData.goodsSn }}</view>
			</view>

			<view class="time">
				<view class="wrapper" @click="$emit('click-content', goodsData)">
					<view class="price-wrapper">
						<text class="price-text">￥{{ goodsData.counterPrice }}</text>
						<text v-if="showTag && goodsData.isHot" class="price-tag">热卖</text>
					</view>
				</view>

				<BeeIcon
					v-if="showIcon" :size="28" :src="require('../../static/brand/detail/add-icon.png')"
					@click="$emit('add-car', goodsData)"
				></BeeIcon>
				<slot name="button"></slot>
			</view>
		</view>
	</view>
</template>

<script>
import { getRandom } from '../../utils'
export default {
	props: {
		goodsData: {
			type: Object,
			required: true
		},
		showIcon: {
			type: Boolean,
			default: true
		},
		showTag: {
			type: Boolean,
			default: true
		},
		showMsg: {
			type: Boolean,
			default: true
		},
		showSn: {
			type: Boolean,
			default: false
		}
	},

	methods: {
	}
}
</script>

<style lang="less" scoped>
.store-goods-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-bottom: 15upx;

	.store-goods-name {
		color: #3d3d3d;
		font-weight: bold;
		// width: 340upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.time {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		margin: 18upx 0;

		.wrapper {
			.price-text {
				color: #fa5151;
				font-weight: bold;
				font-size: 28upx;
			}

			.price-tag {
				padding: 0 10upx;
				border: 1upx solid #fa5151;
				font-size: 20upx;
				color: #fa5151;
				border-radius: 8upx;
				margin-left: 9upx;
			}
		}
	}
}
</style>
