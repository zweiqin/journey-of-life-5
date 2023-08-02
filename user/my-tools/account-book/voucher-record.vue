<template>
	<view class="wrap-record-container">
		<view style="padding: 30upx 20upx;color: #000000;">
			<JHeader width="50" height="50" title="代金券记录"></JHeader>
		</view>
		<view class="wrap-record">

			<view v-if="voucherRecordList && voucherRecordList.length">
				<view v-for="item in voucherRecordList" :key="item.id" style="padding: 24upx;background-color: #ffffff;">
					<IncomeRecord :data="item" show-type="2"></IncomeRecord>
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
