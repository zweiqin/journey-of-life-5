<template>
	<view class="order-info-container">
		<view style="color: #666666;">订单编号：{{ data.orderSn }}</view>
		<!-- <view style="margin-top: 20upx;padding: 20upx;font-size: 26upx;background-color: #eeeeee;">
			<view>收货人：{{ data.consignee }}-{{ data.mobile }}</view>
			<view>{{ data.address }}</view>
			<view v-if="data.message">留言：{{ data.message }}</view>
			</view> -->
		<view style="margin-top: 20upx;padding: 0 20upx;">
			<view v-if="data.orderStatusText">订单状态：{{ data.orderStatusText }}</view>
			<view v-if="data.freightPrice">配送费用：￥{{ data.freightPrice }}</view>
			<view v-if="data.couponPrice">优惠券减免：￥{{ data.couponPrice }}</view>
			<view v-if="data.integralPrice">用户积分减免：￥{{ data.integralPrice }}</view>
			<view v-if="data.grouponPrice">团购优惠价减免：￥{{ data.grouponPrice }}</view>
		</view>
		<view style="padding: 0 20upx;">
			<view style="display: flex;justify-content: space-between;">
				<view v-if="typeof data.goodsPrice === 'number'">总费用：<text style="color: red;">￥{{ data.goodsPrice }}</text></view>
				<view v-if="typeof data.orderPrice === 'number'">订单费用：<text style="color: red;">￥{{ data.orderPrice }}</text></view>
			</view>
			<view style="text-align: right;">实付费用：<text style="color: red;">￥{{ data.actualPrice }}</text></view>
			<view style="margin-top: 12upx;padding-top: 12upx;;border-top: 1px solid #dddddd;">
				<view style="display: flex;justify-content: space-between;font-size: 26upx;color: #999999;">
					<text>创建时间：</text>
					<text>{{ new Date(data.addTime).toLocaleString() }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		data: {
			type: Object,
			required: true
		}
	},

	methods: {
	}
}
</script>

<style lang="less" scoped>
.order-info-container {
}
</style>
