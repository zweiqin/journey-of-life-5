<template>
	<view class="application-review-container">
		<JHeader tabbar="/pages/user/user" width="50" height="50" title="申请审核"></JHeader>
		<tui-tabs
			style="width: 684upx;padding: 0 0upx 0 0upx;overflow: hidden;" :slider-width="250" :padding="0"
			item-width="228rpx" selected-color="#000000" bold slider-bg-color="#ff0000"
			background-color="#eeeeee"
			:tabs="[{ name: '策划师' }, { name: '商家申请' }, { name: '区域代理' }]" :current-tab="currentTab"
			@change="handleChangeTab"
		></tui-tabs>
		<view v-if="reviewList && reviewList.length" style="margin-top: 20upx;">
			<view v-for="(item, index) in reviewList" :key="index" class="" style="padding-bottom: 35upx;">
				<tui-card :title="{ text: `${item.name}` }" :tag="{ text: `申请人ID：${item.userId || '--'}` }" style="margin: 0;">
					<template #body>
						<view style="padding: 10upx 32upx;">
							<view style="font-size: 28upx;color: #3a3a3a;margin-bottom: 20upx;">地址：{{ item.address }}</view>
							<view>申请表ID：{{ item.id }}</view>
							<view>用户名称：{{ item.username || '--' }}</view>
							<view>电话号码：{{ item.phone }}</view>
							<view>
								状态：
								<text v-if="item.status == 0">待审核</text>
								<text v-else-if="item.status == 1">审核中</text>
								<text v-else-if="item.status == -1">未提交</text>
								<text v-else-if="item.status == -2">用户主动撤销</text>
								<text v-else-if="item.status == -3">已驳回</text>
								<text v-else-if="item.status == -4">注册流程失败</text>
								<text v-else-if="item.status == 2">已通过，等待付款</text>
								<text v-else-if="item.status == 3">已通话，等待付款</text>
								<text v-else-if="item.status == 4">已付款</text>
								<text v-else-if="item.status == 5">已驳回</text>
								<text v-else-if="item.status == 6">已创建账户</text>
								<text v-else>--</text>
							</view>
							<view>申请时间：{{ new Date(item.updateTime).toLocaleString() }}</view>
						</view>
					</template>
					<template #footer>
						<view style="display: flex;justify-content: flex-end;padding: 0 20rpx 20rpx;">
							<tui-button
								v-if="item.status == 0" width="160rpx" height="52rpx" margin="0 20upx 0"
								:size="28"
								type="blue" shape="circle" @click="handleReview(item, 1, '开始审核')"
							>
								开始审核
							</tui-button>
							<tui-button
								v-if="item.status == 2" width="130rpx" height="52rpx" margin="0 20upx 0"
								:size="28"
								type="warning" shape="circle" @click="handleReview(item, 6, '已致电')"
							>
								已致电
							</tui-button>
							<tui-button
								v-if="item.status == 1" width="110rpx" height="52rpx" margin="0 20upx 0"
								:size="28"
								type="green" shape="circle" @click="handleReview(item, 2, '通过')"
							>
								通过
							</tui-button>
							<tui-button
								v-if="item.status == 1" width="110rpx" height="52rpx" margin="0 20upx 0"
								:size="28"
								type="danger" shape="circle" @click="handleReview(item, 5, '退回')"
							>
								退回
							</tui-button>
						</view>
					</template>
				</tui-card>
			</view>
		</view>
		<view v-else>
			<tui-no-data>暂无数据</tui-no-data>
		</view>
		<LoadMore v-show="reviewList.length" :status="status"></LoadMore>
	</view>
</template>

<script>
import { getUpgradeRequestListyApi, UpgradeRequestCarefulApi, UpgradeRequestMarketingApi, UpgradeRequestRegionalAgentApi } from '../../../api/user'
import { getUserId } from '../../../utils'

export default {
	name: 'ApplicationReview',
	data() {
		return {
			currentTab: 0,
			query: {
				page: 1,
				size: 10
			},
			totalPages: 0,
			status: 'none',
			reviewList: []
		}
	},
	onLoad() {
		this.getBrandReviewList()
	},

	methods: {
		handleChangeTab(e) {
			this.currentTab = e.index
			this.query.page = 1
			this.query.size = 10
			this.reviewList = []
			this.totalPages = 0
			this.getBrandReviewList()
		},
		getBrandReviewList(isLoadmore) {
			uni.showLoading({
				title: '加载中'
			})
			this.status = 'loading'
			getUpgradeRequestListyApi({ ...this.query, type: this.currentTab })
				.then(({ data }) => {
					this.totalPages = data.totalPages
					if (isLoadmore) {
						this.reviewList.push(...data.limit)
					} else {
						this.reviewList = data.limit
					}
					uni.hideLoading()
					this.status = 'none'
				})
				.catch(() => {
					uni.hideLoading()
					this.status = 'none'
				})
		},
		handleReview(row, status, operation) {
			uni.showModal({
				title: '提示',
				content: '确认要进行此操作\n[' + operation + row.name + '的申请表]？',
				success: (res) => {
					if (res.confirm) {
						const mapMethods = {
							0: {
								api: UpgradeRequestMarketingApi,
								reason: '审核通过'
							},
							1: {
								api: UpgradeRequestCarefulApi,
								reason: ''
							},
							2: {
								api: UpgradeRequestRegionalAgentApi,
								reason: '审核通过'
							}
						}
						mapMethods[this.currentTab].api({
							carefulId: row.id,
							status,
							reason: mapMethods[this.currentTab].reason
						}).then((res) => {
							this.$showToast('操作成功', 'success')
							this.getBrandReviewList()
						})
					}
				}
			})
		}
	},
	onReachBottom() {
		if (this.query.page >= this.totalPages) {
			this.status = 'no-more'
			return
		}
		if (this.query.size > this.reviewList.length) {
			return
		}
		this.query.page++
		this.getBrandReviewList(true)
	}
}
</script>

<style lang="less" scoped>
.application-review-container {
	min-height: 100vh;
	padding: 40upx 24upx 140upx 24upx;
	box-sizing: border-box;
	background-color: #eeeeee;

	.tui-tabs-view {
		/deep/ .tui-tabs-slider {
			margin-left: -24upx;
		}
	}
}
</style>
