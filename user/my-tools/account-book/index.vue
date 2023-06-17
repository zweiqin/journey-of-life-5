<template>
	<view class="account-book-container">
		<view class="main"></view>
		<view style="position: relative;z-index: 2;margin-bottom: 30upx;padding: 40upx 25upx 0;">
			<JHeader tabbar="/pages/user/user" width="50" height="50" title="小账本"></JHeader>

			<!-- 分公司 -->
			<view v-if="userInfo.roleIds === 2">
				<view style="margin-top: 20upx;padding: 30upx;background-color: #ffffff;border-radius: 40upx;">
					<view style="font-size: 28upx;">我的收益（元）</view>
					<view
						style="display: flex;justify-content: space-between;align-items: center;width: 100%;margin-top: 30upx;font-size: 28upx;text-align: center;"
					>
						<view style="max-width: 35%;">
							<view>当前佣金</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
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
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
								{{ typeof branchIncome.toDaysAmount === 'number' ? transformNumber(branchIncome.dayCurrent) : '--' }}
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
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
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
							<view>今日新增</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
								{{ typeof branchFans.toDayCount === 'number' ? branchFans.toDayCount : '--' }}
							</view>
						</view>
					</view>
				</view>
				<WrapIncome :data="wrapIncome"></WrapIncome>
				<view style="margin-top: 20upx;padding: 30upx;background-color: #ffffff;border-radius: 40upx;">
					<view style="font-size: 28upx;">数据记录</view>
					<view>
						<tui-tabs
							style="width: 640upx;padding: 0 0upx 0 0upx;overflow: hidden;" :slider-width="85" :padding="55"
							item-width="320rpx" selected-color="#000000" bold slider-bg-color="#ff0000"
							:tabs="[{ name: '佣金' }, { name: '粉丝' }]" :current-tab="currentIncomeOrFansTab"
							@change="handleSwitchTab"
						></tui-tabs>
						<view v-if="currentIncomeOrFansTab === 0">
							<view v-if="branchListIncome && branchListIncome.length">
								<view v-for="item in branchListIncome" :key="item.id" style="padding: 24upx;background-color: #ffffff;">
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
						<view v-else-if="currentIncomeOrFansTab === 1">
							<view v-if="branchListFans && branchListFans.length">
								<view v-for="item in branchListFans" :key="item.id" style="padding: 10upx;background-color: #ffffff;">
									<view style="display: flex;align-items: center;background-color: #fff;">
										<JAvatar
											:src="common.seamingImgUrl(item.headimgurl)" size="92" radius="50%"
											border="5upx solid #ffffff"
										></JAvatar>
										<view style="flex: 1;padding-left: 20upx;font-size: 26upx;">
											<view style="display: flex;justify-content: space-between;">
												<text>
													名称：{{ item.nickname || '--' }}
												</text><text style="color: #999999;">ID：{{ item.id }}</text>
											</view>
											<view>性别：{{ item.sex === 0 ? '男' : item.sex === 1 ? '女' : '--' }}</view>
											<view>
												会员类型：
												<text v-if="item.type === 0">普通会员</text>
												<text v-if="item.type === 1">商家</text>
												<text v-if="item.type === 2">策划师</text>
											</view>
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

			<!-- 策划师 -->
			<view v-else-if="userInfo.roleIds === 3 || userInfo.roleIds === 4">
				<view style="margin-top: 20upx;padding: 30upx;background-color: #ffffff;border-radius: 40upx;">
					<view style="font-size: 28upx;">我的收益（元）</view>
					<view
						style="display: flex;justify-content: space-between;align-items: center;width: 100%;margin-top: 30upx;font-size: 28upx;text-align: center;"
					>
						<view style="max-width: 30%;">
							<view>累计佣金</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
								{{ typeof plannerIncome.accumulate === 'number' ? transformNumber(plannerIncome.accumulate) : '--' }}
							</view>
						</view>
						<view style="max-width: 30%;">
							<view>当前佣金</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
								{{ typeof plannerIncome.current === 'number' ? transformNumber(plannerIncome.current) : '--' }}
							</view>
						</view>
						<view style="max-width: 30%;">
							<view>今日佣金</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
								{{ typeof plannerIncome.dayCurrent === 'number' ? transformNumber(plannerIncome.dayCurrent) : '--' }}
							</view>
						</view>
						<view style="max-width: 30%;">
							<view>累计提现</view>
							<view
								style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
							>
								{{ typeof plannerIncome.withdrawal === 'number' ? transformNumber(plannerIncome.withdrawal) : '--' }}
							</view>
						</view>
					</view>
				</view>
				<view style="margin-top: 20upx;padding: 30upx;background-color: #ffffff;border-radius: 40upx;">
					<view style="font-size: 28upx;">我的粉丝（{{ plannerFans.totalFans }}）</view>
					<view
						style="display: flex;justify-content: space-between;align-items: center;width: 100%;margin-top: 30upx;font-size: 28upx;text-align: center;"
					>
						<view style="max-width: 35%;">
							<view>商家</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
								{{ typeof plannerFans.businessFans === 'number' ? plannerFans.businessFans : '--' }}
							</view>
						</view>
						<view style="max-width: 35%;">
							<view>普通会员</view>
							<view
								style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
							>
								{{ typeof plannerFans.member === 'number' ? plannerFans.member : '--' }}
							</view>
						</view>
						<view>
							<view>今日新增</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
								{{ typeof plannerFans.toDayCount === 'number' ? plannerFans.toDayCount : '--' }}
							</view>
						</view>
					</view>
				</view>
				<WrapIncome :data="wrapIncome"></WrapIncome>
				<view style="margin-top: 20upx;padding: 30upx;background-color: #ffffff;border-radius: 40upx;">
					<view style="font-size: 28upx;">数据记录</view>
					<view>
						<tui-tabs
							style="width: 640upx;padding: 0 0upx 0 0upx;overflow: hidden;" :slider-width="85" :padding="55"
							item-width="320rpx" selected-color="#000000" bold slider-bg-color="#ff0000"
							:tabs="[{ name: '佣金' }, { name: '粉丝' }]" :current-tab="currentIncomeOrFansTab"
							@change="handleSwitchTab"
						></tui-tabs>
						<view v-if="currentIncomeOrFansTab === 0">
							<view v-if="plannerListIncome && plannerListIncome.length">
								<view v-for="item in plannerListIncome" :key="item.id" style="padding: 24upx;background-color: #ffffff;">
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
							<LoadMore v-show="plannerListIncome.length" :status="status"></LoadMore>
							<view v-if="plannerListIncome && !plannerListIncome.length && loadingStatus !== 'loading'" class="no-data">
								暂无数据~
							</view>
						</view>
						<view v-else-if="currentIncomeOrFansTab === 1">
							<view v-if="plannerListFans && plannerListFans.length">
								<view v-for="item in plannerListFans" :key="item.id" style="padding: 10upx;background-color: #ffffff;">
									<view style="display: flex;align-items: center;background-color: #fff;" @click="go(`/user/my-tools/account-book/fan-details?type=planner&id=${item.id}`)">
										<JAvatar
											:src="common.seamingImgUrl(item.headimgurl)" size="92" radius="50%"
											border="5upx solid #ffffff"
										></JAvatar>
										<view style="flex: 1;padding-left: 20upx;font-size: 26upx;">
											<view style="display: flex;justify-content: space-between;">
												<text>
													名称：{{ item.nickname || '--' }}
												</text><text style="color: #999999;">ID：{{ item.id }}</text>
											</view>
											<view>性别：{{ item.sex === 0 ? '男' : item.sex === 1 ? '女' : '--' }}</view>
											<view>
												会员类型：
												<text v-if="item.type === 0">普通会员</text>
												<text v-if="item.type === 1">商家</text>
												<text v-if="item.type === 2">策划师</text>
											</view>
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

			<!-- 会员商户 -->
			<view v-else-if="userInfo.roleIds === 6">
				<view style="margin-top: 20upx;padding: 30upx;background-color: #ffffff;border-radius: 40upx;">
					<view style="display: flex;justify-content: space-between;font-size: 28upx;">
						<text>账本数据</text>
						<tui-button type="warning" width="120rpx" height="50rpx" style="border-radius: 50rpx;" @click="go('/user/my-tools/account-book/order-data-record')">记录</tui-button>
					</view>
					<view
						style="display: flex;flex-wrap: wrap;justify-content: space-between;align-items: center;width: 100%;margin-top: 30upx;font-size: 28upx;text-align: center;"
					>
						<view>
							<view>今日订单收益</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;">
								{{ typeof brandOrderIncome.orderAll === 'number' ? brandOrderIncome.orderAll : '--' }}
							</view>
						</view>
						<view>
							<view>今日核销订单数</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;">
								{{ typeof brandOrderIncome.orderToDayTotal === 'number' ? brandOrderIncome.orderToDayTotal : '--' }}
							</view>
						</view>
						<view>
							<view>未核销订单数</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;">
								{{ typeof brandOrderIncome.notWritten === 'number' ? brandOrderIncome.notWritten : '--' }}
							</view>
						</view>
					</view>
				</view>
				<view style="margin-top: 20upx;padding: 30upx;background-color: #ffffff;border-radius: 40upx;">
					<view style="font-size: 28upx;">我的收益（元）</view>
					<view
						style="display: flex;justify-content: space-between;align-items: center;width: 100%;margin-top: 30upx;font-size: 28upx;text-align: center;"
					>
						<view style="max-width: 30%;">
							<view>当前佣金</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
								{{ typeof brandIncome.totalAmount === 'number' ? transformNumber(brandIncome.totalAmount) : '--' }}
							</view>
						</view>
						<view style="max-width: 30%;">
							<view>累计佣金</view>
							<view
								style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
							>
								{{ typeof brandIncome.remainAmount === 'number' ? transformNumber(brandIncome.remainAmount) : '--' }}
							</view>
						</view>
						<view>
							<view>今日佣金</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
								{{ typeof brandIncome.toDaysAmount === 'number' ? transformNumber(brandIncome.toDaysAmount) : '--' }}
							</view>
						</view>
						<view style="max-width: 30%;">
							<view>累计提现</view>
							<view
								style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
							>
								{{ typeof brandIncome.withdrawAmount === 'number' ? transformNumber(brandIncome.withdrawAmount) : '--' }}
							</view>
						</view>
					</view>
				</view>
				<view style="margin-top: 20upx;padding: 30upx;background-color: #ffffff;border-radius: 40upx;">
					<view style="font-size: 28upx;">我的粉丝（{{ brandFans.totalCount }}）</view>
					<view
						style="display: flex;justify-content: space-between;align-items: center;width: 100%;margin-top: 30upx;font-size: 28upx;text-align: center;"
					>
						<view>
							<view>今日新增</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
								{{ typeof brandFans.toDayCount === 'number' ? brandFans.toDayCount : '--' }}
							</view>
						</view>
					</view>
				</view>
				<WrapIncome :data="wrapIncome"></WrapIncome>
				<view style="margin-top: 20upx;padding: 30upx;background-color: #ffffff;border-radius: 40upx;">
					<view style="display: flex;justify-content: space-between;font-size: 28upx;">
						<text>代金券</text>
						<tui-button type="warning" width="120rpx" height="50rpx" style="border-radius: 50rpx;" @click="go('/user/my-tools/account-book/voucher-record')">记录</tui-button>
					</view>
					<view
						style="display: flex;justify-content: space-between;align-items: center;width: 100%;margin-top: 30upx;font-size: 28upx;text-align: center;"
					>
						<view style="max-width: 33%;">
							<view>累计代金券</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
								{{ typeof brandVoucherIncome.addAll === 'number' ? transformNumber(brandVoucherIncome.addAll) : '--' }}
							</view>
						</view>
						<!-- <view style="max-width: 33%;">
							<view>转赠累计</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
							{{ typeof brandVoucherIncome.giveVoucher === 'number' ? transformNumber(brandVoucherIncome.giveVoucher) : '--' }}
							</view>
							</view> -->
						<view style="max-width: 33%;">
							<view>充值累计</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
								{{ typeof brandVoucherIncome.rechargeVoucher === 'number' ? transformNumber(brandVoucherIncome.rechargeVoucher) : '--' }}
							</view>
						</view>
						<view style="max-width: 33%;">
							<view>发放累计</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
								{{ typeof brandVoucherIncome.voucherGive === 'number' ? transformNumber(brandVoucherIncome.voucherGive) : '--' }}
							</view>
						</view>
					</view>
					<view
						style="display: flex;justify-content: space-between;align-items: center;width: 100%;margin-top: 30upx;font-size: 28upx;text-align: center;"
					>
						<view style="max-width: 33%;">
							<view>当前可用</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
								{{ typeof brandVoucherIncome.subtract === 'number' ? transformNumber(brandVoucherIncome.subtract) : '--' }}
							</view>
						</view>
						<view style="max-width: 33%;">
							<view>今日充值</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
								{{ typeof brandVoucherIncome.toDaysVoucher === 'number' ? transformNumber(brandVoucherIncome.toDaysVoucher) : '--' }}
							</view>
						</view>
						<view style="max-width: 33%;">
							<view>今日发放</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
								{{ typeof brandVoucherIncome.grantVoucher === 'number' ? transformNumber(brandVoucherIncome.grantVoucher) : '--' }}
							</view>
						</view>
					</view>
				</view>
				<view style="margin-top: 20upx;padding: 30upx;background-color: #ffffff;border-radius: 40upx;">
					<view style="font-size: 28upx;">数据记录</view>
					<view>
						<tui-tabs
							style="width: 640upx;padding: 0 0upx 0 0upx;overflow: hidden;" :slider-width="85" :padding="55"
							item-width="320rpx" selected-color="#000000" bold slider-bg-color="#ff0000"
							:tabs="[{ name: '佣金' }, { name: '粉丝' }]" :current-tab="currentIncomeOrFansTab"
							@change="handleSwitchTab"
						></tui-tabs>
						<view v-if="currentIncomeOrFansTab === 0">
							<view v-if="brandListIncome && brandListIncome.length">
								<view v-for="item in brandListIncome" :key="item.id" style="padding: 24upx;background-color: #ffffff;">
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
						<view v-else-if="currentIncomeOrFansTab === 1">
							<view v-if="brandListFans && brandListFans.length">
								<view v-for="item in brandListFans" :key="item.id" style="padding: 10upx;background-color: #ffffff;">
									<view style="display: flex;align-items: center;background-color: #fff;" @click="go(`/user/my-tools/account-book/fan-details?type=brand&id=${item.id}`)">
										<JAvatar
											:src="common.seamingImgUrl(item.avatar)" size="92" radius="50%"
											border="5upx solid #ffffff"
										></JAvatar>
										<view style="flex: 1;padding-left: 20upx;font-size: 26upx;">
											<view style="display: flex;justify-content: space-between;">
												<text>
													名称：{{ item.nickname || '--' }}
												</text><text style="color: #999999;">ID：{{ item.id }}</text>
											</view>
											<view>性别：{{ item.gender === 0 ? '男' : item.gender === 1 ? '女' : '--' }}</view>
											<view>
												会员类型：{{ common.explainMembership(item.roleIds) }}
											</view>
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

			<!-- 普通会员 -->
			<view v-else-if="userInfo.roleIds === 5 || userInfo.roleIds === 7 || userInfo.roleIds === 10">
				<view style="margin-top: 20upx;padding: 30upx;background-color: #ffffff;border-radius: 40upx;">
					<view style="font-size: 28upx;">我的收益（元）</view>
					<view
						style="display: flex;justify-content: space-between;align-items: center;width: 100%;margin-top: 30upx;font-size: 28upx;text-align: center;"
					>
						<view>
							<view>余额</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
								{{ typeof userIncome.userAccount === 'number' ? userIncome.userAccount : '--' }}
							</view>
						</view>
						<view style="max-width: 35%;">
							<view>代金券</view>
							<view
								style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
							>
								{{ typeof userIncome.userVoucher === 'number' ? transformNumber(userIncome.userVoucher) : '--' }}
							</view>
						</view>
						<view>
							<view>积分</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
								{{ typeof userIncome.userScore === 'number' ? userIncome.userScore : '--' }}
							</view>
						</view>
						<view>
							<view>累计提现</view>
							<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
								{{ typeof userIncome.userAccumulate === 'number' ? transformNumber(userIncome.userAccumulate) : '--' }}
							</view>
						</view>
					</view>
				</view>
				<WrapIncome :data="wrapIncome"></WrapIncome>
				<view style="margin-top: 20upx;padding: 30upx;background-color: #ffffff;border-radius: 40upx;">
					<view style="font-size: 28upx;">收益记录</view>
					<view>
						<view v-if="userRevenueRecords && userRevenueRecords.length">
							<view v-for="item in userRevenueRecords" :key="item.id" style="padding: 24upx;background-color: #ffffff;">
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
	getUserIncomeApi, getRevenueRecordsApi,
	getPlannerBenefitsApi, getPlannerFansApi, getPlannerBenefitsListApi, getPlannerListApi,
	getBrandCommissionApi, getBrandFansNumApi, getBrandCommissionListApi, getBrandFansApi, getBrandWrapApi, getBrandVoucherApi, getBrandAccountBookApi
} from '../../../api/user'
import { getUserId, getBrandId, transformNumber } from '../../../utils'
import { J_USER_INFO } from '../../../constant'
import WrapIncome from './components/WrapIncome.vue'

export default {
	name: 'AccountBook',
	components: {
		WrapIncome
	},

	data() {
		return {
			userInfo: {},

			// 分公司
			branchIncome: {},
			branchFans: {},
			branchListIncome: [],
			branchListFans: [],

			// 普通用户
			userIncome: {
				userAccount: '', // 余额
				userVoucher: '', // 代金券
				userScore: '', // 积分
				userAccumulate: '' // 累计佣金
			},
			userRevenueRecords: [],

			// 策划师
			plannerIncome: {},
			plannerFans: {},
			plannerListIncome: [],
			plannerListFans: [],

			// 会员商户
			brandIncome: {},
			brandFans: {},
			brandListIncome: [],
			brandListFans: [],
			brandVoucherIncome: {},
			brandOrderIncome: {},

			// 分页
			dataQuery: {
				page: 1,
				size: 10
			},
			totalPages: 0,
			status: 'none',
			loadingStatus: 'noMore',
			// 红包和优惠券
			wrapIncome: {},
			// 收益或粉丝
			currentIncomeOrFansTab: 0
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
			getBrandWrapApi({
				userId: getUserId()
			}).then(({ data }) => {
				console.log(data)
				this.wrapIncome = data || {}
			})
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
				getPlannerBenefitsApi({
					userId: getUserId()
				}).then(({ data }) => {
					console.log(data)
					this.plannerIncome = data || {}
				})
				getPlannerFansApi({
					userId: getUserId()
				}).then(({ data }) => {
					console.log(data)
					this.plannerFans = data || {}
				})
				if (this.currentIncomeOrFansTab === 0) {
					this.dataQuery.page = 1
					this.dataQuery.size = 10
					this.getPlannerBenefitsList()
				} else if (this.currentIncomeOrFansTab === 1) {
					this.getPlannerList()
				}
			} else if (roleId === 6) {
				getBrandCommissionApi({
					brandId: getBrandId(),
					userId: getUserId()
				}).then(({ data }) => {
					console.log(data)
					this.brandIncome = data || {}
				})
				getBrandFansNumApi({
					userId: getUserId()
				}).then(({ data }) => {
					console.log(data)
					this.brandFans = data || {}
				})
				getBrandVoucherApi({
					brandId: getBrandId(),
					userId: getUserId()
				}).then(({ data }) => {
					console.log(data)
					this.brandVoucherIncome = data || {}
				})
				getBrandAccountBookApi({
					brandId: getBrandId(),
					userId: getUserId()
				}).then(({ data }) => {
					console.log(data)
					this.brandOrderIncome = data || {}
				})
				if (this.currentIncomeOrFansTab === 0) {
					this.getBrandCommissionList()
				} else if (this.currentIncomeOrFansTab === 1) {
					this.getBrandFans()
				}
			} else if (roleId === 5 || roleId === 7 || roleId === 10) {
				getUserIncomeApi({
					userId: getUserId()
				}).then(({ data }) => {
					this.userIncome = data || {}
				})
				getRevenueRecordsApi({
					userId: getUserId()
				}).then(({ data }) => {
					console.log(data)
					this.userRevenueRecords = data || []
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

		// 策划师
		getPlannerBenefitsList(isLoadmore) {
			if (!getUserId()) return
			this.status = 'loading'
			this.loadingStatus = 'loading'
			getPlannerBenefitsListApi({ ...this.dataQuery, userId: getUserId() })
				.then(({ data }) => {
					console.log(data)
					this.totalPages = data.totalPages
					if (isLoadmore) {
						this.plannerListIncome.push(...data.recordsList)
					} else {
						this.plannerListIncome = data
					}
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
				.catch(() => {
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
		},
		getPlannerList() {
			getPlannerListApi({
				userId: getUserId()
			}).then(({ data }) => {
				console.log(data)
				this.plannerListFans = data || []
			})
		},

		// 会员商户
		getBrandCommissionList() {
			getBrandCommissionListApi({
				brandId: getBrandId(),
				userId: getUserId()
			}).then(({ data }) => {
				console.log(data)
				this.brandListIncome = data || []
			})
		},
		getBrandFans() {
			getBrandFansApi({
				userId: getUserId()
			}).then(({ data }) => {
				console.log(data)
				this.brandListFans = data || []
			})
		},

		// 佣金或粉丝
		handleSwitchTab(e) {
			this.currentIncomeOrFansTab = e.index
			if (this.userInfo.roleIds === 2) {
				if (this.currentIncomeOrFansTab === 0) {
					this.getBranchOfficeIncomeList()
				} else if (this.currentIncomeOrFansTab === 1) {
					this.getBranchOfficeList()
				}
			} else if (this.userInfo.roleIds === 3 || this.userInfo.roleIds === 4) {
				if (this.currentIncomeOrFansTab === 0) {
					this.dataQuery.page = 1
					this.dataQuery.size = 10
					this.getPlannerBenefitsList()
				} else if (this.currentIncomeOrFansTab === 1) {
					this.getPlannerList()
				}
			} else if (this.userInfo.roleIds === 6) {
				if (this.currentIncomeOrFansTab === 0) {
					this.getBrandCommissionList()
				} else if (this.currentIncomeOrFansTab === 1) {
					this.getBrandFans()
				}
			}
		},

		handleBack() {
			uni.switchTab({
				url: '/pages/user/user'
			})
		}
	},

	onReachBottom() {
		if ((this.userInfo.roleIds === 3 || this.userInfo.roleIds === 4) && this.currentIncomeOrFansTab === 0) {
			if (this.dataQuery.page >= this.totalPages) {
				this.status = 'no-more'
				return
			}
			if (this.dataQuery.size > this.plannerListIncome.length) {
				return
			}
			this.dataQuery.page++
			this.getPlannerBenefitsList(true)
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

.no-data {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 180upx;
	color: #999999;
	font-size: 36upx;
	letter-spacing: 2px;
}

	.tui-tabs-view {
		/deep/ .tui-tabs-slider {
			margin-left: -55upx;
		}
	}
}
</style>
