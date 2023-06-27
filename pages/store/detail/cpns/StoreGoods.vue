<template>
	<view v-if="goodsData" class="store-goods-container">
		<view style="max-height: 440upx;min-height: 120upx;overflow: hidden;">
			<tui-lazyload-img
				class="goods-img" mode="widthFix"
				width="210rpx" height="auto" :src="common.seamingImgUrl(goodsData.picUrl)" @click="go(`/pages/store/goods-detail/goods-detail?goodsId=${goodsData.id}`)"
			></tui-lazyload-img>
		</view>

		<view style="flex: 1;width: 0;padding: 0 20upx;">
			<view class="store-goods-name">
				{{ goodsData.name }}
			</view>

			<view style="display: flex;justify-content: space-between;padding: 14upx 0 0;font-size: 26upx;color: #777777;">
				<text>{{ goodsData.browse }}浏览量</text>
				<text>销量 {{ goodsData.sales }}</text>
			</view>

			<view class="time">
				<view class="wrapper" @click="go(`/pages/store/goods-detail/goods-detail?goodsId=${goodsData.id}`)">
					<view class="price-wrapper">
						<text class="price-text">￥{{ goodsData.counterPrice }}</text>
						<text v-if="goodsData.isHot" class="price-tag">热卖</text>
					</view>
				</view>

				<BeeIcon
					:size="28" :src="require('../../../../static/brand/detail/add-icon.png')"
					@click="$emit('add-car', goodsData)"
				></BeeIcon>
			</view>
		</view>
	</view>
</template>

<script>
import { getRandom } from '../../../../utils'
export default {
	props: {
		goodsData: {
			type: Object,
			required: true
		}
	},

	methods: {
		getRandom
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
