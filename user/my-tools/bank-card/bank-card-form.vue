<template>
	<view class="bank-card-form-container">
		<JHeader width="50" height="50" title="银行卡表单"></JHeader>
		<FieldPaneBCF v-model="form.basicInfo" :fields="applyOne" title="银行卡信息"></FieldPaneBCF>
		<view class="buts">
			<button class="btn" @click="submit()">
				提交
			</button>
		</view>
	</view>
</template>

<script>
import FieldPaneBCF from './components/field-pane-bcf.vue'
import { addWithdrawalBankCardApi } from '../../../api/user'
import { J_USER_INFO } from '../../../constant'
import { getUserId, getBrandId } from '../../../utils'

export default {
	name: 'BankCardForm',
	components: {
		FieldPaneBCF
	},
	onLoad(options) {
		if (options.id) {}
	},
	data() {
		return {
			applyOne: [
				{
					label: '银行卡持有者姓名：',
					field: 'cnname',
					type: 'input',
					placeholder: '请填写银行卡持有者姓名'
				},
				{
					label: '银行卡所属银行：',
					field: 'bankName',
					type: 'select',
					placeholder: '请选择银行卡所属银行'
				},
				{
					label: '所属银行缩写：',
					field: 'bankCode',
					type: 'select',
					placeholder: '请选择所属银行缩写'
				},
				{
					label: '银行卡卡号：',
					field: 'bankNumber',
					type: 'input',
					placeholder: '请填写银行卡卡号'
				}
			],
			form: {
				basicInfo: {
					cnname: '',
					bankName: '',
					bankCode: '',
					bankNumber: ''
				}
			}
		}
	},

	methods: {
		// 点击提交按钮
		submit() {
			const data = {
				...this.form.basicInfo,
				uid: getUserId()
			}
			console.log(data)
			if (!data.cnname) {
				this.$showToast('缺少银行卡持有者姓名')
				return
			}
			if (!data.bankName) {
				this.$showToast('缺少银行卡所属银行')
				return
			}
			if (!data.bankCode) {
				this.$showToast('缺少所属银行缩写')
				return
			}
			if (!data.bankNumber) {
				this.$showToast('缺少银行卡卡号')
				return
			}
			if (!(/^[1-9]\d{9,29}$/).test(data.bankNumber)) {
				this.$showToast('卡号格式错误')
				return
			}
			uni.showModal({
				title: '提示',
				content: '确认提交银行卡表单？',
				success: (res) => {
					if (res.confirm) {
						addWithdrawalBankCardApi(data).then((res) => {
							this.$showToast('添加银行卡成功')
							setTimeout(() => {
								uni.navigateBack()
							}, 2000)
						})
					}
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.bank-card-form-container {
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
