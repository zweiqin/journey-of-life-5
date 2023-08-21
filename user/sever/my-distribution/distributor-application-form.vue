<template>
	<view class="distributor-application-form-container">
		<JHeader width="50" height="50" title="分销商申请表单"></JHeader>
		<FieldPaneDAF v-model="form.basicInfo" :fields="applyOne" title="申请信息"></FieldPaneDAF>
		<view class="buts">
			<button class="btn" @click="submit()">
				提交
			</button>
		</view>
	</view>
</template>

<script>
import FieldPaneDAF from './components/field-pane-daf.vue'
import { updateApplyDistributionApi, updateBindDistributionApi } from '../../../api/user'
import { J_USER_INFO } from '../../../constant'
import { getUserId } from '../../../utils'

export default {
	name: 'DistributorApplicationForm',
	components: {
		FieldPaneDAF
	},
	onLoad(options) {
		if (options.code) {
			this.form.basicInfo.inviteUserId = options.code
		}
	},
	data() {
		return {
			applyOne: [
				{
					label: '会员姓名：',
					field: 'name',
					type: 'input',
					placeholder: '请填写会员姓名'
				},
				{
					label: '分销邀请码：',
					field: 'inviteUserId',
					type: 'input'
				},
				{
					label: '身份证号码：',
					field: 'idNumber',
					type: 'input',
					placeholder: '请填写身份证号码'
				},
				{
					label: '结算银行开户账号：',
					field: 'settlementBankAccountNum',
					type: 'input',
					placeholder: '请填写结算银行开户账号'
				},
				{
					label: '结算银行开户行：',
					field: 'settlementBankAccountName',
					type: 'select',
					placeholder: '请选择结算银行开户行'
				},
				{
					label: '结算银行开户支行名称：',
					field: 'settlementBankBranchName',
					type: 'input',
					placeholder: '请填写结算银行开户支行名称'
				}
			],
			form: {
				basicInfo: {
					inviteUserId: ''
				}
			}
		}
	},

	methods: {
		// 点击提交按钮
		submit() {
			const data = {
				...this.form.basicInfo,
				userId: getUserId()
			}
			console.log(data)
			if (!data.name) {
				this.$showToast('缺少会员姓名')
				return
			}
			if (!data.idNumber) {
				this.$showToast('缺少身份证号码')
				return
			}
			if (!data.settlementBankAccountNum) {
				this.$showToast('缺少结算银行开户账号')
				return
			}
			if (!data.settlementBankAccountName) {
				this.$showToast('缺少结算银行开户行')
				return
			}
			if (!data.settlementBankBranchName) {
				this.$showToast('缺少结算银行开户支行名称')
				return
			}
			if (!(/^[1-9]\d{9,29}$/).test(data.settlementBankAccountNum)) {
				this.$showToast('银行卡号格式错误')
				return
			}
			uni.showModal({
				title: '提示',
				content: '确认提交分销商申请表单？',
				success: (res) => {
					if (res.confirm) {
						if (data.id) {
							updateBindDistributionApi(data).then((res) => {
								this.$showToast('提交成功')
								setTimeout(() => {
									uni.navigateBack()
								}, 2000)
							})
						} else {
							updateApplyDistributionApi(data).then((res) => {
								this.$showToast('提交成功')
								setTimeout(() => {
									uni.navigateBack()
								}, 2000)
							})
						}
					}
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.distributor-application-form-container {
	padding: 40upx 40upx 140upx 40upx;
	box-sizing: border-box;

	.buts {
		position: fixed;
		bottom: -1px;
		z-index: 2;
		padding: 20upx 40upx;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		width: 100%;
		box-sizing: border-box;
		margin-top: 272upx;
	}

	.btn {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 72upx;
		width: 306upx;
		font-size: 32upx;
		color: #fff;
		margin: 0;
		background-color: #07b9b9;
		border-radius: 100px;

		&:last-child {
			background-color: #fa5151;
		}

		&.withdraw {
			width: 100%;
			background: #999;
			letter-spacing: 10upx;
		}
	}
}
</style>
