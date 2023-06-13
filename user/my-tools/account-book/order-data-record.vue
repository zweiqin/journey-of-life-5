<template>
	<view class="order-data-record-container">
		<view style="padding: 30upx 20upx;color: #000000;">
			<JHeader width="50" height="50" title="订单数据统计"></JHeader>
		</view>
		<view style="padding: 20upx;">
			<view style="margin-top: 20upx;padding: 30upx;background-color: #ffffff;border-radius: 40upx;">
				<view style="font-size: 28upx;">订单数量</view>
				<view
					style="display: flex;justify-content: space-between;align-items: center;width: 100%;margin-top: 30upx;font-size: 28upx;text-align: center;"
				>
					<view style="max-width: 33%;">
						<view>当前佣金</view>
						<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
							{{ typeof orderNumber.orderToday === 'number' ? orderNumber.orderToday : '--' }}
						</view>
					</view>
					<view style="max-width: 33%;">
						<view>累计佣金</view>
						<view
							style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
						>
							{{ typeof orderNumber.orderTotal === 'number' ? orderNumber.orderTotal : '--' }}
						</view>
					</view>
					<view style="max-width: 33%;">
						<view>今日佣金</view>
						<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
							{{ typeof orderNumber.orderWritten === 'number' ? orderNumber.orderWritten : '--' }}
						</view>
					</view>
				</view>
			</view>
			<view style="margin-top: 20upx;padding: 30upx;background-color: #ffffff;border-radius: 40upx;">
				<view style="font-size: 28upx;">订单数量</view>
				<view
					style="display: flex;justify-content: space-between;align-items: center;width: 100%;margin-top: 30upx;font-size: 28upx;text-align: center;"
				>
					<view style="max-width: 30%;">
						<view>当前佣金</view>
						<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
							{{ typeof orderRecords.allRecords === 'number' ? orderRecords.allRecords : '--' }}
						</view>
					</view>
					<view style="max-width: 30%;">
						<view>累计佣金</view>
						<view
							style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
						>
							{{ typeof orderRecords.currentRecords === 'number' ? orderRecords.currentRecords : '--' }}
						</view>
					</view>
					<view>
						<view>今日佣金</view>
						<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
							{{ typeof orderRecords.expectedRecords === 'number' ? orderRecords.expectedRecords : '--' }}
						</view>
					</view>
					<view style="max-width: 30%;">
						<view>累计提现</view>
						<view
							style="margin-top: 10upx;font-size: 36upx;font-weight: bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
						>
							{{ typeof orderRecords.toDaysRecords === 'number' ? orderRecords.toDaysRecords : '--' }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="order-data-record" style="padding-bottom: 40upx;background-color: #ffffff;border-radius: 25upx;overflow: hidden;">
			<tui-tabs
				item-width="50%" selected-color="#000000" bold slider-bg-color="#ff0000"
				:tabs="[{ name: '入账出账' }, { name: '订单' }]" :current-tab="currentTab" @change="handleSwitchTab"
			></tui-tabs>

			<view v-if="currentTab === 0">
				<view v-if="orderDataRecord && orderDataRecord.length">
					<view v-for="item in orderDataRecord" :key="item.id" style="padding: 24upx;">
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
					<tui-no-data :fixed="false" style="margin: 100upx 0;">暂无数据</tui-no-data>
				</view>
			</view>

			<view v-else-if="currentTab === 1">
				<view v-if="orderList && orderList.length" style="background-color: #f6f6f6;">
					<view
						v-for="item in orderList" :key="item.id"
						style="margin-bottom: 25upx;padding: 20upx;background-color: #ffffff;"
					>
						<view style="color: #666666;">订单编号：{{ item.orderSn }}</view>
						<view style="margin: 20upx;padding: 20upx;font-size: 26upx;background-color: #eeeeee;">
							<view>收货人：{{ item.consignee }}-{{ item.mobile }}</view>
							<view>{{ item.address }}</view>
							<view v-if="item.message">留言：{{ item.message }}</view>
						</view>
						<view>
							<view v-if="item.freightPrice">配送费用：￥{{ item.freightPrice }}</view>
							<view v-if="item.couponPrice">优惠券减免：￥{{ item.couponPrice }}</view>
							<view v-if="item.integralPrice">用户积分减免：￥{{ item.integralPrice }}</view>
							<view v-if="item.grouponPrice">团购优惠价减免：￥{{ item.grouponPrice }}</view>
						</view>
						<view style="padding: 0 20upx;">
							<view style="display: flex;justify-content: space-between;">
								<view style="text-align: right;">总费用：<text style="color: red;">￥{{ item.goodsPrice }}</text></view>
								<view style="text-align: right;">订单费用：<text style="color: red;">￥{{ item.orderPrice }}</text></view>
							</view>
							<view style="text-align: right;">实付费用：<text style="color: red;">￥{{ item.actualPrice }}</text></view>
							<view style="margin-top: 12upx;padding-top: 12upx;;border-top: 1px solid #dddddd;">
								<view style="display: flex;justify-content: space-between;font-size: 26upx;color: #999999;">
									<text>创建时间：</text>
									<text>{{ new Date(item.addTime).toLocaleString() }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<LoadMore v-show="orderList.length" :status="status"></LoadMore>
			</view>
		</view>
	</view>
</template>

<script>
import { getBrandOrderNumberApi, getBrandOrderRecordsApi, getBrandLedgerRecordsApi, getBrandOrderListApi } from '../../../api/user'
import { getUserId, getBrandId, transformNumber } from '../../../utils'

export default {
	name: 'OrderDataRecord',
	components: {},
	data() {
		return {
			orderNumber: {},
			orderRecords: {},
			orderDataRecord: [],
			currentTab: 0,
			orderList: [],
			query: {
				page: 1,
				size: 10,
				userId: getUserId(),
				brandId: getBrandId()
			},
			totalPages: 0,
			status: 'none'
		}
	},
	onShow() {
		this.getBrandOrderNumber()
		this.getBrandOrderRecords()
		if (this.currentTab === 0) {
			this.getBrandLedgerRecords()
		} else if (this.currentTab === 1) {
			this.query.page = 1
			this.query.size = 10
			this.getBrandOrderList()
		}
	},
	mounted() {
	},
	methods: {
		transformNumber,
		getBrandOrderNumber() {
			getBrandOrderNumberApi({ userId: getUserId(), brandId: getBrandId() })
				.then(({ data }) => {
					console.log(data)
					this.orderNumber = data || {}
				})
		},
		getBrandOrderRecords() {
			getBrandOrderRecordsApi({ userId: getUserId(), brandId: getBrandId() })
				.then(({ data }) => {
					console.log(data)
					this.orderRecords = data || {}
				})
		},
		getBrandLedgerRecords() {
			uni.showLoading({
				title: '加载中'
			})
			getBrandLedgerRecordsApi({ userId: getUserId(), brandId: getBrandId() })
				.then(({ data }) => {
					console.log(data)
					this.orderDataRecord = data
					uni.hideLoading()
				})
		},
		getBrandOrderList(isLoadmore) {
			uni.showLoading({
				title: '加载中'
			})
			this.status = 'loading'
			if (!getUserId()) return
			getBrandOrderListApi(this.query)
				.then(({ data }) => {
					this.totalPages = data.totalPages
					if (isLoadmore) {
						this.orderList.push(...data.orderList)
					} else {
						this.orderList = data.orderList
					}
					uni.hideLoading()
					this.status = 'none'
				})
				.catch(() => {
					uni.hideLoading()
					this.status = 'none'
				})
		},
		handleSwitchTab(e) {
			this.currentTab = e.index
			if (this.currentTab === 0) {
				this.getBrandLedgerRecords()
			} else if (this.currentTab === 1) {
				this.query.page = 1
				this.query.size = 10
				this.getBrandOrderList()
			}
		}
	},
	onPageScroll(e) { },
	onReachBottom() {
		if (this.currentTab === 1) {
			if (this.query.page >= this.totalPages) {
				this.status = 'no-more'
				return
			}
			if (this.query.size > this.orderList.length) {
				return
			}
			this.query.page++
			this.getBrandOrderList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.order-data-record-container {
	min-height: 100vh;
	width: 100%;
	background: #f6f6f6;

}
</style>
