<template>
	<view class="distribute-products-container">
		<JHeader tabbar="/pages/user/user" width="50" height="50" title="分销产品列表"></JHeader>
		<view v-if="distributionGoodsList && distributionGoodsList.length">
			<view v-for="(item, index) in distributionGoodsList" :key="index" style="padding-bottom: 35upx;">
				<DistributedGoods :goods-data="item">
					<view style="display: flex;justify-content: flex-end;padding: 0 20rpx 20rpx;">
						<tui-button
							type="danger" width="180rpx" height="60rpx" style="border-radius: 50rpx;"
							@click="(form.id = item.id) && (isShowDistributeDialog = true)"
						>
							参与分销
						</tui-button>
					</view>
				</DistributedGoods>
			</view>
		</view>
		<view v-else>
			<tui-no-data>暂无数据</tui-no-data>
		</view>
		<LoadMore v-show="distributionGoodsList.length" :status="status"></LoadMore>

		<tui-dialog
			style="position: relative;z-index: 888;"
			:buttons="[{ text: '取消' }, { text: '确定', color: '#586c94' }]" :show="isShowDistributeDialog" title="设置佣金金额"
			@click="handleDistributeGoods"
		>
			<template #content>
				<tui-input v-model="form.commission" label="佣金金额" type="number" placeholder="请输入佣金金额">
					<template #right>
						<text>元</text>
					</template>
				</tui-input>
			</template>
		</tui-dialog>
	</view>
</template>

<script>
import { getDistributionGoodsSkuListApi, updateDistributionGoodsCheckedApi } from '../../../api/user'
import { J_USER_INFO } from '../../../constant'
import { getUserId, getBrandId } from '../../../utils'

export default {
	name: 'DistributeProducts',
	components: {},
	data() {
		return {
			distributionGoodsList: [],
			query: {
				page: 1,
				size: 10,
				brandId: getBrandId()
			},
			totalPages: 0,
			status: 'none',
			form: {
				id: '',
				commission: ''
			},
			isShowDistributeDialog: false
		}
	},
	onLoad() {
		if (!getBrandId()) return
		this.getDistributionGoodsSkuList()
	},

	methods: {
		getDistributionGoodsSkuList(isLoadmore) {
			if (!getBrandId()) return
			uni.showLoading({
				title: '加载中'
			})
			this.status = 'loading'
			getDistributionGoodsSkuListApi(this.query)
				.then(({ data }) => {
					this.totalPages = data.totalPages
					if (isLoadmore) {
						this.distributionGoodsList.push(...data.skuList)
					} else {
						this.distributionGoodsList = data.skuList
					}
					uni.hideLoading()
					this.status = 'none'
				})
				.catch(() => {
					uni.hideLoading()
					this.status = 'none'
				})
		},
		handleDistributeGoods(e) {
			if (!getBrandId()) return
			if (e.index === 0) {} else if (e.index === 1) {
				if (!this.form.commission) return this.$showToast('请填写佣金金额')
				uni.showLoading({
					title: '操作中'
				})
				updateDistributionGoodsCheckedApi({
					...this.form,
					brandId: getBrandId()
				})
					.then(({ data }) => {
						uni.hideLoading()
						this.$showToast('设置成功')
						this.getDistributionGoodsSkuList()
					})
					.catch(() => {
						uni.hideLoading()
					})
			}
			this.form.commission = ''
			this.isShowDistributeDialog = false
		}
	},
	onReachBottom() {
		if (this.query.page >= this.totalPages) {
			this.status = 'no-more'
			return
		}
		if (this.query.size > this.distributionGoodsList.length) {
			return
		}
		this.query.page++
		this.getDistributionGoodsSkuList(true)
	}
}
</script>

<style lang="less" scoped>
.distribute-products-container {
	min-height: 100vh;
	padding: 40upx 24upx 140upx 24upx;
	box-sizing: border-box;
	background-color: #eeeeee;
}
</style>
