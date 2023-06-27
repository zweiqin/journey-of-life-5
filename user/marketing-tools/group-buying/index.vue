<template>
	<view class="group-buying-container">
		<JHeader tabbar="/pages/user/user" width="50" height="50" title="团购规则列表"></JHeader>
		<view style="width: 70%;margin: 14rpx auto 14rpx;">
			<tui-button
				type="blue" bold shape="circle" width="100%"
				@click="go(`/user/marketing-tools/group-buying/group-buying-form`)"
			>
				新建团购规则
			</tui-button>
		</view>
		<view v-if="grouponList && grouponList.length">
			<view v-for="(item, index) in grouponList" :key="index" class="" style="padding-bottom: 35upx;">
				<GrouponRules :rules-data="item">
					<view style="display: flex;justify-content: flex-end;padding: 0 20rpx 20rpx;">
						<tui-button
							type="danger" width="120rpx" height="50rpx" style="border-radius: 50rpx;"
							@click="go(`/user/marketing-tools/group-buying/group-buying-form?id=${item.id}`)"
						>
							编辑
						</tui-button>
						<tui-button
							type="danger" width="120rpx" height="50rpx" margin="0 0 0 20upx"
							style="border-radius: 50rpx;"
							@click="handleDeleteGroupon(item)"
						>
							删除
						</tui-button>
					</view>
				</GrouponRules>
			</view>
		</view>
		<LoadMore v-show="grouponList.length" :status="status"></LoadMore>
		<view v-if="grouponList && !grouponList.length && loadingStatus !== 'loading'" class="no-data">
			暂未设置团购规则~
		</view>
	</view>
</template>

<script>
import { getGrouponListRuleApi, deleteGrouponRuleApi } from '../../../api/user'
import { J_USER_INFO } from '../../../constant'
import { getUserId, getBrandId } from '../../../utils'
import GrouponRules from './components/GrouponRules.vue'

export default {
	name: 'GroupBuying',
	components: { GrouponRules },
	onLoad(options) { },
	data() {
		return {
			grouponList: [],
			grouponQuery: {
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
		this.getGrouponList()
	},

	methods: {
		getGrouponList(isLoadmore) {
			if (!getUserId()) return
			this.status = 'loading'
			this.loadingStatus = 'loading'
			getGrouponListRuleApi(this.grouponQuery)
				.then(({ data }) => {
					console.log(data)
					this.totalPages = data.totalPages
					if (isLoadmore) {
						this.grouponList.push(...data.items)
					} else {
						this.grouponList = data.items
					}
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
				.catch(() => {
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
		},
		handleDeleteGroupon(item) {
			deleteGrouponRuleApi({ id: item.id })
				.then(({ data }) => {
					this.$showToast('删除成功')
					this.getGrouponList()
				})
				.catch(() => {
				})
		}
	},
	onReachBottom() {
		if (this.grouponQuery.page >= this.totalPages) {
			this.status = 'no-more'
			return
		}
		if (this.grouponQuery.size > this.grouponList.length) {
			return
		}
		this.grouponQuery.page++
		this.getGrouponList(true)
	}
}
</script>

<style lang="less" scoped>
.group-buying-container {
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
