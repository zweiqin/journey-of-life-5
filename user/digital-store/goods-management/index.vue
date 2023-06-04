<template>
	<view class="goods-management-container">
		<JHeader tabbar="/pages/user/user" width="50" height="50" title="商品列表"></JHeader>
		<view style="width: 70%;margin: 14rpx auto 14rpx;">
			<tui-button type="blue" bold shape="circle" width="100%" @click="go(`/user/digital-store/goods-management/goods-form`)">
				新增商品
			</tui-button>
		</view>
		<view v-if="goodsList && goodsList.length">
			<view v-for="(item, index) in goodsList" :key="index" class="" style="padding-bottom: 35upx;">
				<tui-card
					:title="{ text: `${item.name} - ￥${item.counterPrice}` }" :tag="{ text: `${item.goodsSn}` }"
					:image="{ url: common.seamingImgUrl(item.picUrl) }" style="margin: 0;"
				>
					<template #body>
						<view style="padding: 10upx 12upx;">
							<view v-if="item.brief" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{ item.brief }}</view>
						</view>
						<view style="display: flex;padding: 10upx 12upx;">
							<tui-tag v-if="item.isAppoint" type="warning" padding="12rpx" margin="0 10rpx">预约商品</tui-tag>
							<tui-tag v-if="item.isHot" type="danger" padding="12rpx" margin="0 10rpx">热卖</tui-tag>
							<tui-tag v-if="item.isNew" type="green" padding="12rpx" margin="0 10rpx">新品</tui-tag>
							<tui-tag v-if="item.isOnSale" type="light-blue" padding="12rpx" margin="0 10rpx">在售</tui-tag>
							<tui-tag v-if="item.supportVoucher" type="black" padding="12rpx" margin="0 10rpx">支持代金券</tui-tag>
						</view>
						<view style="overflow-x: auto;">
							<tui-image-group
								:image-list="JSON.parse(item.gallery).map(i => ({ src: common.seamingImgUrl(i) }))"
								mode="aspectFit" is-group distance="50" width="120rpx"
								height="120rpx" fade-show
								radius="10upx"
							></tui-image-group>
						</view>
					</template>
					<template #footer>
						<view style="display: flex;justify-content: space-between;padding: 0 20rpx 20rpx;">
							<view>{{ item.keywords }}</view>
							<tui-button type="warning" width="120rpx" height="50rpx" style="border-radius: 50rpx;" @click="go(`/user/digital-store/goods-management/goods-form?id=${item.id}`)">编辑</tui-button>
						</view>
					</template>
				</tui-card>
			</view>
		</view>
		<view v-else>
			<tui-no-data>暂无数据</tui-no-data>
		</view>
		<LoadMore v-show="goodsList.length" :status="status"></LoadMore>
	</view>
</template>

<script>
import { getBrandGoodsBrandApi, createGoodsBrandApi, updateGoodsBrandApi } from '../../../api/user'
import { J_USER_INFO } from '../../../constant'
import { getUserId, getBrandId } from '../../../utils'

export default {
	name: 'GoodsManagement',
	components: {},
	onLoad(options) { },
	data() {
		return {
			goodsList: [],
			query: {
				page: 1,
				size: 10,
				brandId: getBrandId() // getBrandId()
			},
			totalPages: 0,
			status: 'none'
		}
	},
	onShow() {
		this.query.page = 1
		this.getBrandGoodsList()
	},

	methods: {
		getBrandGoodsList(isLoadmore) {
			uni.showLoading({
				title: '加载中'
			})
			this.status = 'loading'
			if (!getUserId()) return
			getBrandGoodsBrandApi(this.query)
				.then(({ data }) => {
					this.totalPages = data.totalPages
					if (isLoadmore) {
						this.goodsList.push(...data.goodsList)
					} else {
						this.goodsList = data.goodsList
					}
					uni.hideLoading()
					this.status = 'none'
				})
				.catch(() => {
					uni.hideLoading()
					this.status = 'none'
				})
		}
	},
	onReachBottom() {
		if (this.query.page >= this.totalPages) {
			this.status = 'no-more'
			return
		}
		if (this.query.size > this.goodsList.length) {
			return
		}
		this.query.page++
		this.getBrandGoodsList(true)
	}
}
</script>

<style lang="less" scoped>
.goods-management-container {
	min-height: 100vh;
	padding: 40upx 24upx 140upx 24upx;
	box-sizing: border-box;
	background-color: #eeeeee;
}
</style>
