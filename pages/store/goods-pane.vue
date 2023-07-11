<template>
	<view class="goods-pane">
		<JAvatar
			radius="10" :size="120" :src="imgUrl ||
				'https://img2.baidu.com/it/u=3642934879,209265319&fm=253&fmt=auto&app=138&f=PNG?w=500&h=618'
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
				<text class="goods-pane-price">￥{{ price }}</text>
				<!-- <view ref="numbersRef" class="numbers">
					<view class="item" @click="changeNumber(-1)">-</view>
					<view class="currentNumber">{{ goodsNumber }}</view>
					<view class="item" @click="changeNumber(1)">+</view>
					</view> -->

				<view>
					<view v-if="readOnly">
						<button ref="addCarRef" class="add-car" @click="handleToView">
							查看详情
						</button>
					</view>
					<view v-else style="margin-top: 12upx;;padding-right: 28upx;">
						<text>X</text>
						<text style="margin-left: 4upx;;font-size: 36upx;font-weight: bold;">{{ number }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		name: String,
		price: [String, Number],
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
		handleAddCar() {
			this.$refs.addCarRef.$el.style.flex = '0'
			this.$refs.numbersRef.$el.style.opacity = '1'
			if (!this.goodsNumber) {
				this.goodsNumber = 1
			}
		},

		changeNumber(number) {
			this.goodsNumber = number + this.goodsNumber
			if (this.goodsNumber <= 0) {
				this.$refs.addCarRef.$el.style.flex = ''
				this.$refs.numbersRef.$el.style.opacity = '0'
				this.goodsNumber = 0
			}
		},

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
	.flex();
	width: 100%;

	.goods-pane-right {
		width: 100%;
		margin-left: 30upx;
		font-size: @f12;
		color: @c0;

		.goods-pane-name {
			width: 520upx;
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
			.flex();

			.goods-pane-price {
				color: #fa5151;
				font-size: 28upx;
			}

			.numbers {
				.flex(center, flex-end);
				opacity: 0;
				flex: 1;
				font-size: 36upx;
				overflow: hidden;
				transition: all 350ms;

				.currentNumber {
					color: #fa5151;
					margin: 0 5px;
				}

				.item {
					width: 48upx;
					height: 48upx;
					border-radius: 50%;
					color: #fff;
					text-align: center;
					line-height: 44upx;

					&:first-child {
						border: 1.5px solid #fa5151;
						color: #fa5151;
					}

					&:last-child {
						background-color: #fa5151;
					}
				}
			}

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
