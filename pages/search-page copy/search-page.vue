<template>
	<!-- pages/search-page/search-page.wxml -->
	<view class="container">
		<!-- 搜索框 -->
		<view class="search-bar">
			<view class="search-box">
				<input
					placeholder="输入关键字搜索" class="sear-input" confirm-type="search" :value="queryStr"
					@confirm="toSearchProdPage" @input="search"
				/>
				<image src="/static/images/icon/search.png" class="search-img"></image>
			</view>
			<text class="search-hint" @tap="goBackIndex">取消</text>
		</view>

		<view v-if="searchHistory[type] && searchHistory[type].length" class="search-display">
			<view class="history-search">
				<view class="title-text history-line">
					搜索历史
					<view class="clear-history">
						<image src="/static/images/icon/clear-his.png" @tap="clearSearch"></image>
					</view>
				</view>
				<block v-for="(item, index) in searchHistory[type]" :key="index">
					<view class="his-search-tags">
						<text class="tags" @click="handleResearch(item)">{{ item }}</text>
					</view>
				</block>
			</view>

			<Article :data="data" :status="loadingStatus"></Article>

			<view v-if="isShowNoData">
				<tui-no-data>暂无优惠券</tui-no-data>
			</view>
		</view>
	</view>
</template>

<script>
import {
	J_ARTICLE_SEARCH_HISTORY,
	J_GOODS_SEARCH_HISTORY
} from '../../constant'

import { getIndustryInformationListApi } from '../../api/marketing-treasure-house'
import Article from '../../pages/marketing-treasure-house/components/article-pane'
import { debounce } from '../../utils'

const mapUrl = {
	article: '/pages/marketing-treasure-house/marketing-treasure-house',
	goods: '/pages/index/index'
}

const mapCatch = {
	article: J_ARTICLE_SEARCH_HISTORY,
	goods: J_GOODS_SEARCH_HISTORY
}

export default {
	name: 'SearchPage',
	components: {
		Article
	},
	data() {
		return {
			hotSearchList: [],
			prodName: '',
			type: '',
			searchHistory: {
				article: uni.getStorageSync(J_ARTICLE_SEARCH_HISTORY) || []
			},
			queryStr: '',
			search: null,
			data: [],
			query: {
				page: 1,
				size: 10
			},
			totalData: 0,
			loadingStatus: 'more',
			isShowNoData: false
		}
	},
	onLoad(options) {
		this.type = options.type
		this.search = debounce(this.handleSearch, 500)
	},

	methods: {
		// 点击取消
		goBackIndex() {
			this.$switchTab(mapUrl[this.type])
		},

		// 点击确认
		toSearchProdPage() { },

		// 搜索
		handleSearch(e) {
			const { value } = e.detail
			value.trim() ? this.loadData(value) : this.data = []
		},

		// 搜索数据
		loadData(value, isLoadMore) {
			this.setHistory(value)
			this.queryStr = value
			getIndustryInformationListApi({
				...this.query,
				title: value
			}).then(({ data }) => {
				this.totalData = data.total
				if (isLoadMore) {
					this.data.push(...data.items)
				} else {
					this.data = data.items
				}
				console.log(this.data)
				this.isShowNoData = this.data.length === 0
			})
		},

		// 重新缓存历史
		setHistory(history) {
			if (!this.searchHistory[this.type].includes(history)) {
				this.searchHistory[this.type].push(history)
				uni.setStorageSync(mapCatch[this.type], this.searchHistory[this.type])
			}
		},

		// 删除历史
		clearSearch() {
			const _this = this
			uni.showModal({
				title: '提示',
				content: '清空全部历史吗？',
				success(res) {
					if (res.confirm) {
						uni.setStorageSync(mapCatch[_this.type], [])
						_this.searchHistory[_this.type] = []
					}
				}
			})
		},

		// 重新搜索
		handleResearch(keywords) {
			this.loadData(keywords)
		}
	},

	onReachBottom() {
		if (this.data.length < this.query.size) {
			this.loadingStatus = 'more'
			return
		}

		if (this.data.length >= this.totalData) {
			this.loadingStatus = 'noMore'
			return
		}

		this.query.page++
		this.loadData(this.queryStr, true)
	}
}
</script>

<style>
@import "./search-page.css";
</style>
