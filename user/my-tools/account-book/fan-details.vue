<template>
	<view class="fan-details-container">
		<view style="padding: 30upx 20upx;color: #000000;">
			<JHeader width="50" height="50" title="粉丝详情"></JHeader>
		</view>
		<view style="margin: 20upx 30upx;">

			<view v-if="info" style="min-height: 50vh;padding: 20upx 30upx;margin-bottom: 24upx;background-color: #fff;">
				<JAvatar
					style="text-align: center;" :src="common.seamingImgUrl(info.headimgurl)" size="162" radius="50%"
					border="5upx solid #ffffff"
				></JAvatar>
				<view style="padding: 40upx;">
					<view>名称：{{ info.nickname || '--' }}</view>
					<view style="margin-top: 20upx;">ID：{{ info.id || '--' }}</view>
					<view style="margin-top: 20upx;">性别：{{ info.sex === 0 ? '男' : info.sex === 1 ? '女' : '--' }}</view>
					<view style="margin-top: 20upx;">生日：{{ info.birthday || '--' }}</view>
					<view style="margin-top: 20upx;">下单数量：{{ info.orderNum || '--' }}</view>
					<view style="margin-top: 20upx;">用户代金券：{{ info.userVoucher || '--' }}</view>
					<view v-if="userInfo.roleIds === 2" style="margin-top: 20upx;">绑定商家数：{{ info.brandNum || '--' }}</view>
				</view>
			</view>
			<view v-else>
				<tui-no-data>暂无数据</tui-no-data>
			</view>
		</view>

	</view>
	</view>
</template>

<script>
import { getPlannerDetailsApi, getBrandFansDetailsApi } from '../../../api/user'
import { J_USER_INFO } from '../../../constant'

export default {
	name: 'FanDetails',
	components: {},
	data() {
		return {
			userInfo: {},
			fanId: '',
			type: '',
			info: {}
		}
	},
	onLoad(options) {
		this.fanId = options.id
		this.type = options.type
		this.getFanDetail()
	},

	onShow() {
		this.userInfo = uni.getStorageSync(J_USER_INFO)
	},
	mounted() {
	},
	methods: {
		getFanDetail() {
			uni.showLoading({
				title: '加载中'
			})
			if (this.type === 'planner') {
				getPlannerDetailsApi({ userId: this.fanId })
					.then(({ data }) => {
						this.info = data
						uni.hideLoading()
					})
					.catch(() => {
						uni.hideLoading()
					})
			} else if (this.type === 'brand') {
				getBrandFansDetailsApi({ userId: this.fanId })
					.then(({ data }) => {
						this.info = data
						uni.hideLoading()
					})
					.catch(() => {
						uni.hideLoading()
					})
			}
		}
	}
}
</script>

<style lang="less" scoped>
.fan-details-container {
	min-height: 100vh;
	width: 100%;
	background: #f6f6f6;
}
</style>
