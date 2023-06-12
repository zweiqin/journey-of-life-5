<template>
	<view class="account-book-container">
		<view class="main"></view>
		<view style="position: relative;z-index: 2;padding: 40upx 25upx 0;">
			<JHeader tabbar="/pages/user/user" width="50" height="50" title="小账本"></JHeader>

			<view v-if="userInfo.roleIds === 2">
				<view style="margin-top: 20upx;padding: 30upx;background-color: #ffffff;border-radius: 40upx;">
					<view style="font-size: 28upx;">我的收益（元）</view>
					<view
						style="display: flex;justify-content: space-between;align-items: center;width: 100%;margin-top: 30upx;font-size: 28upx;text-align: center;"
					>
						<view style="max-width: 35%;">
							<view>当前佣金</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;">
								{{ typeof branchIncome.userCurrent === 'number' ? transformNumber(branchIncome.userCurrent) : '--' }}
							</view>
						</view>
						<view style="max-width: 35%;">
							<view>累计提现</view>
							<view
								style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
							>
								{{ typeof branchIncome.userWithdrawal === 'number' ? transformNumber(branchIncome.userWithdrawal) : '--' }}
							</view>
						</view>
						<view>
							<view>今日佣金</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;">
								{{ typeof branchIncome.dayCurrent === 'number' ? transformNumber(branchIncome.dayCurrent) : '--' }}
							</view>
						</view>
					</view>
				</view>
				<view style="margin-top: 20upx;padding: 30upx;background-color: #ffffff;border-radius: 40upx;">
					<view style="font-size: 28upx;">我的粉丝（{{ branchFans.totalFans }}）</view>
					<view
						style="display: flex;justify-content: space-between;align-items: center;width: 100%;margin-top: 30upx;font-size: 28upx;text-align: center;"
					>
						<view style="max-width: 35%;">
							<view>策划师</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;">
								{{ typeof branchFans.plan === 'number' ? branchFans.plan : '--' }}
							</view>
						</view>
						<view style="max-width: 35%;">
							<view>普通会员</view>
							<view
								style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
							>
								{{ typeof branchFans.member === 'number' ? branchFans.member : '--' }}
							</view>
						</view>
						<view>
							<view>今日新增粉丝</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;">
								{{ typeof branchFans.toDayCount === 'number' ? branchFans.toDayCount : '--' }}
							</view>
						</view>
					</view>
				</view>
				<view style="margin-top: 40upx;padding: 10upx;">
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
							<tui-no-data :fixed="false" style="margin-top: 50upx;">暂无数据</tui-no-data>
						</view>
					</view>
				</view>
			</view>

			<view v-else-if="userInfo.roleIds === 5 || userInfo.roleIds === 7 || userInfo.roleIds === 10">
				<view
					style="margin-top: 20upx;padding: 30upx;background-color: #ffffff;border-radius: 40upx;"
				>
					<view style="font-size: 28upx;">我的收益（元）</view>
					<view
						style="display: flex;justify-content: space-between;align-items: center;width: 100%;margin-top: 30upx;font-size: 28upx;text-align: center;"
					>
						<view>
							<view>余额</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;">
								{{ typeof userAccount === 'number' ? userAccount : '--' }}
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
								{{ typeof userScore === 'number' ? userScore : '--' }}
							</view>
						</view>
						<view>
							<view>当前佣金</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;">
								{{ typeof userCommission === 'number' ? userCommission : '--' }}
							</view>
						</view>
					</view>
				</view>
				<view style="margin-top: 40upx;padding: 10upx;">
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
							<tui-no-data :fixed="false" style="margin-top: 50upx;">暂无数据</tui-no-data>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
import {
	getBranchOfficeIncomeApi, getBranchOfficeFansNumApi, getBranchOfficeIncomeListApi, getBranchOfficeListApi,
	getUserIncomeApi, getRevenueRecordsApi
} from '../../../api/user'
import { getUserId, transformNumber } from '../../../utils'
import { J_USER_INFO } from '../../../constant'

export default {
	name: 'AccountBook',
	components: {},

	data() {
		return {
			userInfo: {},

			// 分公司
			branchIncome: {},
			branchFans: {},
			branchListIncome: [],
			branchListFans: [],

			// 收益或粉丝
			currentIncomeOrFansTab: 0,

			userAccount: '',
			userVoucher: '',
			userScore: '',
			userCommission: '',
			revenueRecords: []
		}
	},

	onShow() {
		this.userInfo = uni.getStorageSync(J_USER_INFO)
		this.getData(this.userInfo.roleIds)
	},

	methods: {
		transformNumber,

		getData(roleId) {
			if (!getUserId()) return
			if (roleId === 2) {
				getBranchOfficeIncomeApi({
					userId: getUserId()
				}).then(({ data }) => {
					console.log(data)
					this.branchIncome = data || {}
				})
				getBranchOfficeFansNumApi({
					userId: getUserId()
				}).then(({ data }) => {
					console.log(data)
					this.branchFans = data || {}
				})
				if (this.currentIncomeOrFansTab === 0) {
					this.getBranchOfficeIncomeList()
				} else if (this.currentIncomeOrFansTab === 1) {
					this.getBranchOfficeList()
				}
			} else if (roleId === 3 || roleId === 4) {

			} else if (roleId === 6) {

			} else if (roleId === 5 || roleId === 7 || roleId === 10) {
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
			}
		},

		// 分公司
		getBranchOfficeIncomeList() {
			getBranchOfficeIncomeListApi({
				userId: getUserId()
			}).then(({ data }) => {
				console.log(data)
				this.branchListIncome = data || []
			})
		},
		getBranchOfficeList() {
			getBranchOfficeListApi({
				userId: getUserId()
			}).then(({ data }) => {
				console.log(data)
				this.branchListFans = data || []
			})
		},

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
	background-color: #efefef;

	.main {
		position: absolute;
		z-index: 1;
		width: 100%;
		// min-height: 186upx;
		min-height: 326upx;
		background-color: #e95d20;
		border-bottom-left-radius: 400upx 40upx;
		border-bottom-right-radius: 400upx 40upx;
		// padding: 40upx 25upx 0;
	}
}
</style>
