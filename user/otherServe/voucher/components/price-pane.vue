<template>
	<view class="price-pane">
		<view class="header">
			<view class="header-title">{{ title }}</view>
			<view v-if="isRecharge" @click="go('/user/otherServe/voucher/recharge-history')" class="help">充值记录<img
					src="../image/right.png" alt=""></view>
		</view>

		<view class="prices">
			<view class="price-item" @click="$emit('opVoucher', item)" v-for="item in data" :key="item">
				<view class="text">{{ item }}元</view>
				<view v-if="isRecharge" class="desc">售价{{ item }}元</view>
			</view>

			<view class="price-item other-btn" @click="$emit('opVoucher', -1)">
				<view class="text">更多面额</view>
			</view>

			<!--      <view
        class="price-item recharge-other-btn"
        @click="$emit('opVoucher', -1)"
        v-else
      >
        其他金额
      </view> -->
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: String,
			isRecharge: Boolean,
			data: Array,
		},
	};
</script>

<style lang="less" scoped>
	@import "../../../../style/mixin.less";

	.price-pane {
		width: 100%;
		font-size: 28upx;
		color: #3d3d3d;

		.header {
			.flex();
			padding-top: 32rpx;
			// padding: 32upx 0;
			.header-title {
				font-size: 30rpx;
				line-height: 51rpx;
				color: #3D3D3D;
			}

			.help {
				color: #999;
				text-align: center;
				line-height: 40upx;

				>img {
					width: 28rpx;
					height: 28rpx;
				}
			}
		}

		.prices {
			width: 100%;
			display: flex;
			flex-wrap: wrap;

			.flex();

			.price-item {
				// width: 194upx;
				// height: 140upx;
				// flex-shrink: 0;
				// flex-direction: column;
				// border: 1upx solid #fa5151;
				// border-radius: 10upx;
				// margin-bottom: 40upx;
				margin-top: 20rpx;
				width: 215rpx;
				height: 123rpx;
				border-radius: 10rpx;
				background: #FFFFFF;
				box-sizing: border-box;
				border: 2rpx solid #6BBC7D;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.text {
					font-size: 36rpx;
					font-weight: bold;
					line-height: 51rpx;
					color: #6BBC7D;
				}

				.desc {
					font-size: 28rpx;
					line-height: 51rpx;
					color: #6BBC7D;
				}

				&.recharge-other-btn {
					font-size: 36upx;
					color: #3662ec;
				}

				&.other-btn {
					border: 2px solid #FA5151;

					.text {
						font-size: 36rpx;
						font-weight: bold;
						line-height: 51rpx;
						color: #FA5151;
					}
				}
			}
		}
	}
</style>