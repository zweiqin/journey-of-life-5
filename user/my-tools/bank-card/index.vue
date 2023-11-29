<template>
	<view class="bank-card-container">
		<JHeader tabbar="/pages/user/user" width="50" height="50" title="银行卡列表"></JHeader>
		<view style="width: 70%;margin: 14rpx auto 14rpx;">
			<tui-button type="blue" bold shape="circle" width="100%" @click="go(`/user/my-tools/bank-card/bank-card-form`)">
				新增银行卡
			</tui-button>
		</view>
		<view v-if="bankCardList && bankCardList.length">
			<view v-for="(item, index) in bankCardList" :key="index" class="" style="padding-bottom: 35upx;">
				<tui-card
					:title="{ text: `持有者：${item.cnname || '--'}` }" :tag="{ text: `${item.bankCode || ''}` }"
					style="margin: 0;"
				>
					<template #body>
						<view style="padding: 16upx 24upx 26upx;font-size: 28upx;">
							<!-- style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" -->
							<view>所属银行：{{ item.bankName || '--' }}</view>
							<view>卡号：{{ item.bankNumber.padStart(19, '**** ') || '--' }}</view>
							<view>添加时间：{{ new Date(item.createTime).toLocaleString() || '--' }}</view>
						</view>
					</template>
					<template #footer>
						<view style="display: flex;justify-content: space-between;padding: 0 20rpx 20rpx;">
							<tui-button type="danger" width="120rpx" height="50rpx" style="border-radius: 50rpx;" @click="handleDeleteBankCard(item)">删除</tui-button>
						</view>
					</template>
				</tui-card>
			</view>
		</view>
		<view v-else>
			<tui-no-data>暂无数据</tui-no-data>
		</view>
	</view>
</template>

<script>
import { getPwdSelectBankApi, deleteWithdrawalBankApi } from '../../../api/user'
import { getUserId } from '../../../utils'

export default {
	name: 'BankCard',
	components: {},
	data() {
		return {
			bankCardList: []
		}
	},
	onShow() {
		this.getBankCardList()
	},

	methods: {
		getBankCardList() {
			uni.showLoading({
				title: '加载中'
			})
			if (!getUserId()) return
			getPwdSelectBankApi({ userId: getUserId() })
				.then(({ data }) => {
					this.bankCardList = data
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		handleDeleteBankCard(item) {
			deleteWithdrawalBankApi({ id: item.id })
				.then(({ data }) => {
					this.getBankCardList()
				})
		}
	}
}
</script>

<style lang="less" scoped>
.bank-card-container {
	min-height: 100vh;
	padding: 40upx 24upx 140upx 24upx;
	box-sizing: border-box;
	background-color: #eeeeee;
}
</style>
