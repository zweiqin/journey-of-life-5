<template>
	<view class="group-list-container">
		<JHeader tabbar="/pages/user/user" width="50" height="50" title="团购列表"></JHeader>
		<view v-if="grouponRecordList && grouponRecordList.length">
			<view v-for="(item, index) in grouponRecordList" :key="index" class="" style="padding-bottom: 35upx;">
				<tui-card
					:title="{ text: `团购ID：${item.groupon.id}` }" :tag="{ text: `${item.groupon.addTime || ''}` }"
					style="margin: 0;"
				>
					<template #body>
						<view style="padding: 16upx 24upx 26upx;font-size: 28upx;">
							<view>
								<view>
									<text>关联订单ID：</text>
									<text>{{ item.groupon.orderId || '--' }}</text>
								</view>
								<view style="display: flex;justify-content: space-between;">
									<view>
										<text>开团用户ID：</text>
										<text>{{ item.groupon.creatorUserId || '--' }}</text>
									</view>
									<view>
										<text>{{ item.groupon.payed ? '已支付' : '未支付' }}</text>
									</view>
								</view>
							</view>
							<view style="padding-top: 10upx;;margin-top: 20upx;border-top: 1upx solid #d4d4dd;">
								<GrouponRules title-inside :rules-data="item.rules">
									<template #goodsContent>
										<view style="display: flex;flex-wrap: wrap;padding: 10upx 0 0;">
											<tui-tag v-if="item.goods.isAppoint" type="warning" padding="12rpx" margin="0 10rpx">预约商品</tui-tag>
											<tui-tag v-if="item.goods.isHot" type="danger" padding="12rpx" margin="0 10rpx">热卖</tui-tag>
											<tui-tag v-if="item.goods.isNew" type="green" padding="12rpx" margin="0 10rpx">新品</tui-tag>
											<tui-tag v-if="item.goods.isOnSale" type="light-blue" padding="12rpx" margin="0 10rpx">在售</tui-tag>
											<tui-tag v-if="item.goods.supportVoucher" type="black" padding="12rpx" margin="0 10rpx">支持代金券</tui-tag>
										</view>
									</template>
								</GrouponRules>
							</view>
						</view>
					</template>
					<template #footer></template>
				</tui-card>
			</view>
		</view>
		<LoadMore v-show="grouponRecordList.length" :status="status"></LoadMore>
		<view v-if="grouponRecordList && !grouponRecordList.length && loadingStatus !== 'loading'" class="no-data">
			暂无消费者团购~
		</view>
	</view>
</template>

<script>
import { getGrouponListRecordApi } from '../../../api/user'
import { getUserId, getBrandId } from '../../../utils'
import GrouponRules from '../group-buying/components/GrouponRules.vue'

export default {
	name: 'GroupList',
	components: { GrouponRules },
	data() {
		return {
			grouponRecordList: [],
			grouponRecordQuery: {
				page: 1,
				size: 10,
				userId: getUserId(),
				brandId: getBrandId(),
				sort: 'add_time',
				order: 'desc'
			},
			totalPages: 0,
			status: 'none',
			loadingStatus: 'noMore'
		}
	},
	onShow() {
		this.getGrouponRecordList()
	},

	methods: {
		getGrouponRecordList(isLoadmore) {
			if (!getUserId()) return
			this.status = 'loading'
			this.loadingStatus = 'loading'
			getGrouponListRecordApi(this.grouponRecordQuery)
				.then(({ data }) => {
					console.log(data)
					this.totalPages = data.totalPages
					if (isLoadmore) {
						this.grouponRecordList.push(...data.items)
					} else {
						this.grouponRecordList = data.items
					}
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
				.catch(() => {
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
		}
	},
	onReachBottom() {
		if (this.grouponRecordQuery.page >= this.totalPages) {
			this.status = 'no-more'
			return
		}
		if (this.grouponRecordQuery.size > this.grouponRecordList.length) {
			return
		}
		this.grouponRecordQuery.page++
		this.getGrouponRecordList(true)
	}
}
</script>

<style lang="less" scoped>
.group-list-container {
	min-height: 100vh;
	padding: 40upx 24upx 140upx 24upx;
	box-sizing: border-box;
	background-color: #eeeeee;

	.no-data {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 180upx;
		color: #999999;
		font-size: 36upx;
		letter-spacing: 2px;
	}
}
</style>
