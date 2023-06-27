<template>
	<view class="recharge-page">
		<JBack dark width="50" height="50"></JBack>
		<view>
			<tui-list-view title="" color="#777" margin-top="20rpx">
				<tui-list-cell arrow @click="getBankCardList">
					提现方式&nbsp;&nbsp;&nbsp;&nbsp;{{ tempwithdrawBankName }}
				</tui-list-cell>
			</tui-list-view>
		</view>
		<view class="main">
			<view class="recharge-wrapper">
				<view style="font-size: 36upx;font-weight: bold;color: #FF0000;">
					<view v-if="withdrawalForm.type === 0">
						余额：￥{{ userInfo.account || 0 }}
					</view>
					<view v-if="withdrawalForm.type === 1">
						佣金：￥{{ userInfo.commission || 0 }}
					</view>
				</view>
				<!-- <view class="title">提现金额</view> -->
				<view class="inp">
					<view class="icon">￥</view>
					<input v-model.number="withdrawalAmount" class="input" type="digit" placeholder="请输入提现金额" />

					<view class="error">{{ errMsg }}</view>
					<view v-if="!errMsg" class="final-price">
						手续费：{{ typeof withdrawalForm.withdrawCharge === 'number' ? withdrawalForm.withdrawCharge : '--' }} 元
					</view>
				</view>

				<JButton @click="handleRecharge">提现</JButton>
			</view>
		</view>
		<tui-select
			:list="bankCardList" reverse :show="isShowBankCardSelect" @confirm="handleSelectBankCard"
			@close="isShowBankCardSelect = false"
		></tui-select>
	</view>
</template>

<script>
import { getPwdSelectBankApi, getWithdrawalCountApi, addWithdrawalApplyApi } from '../../../api/user'
import { getUserId, handleDebounce } from '../../../utils'
import { J_USER_INFO } from '../../../constant'

export default {
	name: 'Withdrawal',
	onLoad(options) {
		this.withdrawalForm.type = options.type * 1 // 0余额1佣金2订单金额
		// if (this.withdrawalForm.type === 0)
		this.handleDebounce = handleDebounce(this.getCommission, 500)
	},

	data() {
		return {
			userInfo: {},
			withdrawalForm: {
				type: '',
				withdrawBankId: '',
				withdrawCharge: ''
			},
			tempwithdrawBankName: '请选择提现方式',
			bankCardList: [],
			isShowBankCardSelect: false,
			withdrawalAmount: '',
			errMsg: '',
			handleDebounce: ''
		}
	},

	computed: {},

	onShow() {
		this.userInfo = uni.getStorageSync(J_USER_INFO)
	},

	watch: {
		withdrawalAmount(value) {
			if (value === 0) {
				this.errMsg = '提现金额不能等于零'
			} else if (value < 1) {
				this.errMsg = '提现金额不能小于1元'
			} else if (
				(value + '').includes('.') &&
				(value + '').split('.')[1].length > 2
			) {
				this.errMsg = '提现金额错误'
			} else {
				this.errMsg = ''
				this.handleDebounce()
			}
		}
	},

	methods: {
		getCommission() {
			getWithdrawalCountApi({ withdrawApplyTotal: this.withdrawalAmount })
				.then(({ data }) => {
					this.withdrawalForm.withdrawCharge = data.withdrawCharge
				})
				.catch((e) => {
					console.log(e)
				})
		},

		getBankCardList() {
			uni.showLoading({
				title: '加载中'
			})
			if (!getUserId()) return
			getPwdSelectBankApi({ userId: getUserId() })
				.then(({ data }) => {
					this.bankCardList = data.map((item) => ({
						...item,
						value: item.id,
						text: `${item.bankName}（${item.bankNumber.slice(-4)}）`
					}))
					this.isShowBankCardSelect = true
					uni.hideLoading()
				})
				.catch((e) => {
					uni.hideLoading()
				})
		},

		handleSelectBankCard(e) {
			this.isShowBankCardSelect = false
			this.withdrawalForm.withdrawBankId = e.options.value
			this.tempwithdrawBankName = e.options.text
		},

		handleRecharge() {
			if (this.errMsg) return
			if (!this.withdrawalAmount) return this.$showToast('请输入提现金额')
			if (this.withdrawalAmount < 1) return this.$showToast('提现金额不能小于1元')
			if (!this.withdrawalForm.withdrawBankId) return this.$showToast('请选择提现方式')
			if (!this.withdrawalForm.withdrawCharge) return this.$showToast('手续费错误')
			addWithdrawalApplyApi({
				...this.withdrawalForm,
				withdrawApplyTotal: this.withdrawalAmount,
				uid: getUserId()
			}).then(({ data }) => {
				this.$showToast('操作成功')
				setTimeout(() => {
					uni.navigateBack()
				}, 2000)
			})
		}
	}
}
</script>

<style lang="less" scoped>
.recharge-page {
	padding: 48upx;
	box-sizing: border-box;

	.main {
		padding: 32upx;
		box-sizing: border-box;
		margin-top: 40px;

		.recharge-wrapper {
			.inp {
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 40upx;
				border-bottom: 1upx solid #ccc;
				padding-bottom: 10upx;
				margin-bottom: 400upx;

				.icon {
					font-weight: bold;
					font-size: 80upx;
				}

				.input {
					font-weight: bold;
					font-size: 128upx;
				}

				.uni-input-placeholder {
					font-size: 30px;
				}
			}

			.error {
				color: red;
				margin-top: 10upx;
				position: absolute;
				bottom: -60upx;
				left: 0;
			}

			.final-price {
				color: rgb(0, 0, 0);
				margin-top: 10upx;
				position: absolute;
				bottom: -132upx;
				left: 0;
			}
		}
	}
}
</style>
