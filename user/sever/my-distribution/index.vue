<template>
	<view class="my-distribution-container">
		<view v-if="isDistributor">
			<view style="padding: 30upx 20upx;color: #000000;">
				<JHeader width="50" height="50" title="我的分销"></JHeader>
			</view>

			<view class="nav">
				<view class="nav-item" @click="go('/user/sever/my-distribution/distribution-goods')">
					<tui-icon name="bag-fill" size="40" color="#ff6b35"></tui-icon>
					<view>分销商品</view>
				</view>
				<view class="nav-item" @click="go('/user/sever/my-distribution/distribution-performance')">
					<tui-icon name="feedback" size="40" color="#ff6b35"></tui-icon>
					<view>分销业绩</view>
				</view>
				<view class="nav-item" @click="handleDistributorCode">
					<tui-icon name="qrcode" size="40" color="#ff6b35"></tui-icon>
					<view>分销邀请码</view>
				</view>
				<view class="nav-item" @click="go('/user/otherServe/withdrawal/index?type=2')">
					<tui-icon name="wallet" size="40" color="#ff6b35"></tui-icon>
					<view>分销提现</view>
				</view>
			</view>
		</view>

		<CodePopup ref="codeRef"></CodePopup>
	</view>
</template>

<script>
import { getIsDistributionApi } from '../../../api/user'
import { getUserId } from '../../../utils'

export default {
	name: 'MyDistribution',
	data() {
		return {
			distributionData: '',
			isDistributor: false
		}
	},
	onLoad(options) {
		uni.showLoading({
			title: '加载中'
		})
		getIsDistributionApi({ userId: getUserId() })
			.then((res) => {
				uni.hideLoading()
				if (res.data === 0) {
					this.isDistributor = false
					this.$showToast('您还不是分销商，请先申请')
					setTimeout(() => {
						uni.redirectTo({
							url: '/user/sever/my-distribution/distributor-application-form'
						})
					}, 2000)
				} else {
					this.isDistributor = true
				}
			})
			.catch((e) => {
				uni.hideLoading()
				setTimeout(() => {
					uni.navigateBack()
				}, 2000)
			})
	},

	methods: {
		handleDistributorCode() {
			this.$refs.codeRef.getCode('Distributor')
		}
	},

	onReachBottom() { }
}
</script>

<style lang="less" scoped>
.my-distribution-container {
	box-sizing: border-box;
	min-height: 100vh;

	.nav {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
	}

	.nav-item {
		width: 50%;
		height: 240rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		view {
			margin: 10rpx 0;
		}
	}
}
</style>
