<template>
	<view class="goods-pane">
		<JAvatar
			radius="10" :size="120" :src="imgUrl ||
				'../../static/easy-loadimage/loadfail.png'
			"
		></JAvatar>

		<view class="goods-pane-right">
			<view class="goods-pane-name">
				{{ name || "--" }}
			</view>
			<view v-if="desc" class="goods-pane-desc-content">
				<text class="goods-pane-desc">{{ desc }}</text>
			</view>
			<view class="goods-pane-footer">
				<view style="display: flex;align-items: center;">
					<text style="color: #fa5151;font-size: 28upx;">￥{{ price }}</text>
					<view
						v-if="supportVoucher"
						style="flex: 1;width: fit-content;margin-top: 8upx;margin-left: 18upx;padding: 4upx 8upx;border: 0.25px solid #51cc46;border-radius: 12upx;font-size: 28upx;font-weight: bold;color: #51cc46;"
					>
						支持代金券
					</view>
				</view>

				<view>
					<view v-if="readOnly">
						<button ref="addCarRef" class="add-car" @click="handleToView">
							查看详情
						</button>
					</view>
					<view v-else style="margin-top: 12upx;;padding-right: 28upx;">
						<text>X</text>
						<text style="margin-left: 4upx;font-size: 36upx;font-weight: bold;">{{ number }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'GoodsPane',
	props: {
		name: String,
		price: [String, Number],
		supportVoucher: Boolean,
		orderType: [String, Number],
		imgUrl: String,
		desc: String,
		number: Number,
		readOnly: Boolean,
		showNumOnly: Boolean,
		id: [String, Number]
	},
	data() {
		return {
			goodsNumber: 1
		}
	},
	methods: {
		handleToView() {
			if (this.orderType == 0) {
				uni.navigateTo({
					url: '/pages/prod/prod?goodsId=' + this.id
				})
			} else if ((this.orderType == 1) || (this.orderType == 2)) {
				uni.navigateTo({
					url: `/pages/store/goods-detail/goods-detail?orderType=1&goodsId=${this.id}`
				})
			}
		}
	}
}
</script>

<style lang="less" scoped>
@import "../../style/var.less";
@import "../../style/mixin.less";

.goods-pane {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	word-break: break-all;

	.goods-pane-right {
		flex: 1;
		width: 0;
		margin-left: 30upx;
		font-size: @f12;
		color: @c0;

		.goods-pane-name {
			width: 100%;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}

		.goods-pane-desc-content {
			margin: 14upx 0 10upx 0;
		}

		.goods-pane-desc {
			font-size: 20upx;
			margin-right: 10upx;
		}

		.goods-pane-footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;

			.add-car {
				padding: 14upx 24upx;
				margin-top: 12upx;
				line-height: 1;
				font-size: 24upx;
				color: #fff;
				// height: 46upx;
				text-align: center;
				// line-height: 46upx;
				background-color: #fa5151;
				transition: all 200ms;
				overflow: hidden;
				// flex-shrink: 0;
				// margin-top: 20upx;
			}
		}
	}
}
</style>
