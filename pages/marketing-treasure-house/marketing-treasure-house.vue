<template>
	<view class="daren-square-container">
		<!-- <view class="header">达人广场</view> -->
		<Navs></Navs>
		<view class="pane">
			<view
				v-for="item in tabConfig" :key="item.value" class="pane-item" :class="{ active: currentTab === item.value }"
				@click="handleSwitchTab(item.value)"
			>
				<text>{{ item.text }}</text>
			</view>
		</view>
		<OfficialMission v-if="currentTab == 0" :list="taskList"></OfficialMission>
		<MyTask v-else :list="taskList"></MyTask>

		<view class="main" style="position: relative;padding: 20upx;box-sizing: border-box;">
			<JLineTitle color="#FA5151" title="免费案例"></JLineTitle>
			<ArticlePane :scroll-top="scrollTop" :status="loadingStatus" :data="allList"></ArticlePane>
		</view>
	</view>
</template>

<script>
import Navs from './components/navs'
import ArticlePane from './components/article-pane.vue'
import MyTask from './components/my-task'
import OfficialMission from './components/officialMission'
import { getTaskListApi } from '../../api/square'
import { getIndustryInformationListApi } from '../../api/marketing-treasure-house'
import { J_USER_ID } from '../../constant'

export default {
	name: 'MarketingTreasureHouse',
	components: {
		Navs,
		OfficialMission,
		MyTask,
		ArticlePane
	},
	data() {
		return {
			currentTab: 0,
			tabConfig: [
				{
					text: '官方任务',
					value: 0
				}
			],

			taskQuery: {
				page: 1,
				limit: 20
			},
			taskTotals: 0,
			taskList: [],
			userId: '',

			allList: [],
			queryInfo: {
				page: 1,
				size: 10,
				isVip: false
			},
			total: 0,
			loadingStatus: 'loading',
			isLoading: false,
			scrollTop: 0
		}
	},

	onLoad() {
		this.getTaskList()
		this.userId = uni.getStorageSync(J_USER_ID)
		if (this.userId) {
			this.tabConfig.push({
				text: '我的任务',
				value: 1
			})
		}

		this.getArticleList()
	},
	onPageScroll(scrollTop) {
		this.scrollTop = scrollTop.scrollTop
	},
	onReachBottom() {
		if (this.allList.length >= this.total) {
			this.loadingStatus = 'noMore'
			return
		}
		if (this.isLoading) {
			return
		}
		this.queryInfo.page++
		this.loadingStatus = 'loading'
		this.isLoading = true
		this.getArticleList(true)
	},

	methods: {
		handleSwitchTab(currentTab) {
			this.currentTab = currentTab
			this.taskQuery.page = 1
			this.taskList = []
			if (currentTab === 1) {
				this.taskQuery.userId = this.userId
			} else {
				this.taskQuery.userId = ''
			}

			this.getTaskList()
		},

		async getArticleList(isLoadmore) {
			const res = await getIndustryInformationListApi({ ...this.queryInfo })
			if (isLoadmore) {
				this.allList.push(...res.data.items)
			} else {
				this.allList = res.data.items
			}
			this.total = res.data.total

			this.loadingStatus = 'more'
			this.isLoading = false
		},

		async getTaskList(isLoadMore) {
			const { data } = await getTaskListApi(this.taskQuery)
			console.log(data)
			if (isLoadMore) {
				this.taskList.push(...data.list)
			} else {
				this.taskList = data.list
			}

			this.taskTotals = Math.ceil(data.total / this.taskQuery.limit)
		}
	}
}
</script>

<style lang="less" scoped>
.daren-square-container {
	font-size: 28upx;
	width: 100%;
	height: auto;
	min-height: 100vh;
	background-color: #f6f6f6;
	padding-bottom: 160upx;

	.header {
		background-color: #fff;
		text-align: center;
		font-size: 32upx;
		padding: 54upx 0 54upx 0;
		font-weight: bold;
	}

	.pane {
		display: flex;
		padding: 0 15upx;
		box-sizing: border-box;
		justify-content: space-between;
		background-color: #fff;
		margin-top: 20upx;
		border-bottom: 1upx solid #d8d8d8;

		&-item {
			text-align: center;
			width: 268upx;
			font-size: 32upx;
			padding: 28upx 0;

			&::after {
				transition: all 350ms;
			}

			&.active {
				color: #fa5151;
				position: relative;
				font-weight: bold;

				&::after {
					width: 100%;
					height: 6upx;
					content: '';
					position: absolute;
					bottom: 0;
					left: 0;
					background: #f40;
				}
			}
		}
	}
}
</style>
