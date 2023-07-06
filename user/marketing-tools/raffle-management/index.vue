<template>
	<view class="raffle-management-container">
		<JHeader tabbar="/pages/user/user" width="50" height="50" title="抽奖奖品列表"></JHeader>
		<view style="display: flex;justify-content: space-between;align-items: flex-end;margin: 14rpx auto 14rpx;">
			<tui-button
				type="blue" bold shape="circle" width="70%"
				@click="go(`/user/marketing-tools/raffle-management/raffle-prize-form`)"
			>
				新增奖品
			</tui-button>
			<tui-button
				type="black" plain bold shape="circle"
				width="fit-content" height="52upx" style="padding: 0 20upx;"
				@click="go(`/user/marketing-tools/raffle-management/prize-allocation-form`)"
			>
				奖品配置
			</tui-button>
		</view>
		<view v-if="rafflePrizeList && rafflePrizeList.length">
			<RafflePrizeAll :prize-data="rafflePrizeList">
				<view style="padding: 0 20rpx 20rpx 0;text-align: right;">
					<tui-button
						type="warning" width="120rpx" height="50rpx" margin="0 20upx 0 0"
						shape="circle" style="display: inline-block;"
						@click="go(`/user/marketing-tools/raffle-management/raffle-prize-form?id=${item.id}`)"
					>
						编辑
					</tui-button>
					<tui-button
						type="green" width="120rpx" height="50rpx" margin="0 20upx 0 0"
						shape="circle" style="display: inline-block;"
						@click="go(`/user/marketing-tools/raffle-management/prize-allocation-form?id=${item.id}`)"
					>
						配置
					</tui-button>
					<tui-button
						shape="circle" type="danger" width="120rpx" height="50rpx"
						style="display: inline-block;"
						@click="handleRafflePrizeDelete(item)"
					>
						删除
					</tui-button>
				</view>
			</RafflePrizeAll>
		</view>
		<view v-else>
			<tui-no-data>暂无数据</tui-no-data>
		</view>
		<LoadMore v-show="rafflePrizeList.length" :status="status"></LoadMore>
	</view>
</template>

<script>
import { getPrizeLotteryDrawListApi, deletePrizeLotteryDrawApi } from '../../../api/user'
import { J_USER_INFO } from '../../../constant'
import { getUserId, getBrandId } from '../../../utils'
import RafflePrizeAll from './components/RafflePrizeAll.vue'

export default {
	name: 'RaffleManagement',
	components: { RafflePrizeAll },
	onLoad(options) { },
	data() {
		return {
			rafflePrizeList: [],
			status: 'none'
		}
	},
	onShow() {
		this.getBrandRafflePrizeList()
	},

	methods: {
		getBrandRafflePrizeList() {
			if (!getBrandId()) return
			uni.showLoading({
				title: '加载中'
			})
			this.status = 'loading'
			getPrizeLotteryDrawListApi({ brandId: getBrandId() })
				.then(({ data }) => {
					this.rafflePrizeList = data || []
					uni.hideLoading()
					this.status = 'none'
				})
				.catch(() => {
					uni.hideLoading()
					this.status = 'none'
				})
		},
		handleRafflePrizeDelete(item) {
			uni.showModal({
				title: '提示',
				content: '确定要删除当前奖品？',
				success: (res) => {
					if (res.confirm) {
						deletePrizeLotteryDrawApi({
							id: item.id
						}).then((res) => {
							this.$showToast('删除成功', 'success')
							this.getBrandRafflePrizeList()
						})
					}
				}
			})
		}
	},
	onReachBottom() { }
}
</script>

<style lang="less" scoped>
.raffle-management-container {
	min-height: 100vh;
	padding: 40upx 24upx 140upx 24upx;
	box-sizing: border-box;
	background-color: #eeeeee;
}
</style>
