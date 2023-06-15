<template>
	<view class="marketing-planner-container">
		<JHeader width="50" height="50" title="营销策划师升级信息填写"></JHeader>

		<FieldPaneMP v-model="form.accountInfo" :fields="infomations" title="信息填写"></FieldPaneMP>

		<view class="buts">
			<button class="btn" @click="submit(true)">提交</button>
		</view>
	</view>
</template>

<script>
import FieldPaneMP from './components/field-pane-mp.vue'
import { upgradeRequestApplyForApi } from '../../api/user'
import { getUserId } from '../../utils'

export default {
	name: 'MarketingPlanner',
	components: {
		FieldPaneMP
	},

	onLoad(options) {
		this.packageId = options.packageId * 1
	},

	data() {
		return {
			infomations: [
				// {
				// 	label: '分公司所属地区：',
				// 	type: 'city',
				// 	field: 'area',
				// 	placeholder: '省份、城市、区县'
				// },
				{
					label: '是否关联分公司：',
					field: 'isConnectBranch',
					type: 'radio',
					placeholder: '请选择是否关联分公司'
				},
				{
					label: '分公司：',
					type: 'select',
					field: 'branchId',
					placeholder: '请选择分公司'
				},
				{
					label: '策划师所属地区：',
					type: 'subregion',
					field: 'areaUserOne',
					placeholder: '省份、城市、区县、乡镇'
				},
				{
					label: '策划师所属地区：',
					type: 'subregion',
					field: 'areaUserTwo',
					placeholder: '省份、城市、区县、乡镇'
				},
				{
					label: '详细地址（所属区域）',
					type: 'textarea',
					field: 'address',
					placeholder: '可填写详细地址，如广东省佛山市顺德区龙江镇xxxxx'
				}
			],
			// 表单
			form: {
				accountInfo: {
					isConnectBranch: ''
				}
			},
			packageId: ''
		}
	},

	methods: {
		// 提交表单
		submit(tag) {
			const data = {
				address: this.form.accountInfo.address,
				area: this.form.accountInfo.isConnectBranch === 'true' ? this.form.accountInfo.area : this.form.accountInfo.isConnectBranch === 'false' ? '' : '',
				branchId: this.form.accountInfo.isConnectBranch === 'true' ? this.form.accountInfo.branchId : this.form.accountInfo.isConnectBranch === 'false' ? '' : '',
				areaUser: this.form.accountInfo.isConnectBranch === 'true' ? this.form.accountInfo.areaUserOne : this.form.accountInfo.isConnectBranch === 'false' ? this.form.accountInfo.areaUserTwo : '',
				userId: getUserId(),
				packageId: this.packageId
			}
			if (!this.form.accountInfo.isConnectBranch) {
				return this.$showToast('请选择是否关联分公司')
			} else if (this.form.accountInfo.isConnectBranch === 'true') {
				if (!data.area) return this.$showToast('请选择分公司所属地区')
				if (!data.branchId) return this.$showToast('请选择分公司')
				if (!data.areaUser) return this.$showToast('请选择策划师所属地区')
			} else if (this.form.accountInfo.isConnectBranch === 'false') {
				if (!data.areaUser) return this.$showToast('请选择策划师所属地区')
			}
			// if (!data.address) return this.$showToast('请填写详细地址')
			if (!data.packageId) return this.$showToast('缺少套餐信息')
			uni.showModal({
				title: '提示',
				content: '确定要提交当前的申请信息吗？',
				success: (res) => {
					if (res.confirm) {
						upgradeRequestApplyForApi(data).then((res) => {
							this.$showToast('提交成功', 'success')
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
.marketing-planner-container {
	padding: 46upx;
	box-sizing: border-box;
	padding-bottom: 200upx;

	.mask {
		position: fixed;
		top: 100upx;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(255, 255, 255, 0);
	}

	.buts {
		position: fixed;
		bottom: -1px;
		left: 0;
		width: 100%;
		background-color: #fff;
		padding: 20upx 46upx;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 10;

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
		}
	}
}
</style>
