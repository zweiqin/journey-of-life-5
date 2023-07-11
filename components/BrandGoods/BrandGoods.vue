<template>
	<view v-if="goodsData" class="brand-goods-container">
		<view style="max-height: 440upx;min-height: 120upx;overflow: hidden;">
			<tui-lazyload-img
				class="goods-img" mode="widthFix"
				width="340rpx" height="auto" :src="common.seamingImgUrl(goodsData.picUrl)" @click="$emit('click-content', { ...goodsData, ruleId })"
			></tui-lazyload-img>
		</view>

		<view class=" brand-goods-name">
			{{ goodsData.name }}
		</view>

		<view class="time">
			<view class="wrapper" @click="$emit('click-content', { ...goodsData, ruleId })">
				<view class="price-wrapper">
					<text class="price-text">
						￥
						<text v-if="ruleId">{{ goodsData.counterPrice - grouponPrice }}</text>
						<text v-else-if="seckillGoodId">{{ seckillPrice }}</text>
						<text v-else>{{ goodsData.counterPrice }}</text>
						{{ ruleId ? goodsData.counterPrice + grouponPrice : goodsData.counterPrice }}
					</text>
					<text v-if="goodsData.isHot" class="price-tag">热卖</text>
				</view>
			</view>

			<view v-if="ruleId">
				<tui-button
					type="danger" width="168rpx" height="60rpx" margin="0 10rpx 0 0"
					style="border-radius: 50rpx;" @click="$emit('add', { ...goodsData, ruleId })"
				>
					发起团购
				</tui-button>
			</view>

			<view v-else-if="seckillGoodId">
				<tui-button
					type="danger" width="168rpx" height="60rpx" margin="0 10rpx 0 0"
					style="border-radius: 50rpx;" @click="$emit('add', { ...goodsData, seckillGoodId })"
				>
					秒杀
				</tui-button>
			</view>
			<view v-else>
				<BeeIcon
					:size="22" :src="require('../../static/brand/detail/add-icon.png')"
					@click="$emit('add', { ...goodsData, ruleId })"
				></BeeIcon>
			</view>
		</view>

		<view style="display: flex;justify-content: space-between;padding: 0 10upx;;font-size: 26upx;color: #777777;">
			<text>{{ goodsData.browse }}浏览量</text>
			<text>销量 {{ goodsData.sales }}</text>
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

		ruleId: {
			type: [Number, String],
			default: ''
		},
		grouponPrice: {
			type: Number,
			default: 0
		},
		grouponMember: {
			type: Number,
			default: 0
		},

		seckillGoodId: {
			type: Number,
			default: ''
		},
		seckillPrice: {
			type: Number,
			default: 0
		}
	},

	methods: {
		getRandom
	}
}
</script>

<style lang="less" scoped>
.brand-goods-container {
	width: 340upx;
	margin-bottom: 40upx;

	.brand-goods-name {
		color: #3d3d3d;
		font-weight: 500;
		width: 340upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.time {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 10upx 0;

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

		.bee-btn {
			width: 102upx;
			height: 44upx;
			background-color: #fa5151;
			border-radius: 10upx;
			color: #fff;
		}
	}
}
</style>
