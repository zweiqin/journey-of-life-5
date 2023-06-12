<template>
	<view class="view-history-container">
		<JHeader width="50" height="50" tabbar="/pages/user/user" :title="currentPageInfo.title"></JHeader>
		<view class="navs">
			<view
				v-for="item in labelList" :key="item.label" class="item" :class="{ active: currentPage === item.value }"
				@click="handleSwitchNav(item.value)"
			>
				{{ item.name }}
			</view>
		</view>

		<view class="list-wrapper">
			<view v-show="currentPage === 'collection'">
				<tui-tabs
					style="width: 684upx;padding: 0 0upx 0 0upx;overflow: hidden;" :slider-width="375" :padding="0"
					item-width="342rpx" selected-color="#000000" bold slider-bg-color="#ff0000"
					:tabs="[{ name: '商品' }, { name: '店铺' }]" :current-tab="currentTab"
					@change="handleSwitchTab"
				></tui-tabs>
				<CollectionsGoods v-if="currentTab === 0" :data="collectionInfo.data" @delete="getCollections"></CollectionsGoods>
				<CollectionsStore v-else-if="currentTab === 1" :data="collectionInfo.data" @delete="getCollections"></CollectionsStore>
			</view>
			<FootPrint v-show="currentPage === 'history'" ref="footerPrintRef"></FootPrint>

			<uni-load-more v-show="loadingStatus !== 'hidden'" :status="loadingStatus"></uni-load-more>

			<JNoData v-show="showNoData" type="empty"></JNoData>
		</view>
	</view>
</template>

<script>
import {
	getUserViewHistoryApi,
	getUserCollectionListApi
} from '../../api/user'
import { getUserId } from '../../utils'
import FootPrint from './components/FootPrint.vue'
import CollectionsGoods from './components/CollectionsGoods.vue'
import CollectionsStore from './components/CollectionsStore.vue'

const mapCurrentInfo = {
	history: {
		title: '我的足迹',
		api: 'getFootPrint'
	},
	collection: {
		title: '我的收藏',
		api: 'getCollections'
	},
	follow: {
		title: '我的订阅'
	}
}

export default {
	name: 'ViewHistory',
	components: {
		FootPrint,
		CollectionsGoods,
		CollectionsStore
	},
	data() {
		return {
			currentPage: '',
			currentPageInfo: '',

			labelList: [
				{
					name: '收藏',
					value: 'collection'
				},
				{
					name: '历史',
					value: 'history'
				},
				{
					name: '订阅',
					value: 'follow'
				}
			],

			collectionInfo: {
				query: {
					page: 1,
					size: 20
				},
				data: [],
				totalPage: 0
			},
			currentTab: 0,

			historyInfo: {
				query: {
					page: 1,
					size: 20
				},
				data: {},
				totalPage: 0
			},

			loadingStatus: 'loading',
			showNoData: false
		}
	},
	onLoad(options) {
		this.currentPage = options.page
		this.currentPageInfo = mapCurrentInfo[this.currentPage]
		if (this.currentPageInfo.api) {
			this[this.currentPageInfo.api]()
		} else {
			this.loadingStatus = 'hidden'
			this.showNoData = true
		}
	},

	methods: {
		handleSwitchNav(currentPage) {
			this.currentPage = currentPage
			this.currentPageInfo = mapCurrentInfo[this.currentPage]
			this.currentPageInfo.api ? this[this.currentPageInfo.api]() : this.showNoData = true
		},
		handleSwitchTab(e) {
			this.currentTab = e.index
			this.collectionInfo.query.page = 1
			this.collectionInfo.query.size = 20
			this.collectionInfo.data = []
			this.collectionInfo.totalPage = 0
			this.getCollections()
		},

		// 获取足迹数据
		getFootPrint() {
			const _this = this
			this.loadingStatus = 'loading'
			getUserViewHistoryApi({
				...this.historyInfo.query,
				userId: getUserId()
			}).then(({ data }) => {
				_this.historyInfo.totalPage = data.totalPages
				for (const item of data.footprintList) {
					const key = item.addTime.split(' ')[0]
					const data = _this.historyInfo.data
					if (!data[key]) {
						data[key] = [ item ]
					} else {
						data[key].push(item)
					}
				}
				this.loadingStatus = 'hidden'
				this.$refs.footerPrintRef.setData(this.historyInfo.data)
				this.showNoData = JSON.stringify(this.historyInfo.data) === '{}'
			})
		},

		// 获取收藏数据
		getCollections(isLoadmore) {
			const _this = this
			this.loadingStatus = 'loading'
			getUserCollectionListApi({
				...this.collectionInfo.query,
				userId: getUserId(),
				type: this.currentTab === 0 ? 0 : this.currentTab === 1 ? 2 : ''
			}).then(({ data }) => {
				console.log(data)
				_this.collectionInfo.totalPage = data.totalPages
				if (isLoadmore) {
					_this.collectionInfo.data.push(...data.collectList)
				} else {
					_this.collectionInfo.data = data.collectList
					this.showNoData = this.collectionInfo.data.length == 0
				}
				_this.loadingStatus = 'hidden'
			})
		}
	},

	onReachBottom() {
		switch (this.currentPage) {
			case 'history':
				if (this.historyInfo.data.length < this.historyInfo.query.size) {
					return
				}
				if (this.historyInfo.query.page >= this.historyInfo.totalPage) {
					this.loadingStatus = 'noMore'
					return
				}
				if (this.historyInfo.query.page < this.historyInfo.totalPage) {
					this.historyInfo.query.page++
					this.getFootPrint()
				}
				break
			case 'collection':
				if (this.collectionInfo.data.length < this.collectionInfo.query.size) {
					return
				}
				if (this.collectionInfo.query.page >= this.collectionInfo.totalPage) {
					this.loadingStatus = 'noMore'
					return
				}
				if (this.collectionInfo.query.page < this.collectionInfo.totalPage) {
					this.collectionInfo.query.page++
					this.getCollections(true)
				}
				break
		}
	}
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";

.view-history-container {
	padding: 50upx 32upx;
	box-sizing: border-box;

	.navs {
		.flex();
		font-size: 24upx;
		padding: 34upx 0 30upx 0;
		border-bottom: 1upx solid #d8d8d8;

		.active {
			color: #fa5151ff;
		}
	}
	.tui-tabs-view{
		/deep/ .tui-tabs-slider{
		margin-left: -32upx;
		}
	}
}
</style>
