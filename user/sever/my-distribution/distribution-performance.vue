<template>
	<view class="distribution-performance-container">
		<JHeader width="50" height="50" title="分销业绩"></JHeader>
		<view v-if="distributionPerformanceList && distributionPerformanceList.length">
			<view v-for="(item, index) in distributionPerformanceList" :key="index" style="padding-bottom: 28upx;">
				<tui-card :title="{ text: `${item.sn}` }" :tag="{ text: `${item.distributionCashStatus || ''}`, color: '#eb0958', size: 30 }" style="margin: 0;">
					<template #body>
						<view style="padding: 16upx 24upx 26upx;font-size: 28upx;">
							<view style="display: flex;align-items: center;">
								<view>
									<BeeIcon :src="common.seamingImgUrl(item.thumbnail || item.picUrl)" :size="84"></BeeIcon>
								</view>
								<view style="margin-left: 20upx;">
									<view>
										<text>分销员：</text>
										<text>{{ item.distributionName || '--' }}</text>
									</view>
									<view>
										<text>分销佣金：</text>
										<text style="color: #eb0909;">￥{{ item.price || '--' }}元</text>
									</view>
									<view>
										<text>支付时间：</text>
										<text>{{ new Date(item.payTime).toLocaleString() || '--' }}</text>
									</view>
									<view>
										<text>创建时间：</text>
										<text>{{ new Date(item.createTime).toLocaleString() || '--' }}</text>
									</view>
								</view>
							</view>
						</view>
					</template>
				</tui-card>
			</view>
		</view>
		<view v-else>
			<tui-no-data>暂无数据</tui-no-data>
		</view>
		<LoadMore v-show="distributionPerformanceList.length" :status="status"></LoadMore>
	</view>
</template>

<script>
import { getDistributionPerformanceApi } from '../../../api/user'
import { J_USER_INFO } from '../../../constant'
import { getUserId } from '../../../utils'

export default {
	name: 'DistributionPerformance',
	components: {},
	data() {
		return {
			distributionPerformanceList: [],
			status: 'none'
		}
	},
	onLoad() {
		this.getDistributionPerformance()
	},

	methods: {
		getDistributionPerformance() {
			if (!getUserId()) return
			uni.showLoading({
				title: '加载中'
			})
			this.status = 'loading'
			getDistributionPerformanceApi({ userId: getUserId() })
				.then(({ data }) => {
					this.distributionPerformanceList = data
					uni.hideLoading()
					this.status = 'none'
				})
				.catch(() => {
					uni.hideLoading()
					this.status = 'none'
				})
		}
	},
	onReachBottom() { }
}
</script>

<style lang="less" scoped>
.distribution-performance-container {
	min-height: 100vh;
	padding: 40upx 24upx 140upx 24upx;
	box-sizing: border-box;
	background-color: #eeeeee;
}
</style>
