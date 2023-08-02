<template>
	<view>
		<view style="display: flex;justify-content: space-between;align-items: center;font-size: 26upx;color: #999999;">
			<view>
				类型：
				<text v-if="showType === 1">
					<text v-if="data.type === 1">用户余额</text>
					<text v-else-if="data.type === 2">代金券</text>
					<text v-else-if="data.type === 3">积分</text>
					<text v-else-if="data.type === 4">佣金</text>
					<text v-else-if="data.type === 5">提现</text>
					<text v-else-if="data.type === 6">分销</text>
				</text>
				<text v-else-if="showType === 2">
					<text v-if="data.type === 1">代金券转赠</text>
					<text v-else-if="data.type === 2">代金券充值</text>
					<text v-else-if="data.type === 3">订单收入</text>
					<text v-else-if="data.type === 4">佣金收入</text>
					<text v-else>--</text>
				</text>
			</view>
			<view>来源：{{ data.name || '未知' }}</view>
		</view>
		<view style="display: flex;justify-content: space-between;align-items: flex-end;margin-top: 12upx;">
			<view>
				金额浮动：
				<text v-if="!data.addOr" style="color: #23aa5b;font-weight: bold;">-{{ data.account || 0 }}</text>
				<text v-else style="color: #ff0e0e;font-weight: bold;">+{{ data.account || 0 }}</text>
			</view>
			<view style="font-size: 26upx;color: #999999;">
				{{ new Date(data.createTime).toLocaleString() || '--' }}
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'IncomeRecord',
	props: {
		data: {
			type: Object,
			required: true
		},
		showType: {
			type: String,
			required: true
		}
	},
	data() {
		return {}
	},
	methods: {
	}
}
</script>

<style lang="less" scoped>
</style>
