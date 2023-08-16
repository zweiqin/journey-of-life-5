<template>
	<view class="distribution-goods-container">
		<view style="padding: 30upx 20upx;color: #000000;">
			<JHeader width="50" height="50" title="分销商品"></JHeader>
		</view>
		<tui-tabs
			item-width="50%" selected-color="#000000" bold slider-bg-color="#ff0000"
			:tabs="[{ name: '已选择' }, { name: '未选择' }]" :current-tab="currentTab" @change="handleChangeTab"
		></tui-tabs>
		<view style="margin: 0 0 20upx;">
			<view v-if="distributionGoods && distributionGoods.length">
				<view style="margin-bottom: 4upx;">
					<tui-input v-model="query.goodsName" label="商品名称" placeholder="输入商品名称进行搜索" clearable>
						<template #right>
							<tui-button
								type="warning" width="120rpx" height="50rpx" shape="circle"
								@click="handleSearchGoods"
							>
								搜索
							</tui-button>
						</template>
					</tui-input>
				</view>
				<view style="margin: 0 30upx;">
					<view v-for="item in distributionGoods" :key="item.id" style="padding-bottom: 35upx;">
						<DistributedGoods :goods-data="item">
							<view v-if="currentTab === 0" style="display: flex;justify-content: flex-end;padding: 0 20rpx 20rpx;">
								<tui-button
									type="danger" width="180rpx" height="60rpx" style="border-radius: 50rpx;"
									@click="handleDistributeGoods(item)"
								>
									分销商品
								</tui-button>
								<tui-button
									type="danger" width="180rpx" height="60rpx" margin="0 0 0 20upx"
									style="border-radius: 50rpx;"
									@click="handleSelectGoods(item, 1)"
								>
									取消选择
								</tui-button>
							</view>
							<view v-else-if="currentTab === 1" style="display: flex;justify-content: flex-end;padding: 0 20rpx 20rpx;">
								<tui-button
									type="danger" width="180rpx" height="60rpx" style="border-radius: 50rpx;"
									@click="handleSelectGoods(item, 0)"
								>
									立即选取
								</tui-button>
							</view>
						</DistributedGoods>
					</view>
				</view>
			</view>
			<view v-else>
				<tui-no-data>暂无数据</tui-no-data>
			</view>
		</view>
		<LoadMore v-show="distributionGoods.length" :status="status"></LoadMore>

		<!-- 生成二维码 -->
		<uqrcode
			ref="uqrcode" class="generate-code-container" canvas-id="qrcode" :value="qrcodeUrl + distributeGoodsOptions"
			@complete="handleCompleteCode"
		></uqrcode>

		<!-- 分享分销商品海报 -->
		<DistributePoster ref="refDistributePoster"></DistributePoster>
	</view>
</template>

<script>
import { getDistributionGoodsGoodsPageApi, updateDistributionSelectedGoodsApi, getDistributionIdApi } from '../../../api/user'
import { getUserId } from '../../../utils'
import DistributePoster from './components/DistributePoster.vue'

export default {
	name: 'DistributionGoods',
	components: { DistributePoster },
	data() {
		return {
			currentTab: 0,
			distributionGoods: [],
			query: {
				page: 1,
				size: 10,
				goodsId: '',
				userId: getUserId(),
				goodsName: '',
				isChecked: true
			},
			totalPages: 0,
			status: 'none',
			distributeGoodsCode: '',
			qrcodeUrl: 'https://h5.jfcmei.com/#/pages/store/goods-detail/goods-detail?orderType=1&goodsId=',
			distributeGoodsOptions: '',
			tempDistributeGoodsObj: {}
		}
	},
	onLoad() {
		this.getDistributionGoodsList()
	},
	mounted() {
	},
	methods: {
		handleChangeTab(e) {
			this.totalPages = 0
			this.status = 'none'
			this.currentTab = e.index
			if (this.currentTab === 0) {
				this.query.isChecked = true
			} else if (this.currentTab === 1) {
				this.query.isChecked = false
			}
			this.getDistributionGoodsList()
		},
		handleSearchGoods() {
			if (!this.query.goodsName) return this.$showToast('请输入商品名称')
			this.getDistributionGoodsList()
		},
		getDistributionGoodsList(isLoadmore) {
			uni.showLoading({
				title: '加载中'
			})
			this.status = 'loading'
			if (!getUserId()) return
			getDistributionGoodsGoodsPageApi(this.query)
				.then(({ data }) => {
					// this.totalPages = data.totalPages
					// if (isLoadmore) {
					// 	this.distributionGoods.push(...data.goodsVoList)
					// } else {
					this.distributionGoods = data.goodsVoList || []
					// }
					uni.hideLoading()
					this.status = 'none'
				})
				.catch(() => {
					uni.hideLoading()
					this.status = 'none'
				})
		},
		handleSelectGoods(item, checked) {
			if (!getUserId()) return
			uni.showModal({
				title: '提示',
				content: checked ? `确认取消选择该商品【${item.goodsId}】吗？` : `确认选择该商品【${item.goodsId}】吗？`,
				success: (res) => {
					if (res.confirm) {
						uni.showLoading({
							title: '操作中'
						})
						updateDistributionSelectedGoodsApi({
							id: item.id,
							distributionGoodsId: item.id,
							checked,
							userId: getUserId()
						})
							.then(({ data }) => {
								uni.hideLoading()
								if (checked === 0) {
									this.$showToast('选择成功')
								} else if (checked === 1) {
									this.$showToast('取消选择成功')
								}
								this.getDistributionGoodsList()
							})
							.catch(() => {
								uni.hideLoading()
							})
					}
				}
			})
		},
		handleDistributeGoods(item) {
			if (!getUserId()) return
			if (item && item.goodsId) {
				uni.showLoading({
					title: '处理中...'
				})
				getDistributionIdApi({ userId: getUserId() })
					.then(({ data }) => {
						this.distributeGoodsCode = ''
						this.distributeGoodsOptions = item.goodsId + '&distributionId=' + data
						this.tempDistributeGoodsObj = {
							id: item.id,
							goodsId: item.goodsId,
							goodsName: item.goodsName,
							price: item.price,
							specs: item.specs,
							thumbnail: item.thumbnail,
							storeName: item.storeName
						}
						this.$refs.uqrcode.make({
							// success: () => {
							// 	uni.hideLoading()
							// 	this.$refs.refDistributePoster.show({
							// 		id: item.id,
							// 		goodsId: item.goodsId,
							// 		goodsName: item.goodsName,
							// 		price: item.price,
							// 		specs: item.specs,
							// 		thumbnail: item.thumbnail,
							// 		storeName: item.storeName,
							// 		distributeGoodsCode: this.distributeGoodsCode
							// 	})
							// }
						})
					})
					.catch(() => {
						uni.hideLoading()
					})
			} else {
				return this.$showToast('缺少商品数据')
			}
		},
		// 完成
		handleCompleteCode(e) {
			if (e.success) {
				this.$refs.uqrcode.toTempFilePath({
					success: (res) => {
						if (this.distributeGoodsOptions) {
							this.distributeGoodsCode = res.tempFilePath
							this.$refs.refDistributePoster.show({ ...this.tempDistributeGoodsObj, distributeGoodsCode: this.distributeGoodsCode, distributeGoodsOptions: this.distributeGoodsOptions })
							uni.hideLoading()
						}
					}
				})
			}
		}
	},
	onReachBottom() {
		// if (this.query.page >= this.totalPages) {
		// 	this.status = 'no-more'
		// 	return
		// }
		// if (this.query.size > this.distributionGoods.length) {
		// 	return
		// }
		// this.query.page++
		// this.getDistributionGoodsList(true)
	}
}
</script>

<style lang="less" scoped>
.distribution-goods-container {
	min-height: 100vh;
	width: 100%;
	background: #f6f6f6;

}

.generate-code-container {
	position: absolute;
	top: -10000upx;
}
</style>
