<template>
	<view class="wrap-record-container">
		<view style="padding: 30upx 20upx;color: #000000;">
			<JHeader width="50" height="50" title="红包列表"></JHeader>
		</view>
		<view class="wrap-record">

			<view v-if="wrapRecordList && wrapRecordList.length">
				<view
					v-for="(item, index) in wrapRecordList" :key="item.id" class=""
					style="margin: 25upx;padding: 20upx 30upx;background-color: #ffffff;"
				>
					<view>发布者：{{ item.publisherName || '--' }}</view>
					<view>发布时间：{{ new Date(item.createTime).toLocaleString() }}</view>
					<view>
						红包类型：
						<text v-if="item.wrapType === 0">普通红包</text>
						<text v-else-if="item.wrapType === 1">携带优惠券红包</text>
						<text v-else>--</text>
					</view>
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<view>红包个数：{{ typeof item.redpackNumber === 'number' ? item.redpackNumber : '--' }}</view>
						<view style="font-size: 26upx;color: #999999;">{{ item.isRandom === 0 ? '金额随机' : item.isRandom === 1 ? '金额不随机' : '--' }}</view>
					</view>
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<view>红包总金额：{{ typeof item.redpackAllmonkey === 'number' ? item.redpackAllmonkey : '--' }}</view>
						<view style="font-size: 26upx;color: #999999;">{{ item.isPay === 0 ? '未支付' : item.isPay === 1 ? '已支付' : '--' }}</view>
					</view>
					<view>红包所在经纬度：{{ `${item.longitude},${item.latitude}` }}</view>
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<view>有效范围：{{ `${item.effectiveDistance}m` }}</view>
						<view style="font-size: 26upx;color: #999999;">{{ item.isIntact === 0 ? '未领取完' : item.isIntact === 1 ? '已领取完' : '--' }}</view>
					</view>
					<view>备注：{{ item.remark || '--' }}</view>
				</view>
			</view>
			<view v-else>
				<tui-no-data>暂无数据</tui-no-data>
			</view>

		</view>
	</view>
</template>

<script>
import { getBrandWrapListApi } from '../../../api/user'
import { getUserId, getBrandId } from '../../../utils'

export default {
	name: 'WrapRecordList',
	components: {},
	data() {
		return {
			wrapRecordList: []
		}
	},
	onLoad() {
		this.getWrapRecordList()
	},
	mounted() {
	},
	methods: {
		getWrapRecordList() {
			uni.showLoading({
				title: '加载中'
			})
			getBrandWrapListApi({ userId: getUserId() })
				.then(({ data }) => {
					console.log(data)
					this.wrapRecordList = data
					uni.hideLoading()
				})
		}
	}
}
</script>

<style lang="less" scoped>
.wrap-record-container {
	min-height: 100vh;
	width: 100%;
	background: #f6f6f6;

}
</style>
