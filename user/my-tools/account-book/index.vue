<template>
	<view class="account-book-container">
		<view class="main">
			<JHeader tabbar="/pages/user/user" width="50" height="50" title="小账本"></JHeader>
			<view style="margin-top: 20upx;padding: 30upx;background-color: #ffffff;border-radius: 40upx;">
				<view style="font-size: 28upx;">我的收益（元）</view>
				<view
					style="display: flex;justify-content: space-between;align-items: center;width: 100%;margin-top: 30upx;font-size: 28upx;text-align: center;"
				>
					<view>
						<view>余额</view>
						<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;">
							{{ typeof userAccount === 'number'
								? userAccount : '--' }}
						</view>
					</view>
					<view style="max-width: 35%;">
						<view>代金券</view>
						<view
							style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
						>
							{{ typeof userVoucher === 'number' ? transformNumber(userVoucher) : '--' }}
						</view>
					</view>
					<view>
						<view>积分</view>
						<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;">
							{{ typeof userScore === 'number'
								? userScore : '--' }}
						</view>
					</view>
					<view>
						<view>当前佣金</view>
						<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;">
							{{ typeof userCommission === 'number'
								? userCommission : '--' }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="margin-top: 40upx;padding: 40upx;">
			<view style="font-size: 28upx;">收益记录</view>
			<view>
				<view v-if="revenueRecords && revenueRecords.length">
					<view v-for="item in revenueRecords" :key="item.id" style="padding: 24upx;background-color: #ffffff;">
						<view style="font-size: 26upx;color: #999999;">
							类型：
							<text v-if="item.type === 1">用户余额</text>
							<text v-else-if="item.type === 2">代金券</text>
							<text v-else-if="item.type === 3">积分</text>
							<text v-else-if="item.type === 4">佣金</text>
							<text v-else-if="item.type === 5">提现</text>
						</view>
						<view style="display: flex;justify-content: space-between;align-items: flex-end;margin-top: 12upx;">
							<view>
								金额浮动：
								<text v-if="!item.addOr" style="color: #23aa5b;font-weight: bold;">-{{ item.account || 0 }}</text>
								<text v-else style="color: #ff0e0e;font-weight: bold;">+{{ item.account || 0 }}</text>
							</view>
							<view style="font-size: 26upx;color: #999999;">
								{{ new Date(item.createTime).toLocaleString() || '--' }}
							</view>
						</view>
					</view>
				</view>
				<view v-else>
					<tui-no-data>暂无数据</tui-no-data>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getUserIncomeApi, getRevenueRecordsApi } from '../../../api/user'
import { getUserId, transformNumber } from '../../../utils'

export default {
	name: 'AccountBook',
	components: {},

	data() {
		return {
			userAccount: '',
			userVoucher: '',
			userScore: '',
			userCommission: '',
			revenueRecords: []
		}
	},

	onLoad() {
		getUserIncomeApi({
			userId: getUserId()
		}).then(({ data }) => {
			this.userAccount = data.userAccount // 余额
			this.userVoucher = data.userVoucher // 代金券
			this.userScore = data.userScore // 积分
			this.userCommission = data.userCommission // 当前佣金
		})
		getRevenueRecordsApi({
			userId: getUserId()
		}).then(({ data }) => {
			console.log(data)
			this.revenueRecords = data || []
		})
	},

	methods: {
		transformNumber,
		handleBack() {
			uni.switchTab({
				url: '/pages/user/user'
			})
		}
	}
}
</script>

<style lang="less" scoped>
.account-book-container {
	// padding: 40upx 24upx 140upx 24upx;
	box-sizing: border-box;
	position: relative;
	min-height: 100vh;
	overflow: hidden;
	background-color: #f9f9f9;

	.main {
		// width: 100%;
		min-height: 186upx;
		background-color: #e95d20;
		border-bottom-left-radius: 400upx 40upx;
		border-bottom-right-radius: 400upx 40upx;
		padding: 40upx 25upx 0;
	}
}
</style>
