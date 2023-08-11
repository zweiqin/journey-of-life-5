<template>
	<view class="refund-management-container">
		<view style="padding: 30upx 20upx;color: #000000;">
			<JHeader width="50" height="50" title="退款审核"></JHeader>
		</view>
		<view class="refund-management" style="padding-bottom: 40upx;border-radius: 25upx;overflow: hidden;">

			<view v-if="refundsList && refundsList.length" style="background-color: #f6f6f6;">
				<view
					v-for="item in refundsList" :key="item.id"
					style="margin-bottom: 25upx;padding: 20upx;background-color: #ffffff;"
				>
					<view style="display: flex;justify-content: space-between;">
						<view style="color: #666666;">订单ID：{{ item.orderId }}</view>
						<view>
							<text>状态：</text>
							<text style="font-weight: bold;">
								<text v-if="item.refundStatus === -1" style="color: #f72206;">拒绝通过</text>
								<text v-else-if="item.refundStatus === 0" style="color: #1a81e2;">待审核</text>
								<text v-else-if="item.refundStatus === 1" style="color: #07c160;">通过审核</text>
								<text v-else-if="item.refundStatus === 2">管理员已处理</text>
								<text v-else-if="item.refundStatus === 3">成功</text>
								<text v-else-if="item.refundStatus === 4">失败</text>
								<text v-else>--</text>
							</text>
						</view>
					</view>
					<view style="margin: 20upx;padding: 20upx;font-size: 26upx;background-color: #eeeeee;">
						<view>用户退款原因：{{ item.refundOtherReson }}</view>
						<view style="margin-top: 10upx;">用户备注：{{ item.refundRemark }}</view>
					</view>
					<view style="padding: 0 20upx;">
						<view>
							<view style="text-align: left;">退款金额：<text style="color: red;">￥{{ item.backMoney }}</text></view>
							<view style="display: flex;justify-content: flex-end;">
								<tui-button
									v-if="item.refundStatus === 0"
									type="green" width="180rpx" height="60rpx" margin="0 20upx 0 0"
									style="border-radius: 50rpx;"
									@click="handleCheckRefund(item, 0)"
								>
									通过申请
								</tui-button>
								<tui-button
									v-if="item.refundStatus === 0"
									type="danger" width="120rpx" height="60rpx" style="border-radius: 50rpx;"
									@click="handleCheckRefund(item, 1)"
								>
									驳回
								</tui-button>
							</view>
						</view>
						<view style="margin-top: 12upx;padding-top: 12upx;;border-top: 1px solid #dddddd;">
							<view style="display: flex;justify-content: space-between;font-size: 26upx;color: #999999;">
								<text>申请时间：</text>
								<text>{{ new Date(item.createTime).toLocaleString() }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else>
				<tui-no-data>暂无数据</tui-no-data>
			</view>

			<!-- 退款审核dialog -->
			<tui-dialog
				style="position: relative;z-index: 888;" :buttons="[{ text: '取消' }, { text: '提交', color: '#586c94' }]"
				:show="isShowCheckRefundDialog" title="退款审核" @click="handleClickCheckRefundDialog"
			>
				<template #content>
					<view>
						<tui-input
							v-if="checkRefund.status === 1" v-model="checkRefund.reason" padding="26upx 0" label="驳回原因"
							placeholder="填写驳回原因"
						></tui-input>
						<tui-input
							v-model="checkRefund.reason" padding="26upx 0" label="备注"
							:placeholder="`填写${checkRefund.status === 0 ? '通过审核' : '驳回'}备注`"
						></tui-input>
					</view>
				</template>
			</tui-dialog>

		</view>
	</view>
</template>

<script>
import { getOrderRefundsListApi, updateOrderRefundsToExamineApi } from '../../../api/user'
import { getUserId, getBrandId } from '../../../utils'

export default {
	name: 'RefundManagement',
	components: {},
	data() {
		return {
			refundsList: [],
			isShowCheckRefundDialog: false,
			checkRefund: {
				id: '',
				status: '',
				reason: '',
				shopRejectReason: ''
			}
		}
	},
	onLoad() {
		this.getOrderRefundsList()
	},
	mounted() {
	},
	methods: {
		getOrderRefundsList() {
			getOrderRefundsListApi({ brandId: getBrandId() })
				.then(({ data }) => {
					console.log(data)
					this.refundsList = data || []
				})
		},
		handleCheckRefund(item, e) {
			this.checkRefund = {
				id: '',
				status: '',
				reason: '',
				shopRejectReason: ''
			}
			this.checkRefund.id = item.id
			this.checkRefund.status = e
			this.isShowCheckRefundDialog = true
		},
		async handleClickCheckRefundDialog(e) {
			console.log(e)
			if (e.index === 0) {
			} else if (e.index === 1) {
				if (!getUserId()) return
				if (!this.checkRefund.id) return this.$showToast('缺少订单信息')
				if (!this.checkRefund.status === 0 && !this.checkRefund.status === 1) return this.$showToast('缺少审核状态')
				await updateOrderRefundsToExamineApi(this.checkRefund)
					.then((res) => {
						this.$showToast(`${this.checkRefund.status === 0 ? '通过审核' : '驳回'}成功`)
						this.getOrderRefundsList()
					})
			}
			this.checkRefund = {
				id: '',
				status: '',
				reason: '',
				shopRejectReason: ''
			}
			this.isShowCheckRefundDialog = false
		}
	}
}
</script>

<style lang="less" scoped>
.refund-management-container {
	min-height: 100vh;
	width: 100%;
	background: #f6f6f6;

}
</style>
