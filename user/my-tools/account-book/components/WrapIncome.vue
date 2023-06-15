<template>
	<view style="margin-top: 20upx;padding: 30upx;background-color: #ffffff;border-radius: 40upx;">
		<view style="display: flex;justify-content: space-between;font-size: 28upx;">
			<text>红包和优惠券</text>
			<tui-button type="warning" width="120rpx" height="50rpx" style="border-radius: 50rpx;" @click="go('/user/my-tools/account-book/wrap-record')">记录</tui-button>
		</view>
		<view
			style="display: flex;justify-content: space-between;align-items: center;width: 100%;margin-top: 30upx;font-size: 28upx;text-align: center;"
		>
			<view style="max-width: 23%;">
				<view>红包总数</view>
				<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
					{{ typeof data.wrapCount === 'number' ? data.wrapCount : '--' }}
				</view>
			</view>
			<view style="max-width: 23%;">
				<view>今日红包数</view>
				<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
					{{ typeof data.toDaysWrapCount === 'number' ? data.toDaysWrapCount : '--' }}
				</view>
			</view>
			<view style="max-width: 23%;">
				<view>优惠券总数</view>
				<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
					{{ typeof data.couponWrapCount === 'number' ? data.couponWrapCount : '--' }}
				</view>
			</view>
			<view>
				<view>今日优惠券数</view>
				<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
					{{ typeof data.toDaysCouponWrapCount === 'number' ? data.toDaysCouponWrapCount : '--' }}
				</view>
			</view>
		</view>
		<view
			style="display: flex;justify-content: space-around;align-items: center;width: 100%;margin-top: 30upx;font-size: 28upx;text-align: center;"
		>
			<view style="max-width: 48%;">
				<view>累计发放红包金额</view>
				<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
					{{ typeof data.allWrapRed === 'number' ? transformNumber(data.allWrapRed) : '--' }}
				</view>
			</view>
			<view style="max-width: 48%;">
				<view>今日发布金额</view>
				<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
					{{ typeof data.toDatsWrapRed === 'number' ? transformNumber(data.toDatsWrapRed) : '--' }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { transformNumber } from '../../../../utils'
export default {
	name: 'WrapIncome',
	props: {
		data: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
		}
	},
	methods: {
		transformNumber
	}

}
</script>

<style lang="less" scoped>

</style>
