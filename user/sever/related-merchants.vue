<template>
	<view class="related-merchants-container">
		<view style="padding: 30upx 20upx;color: #000000;">
			<JHeader width="50" height="50" title="关联商家"></JHeader>
		</view>
		<tui-tabs
			item-width="50%" selected-color="#000000" bold slider-bg-color="#ff0000"
			:tabs="[{ name: '已绑定' }, { name: '未绑定' }]" :current-tab="currentTab"
			@change="(e) => currentTab = e.index"
		></tui-tabs>
		<view class="related-merchants" style="margin: 20upx 30upx;background-color: #fff;">

			<view v-show="currentTab === 0">
				<view v-if="merchantsList && merchantsList.length">
					<BeeBrandPane v-for="item in merchantsList" :key="item.id" :is-positioning="false" :brand-info="item"></BeeBrandPane>
				</view>
				<view v-else>
					<tui-no-data>暂无数据</tui-no-data>
				</view>
			</view>

			<view v-show="currentTab === 1">
				<view v-if="merchantsBePendingList && merchantsBePendingList.length">
					<BeeBrandPane v-for="item in merchantsBePendingList" :key="item.id" :is-positioning="false" :brand-info="item"></BeeBrandPane>
				</view>
				<view v-else>
					<tui-no-data>暂无数据</tui-no-data>
				</view>
			</view>

		</view>
		<LoadMore v-show="merchantsList.length" :status="status"></LoadMore>
	</view>
</template>

<script>
import { getSelectBrandListApi, getBePendingApi } from '../../api/user'
import { getUserId, getBrandId } from '../../utils'

export default {
	name: 'RelatedMerchants',
	components: {},
	data() {
		return {
			currentTab: 0,
			merchantsBePendingList: [],
			merchantsList: [],
			query: {
				page: 1,
				size: 10,
				userId: getUserId() // 230，getUserId()
			},
			totalPages: 0,
			status: 'none'
		}
	},
	onLoad() {
		this.getMerchantsList()
		this.getMerchantsBePendingList()
	},
	mounted() {
	},
	methods: {
		getMerchantsList(isLoadmore) {
			uni.showLoading({
				title: '加载中'
			})
			this.status = 'loading'
			if (!getUserId()) return
			getSelectBrandListApi(this.query)
				.then(({ data }) => {
					this.totalPages = data.totalPages
					if (isLoadmore) {
						this.merchantsList.push(...data.brandList)
					} else {
						this.merchantsList = data.brandList
					}
					uni.hideLoading()
					this.status = 'none'
				})
				.catch(() => {
					uni.hideLoading()
					this.status = 'none'
				})
		},
		getMerchantsBePendingList() {
			uni.showLoading({
				title: '加载中'
			})
			if (!getUserId()) return
			getBePendingApi({ userId: getUserId() })
				.then(({ data }) => {
					console.log(data)
					this.merchantsBePendingList = data
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		}
	},
	onReachBottom() {
		if (this.currentTab === 0) {
			if (this.query.page >= this.totalPages) {
				this.status = 'no-more'
				return
			}
			if (this.query.size > this.merchantsList.length) {
				return
			}
			this.query.page++
			this.getMerchantsList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.related-merchants-container {
	min-height: 100vh;
	width: 100%;
	background: #f6f6f6;

}
</style>
