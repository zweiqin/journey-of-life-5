<template>
	<view class="seckill-activity-container">
		<JHeader tabbar="/pages/user/user" width="50" height="50" title="秒杀活动列表"></JHeader>
		<view style="width: 70%;margin: 14rpx auto 14rpx;">
			<tui-button
				type="blue" bold shape="circle" width="100%"
				@click="go(`/user/marketing-tools/seckill-activity/seckill-activity-form`)"
			>
				新建秒杀活动
			</tui-button>
		</view>
		<view v-if="seckillList && seckillList.length">
			<view v-for="(item, index) in seckillList" :key="index" style="padding-bottom: 35upx;">
				<tui-card
					:title="{ text: `${item.name}` }" :tag="{ text: `ID：${item.id || '--'}` }"
					:image="{ url: common.seamingImgUrl(item.picUrl), width: 88 }" style="margin: 0;"
				>
					<template #body>
						<view style="padding: 10upx 32upx;">
							<view>
								状态：
								<text v-if="item.status === 0">初始化</text>
								<text v-else-if="item.status === 1">已同步到缓存（秒杀就绪）</text>
								<text v-else-if="item.status === 2">已结束</text>
								<text v-else>--</text>
							</view>
							<view>活动创建时间：{{ item.addTime }}</view>
							<view>开始时间：{{ item.startTime }}</view>
							<view>开始时间：{{ item.endTime }}</view>
						</view>
					</template>
					<template #footer>
						<view style="padding: 0 20rpx 20rpx;text-align: right;">
							<!-- <tui-button
								type="warning" width="120rpx" height="50rpx" margin="0 20upx 0"
								style="border-radius: 50rpx;display: inline-block;"
								@click="go(`/user/digital-store/reservation-management/reservation-form?id=${item.id}`)"
								>
								编辑
								</tui-button> -->
							<tui-button
								type="green" width="180rpx" height="50rpx" style="border-radius: 50rpx;display: inline-block;"
								@click="handleShowSeckillGoods(item)"
							>
								关联商品
							</tui-button>
						</view>
					</template>
				</tui-card>
			</view>
		</view>
		<LoadMore v-show="seckillList.length" :status="status"></LoadMore>
		<view v-if="seckillList && !seckillList.length && loadingStatus !== 'loading'" class="no-data">
			暂未添加秒杀活动~
		</view>

		<tui-bottom-popup :show="isShowSeckillGoodsPopup" @close="isShowSeckillGoodsPopup = false">
			<view style="height: 100%;padding: 20upx;overflow-y: auto;box-sizing: border-box;">
				<tui-table v-if="seckillGoodsArr && seckillGoodsArr.length">
					<tui-tr>
						<tui-td
							v-for="(part, index) in [{ title: '商品ID', key: 'goodsId' }, { title: '库存', key: 'stock' }, { title: '秒杀价', key: 'price' }]"
							:key="index" bold :span="8"
						>
							{{ part.title }}
						</tui-td>
					</tui-tr>
					<tui-tr v-for="(part, index) in seckillGoodsArr" :key="index">
						<tui-td :span="8">{{ part.goodsId }}</tui-td>
						<tui-td :span="8">{{ part.stock }}</tui-td>
						<tui-td :span="8">{{ part.price }}</tui-td>
					</tui-tr>
				</tui-table>
				<view v-else class="no-data">
					暂无关联商品~
				</view>
			</view>
		</tui-bottom-popup>
	</view>
</template>

<script>
import { getSeckillListActivitiesApi, getSeckillListGoodsApi } from '../../../api/user'
import { J_USER_INFO } from '../../../constant'
import { getUserId, getBrandId } from '../../../utils'

export default {
	name: 'SeckillActivity',
	components: { },
	onLoad(options) { },
	data() {
		return {
			seckillList: [],
			status: 'none',
			loadingStatus: 'noMore',
			isShowSeckillGoodsPopup: false,
			seckillGoodsArr: []
		}
	},
	onShow() {
		this.getSeckillList()
	},

	methods: {
		getSeckillList() {
			if (!getUserId()) return
			this.status = 'loading'
			this.loadingStatus = 'loading'
			getSeckillListActivitiesApi({ brandId: getBrandId(), startTime: '2022-02-22 22:22:22', endTime: '2222-02-22 22:22:22' })
				.then(({ data }) => {
					console.log(data)
					this.seckillList = data.data
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
				.catch((err) => {
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
		},
		handleShowSeckillGoods(item) {
			this.seckillGoodsArr = []
			uni.showLoading()
			getSeckillListGoodsApi({ brandId: getBrandId(), secKillId: item.id })
				.then(({ data }) => {
					this.isShowSeckillGoodsPopup = true
					this.seckillGoodsArr = data.data || []
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		}
	},
	onReachBottom() { }
}
</script>

<style lang="less" scoped>
.seckill-activity-container {
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
	/deep/ .tui-popup-class.tui-bottom-popup {
		height: 85vh !important;
	}
}
</style>
