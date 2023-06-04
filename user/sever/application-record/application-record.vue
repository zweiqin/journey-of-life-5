<template>
	<view class="application-record-container">
		<view style="padding: 30upx 20upx;color: #000000;">
			<JHeader width="50" height="50" title="申请记录"></JHeader>
		</view>
		<view v-if="applicationRecordList && applicationRecordList.length">
			<view v-for="(item, index) in applicationRecordList" :key="index" class="" style="padding-bottom: 45upx;">
				<tui-card
					:title="{ text: item.type === 0 ? '普通营销策划师申请' : item.type === 1 ? '商家申请' : item.type === 2 ? '区域代理申请' : '--' }"
					:tag="{ text: `申请用户ID：${item.userId}` }"
				>
					<template #body>
						<view style="padding: 20upx 30upx;">
							<view v-if="item.type === 0">
								<view>分公司所属地区：{{ item.area }}</view>
								<view>策划师所属地区：{{ item.areaUser }}</view>
							</view>
							<view v-if="item.type === 1">
								<view>联系名称：{{ item.name }}</view>
								<view>联系电话：{{ item.phone }}</view>
							</view>
							<view style="display: flex;">
								<view>详细地址：</view>
								<view style="flex: 1;">{{ item.address }}</view>
							</view>
							<view>
								<text>审核状态：</text>
								<text v-if="item.status === 0">待审核</text>
								<text v-else-if="item.status === 1">审核中</text>
								<text v-else-if="item.status === 2">审核通过</text>
								<text v-else-if="item.status === 3">未付款</text>
								<text v-else-if="item.status === 4">已付款</text>
								<text v-else-if="item.status === 5">已驳回</text>
								<text v-else-if="item.status === 6">已通话</text>
								<text v-else>--</text>
							</view>
							<view>
								<text>审核方式：</text>
								<text v-if="item.auditMethod === 0">电话</text>
								<text v-else-if="item.auditMethod === 1">实体考察</text>
								<text v-else>--</text>
							</view>
							<view>提交时间：{{ new Date(item.createTime).toLocaleString() || '--' }}</view>
						</view>
					</template>
					<template #footer>
						<view style="display: flex;justify-content: space-between;padding: 0 20rpx 20rpx;">
							<tui-button v-if="item.type === 0 && item.status === 2" type="warning" width="120rpx" height="50rpx" style="border-radius: 50rpx;" @click="handleApplicationPay(item)">去支付</tui-button>
							<tui-button v-if="item.type === 1 && item.status === 2" type="warning" width="120rpx" height="50rpx" style="border-radius: 50rpx;" @click="handleApplicationPay(item)">去支付</tui-button>
						</view>
					</template>
				</tui-card>
			</view>
		</view>
		<view v-else>
			<tui-no-data>暂无数据</tui-no-data>
		</view>
	</view>
</template>

<script>
import { upgradeRequestSelectApplyApi, upgradeOrderAddOrderApi } from '../../../api/user'
import { payOrderGoodsApi } from '../../../api/goods'
import { getUserId } from '../../../utils'
import { payFn } from '../../../utils/pay'
import { J_PAY_TYPE } from '../../../constant'

export default {
	name: 'ApplicationRecord',
	data() {
		return {
			applicationRecordList: []
		}
	},
	onLoad(options) {
		uni.showLoading({
			title: '加载中'
		})
		upgradeRequestSelectApplyApi({ userId: getUserId() }) // getUserId()
			.then((res) => {
				console.log(res)
				this.applicationRecordList = res.data
				uni.hideLoading()
			})
			.catch((e) => {
				uni.hideLoading()
			})
	},

	methods: {
		handleBack() {
			uni.switchTab({
				url: '/pages/user/user'
			})
		},
		handleApplicationPay(item) {
			upgradeOrderAddOrderApi({
				userId: getUserId(),
				packageId: item.packageId
			}).then(({ data }) => {
				payOrderGoodsApi({
					orderNo: data.payOrderID,
					userId: getUserId(),
					payType: 4
				}).then((res) => {
					payFn(res, J_PAY_TYPE.VIP.value)
				})
			})
		}
	},

	onReachBottom() { }
}
</script>

<style lang="less" scoped>
.application-record-container {
	position: relative;
	box-sizing: border-box;
	height: 100vh;
	background-color: #eeeeee;
	overflow-y: auto;
}
</style>
