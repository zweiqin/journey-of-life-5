<template>
	<view class="wrap-record-container">
		<view style="padding: 30upx 20upx;color: #000000;">
			<JHeader width="50" height="50" title="代金券记录"></JHeader>
		</view>
		<view class="wrap-record">

			<view v-if="voucherRecordList && voucherRecordList.length">
				<view v-for="item in voucherRecordList" :key="item.id" style="padding: 24upx;background-color: #ffffff;">
					<view style="display: flex;justify-content: space-between;align-items: center;font-size: 26upx;color: #999999;">
						<view>
							类型：
							<text v-if="item.type === 1">代金券转赠</text>
							<text v-else-if="item.type === 2">代金券充值</text>
							<text v-else-if="item.type === 3">订单收入</text>
							<text v-else-if="item.type === 4">佣金收入</text>
							<text v-else>--</text>
						</view>
						<view>来源：{{ item.name || '未知' }}</view>
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
</template>

<script>
import { getBrandVoucherRecordApi } from '../../../api/user'
import { getUserId, getBrandId } from '../../../utils'

export default {
	name: 'VoucherRecordList',
	components: {},
	data() {
		return {
			voucherRecordList: []
		}
	},
	onLoad() {
		this.getBrandVoucherRecordList()
	},
	mounted() {
	},
	methods: {
		getBrandVoucherRecordList() {
			uni.showLoading({
				title: '加载中'
			})
			getBrandVoucherRecordApi({ userId: getUserId() })
				.then(({ data }) => {
					console.log(data)
					this.voucherRecordList = data
					uni.hideLoading()
				})
		}
	},
	onPageScroll(e) { },
	onReachBottom() { }
}
</script>

<style lang="less" scoped>
.wrap-record-container {
	min-height: 100vh;
	width: 100%;
	background: #f6f6f6;

}
</style>
