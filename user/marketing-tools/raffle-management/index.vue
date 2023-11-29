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
				<template #default="obj">
					<view style="padding: 0 20rpx 20rpx 0;text-align: right;">
						<tui-button
							type="warning" width="120rpx" height="50rpx" margin="0 20upx 0 0"
							shape="circle" style="display: inline-block;"
							@click="go(`/user/marketing-tools/raffle-management/raffle-prize-form?id=${obj.data.id}`)"
						>
							编辑
						</tui-button>
						<tui-button
							type="green" width="120rpx" height="50rpx" margin="0 20upx 0 0"
							shape="circle" style="display: inline-block;"
							@click="go(`/user/marketing-tools/raffle-management/prize-allocation-form?id=${obj.data.id}`)"
						>
							配置
						</tui-button>
						<tui-button
							shape="circle" type="danger" width="120rpx" height="50rpx"
							style="display: inline-block;"
							@click="handleRafflePrizeDelete(obj.data)"
						>
							删除
						</tui-button>
					</view>
				</template>
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
import { getBrandId } from '../../../utils'
import RafflePrizeAll from './components/RafflePrizeAll.vue'

export default {
	name: 'RaffleManagement',
	components: { RafflePrizeAll },
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
					this.rafflePrizeList = [
						{
							'id': 179,
							'name': '积分',
							'url': '8paklzxc5l9zflhpmv3t.png',
							'value': '5',
							'type': 2,
							'brandId': 1001230,
							'status': 0,
							'couponId': null,
							'isDel': 0,
							'position': 1,
							'phase': 10,
							'createTime': '2023-08-14T07:04:48.000+0000',
							'updateTime': '2023-08-14T07:04:48.000+0000'
						},
						{
							'id': 180,
							'name': '代金券',
							'url': 'qqqh4wwjtgrv11rbu6a1.png',
							'value': '10',
							'type': 3,
							'brandId': 1001230,
							'status': 0,
							'couponId': null,
							'isDel': 0,
							'position': 2,
							'phase': 10,
							'createTime': '2023-08-14T07:05:18.000+0000',
							'updateTime': '2023-08-14T07:05:18.000+0000'
						},
						{
							'id': 181,
							'name': '谢谢惠顾',
							'url': 'hyaivanlf34f49746jhw.png',
							'value': '100',
							'type': 4,
							'brandId': 1001230,
							'status': 0,
							'couponId': null,
							'isDel': 0,
							'position': 3,
							'phase': 100,
							'createTime': '2023-08-14T07:05:46.000+0000',
							'updateTime': '2023-08-14T07:05:46.000+0000'
						},
						{
							'id': 182,
							'name': '积分',
							'url': 'mbhno8v5h4yv8ed92th7.png',
							'value': '10',
							'type': 2,
							'brandId': 1001230,
							'status': 0,
							'couponId': null,
							'isDel': 0,
							'position': 3,
							'phase': 21343,
							'createTime': '2023-08-14T07:10:14.000+0000',
							'updateTime': '2023-08-14T07:10:14.000+0000'
						},
						{
							'id': 183,
							'name': '积分',
							'url': 'we46u9380ochf6dzoc0k.png',
							'value': '15',
							'type': 3,
							'brandId': 1001230,
							'status': 0,
							'couponId': null,
							'isDel': 0,
							'position': 5,
							'phase': 32,
							'createTime': '2023-08-14T07:14:11.000+0000',
							'updateTime': '2023-08-14T07:14:11.000+0000'
						},
						{
							'id': 184,
							'name': '谢谢惠顾',
							'url': 'awu5khyqoqn5n0zgpsux.jpg',
							'value': '121',
							'type': 4,
							'brandId': 1001230,
							'status': 0,
							'couponId': null,
							'isDel': 0,
							'position': 6,
							'phase': 144,
							'createTime': '2023-08-14T07:15:05.000+0000',
							'updateTime': '2023-08-14T07:15:05.000+0000'
						},
						{
							'id': 185,
							'name': '谢谢惠顾',
							'url': 'v3p1iitl78gxmezv73a7.jpg',
							'value': '123',
							'type': 4,
							'brandId': 1001230,
							'status': 0,
							'couponId': null,
							'isDel': 0,
							'position': 8,
							'phase': 324,
							'createTime': '2023-08-14T07:15:48.000+0000',
							'updateTime': '2023-08-14T07:15:48.000+0000'
						},
						{
							'id': 186,
							'name': '代金券',
							'url': 'r5pdn3g66bvay007k8m8.png',
							'value': '12',
							'type': 3,
							'brandId': 1001230,
							'status': 0,
							'couponId': null,
							'isDel': 0,
							'position': 8,
							'phase': 213,
							'createTime': '2023-08-14T07:16:24.000+0000',
							'updateTime': '2023-08-14T07:16:24.000+0000'
						}
					]
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
